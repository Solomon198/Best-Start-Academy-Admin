import { takeEvery, put, call } from "redux-saga/effects";
import { DashboardAnalytic, GetTripsByStatus } from "./actions";
import axios from "axios";
import config from "../../../configs/env.config";
import { SnackBarActions } from "../../../utilities/utils.actions";

const configuration = config();

const getAnalytics = () => {
  return axios.get(`${configuration.API_ENDPOINT}/admin/dashboard-analytics`);
};

const getAllTripsInformation = (status: any) => {
  return axios.get(
    `${configuration.API_ENDPOINT}/admin/all-deliveries?status=${status}`
  );
};

function* watchGetDashboardAnalytics() {
  yield takeEvery(
    DashboardAnalytic.GET_DASHBOARD_ANALYTIC_CALLER,
    function* (action: any) {
      try {
        yield put({ type: DashboardAnalytic.GET_DASHBOARD_ANALYTIC_STARTED });
        const analyticalData = yield call(getAnalytics.bind(null));
        yield put({
          type: DashboardAnalytic.GET_DASHBOARD_ANALYTIC_SUCCESS,
          payload: analyticalData.data.payload,
        });
      } catch (e) {
        yield put({
          type: DashboardAnalytic.GET_DASHBOARD_ANALYTIC_FAILED,
          payload: e.message,
        });
        yield put({
          type: SnackBarActions.CONFIGURE_SNACKBAR,
          payload: {
            status: "error",
            message: e.message,
            show: true,
          },
        });
      }
    }
  );
}

function* watchGetTripsByStatus() {
  yield takeEvery(
    GetTripsByStatus.GET_TRIPS_BY_STATUS_CALLER,
    function* (action: any) {
      try {
        yield put({
          type: GetTripsByStatus.GET_TRIPS_BY_STATUS_STARTED,
          payload: action.payload,
        });
        const tripsInformation = yield call(
          getAllTripsInformation.bind(null, action.payload)
        );
        yield put({
          type: GetTripsByStatus.GET_TRIPS_BY_STATUS_SUCCESS,
          payload: tripsInformation.data.payload,
        });
      } catch (e) {
        yield put({
          type: GetTripsByStatus.GET_TRIPS_BY_STATUS_FAILED,
          payload: e.message,
        });
        yield put({
          type: SnackBarActions.CONFIGURE_SNACKBAR,
          payload: {
            status: "error",
            message: e.message,
            show: true,
          },
        });
      }
    }
  );
}

const allDashboardSaga = {
  watchGetDashboardAnalytics,
  watchGetTripsByStatus,
};

export default allDashboardSaga;
