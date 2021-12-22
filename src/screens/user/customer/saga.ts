import { takeEvery, put, call } from "redux-saga/effects";
import {
  Customer,
  ValueSetters,
  CustomerSearchData,
  GetCustomerAnalytics,
  EnableCustomerAccount,
  DisableCustomerAccount,
  AddAdminAccount,
  RemoveAdminAccount,
  UpdateCustomerAccount,
  AddCustomerAccount,
} from "./actions";
import axios from "axios";
import { SnackBarActions } from "../../../utilities/utils.actions";
import config from "../../../configs/env.config";
import firebase from "firebase";

const configuration = config();

const enableCustomerAccount = async (userId) => {
  return axios.put(`${configuration.API_ENDPOINT}/admin/enable/user/${userId}`);
};

const disableCustomerAccount = async (userId) => {
  return axios.put(
    `${configuration.API_ENDPOINT}/admin/disable/user/${userId}`
  );
};

const addAdminAccount = async (userId) => {
  return axios.put(`${configuration.API_ENDPOINT}/admin/add-admin/${userId}`);
};

const createUserAccount = async (payload) => {
  return axios.post(`${configuration.API_ENDPOINT}/admin/add-user`, payload);
};

const removeAdminAccount = async (userId) => {
  return axios.put(
    `${configuration.API_ENDPOINT}/admin/remove-admin/${userId}`
  );
};

const getCustomers = async () => {
  return axios.get(`${configuration.API_ENDPOINT}/admin/users?page=1`);
};

const userAnalytics = async (userId) => {
  return axios.get(
    `${configuration.API_ENDPOINT}/admin/analytics/user/${userId}`
  );
};

const uploadSignupPhoto = async (payload) => {
  return firebase
    .storage()
    .ref("/profile/medias/user")
    .child("Img" + payload.phoneNumber)
    .put(payload.photo);
};

const getCustomersSearchResult = async (text) => {
  return axios.get(
    `${configuration.API_ENDPOINT}/admin/users/search?searchQuery=${text}`
  );
};

