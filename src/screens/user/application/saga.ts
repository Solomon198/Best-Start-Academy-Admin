import { takeEvery, takeLeading, put, call } from 'redux-saga/effects';
import {
  AcceptedApplicationActions,
  Application,
  DeclinedApplicationActions,
  ValueSetters,
} from './actions';
import axios from 'axios';
import config from '../../../configs/env.config';

const configuration = config();

const getApplications = async () => {
  return axios.get(`${configuration.API_ENDPOINT}/admin/application?page=1`);
};

const getAcceptedApplication = async (payload: any) => {
  console.log('Saga payload', payload);
  return axios.put(`${configuration.API_ENDPOINT}/admin/application/accept`, {
    userId: payload,
  });
};

function* watchGetApplications() {
  yield takeEvery(Application.GET_APPLICATION_CALLER, function* (action: any) {
    try {
      yield put({ type: Application.GET_APPLICATION_STARTER });
      const applicationData = yield call(getApplications.bind(null));
      yield put({
        type: Application.GET_APPLICATION_SUCCESS,
        payload: applicationData.data.payload,
      });
    } catch (e) {
      yield put({
        type: Application.GET_APPLICATION_FAILURE,
        payload: e.message,
      });
    }
  });
}

function* watchSetApplicationToView() {
  yield takeLeading(
    ValueSetters.SET_APPLICATION_TO_VIEW_CALLER,
    function* (action: any) {
      yield put({
        type: ValueSetters.SET_APPLICATION_TO_VIEW,
        payload: action.payload,
      });
    }
  );
}

function* watchGetAcceptedApplication() {
  yield takeEvery(
    AcceptedApplicationActions.APPLICATION_ACCEPTED_CALLER,
    function* (action: any) {
      try {
        yield put({
          type: AcceptedApplicationActions.APPLICATION_ACCEPTED_STARTED,
        });
        yield call(getAcceptedApplication.bind(null, action.payload));
        console.log(action.payload);
        yield put({
          type: AcceptedApplicationActions.APPLICATION_ACCEPTED_SUCCESS,
          payload: action.payload,
        });
      } catch (e) {
        yield put({
          type: AcceptedApplicationActions.APPLICATION_ACCEPTED_FAILED,
          payload: e.message,
        });
        console.log(e.message);
      }
    }
  );
}

const getDeclinedApplication = async (payload: any) => {
  return axios.put(`${configuration.API_ENDPOINT}/admin/application/decline`, {
    userId: payload.userId,
    reason: payload.reason,
  });
};

function* watchGetDeclinedApplication() {
  yield takeEvery(
    DeclinedApplicationActions.APPLICATION_DECLINED_CALLER,
    function* (action: any) {
      try {
        yield put({
          type: DeclinedApplicationActions.APPLICATION_DECLINED_STARTED,
        });
        yield call(getDeclinedApplication.bind(null, action.payload));
        yield put({
          type: DeclinedApplicationActions.APPLICATION_DECLINED_SUCCESS,
          payload: action.payload,
        });
      } catch (e) {
        yield put({
          type: DeclinedApplicationActions.APPLICATION_DECLINED_FAILED,
          payload: e.message,
        });
      }
    }
  );
}

const allApplicationSaga = {
  watchGetApplications,
  watchSetApplicationToView,
  watchGetAcceptedApplication,
  watchGetDeclinedApplication,
};

export default allApplicationSaga;
