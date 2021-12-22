import { put, takeEvery, call } from 'redux-saga/effects';
import {
  inputAction,
  loginAction,
  signUpAction,
  verifyPin,
  sendVerificationPin,
  ressetPassword,
  LogOut,
} from './auth.actions';
import axios from 'axios';
import * as joi from 'joi';

import config from '../../configs/env.config';
const configuration = config();

function* watchSetSignupFullName() {
  yield takeEvery(
    inputAction.SET_SIGNUP_FULLNAME_CALLER,
    function* (action: any) {
      yield put({
        type: inputAction.SET_SIGNUP_FULLNAME,
        payload: action.payload,
      });
    }
  );
}

function* watchSetVerifcationCode() {
  yield takeEvery(
    inputAction.SET_VERIFICATION_CODE_CALLER,
    function* (action: any) {
      yield put({
        type: inputAction.SET_VERIFICATION_CODE,
        payload: action.payload,
      });
    }
  );
}

function* watchSetSignupPassword() {
  yield takeEvery(
    inputAction.SET_SIGNUP_PASSWORD_CALLER,
    function* (action: any) {
      yield put({
        type: inputAction.SET_SIGNUP_PASSWORD,
        payload: action.payload,
      });
    }
  );
}

function* watchSetSignupPhoneNumber() {
  yield takeEvery(
    inputAction.SET_SIGNUP_PHONENUMBER_CALLER,
    function* (action: any) {
      yield put({
        type: inputAction.SET_SIGNUP_PHONENUMBER,
        payload: action.payload,
      });
    }
  );
}

function* watchSetLoginPhoneNumber() {
  yield takeEvery(
    inputAction.SET_LOGIN_PHONENUMBER_CALLER,
    function* (action: any) {
      yield put({
        type: inputAction.SET_LOGIN_PHONENUMBER,
        payload: action.payload,
      });
    }
  );
}

function* watchSetLoginPassword() {
  yield takeEvery(
    inputAction.SET_LOGIN_PASSWORD_CALLER,
    function* (action: any) {
      yield put({
        type: inputAction.SET_LOGIN_PASSWORD,
        payload: action.payload,
      });
    }
  );
}

//[ACTIONS];
const validateLogin = joi.object({
  phoneNumber: joi.string().required().length(11),
  password: joi.string().min(6),
  countryCode: joi.string().length(2),
});
// const loginUser = async (payload: any) => {
//   return axios.post(configuration.API_ENDPOINT + '/login', {
//     phoneNumber: payload.phoneNumber,
//     countryCode: 'NG',
//     password: payload.password,
//   });
// };

const loginUser = async (payload: any) => {
  return axios.post(`https://dansako-3c135.web.app/admin/login`, {
    phoneNumber: payload.phoneNumber,
    countryCode: 'NG',
    password: payload.password,
  });
};

function* watchLoginAccount() {
  yield takeEvery(loginAction.LOGIN_CALLER, function* (action: any) {
    yield put({ type: loginAction.LOGIN_STARTED });
    try {
      const { error } = validateLogin.validate(action.payload);
      if (error) {
        yield put({ type: loginAction.LOGIN_FAILED, payload: error.message });
      } else {
        const $loginUser = yield call(loginUser.bind(null, action.payload));
        yield put({
          type: loginAction.LOGIN_SUCCESS,
          payload: $loginUser.data,
        });
        console.log('Login Status', $loginUser);
      }
    } catch (e) {
      console.log(e);
      let message: string;
      if (e.response) {
        message = e.response.data.message;
      } else {
        message = e.message;
      }

      console.log('Login Error Message', message);
      yield put({ type: loginAction.LOGIN_FAILED, payload: message });
    }
  });
}

const validateSignUp = joi.object({
  phoneNumber: joi.string().required().length(11),
  password: joi.string().min(6),
  countryCode: joi.string().length(2),
  fullName: joi.string().min(4),
});
const signUpUser = async (payload: any) => {
  return axios.post(configuration.API_ENDPOINT + '/signUp', {
    phoneNumber: payload.phoneNumber,
    countryCode: 'NG',
    password: payload.password,
    fullName: payload.fullName,
  });
};

const verifyPhoneNumber = async (payload: any) => {
  return axios.post(configuration.API_ENDPOINT + '/verify/sms', {
    phoneNumber: payload.phoneNumber,
    countryCode: 'NG',
  });
};

function* watchSignUpAccount() {
  yield takeEvery(signUpAction.SIGNUP_CALLER, function* (action: any) {
    yield put({ type: signUpAction.SIGNUP_STARTED });
    try {
      const { error } = validateSignUp.validate(action.payload);
      if (error) {
        yield put({ type: signUpAction.SIGNUP_FAILED, payload: error.message });
      } else {
        const $signUpUser = yield call(
          signUpUser.bind(null as any, action.payload)
        );
        const verifyAccount = yield call(
          verifyPhoneNumber.bind(null, action.payload)
        );
        let payload = {
          token: verifyAccount.data.payload.token,
          user: $signUpUser.payload,
        };
        yield put({ type: signUpAction.SIGNUP_SUCCESS, payload: payload });
        action.navigation.push('/auth/verification');
      }
    } catch (e) {
      let message: string;
      if (e.response) {
        message = e.response.data.message;
      } else {
        message = e.message;
      }
      yield put({ type: signUpAction.SIGNUP_FAILED, payload: message });
    }
  });
}

const validateVerifyPinPayload = joi.object({
  token: joi.string().required(),
  pin: joi.string().required().length(4),
  history: joi.any().required(),
});

const validatePin = async (payload: any) => {
  return axios.post(configuration.API_ENDPOINT + '/verify/code', {
    pin: payload.pin,
    token: payload.token,
  });
};

