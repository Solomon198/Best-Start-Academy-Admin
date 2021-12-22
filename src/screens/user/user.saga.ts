import { call, put, takeEvery } from 'redux-saga/effects';
import {
  GetCvActions,
  AddCredentialsAction,
  DeleteCredentialAction,
} from './user.actions';
import Config from '../../configs/env.config';
import axios from 'axios';
import { SnackBarActions } from '../../utilities/utils.actions';
import * as joi from 'joi';
const getCv = async (userId: any) => {
  return axios.get(Config().API_ENDPOINT + '/cv/' + userId);
};

const addCredentials = async (payload: any) => {
  return axios.post(Config().API_ENDPOINT + '/cv/credentials', payload);
};

const deleteCredentials = async (payload: any) => {
  return axios.delete(Config().API_ENDPOINT + '/cv/credentials', {
    params: payload,
  });
};

function* watchGetCvs() {
  yield takeEvery(GetCvActions.GET_CV_CALLER, function* (action: any) {
    try {
      yield put({ type: GetCvActions.GET_CV_STARTED });
      const doGetCv = yield call(getCv.bind(null, action.payload));
      const { payload } = doGetCv.data;
      yield put({ type: GetCvActions.GET_CV_SUCCESS, payload: payload });
    } catch (e) {
      let message: string;
      if (e.response) {
        message = e.response.data.message;
      } else {
        message = e.message;
      }
      yield put({ type: GetCvActions.GET_CV_FAILED, payload: message });
      yield put({
        type: SnackBarActions.CONFIGURE_SNACKBAR,
        payload: {
          show: true,
          message: message || e.message,
          status: 'error',
        },
      });
    }
  });
}

const validateAddCredentials = joi.object({
  name: joi.string().required(),
  url: joi.string().uri().required(),
  fileType: joi.string().required(),
  userId: joi.string().required(),
});

function* watchAddCredentials() {
  yield takeEvery(
    AddCredentialsAction.ADD_CREDENTIALS_CALLER,
    function* (action: any) {
      try {
        yield put({ type: AddCredentialsAction.ADD_CREDENTIALS_STARTED });
        const { error } = validateAddCredentials.validate(action.payload);
        if (!error) {
          const doAddCredential = yield call(
            addCredentials.bind(null, action.payload)
          );
          const { payload } = doAddCredential.data;
          yield put({
            type: AddCredentialsAction.ADD_CREDENTIALS_SUCCESS,
            payload: payload,
          });
        } else {
          yield put({
            type: SnackBarActions.CONFIGURE_SNACKBAR,
            payload: {
              show: true,
              message: error.message,
              status: 'error',
            },
          });
          yield put({
            type: AddCredentialsAction.ADD_CREDENTIALS_FAILED,
            payload: error.message,
          });
        }
      } catch (e) {
        let message: string;
        if (e.response) {
          message = e.response.data.message;
        } else {
          message = e.message;
        }
        yield put({
          type: AddCredentialsAction.ADD_CREDENTIALS_FAILED,
          payload: message,
        });
        yield put({
          type: SnackBarActions.CONFIGURE_SNACKBAR,
          payload: {
            show: true,
            message: message || e.message,
            status: 'error',
          },
        });
      }
    }
  );
}

const validateDeleteCredentials = joi.object({
  credentialId: joi.string().required(),
  userId: joi.string().required(),
});

function* watchDeleteCredentials() {
  yield takeEvery(
    DeleteCredentialAction.DELETE_CREDENTIALS_CALLER,
    function* (action: any) {
      try {
        const { error } = validateDeleteCredentials.validate(action.payload);
        if (!error) {
          yield put({
            type: DeleteCredentialAction.DELETE_CREDENTIALS_STARTED,
          });
          yield call(deleteCredentials.bind(null, action.payload));
          yield put({
            type: DeleteCredentialAction.DELETE_CREDENTIALS_SUCCESS,
            payload: action.payload.credentialId,
          });
        } else {
          yield put({
            type: DeleteCredentialAction.DELETE_CREDENTIALS_FAILED,
            payload: error.message,
          });
        }
      } catch (e) {
        let message: string;
        if (e.response) {
          message = e.response.data.message;
        } else {
          message = e.message;
        }
        yield put({
          type: DeleteCredentialAction.DELETE_CREDENTIALS_FAILED,
          payload: message,
        });
        yield put({
          type: SnackBarActions.CONFIGURE_SNACKBAR,
          payload: {
            show: true,
            message: message || e.message,
            status: 'error',
          },
        });
      }
    }
  );
}
const sagas = { watchGetCvs, watchAddCredentials, watchDeleteCredentials };
export default sagas;
