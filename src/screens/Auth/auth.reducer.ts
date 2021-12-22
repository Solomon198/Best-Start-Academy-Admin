import {
  inputAction,
  loginAction,
  signUpAction,
  verifyPin,
  sendVerificationPin,
  ressetPassword,
  LogOut,
} from "./auth.actions";

const intialState = {
  fullName: "",
  phoneNumber: "",
  password: "",

  lPhoneNumber: "",
  lPassword: "",

  ressetPasswordPhoneNumber: "",

  errorLogin: "",
  errorSignUp: "",
  errorVerification: "",
  errorVerifyPin: "",
  errorRessetPassword: "",

  user: {},
  loginStatus: loginAction.LOGIN_DEFAULT,
  signUpStatus: signUpAction.SIGNUP_DEFAULT,
  ressetPasswordStatus: ressetPassword.RESSET_PASSWORD_DEFAULT,
  verifyPinStatus: verifyPin.VERIFYING_PIN_DEFAULT,
  sendVerificationPin: sendVerificationPin.SEND_VERIFICATION_PIN_DEFAULT,
  accessToken: "",
  refreshToken: "",
  token: "",
  ressetToken: "",

  vCode: "",

  ressetPassword: "",
  confirmRessetPassword: "",
};

function AuthReducer(state = intialState, action: any) {
  switch (action.type) {
    case LogOut.LOGOUT: {
      state = {
        fullName: "",
        phoneNumber: "",
        password: "",

        lPhoneNumber: "",
        lPassword: "",

        ressetPasswordPhoneNumber: "",

        errorLogin: "",
        errorSignUp: "",
        errorVerification: "",
        errorVerifyPin: "",
        errorRessetPassword: "",

        user: {},
        loginStatus: loginAction.LOGIN_DEFAULT,
        signUpStatus: signUpAction.SIGNUP_DEFAULT,
        ressetPasswordStatus: ressetPassword.RESSET_PASSWORD_DEFAULT,
        verifyPinStatus: verifyPin.VERIFYING_PIN_DEFAULT,
        sendVerificationPin: sendVerificationPin.SEND_VERIFICATION_PIN_DEFAULT,
        accessToken: "",
        refreshToken: "",
        token: "",
        ressetToken: "",
        vCode: "",
        ressetPassword: "",
        confirmRessetPassword: "",
      };
      return state;
    }

    case inputAction.SET_NEW_PASSWORD: {
      state = { ...state, ressetPassword: action.payload };
      return state;
    }

    case inputAction.SET_CONFIRM_NEW_PASSWORD: {
      state = { ...state, confirmRessetPassword: action.payload };
      return state;
    }

    case inputAction.SET_VERIFY_RESSET_PASSWORD_PHONE_NUMBER: {
      state = { ...state, ressetPasswordPhoneNumber: action.payload };
      return state;
    }
    case inputAction.SET_VERIFICATION_CODE: {
      state = { ...state, vCode: action.payload };
      return state;
    }

    case ressetPassword.RESSET_PASSWORD_STARTED: {
      state = {
        ...state,
        ressetPasswordStatus: ressetPassword.RESSET_PASSWORD_STARTED,
        errorRessetPassword: "",
      };
      return state;
    }

    case ressetPassword.RESSET_PASSWORD_FAILED: {
      state = {
        ...state,
        ressetPasswordStatus: ressetPassword.RESSET_PASSWORD_FAILED,
        errorRessetPassword: action.payload,
      };
      return state;
    }

    case ressetPassword.RESSET_PASSWORD_SUCCESS: {
      state = {
        ...state,
        ressetPasswordStatus: ressetPassword.RESSET_PASSWORD_SUCCESS,
        errorRessetPassword: "",
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
      return state;
    }

    case sendVerificationPin.SEND_VERIFICATION_PIN_STARTED: {
      state = {
        ...state,
        sendVerificationPin: sendVerificationPin.SEND_VERIFICATION_PIN_STARTED,
        errorVerification: "",
      };
      return state;
    }

    case sendVerificationPin.SEND_VERIFICATION_PIN_FAILED: {
      state = {
        ...state,
        errorVerification: action.payload,
        sendVerificationPin: sendVerificationPin.SEND_VERIFICATION_PIN_FAILED,
      };
      return state;
    }

    case sendVerificationPin.SEND_VERIFICATION_PIN_SUCCESS: {
      state = {
        ...state,
        errorVerification: "",
        token: action.payload,
        sendVerificationPin: sendVerificationPin.SEND_VERIFICATION_PIN_SUCCESS,
      };
      return state;
    }

    case verifyPin.VERIFYING_PIN_STARTED: {
      state = {
        ...state,
        verifyPinStatus: verifyPin.VERIFYING_PIN_STARTED,
        errorVerifyPin: "",
      };
      return state;
    }

    case verifyPin.VERIFYING_PIN_FAILED: {
      state = {
        ...state,
        verifyPinStatus: verifyPin.VERIFYING_PIN_FAILED,
        errorVerifyPin: action.payload,
      };
      return state;
    }

    case verifyPin.VERIFYING_PIN_SUCCESS: {
      state = {
        ...state,
        verifyPinStatus: verifyPin.VERIFYING_PIN_SUCCESS,
        errorVerifyPin: "",
        user: action.payload.user,
        refreshToken: action.payload.refreshToken,
      };
      if (action.isResset) {
        state.ressetToken = action.payload.accessToken;
      } else {
        state.accessToken = action.payload.accessToken;
      }
      return state;
    }

    case signUpAction.SIGNUP_STARTED: {
      state = {
        ...state,
        signUpStatus: signUpAction.SIGNUP_STARTED,
        errorSignUp: "",
      };
      return state;
    }

    case signUpAction.SIGNUP_FAILED: {
      state = {
        ...state,
        signUpStatus: signUpAction.SIGNUP_FAILED,
        errorSignUp: action.payload,
      };
      return state;
    }
    case signUpAction.SIGNUP_SUCCESS: {
      state = {
        ...state,
        signUpStatus: signUpAction.SIGNUP_SUCCESS,
        errorSignUp: "",
        user: action.payload.user,
        token: action.payload.token,
      };
      return state;
    }

    case loginAction.LOGIN_STARTED: {
      state = {
        ...state,
        loginStatus: loginAction.LOGIN_STARTED,
        errorLogin: "",
      };
      return state;
    }

    case loginAction.LOGIN_FAILED: {
      state = {
        ...state,
        loginStatus: loginAction.LOGIN_FAILED,
        errorLogin: action.payload,
      };
      return state;
    }

    case loginAction.LOGIN_SUCCESS: {
      state = {
        ...state,
        loginStatus: loginAction.LOGIN_SUCCESS,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        user: action.payload.payload,
      };
      return state;
    }

    case inputAction.SET_LOGIN_PHONENUMBER: {
      state = { ...state, lPhoneNumber: action.payload };
      return state;
    }
    case inputAction.SET_LOGIN_PASSWORD: {
      state = { ...state, lPassword: action.payload };
      return state;
    }
    case inputAction.SET_SIGNUP_FULLNAME: {
      state = { ...state, fullName: action.payload };
      return state;
    }

    case inputAction.SET_SIGNUP_PASSWORD: {
      state = { ...state, password: action.payload };
      return state;
    }

    case inputAction.SET_SIGNUP_PHONENUMBER: {
      state = { ...state, phoneNumber: action.payload };
      return state;
    }
  }

  return state;
}

export default AuthReducer;