function* watchVerifyPin() {
  yield takeEvery(verifyPin.VERIFYING_PIN_CALLER, function* (action: any) {
    yield put({ type: verifyPin.VERIFYING_PIN_STARTED });
    try {
      const { error } = validateVerifyPinPayload.validate(action.payload);
      if (error) {
        yield put({
          type: verifyPin.VERIFYING_PIN_FAILED,
          payload: error.message,
        });
      } else {
        const $validatePin = yield call(validatePin.bind(null, action.payload));
        yield put({
          type: verifyPin.VERIFYING_PIN_SUCCESS,
          payload: $validatePin.data.payload,
          isResset: action.isResset,
        });
        if (action.isResset) {
          //navigate to resset page
          action.payload.history.push('/auth/resset-password');
        } else {
          action.payload.history.push('/');
        }
      }
    } catch (e) {
      let message: string;
      if (e.response) {
        message = e.response.data.message;
      } else {
        message = e.message;
      }
      yield put({ type: verifyPin.VERIFYING_PIN_FAILED, payload: message });
    }
  });
}

const validateSendVerificationPayload = joi.object({
  phoneNumber: joi.string().length(11).required(),
  countryCode: joi.string().length(2).required(),
});

function* watchSendVerificationPin() {
  yield takeEvery(
    sendVerificationPin.SEND_VERIFICATION_PIN_CALLER,
    function* (action: any) {
      yield put({ type: sendVerificationPin.SEND_VERIFICATION_PIN_STARTED });
      try {
        const { error } = validateSendVerificationPayload.validate(
          action.payload
        );
        if (error) {
          yield put({
            type: sendVerificationPin.SEND_VERIFICATION_PIN_FAILED,
            payload: error.message,
          });
        } else {
          const verifyAccount = yield call(
            verifyPhoneNumber.bind(null, action.payload)
          );

          yield put({
            type: sendVerificationPin.SEND_VERIFICATION_PIN_SUCCESS,
            payload: verifyAccount.data.payload.token,
          });

          if (action.history) {
            action.history.push({
              pathname: '/auth/verification',
              isResset: true,
            });
          }
        }
      } catch (e) {
        let message: string;
        if (e.response) {
          message = e.response.data.message;
        } else {
          message = e.message;
        }
        yield put({
          type: sendVerificationPin.SEND_VERIFICATION_PIN_FAILED,
          payload: message,
        });
      }
    }
  );
}

const ressetPasswordRequest = async (payload: any) => {
  return axios.post(configuration.API_ENDPOINT + '/reset-password', {
    password: payload.password,
    accessToken: payload.accessToken,
  });
};

const validateRessetPasswordPayload = joi.object({
  password: joi.string().min(6).required(),
  accessToken: joi.string().required(),
});

function* watchRessetPassword() {
  yield takeEvery(
    ressetPassword.RESSET_PASSWORD_CALLER,
    function* (action: any) {
      yield put({ type: ressetPassword.RESSET_PASSWORD_STARTED });
      try {
        const { error } = validateRessetPasswordPayload.validate(
          action.payload
        );
        if (error) {
          yield put({
            type: ressetPassword.RESSET_PASSWORD_FAILED,
            payload: error.message,
          });
        } else {
          if (action.payload.password !== action.confirmPassword) {
            yield put({
              type: ressetPassword.RESSET_PASSWORD_FAILED,
              payload: 'Password do not match!',
            });
          } else {
            const $ressetPassword = yield call(
              ressetPasswordRequest.bind(null, action.payload)
            );
            yield put({
              type: ressetPassword.RESSET_PASSWORD_SUCCESS,
              payload: $ressetPassword.data.payload,
            });
          }
        }
      } catch (e) {
        let message: string;
        if (e.response) {
          message = e.response.data.message;
        } else {
          message = e.message;
        }
        yield put({
          type: ressetPassword.RESSET_PASSWORD_FAILED,
          payload: message,
        });
      }
    }
  );
}

function* watchLogOut() {
  yield takeEvery(LogOut.LOGOUT_CALLER, function* () {
    yield put({ type: LogOut.LOGOUT });
  });
}

function* watchSetRessetPasswordPhoneNumber() {
  yield takeEvery(
    inputAction.SET_VERIFY_RESSET_PASSWORD_PHONE_NUMBER_CALLER,
    function* (action: any) {
      yield put({
        type: inputAction.SET_VERIFY_RESSET_PASSWORD_PHONE_NUMBER,
        payload: action.payload,
      });
    }
  );
}

function* watchSetNewPassword() {
  yield takeEvery(inputAction.SET_NEW_PASSWORD_CALLER, function* (action: any) {
    yield put({
      type: inputAction.SET_NEW_PASSWORD,
      payload: action.payload,
    });
  });
}

function* watchSetConfirmNewPassword() {
  yield takeEvery(
    inputAction.SET_CONFIRM_NEW_PASSWORD_CALLER,
    function* (action: any) {
      yield put({
        type: inputAction.SET_CONFIRM_NEW_PASSWORD,
        payload: action.payload,
      });
    }
  );
}

const AuthSaga = {
  watchSetNewPassword,
  watchSetConfirmNewPassword,

  watchSetSignupFullName,
  watchSetSignupPassword,
  watchSetSignupPhoneNumber,
  watchSetVerifcationCode,

  watchSetLoginPassword,
  watchSetLoginPhoneNumber,

  watchLoginAccount,
  watchSignUpAccount,
  watchVerifyPin,
  watchSendVerificationPin,
  watchRessetPassword,
  watchSetRessetPasswordPhoneNumber,
  watchLogOut,
};

export default AuthSaga;
