import { takeEvery, takeLatest, put, call } from '@redux-saga/core/effects';
import axios from 'axios';
import {
  getEnvironmentConfigs,
  setEnvironmentConfigs,
  setEnvironmentConfigsInput,
} from './actions';
import config from '../../../configs/env.config';

const configuration = config();

const getEnvConfigs = async () => {
  return axios.get(`${configuration.API_ENDPOINT}/admin/variables`);
};

const setEnvConfigs = async (payload: any) => {
  return axios.put(`${configuration.API_ENDPOINT}/admin/variables/update`, {
    amountPerKm: payload.amountPerKm,
    radiusOfMatch: payload.radiusOfMatch,
  });
};

function* watchGetEnvConfigs() {
  yield takeEvery(
    getEnvironmentConfigs.GET_EVN_CONFIGS_CALLER,
    function* (action: any) {
      try {
        yield put({ type: getEnvironmentConfigs.GET_EVN_CONFIGS_STARTED });
        const envConfigsVariables = yield call(getEnvConfigs.bind(null));
        console.log(envConfigsVariables);
        yield put({
          type: getEnvironmentConfigs.GET_EVN_CONFIGS_SUCCESS,
          payload: envConfigsVariables.data.payload,
        });
      } catch (e) {
        yield put({
          type: getEnvironmentConfigs.GET_EVN_CONFIGS_FAILED,
          payload: e.message,
        });
        console.log(e.message);
      }
    }
  );
}

function* watchSetEnvConfigInput() {
  yield takeLatest(
    setEnvironmentConfigsInput.SET_ENV_CONFIGS_INPUT_CALLER,
    function* (action: any) {
      yield put({
        type: setEnvironmentConfigsInput.SET_ENV_CONFIGS_INPUT,
        payload: action.payload,
      });
    }
  );
}

function* watchSetEnvConfig() {
  yield takeLatest(
    setEnvironmentConfigs.SET_ENV_CONFIGS_CALLER,
    function* (action: any) {
      try {
        yield put({ type: setEnvironmentConfigs.SET_ENV_CONFIGS_STARTED });
        const envConfigsVariables = yield call(
          setEnvConfigs.bind(null, action.payload)
        );
        yield put({
          type: setEnvironmentConfigs.SET_ENV_CONFIGS_SUCCESS,
          payload: envConfigsVariables.data.payload,
        });
      } catch (e) {
        yield put({
          type: setEnvironmentConfigs.SET_ENV_CONFIGS_FAILED,
          payload: e.message,
        });
      }
    }
  );
}

const allEnvs = {
  watchGetEnvConfigs,
  watchSetEnvConfig,
  watchSetEnvConfigInput,
};

export default allEnvs;
