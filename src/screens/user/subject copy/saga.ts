import { takeEvery, put, call, takeLeading } from "redux-saga/effects";
import {
  Driver,
  ValueSetters,
  SearchForDriver,
  GetDriverAnalytics,
  GetTripInformation,
  EnableDriverAccount,
  DisableDriverAccount,
  UpdateDriverAccount,
  AddDriverAccount,
  AddSubject,
  Subject,
  DeleteSubject,
} from "./actions";
import axios from "axios";
import config from "../../../configs/env.config";
import { SnackBarActions } from "../../../utilities/utils.actions";
import firebase from "firebase";

const configuration = config();

const getDrivers = async () => {
  return axios.get(`${configuration.API_ENDPOINT}/subjects`);
};

const driverAnalytics = async (userId) => {
  return axios.get(
    `${configuration.API_ENDPOINT}/admin/analytics/driver/${userId}`
  );
};

const enableDriverAccount = async (userId) => {
  return axios.put(
    `${configuration.API_ENDPOINT}/admin/enable/driver/${userId}`
  );
};

const disableDriverAccount = async (userId) => {
  return axios.put(
    `${configuration.API_ENDPOINT}/admin/disable/driver/${userId}`
  );
};

const createDriverAccount = async (payload) => {
  return axios.post(`${configuration.API_ENDPOINT}/subjects`, payload);
};

const deleteSubject = async (payload) => {
  return axios.delete(`${configuration.API_ENDPOINT}/subjects`, {
    data: { id: payload },
  });
};

const getSearchForDrivers = async (text) => {
  return axios.get(
    `${configuration.API_ENDPOINT}/admin/drivers/search?searchQuery=${text}`
  );
};

const getTripInformation = async (payload) => {
  console.log(payload);
  return axios.get(
    `${configuration.API_ENDPOINT}/admin/deliveries?userId=${payload.userId}&isDriver=${payload.isDriver}&status=${payload.status}`
  );
};

const updateDriver = async (updates: any) => {
  return axios.put(
    `${configuration.API_ENDPOINT}/admin/update-driver`,
    updates
  );
};

const uploadPhoto = async (payload) => {
  return firebase
    .storage()
    .ref("/profile/driverLicense")
    .child("Img" + payload.userId)
    .put(payload.driverLicense);
};

const uploadLicensePhoto = async (payload) => {
  return firebase
    .storage()
    .ref("/images/driverLicense")
    .child("Img" + payload.userId)
    .put(payload.driverLicensePhoto);
};

const getDownloadURL = async (ref) => {
  return ref.getDownloadURL();
};

const uploadSignupPhoto = async (payload) => {
  return firebase
    .storage()
    .ref("/profile/medias/user")
    .child("Img" + payload.phoneNumber)
    .put(payload.photo);
};

function* watchDeleteSubject() {
  yield takeEvery(DeleteSubject.DELETE_SUBJECT_CALLER, function* (action: any) {
    try {
      yield put({
        type: DeleteSubject.DELETE_SUBJECT_STARTER,
        payload: action.payload,
      });

      yield call(deleteSubject.bind(null, action.payload));
      yield put({
        type: DeleteSubject.DELETE_SUBJECT_SUCCESS,
        payload: action.payload,
      });
      yield put({
        type: SnackBarActions.CONFIGURE_SNACKBAR,
        payload: {
          status: "success",
          message: "Subject Deleted successfully!! ",
          show: true,
        },
      });
    } catch (e) {
      let message: string;
      if (e.response) {
        message = e.response.data.message;
      } else {
        message = e.message;
      }
      yield put({
        type: DeleteSubject.DELETE_SUBJECT_FAILED,
        paylaod: message,
      });
      yield put({
        type: SnackBarActions.CONFIGURE_SNACKBAR,
        payload: {
          status: "error",
          message: message,
          show: true,
        },
      });
    }
  });
}

