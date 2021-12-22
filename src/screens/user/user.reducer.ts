import { LogOut } from '../Auth/auth.actions';
import {
  GetCvActions,
  DeleteCredentialAction,
  AddCredentialsAction,
} from './user.actions';
const intialState = {
  cv: {},
  getCvStatus: GetCvActions.GET_CV_DEFAULT,
  addCredentialStatus: AddCredentialsAction.ADD_CREDENTIALS_DEFAULT,
  deleteCredentialStatus: DeleteCredentialAction.DELETE_CREDENTIALS_DEFAULT,
};

function UserReducer(state = intialState, action: any) {
  switch (action.type) {
    case AddCredentialsAction.ADD_CREDENTIALS_STARTED: {
      state = {
        ...state,
        addCredentialStatus: AddCredentialsAction.ADD_CREDENTIALS_STARTED,
      };
      return state;
    }

    case AddCredentialsAction.ADD_CREDENTIALS_FAILED: {
      state = {
        ...state,
        addCredentialStatus: AddCredentialsAction.ADD_CREDENTIALS_FAILED,
      };
      return state;
    }

    case AddCredentialsAction.ADD_CREDENTIALS_SUCCESS: {
      const cv: any = Object.assign({}, state.cv);
      const credentials: any[] = (cv.credentials as any[]) || [];
      credentials.push(action.payload);
      cv.credentials = credentials;
      state = {
        ...state,
        addCredentialStatus: AddCredentialsAction.ADD_CREDENTIALS_SUCCESS,
        cv: cv,
      };
      return state;
    }

    case DeleteCredentialAction.DELETE_CREDENTIALS_STARTED: {
      state = {
        ...state,
        deleteCredentialStatus:
          DeleteCredentialAction.DELETE_CREDENTIALS_STARTED,
      };
      return state;
    }

    case DeleteCredentialAction.DELETE_CREDENTIALS_FAILED: {
      state = {
        ...state,
        deleteCredentialStatus:
          DeleteCredentialAction.DELETE_CREDENTIALS_FAILED,
      };
      return state;
    }

    case DeleteCredentialAction.DELETE_CREDENTIALS_SUCCESS: {
      const cv: any = Object.assign({}, state.cv);
      const credentials = cv.credentials as any[];
      credentials.forEach((val, index) => {
        if (val.id === action.payload) {
          credentials.splice(index, 1);
        }
      });
      cv.credentials = credentials;
      state = {
        ...state,
        cv: cv,
        deleteCredentialStatus:
          DeleteCredentialAction.DELETE_CREDENTIALS_SUCCESS,
      };
      return state;
    }

    case GetCvActions.GET_CV_STARTED: {
      state = { ...state, getCvStatus: GetCvActions.GET_CV_STARTED };
      return state;
    }

    case GetCvActions.GET_CV_FAILED: {
      state = { ...state, getCvStatus: GetCvActions.GET_CV_FAILED };
      return state;
    }

    case GetCvActions.GET_CV_SUCCESS: {
      state = {
        ...state,
        getCvStatus: GetCvActions.GET_CV_SUCCESS,
        cv: action.payload,
      };
      return state;
    }

    case LogOut.LOGOUT: {
      state = {
        cv: {},
        getCvStatus: GetCvActions.GET_CV_DEFAULT,
        addCredentialStatus: AddCredentialsAction.ADD_CREDENTIALS_DEFAULT,
        deleteCredentialStatus:
          DeleteCredentialAction.DELETE_CREDENTIALS_DEFAULT,
      };
      return state;
    }

    default:
      return state;
  }
}

export default UserReducer;
