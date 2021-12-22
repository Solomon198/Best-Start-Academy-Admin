import { takeEvery, put, call } from "redux-saga/effects";
import {
  ValueSetters,
  GetAdminAccount,
  RemoveAdminAccount,
  UpdateAdminAccount,
  AddAdminAccount,
} from "./actions";
import axios from "axios";
import { SnackBarActions } from "../../../utilities/utils.actions";
import config from "../../../configs/env.config";
import firebase from "firebase";

const configuration = config();

const getAdmins = async () => {
  return axios.get(`${configuration.API_ENDPOINT}/admin`);
};

const removeAdminAccount = async (userId) => {
  return axios.put(
    `${configuration.API_ENDPOINT}/admin/remove-admin/${userId}`
  );
};

const updateAdmin = async (updates: any) => {
  return axios.put(`${configuration.API_ENDPOINT}/admin/update-user`, updates);
};

const signup = async (payload: any) => {
  return axios.post(
    `${configuration.API_ENDPOINT}/admin/create-admin`,
    payload
  );
};

const uploadPhoto = async (payload) => {
  return firebase
    .storage()
    .ref("/profile/medias/user")
    .child("Img" + payload.userId)
    .put(payload.photo);
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

function* watchAddAdminAccount() {
  yield takeEvery(
    AddAdminAccount.ADD_ADMIN_ACCOUNT_MANAGER_CALLER,
    function* (action: any) {
      try {
        yield put({
          type: AddAdminAccount.ADD_ADMIN_ACCOUNT_MANAGER_STARTED,
        });

        const checkPhoto =
          typeof action.payload.photo !== "string" && action.payload.photo
            ? true
            : false;

        if (checkPhoto) {
          const picture = yield call(
            uploadSignupPhoto.bind(null, action.payload)
          );
          const photoUrl = yield call(getDownloadURL.bind(null, picture.ref));
          action.payload.photo = photoUrl;
        }

        const addAdmin = yield call(signup.bind(null, action.payload));
        yield put({
          type: AddAdminAccount.ADD_ADMIN_ACCOUNT_MANAGER_SUCCESS,
          payload: addAdmin.data.payload,
        });
        yield put({
          type: SnackBarActions.CONFIGURE_SNACKBAR,
          payload: {
            status: "success",
            message: "Admin added successfully!! ",
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
          type: AddAdminAccount.ADD_ADMIN_ACCOUNT_MANAGER_FAILED,
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

function* watchUpdateAdminAccount() {
  yield takeEvery(
    UpdateAdminAccount.UPDATE__ADMIN_ACCOUNT_MANAGER_CALLER,
    function* (action: any) {
      try {
        yield put({
          type: UpdateAdminAccount.UPDATE__ADMIN_ACCOUNT_MANAGER_STARTED,
        });

        const checkPhoto =
          typeof action.payload.photo !== "string" && action.payload.photo
            ? true
            : false;

        if (checkPhoto) {
          const picture = yield call(uploadPhoto.bind(null, action.payload));
          const photoUrl = yield call(getDownloadURL.bind(null, picture.ref));
          action.payload.photo = photoUrl;
        }

        const updateAdminAccount = yield call(
          updateAdmin.bind(null, action.payload)
        );
        yield put({
          type: UpdateAdminAccount.UPDATE__ADMIN_ACCOUNT_MANAGER_SUCCESS,
          payload: updateAdminAccount.data.payload,
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
          type: UpdateAdminAccount.UPDATE__ADMIN_ACCOUNT_MANAGER_FAILED,
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

function* watchGetAdminAccount() {
  yield takeEvery(GetAdminAccount.GET_ADMINS_CALLER, function* (action: any) {
    try {
      yield put({ type: GetAdminAccount.GET_ADMINS_STARTED });
      const getAllAdminAccount = yield call(getAdmins.bind(null));
      yield put({
        type: GetAdminAccount.GET_ADMINS_SUCCESS,
        payload: getAllAdminAccount.data.payload,
      });
    } catch (e) {
      yield put({
        type: GetAdminAccount.GET_ADMINS_FAILED,
        paylaod: e.message,
      });
    }
  });
}

function* watchSetAdminToView() {
  yield takeEvery(
    ValueSetters.SET_ADMIN_TO_VIEW_CALLER,
    function* (action: any) {
      yield put({
        type: ValueSetters.SET_ADMIN_TO_VIEW,
        payload: action.payload,
      });
    }
  );
}

function* watchRemoveAdmin() {
  yield takeEvery(
    RemoveAdminAccount.REMOVE_ADMIN_ACCOUNT_MANAGER_CALLER,
    function* (action: any) {
      try {
        yield put({
          type: RemoveAdminAccount.REMOVE_ADMIN_ACCOUNT_MANAGER_STARTED,
        });
        yield call(removeAdminAccount.bind(null, action.payload));
        yield put({
          type: RemoveAdminAccount.REMOVE_ADMIN_ACCOUNT_MANAGER_SUCCESS,
          payload: action.payload,
        });
        yield put({
          type: SnackBarActions.CONFIGURE_SNACKBAR,
          payload: {
            status: "success",
            message: "Account removed as admin successfully",
            show: true,
          },
        });
      } catch (e) {
        yield put({
          type: RemoveAdminAccount.REMOVE_ADMIN_ACCOUNT_MANAGER_FAILED,
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

const adminAccountManagement = {
  watchGetAdminAccount,
  watchSetAdminToView,
  watchRemoveAdmin,
  watchUpdateAdminAccount,
  watchAddAdminAccount,
};

export default adminAccountManagement;