function* watchAddDriverAccount() {
  yield takeEvery(
    AddSubject.ADD_SUBJECTS_MANAGER_CALLER,
    function* (action: any) {
      try {
        yield put({
          type: AddSubject.ADD_SUBJECTS_MANAGER_STARTED,
        });

        const $addDriver = yield call(
          createDriverAccount.bind(null, action.payload)
        );
        yield put({
          type: AddSubject.ADD_SUBJECTS_MANAGER_SUCCESS,
          payload: $addDriver.data.payload,
        });
        yield put({
          type: SnackBarActions.CONFIGURE_SNACKBAR,
          payload: {
            status: "success",
            message: "Subject added successfully!! ",
            show: true,
          },
        });
      } catch (e) {
        let message: string;
        if (e.response) {
          message = e.response.data.message;
        } else {
          message = e.message;
        }
        yield put({
          type: AddSubject.ADD_SUBJECTS_MANAGER_FAILED,
          paylaod: message,
        });
        yield put({
          type: SnackBarActions.CONFIGURE_SNACKBAR,
          payload: {
            status: "error",
            message: message,
            show: true,
          },
        });
      }
    }
  );
}

function* watchUpdateDriverAccount() {
  yield takeEvery(
    UpdateDriverAccount.UPDATE_DRIVER_ACCOUNT_MANAGER_CALLER,
    function* (action: any) {
      try {
        yield put({
          type: UpdateDriverAccount.UPDATE_DRIVER_ACCOUNT_MANAGER_STARTED,
        });

        const checkPhoto =
          typeof action.payload.photo !== "string" && action.payload.photo
            ? true
            : false;

        const checkDriverLicense =
          typeof action.payload.driverLicensePhoto !== "string" &&
          action.payload.driverLicensePhoto
            ? true
            : false;

        if (checkPhoto) {
          const picture = yield call(uploadPhoto.bind(null, action.payload));
          const photoUrl = yield call(getDownloadURL.bind(null, picture.ref));
          action.payload.photo = photoUrl;
        }

        if (checkDriverLicense) {
          const picture = yield call(
            uploadLicensePhoto.bind(null, action.payload)
          );
          const photoUrl = yield call(getDownloadURL.bind(null, picture.ref));
          action.payload.driverLicensePhoto = photoUrl;
        }

        const updateDriverProfile = yield call(
          updateDriver.bind(null, action.payload)
        );
        yield put({
          type: UpdateDriverAccount.UPDATE_DRIVER_ACCOUNT_MANAGER_SUCCESS,
          payload: updateDriverProfile.data.payload,
        });
        yield put({
          type: SnackBarActions.CONFIGURE_SNACKBAR,
          payload: {
            status: "success",
            message: "Account updated successfully!! ",
            show: true,
          },
        });
      } catch (e) {
        let message: string;
        if (e.response) {
          message = e.response.data.message;
        } else {
          message = e.message;
        }
        yield put({
          type: UpdateDriverAccount.UPDATE_DRIVER_ACCOUNT_MANAGER_FAILED,
          paylaod: message,
        });
        yield put({
          type: SnackBarActions.CONFIGURE_SNACKBAR,
          payload: {
            status: "error",
            message: message,
            show: true,
          },
        });
      }
    }
  );
}