const updateCustomer = async (updates: any) => {
  return axios.put(`${configuration.API_ENDPOINT}/admin/update-user`, updates);
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

function* watchAddUserAccount() {
  yield takeEvery(
    AddCustomerAccount.ADD_CUSTOMER_ACCOUNT_MANAGER_CALLER,
    function* (action: any) {
      try {
        yield put({
          type: AddCustomerAccount.ADD_CUSTOMER_ACCOUNT_MANAGER_STARTED,
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

        const _addCustomer = yield call(
          createUserAccount.bind(null, action.payload)
        );
        yield put({
          type: AddCustomerAccount.ADD_CUSTOMER_ACCOUNT_MANAGER_SUCCESS,
          payload: _addCustomer.data.payload,
        });
        yield put({
          type: SnackBarActions.CONFIGURE_SNACKBAR,
          payload: {
            status: "success",
            message: "Account added successfully!! ",
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
          type: AddCustomerAccount.ADD_CUSTOMER_ACCOUNT_MANAGER_FAILED,
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

function* watchUpdateCustomer() {
  yield takeEvery(
    UpdateCustomerAccount.UPDATE_CUSTOMER_ACCOUNT_MANAGER_CALLER,
    function* (action: any) {
      try {
        yield put({
          type: UpdateCustomerAccount.UPDATE_CUSTOMER_ACCOUNT_MANAGER_STARTED,
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

        const updateCustomerProfile = yield call(
          updateCustomer.bind(null, action.payload)
        );
        yield put({
          type: UpdateCustomerAccount.UPDATE_CUSTOMER_ACCOUNT_MANAGER_SUCCESS,
          payload: updateCustomerProfile.data.payload,
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
          type: UpdateCustomerAccount.UPDATE_CUSTOMER_ACCOUNT_MANAGER_FAILED,
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

function* watchAddAdmin() {
  yield takeEvery(
    AddAdminAccount.ADD_ADMIN_ACCOUNT_CALLER,
    function* (action: any) {
      try {
        yield put({
          type: AddAdminAccount.ADD_ADMIN_ACCOUNT_STARTED,
        });

        yield call(addAdminAccount.bind(null, action.payload));

        yield put({
          type: AddAdminAccount.ADD_ADMIN_ACCOUNT_SUCCESS,
          payload: action.payload,
        });
        yield put({
          type: SnackBarActions.CONFIGURE_SNACKBAR,
          payload: {
            status: "success",
            message: "User Added as admin successfully",
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
          type: AddAdminAccount.ADD_ADMIN_ACCOUNT_FAILED,
          payload: message,
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

function* watchRemoveAdmin() {
  yield takeEvery(
    RemoveAdminAccount.REMOVE_ADMIN_ACCOUNT_CALLER,
    function* (action: any) {
      try {
        yield put({
          type: RemoveAdminAccount.REMOVE_ADMIN_ACCOUNT_STARTED,
        });
        yield call(removeAdminAccount.bind(null, action.payload));
        yield put({
          type: RemoveAdminAccount.REMOVE_ADMIN_ACCOUNT_SUCCESS,
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
        let message: string;
        if (e.response) {
          message = e.response.data.message;
        } else {
          message = e.message;
        }
        yield put({
          type: RemoveAdminAccount.REMOVE_ADMIN_ACCOUNT_FAILED,
          payload: message,
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

function* watchEnableCustomerAccount() {
  yield takeEvery(
    EnableCustomerAccount.ENABLE_CUSTOMER_ACCOUNT_CALLER,
    function* (action: any) {
      try {
        yield put({
          type: EnableCustomerAccount.ENABLE_CUSTOMER_ACCOUNT_STARTED,
        });
        yield call(enableCustomerAccount.bind(null, action.payload));
        yield put({
          type: EnableCustomerAccount.ENABLE_CUSTOMER_ACCOUNT_SUCCESS,
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
        let message: string;
        if (e.response) {
          message = e.response.data.message;
        } else {
          message = e.message;
        }
        yield put({
          type: EnableCustomerAccount.ENABLE_CUSTOMER_ACCOUNT_FAILED,
          payload: message,
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

function* watchDisableCustomerAccount() {
  yield takeEvery(
    DisableCustomerAccount.DISABLE_CUSTOMER_ACCOUNT_CALLER,
    function* (action: any) {
      try {
        yield put({
          type: DisableCustomerAccount.DISABLE_CUSTOMER_ACCOUNT_STARTED,
        });
        yield call(disableCustomerAccount.bind(null, action.payload));
        yield put({
          type: DisableCustomerAccount.DISABLE_CUSTOMER_ACCOUNT_SUCCESS,
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
        let message: string;
        if (e.response) {
          message = e.response.data.message;
        } else {
          message = e.message;
        }
        yield put({
          type: DisableCustomerAccount.DISABLE_CUSTOMER_ACCOUNT_FAILED,
          payload: message,
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

function* watchGetCustomerAnalytics() {
  yield takeEvery(
    GetCustomerAnalytics.GET_CUSTOMER_ANALYTICS_CALLER,
    function* (action: any) {
      try {
        yield put({
          type: GetCustomerAnalytics.GET_CUSTOMER_ANALYTICS_STARTED,
        });
        const driversAnalytics = yield call(
          userAnalytics.bind(null, action.payload)
        );
        yield put({
          type: GetCustomerAnalytics.GET_CUSTOMER_ANALYTICS_SUCCESS,
          payload: driversAnalytics.data.payload,
        });
      } catch (e) {
        yield put({
          type: GetCustomerAnalytics.GET_CUSTOMER_ANALYTICS_FAILED,
          payload: e.message,
        });
      }
    }
  );
}

function* watchGetCustomers() {
  yield takeEvery(Customer.GET_CUSTOMER_CALLER, function* (action: any) {
    try {
      yield put({ type: Customer.GET_CUSTOMER_STARTER });
      const customerData = yield call(getCustomers.bind(null));
      yield put({
        type: Customer.GET_CUSTOMER_SUCCESS,
        payload: customerData.data.payload,
      });
    } catch (e) {
      yield put({ type: Customer.GET_CUSTOMER_FAILURE, paylaod: e.message });
    }
  });
}

function* watchSetCustomerToView() {
  yield takeEvery(
    ValueSetters.SET_CUSTOMER_TO_VIEW_CALLER,
    function* (action: any) {
      yield put({
        type: ValueSetters.SET_CUSTOMER_TO_VIEW,
        payload: action.payload,
      });
    }
  );
}

function* watchGetCustomersSearchResult() {
  yield takeEvery(
    CustomerSearchData.GET_CUSTOMER_SEARCH_RESULT_CALLER,
    function* (action: any) {
      try {
        yield put({
          type: CustomerSearchData.GET_CUSTOMER_SEARCH_RESULT_STARTED,
        });
        const customerData = yield call(
          getCustomersSearchResult.bind(null, action.payload)
        );
        yield put({
          type: CustomerSearchData.GET_CUSTOMER_SEARCH_RESULT_SUCCESS,
          payload: customerData.data.payload,
        });
      } catch (e) {
        yield put({
          type: CustomerSearchData.GET_CUSTOMER_SEARCH_RESULT_FAILED,
          payload: e.message,
        });
      }
    }
  );
}

const allCustomerSaga = {
  watchGetCustomers,
  watchSetCustomerToView,
  watchGetCustomersSearchResult,
  watchGetCustomerAnalytics,
  watchEnableCustomerAccount,
  watchDisableCustomerAccount,
  watchAddAdmin,
  watchRemoveAdmin,
  watchUpdateCustomer,
  watchAddUserAccount,
};

export default allCustomerSaga;