function* watchEnableDriverAccount() {
  yield takeEvery(
    EnableDriverAccount.ENABLE_DRIVER_ACCOUNT_CALLER,
    function* (action: any) {
      try {
        yield put({ type: EnableDriverAccount.ENABLE_DRIVER_ACCOUNT_STARTED });
        yield call(enableDriverAccount.bind(null, action.payload));
        yield put({
          type: EnableDriverAccount.ENABLE_DRIVER_ACCOUNT_SUCCESS,
          payload: action.payload,
        });
        yield put({
          type: SnackBarActions.CONFIGURE_SNACKBAR,
          payload: {
            status: "success",
            message: "Account Enabled successfully",
            show: true,
          },
        });
      } catch (e) {
        yield put({
          type: EnableDriverAccount.ENABLE_DRIVER_ACCOUNT_FAILED,
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

function* watchDisableDriverAccount() {
  yield takeEvery(
    DisableDriverAccount.DISABLE_DRIVER_ACCOUNT_CALLER,
    function* (action: any) {
      try {
        yield put({
          type: DisableDriverAccount.DISABLE_DRIVER_ACCOUNT_STARTED,
        });
        yield call(disableDriverAccount.bind(null, action.payload));
        yield put({
          type: DisableDriverAccount.DISABLE_DRIVER_ACCOUNT_SUCCESS,
          payload: action.payload,
        });
        yield put({
          type: SnackBarActions.CONFIGURE_SNACKBAR,
          payload: {
            status: "success",
            message: "Account Disabled successfully",
            show: true,
          },
        });
      } catch (e) {
        yield put({
          type: DisableDriverAccount.DISABLE_DRIVER_ACCOUNT_FAILED,
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

function* watchGetTripInformation() {
  yield takeEvery(
    GetTripInformation.GET_TRIP_INFORMATION_CALLER,
    function* (action: any) {
      try {
        yield put({ type: GetTripInformation.GET_TRIP_INFORMATION_STARTED });
        const getTrip = yield call(
          getTripInformation.bind(null, action.payload)
        );
        yield put({
          type: GetTripInformation.GET_TRIP_INFORMATION_SUCCESS,
          payload: getTrip.data.payload,
        });
      } catch (e) {
        yield put({
          type: GetTripInformation.GET_TRIP_INFORMATION_FAILED,
          payload: e.message,
        });
      }
    }
  );
}

function* watchGetDriversAnalytics() {
  yield takeEvery(
    GetDriverAnalytics.GET__DRIVER_ANALYTICS_CALLER,
    function* (action: any) {
      try {
        yield put({ type: GetDriverAnalytics.GET__DRIVER_ANALYTICS_STARTED });
        const driversAnalytics = yield call(
          driverAnalytics.bind(null, action.payload)
        );
        yield put({
          type: GetDriverAnalytics.GET__DRIVER_ANALYTICS_SUCCESS,
          payload: driversAnalytics.data.payload,
        });
      } catch (e) {
        yield put({
          type: GetDriverAnalytics.GET__DRIVER_ANALYTICS_FAILED,
          payload: e.message,
        });
      }
    }
  );
}

function* watchGetDrivers() {
  yield takeEvery(Subject.GET_SUBJECT_CALLER, function* (action: any) {
    try {
      yield put({ type: Subject.GET_SUBJECT_STARTER });
      const driverData = yield call(getDrivers.bind(null));
      yield put({
        type: Subject.GET_SUBJECT_SUCCESS,
        payload: driverData.data.payload,
      });
      console.log(driverData.data);
    } catch (e) {
      yield put({ type: Subject.GET_SUBJECT_FAILED, payload: e.message });
    }
  });
}

function* watchSetDriverToView() {
  yield takeLeading(
    ValueSetters.SET_DRIVER_TO_VIEW_CALLER,
    function* (action: any) {
      yield put({
        type: ValueSetters.SET_DRIVER_TO_VIEW,
        payload: action.payload,
      });
    }
  );
}

function* watchSearchDriver() {
  yield takeEvery(
    SearchForDriver.GET_SEARCH_FOR_DRIVER_CALLER,
    function* (action: any) {
      try {
        yield put({ type: SearchForDriver.GET_SEARCH_FOR_DRIVER_STARTER });
        const driverData = yield call(
          getSearchForDrivers.bind(null, action.payload)
        );
        yield put({
          type: SearchForDriver.GET_SEARCH_FOR_DRIVER_SUCCESS,
          payload: driverData.data.payload,
        });
      } catch (e) {
        put({
          type: SearchForDriver.GET_SEARCH_FOR_DRIVER_FAILED,
          payload: e.message,
        });
      }
    }
  );
}

const allDriverSaga = {
  watchGetDrivers,
  watchSetDriverToView,
  watchSearchDriver,
  watchGetDriversAnalytics,
  watchGetTripInformation,
  watchEnableDriverAccount,
  watchDisableDriverAccount,
  watchUpdateDriverAccount,
  watchAddDriverAccount,
  watchDeleteSubject,
};

export default allDriverSaga;
