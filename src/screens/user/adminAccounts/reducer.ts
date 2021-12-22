import {
  GetAdminAccount,
  ValueSetters,
  RemoveAdminAccount,
  UpdateAdminAccount,
  AddAdminAccount,
} from "./actions";

const initialState = {
  admins: [] as any[],
  adminsSearchResult: [] as any,
  gettingAdminsStatus: GetAdminAccount.GET_ADMINS_DEFAULT,
  gettingAdminsError: "",
  viewAdmin: null,
  removeAdminStatus: RemoveAdminAccount.REMOVE_ADMIN_ACCOUNT_MANAGER_DEFAULT,
  updateAccountStatus: UpdateAdminAccount.UPDATE__ADMIN_ACCOUNT_MANAGER_DEFAULT,
  addAdminAccountStatus: AddAdminAccount.ADD_ADMIN_ACCOUNT_MANAGER_DEFAULT,
};

export default function adminReducer(state = initialState, action: any) {
  switch (action.type) {
    case AddAdminAccount.ADD_ADMIN_ACCOUNT_MANAGER_SUCCESS: {
      const admins = Object.assign([], state.admins);
      admins.unshift(action.payload);
      state = {
        ...state,
        addAdminAccountStatus:
          AddAdminAccount.ADD_ADMIN_ACCOUNT_MANAGER_SUCCESS,
        admins,
      };
      return state;
    }

    case AddAdminAccount.ADD_ADMIN_ACCOUNT_MANAGER_FAILED: {
      state = {
        ...state,
        addAdminAccountStatus: AddAdminAccount.ADD_ADMIN_ACCOUNT_MANAGER_FAILED,
      };
      return state;
    }

    case AddAdminAccount.ADD_ADMIN_ACCOUNT_MANAGER_STARTED: {
      state = {
        ...state,
        addAdminAccountStatus:
          AddAdminAccount.ADD_ADMIN_ACCOUNT_MANAGER_STARTED,
      };
      return state;
    }

    case UpdateAdminAccount.UPDATE__ADMIN_ACCOUNT_MANAGER_STARTED: {
      state = {
        ...state,
        updateAccountStatus:
          UpdateAdminAccount.UPDATE__ADMIN_ACCOUNT_MANAGER_STARTED,
      };
      return state;
    }

    case UpdateAdminAccount.UPDATE__ADMIN_ACCOUNT_MANAGER_FAILED: {
      state = {
        ...state,
        updateAccountStatus:
          UpdateAdminAccount.UPDATE__ADMIN_ACCOUNT_MANAGER_FAILED,
      };
      return state;
    }

    case UpdateAdminAccount.UPDATE__ADMIN_ACCOUNT_MANAGER_SUCCESS: {
      const admins = state.admins.map((person) => {
        if (person.userId === action.payload.userId) {
          return action.payload;
        }
        return person;
      });
      state = {
        ...state,
        updateAccountStatus:
          UpdateAdminAccount.UPDATE__ADMIN_ACCOUNT_MANAGER_SUCCESS,
        admins,
        viewAdmin: action.payload,
      };
      return state;
    }

    case RemoveAdminAccount.REMOVE_ADMIN_ACCOUNT_MANAGER_CALLER: {
      state = {
        ...state,
        removeAdminStatus:
          RemoveAdminAccount.REMOVE_ADMIN_ACCOUNT_MANAGER_CALLER,
      };
      return state;
    }

    case RemoveAdminAccount.REMOVE_ADMIN_ACCOUNT_MANAGER_STARTED: {
      state = {
        ...state,
        removeAdminStatus:
          RemoveAdminAccount.REMOVE_ADMIN_ACCOUNT_MANAGER_STARTED,
      };
      return state;
    }

    case RemoveAdminAccount.REMOVE_ADMIN_ACCOUNT_MANAGER_SUCCESS: {
      const admins: any[] = Object.assign([], state.admins);
      admins.forEach((admin, index) => {
        if (admin.userId === action.payload) {
          admins.splice(index, 1);
        }
      });

      state = {
        ...state,
        removeAdminStatus:
          RemoveAdminAccount.REMOVE_ADMIN_ACCOUNT_MANAGER_SUCCESS,
        viewAdmin: null,
        admins,
      };
      return state;
    }

    case ValueSetters.SET_ADMIN_TO_VIEW: {
      state = { ...state, viewAdmin: action.payload };
      return state;
    }
    case GetAdminAccount.GET_ADMINS_STARTED: {
      state = {
        ...state,
        gettingAdminsStatus: GetAdminAccount.GET_ADMINS_STARTED,
        gettingAdminsError: "",
      };
      return state;
    }

    case GetAdminAccount.GET_ADMINS_FAILED: {
      state = {
        ...state,
        gettingAdminsStatus: GetAdminAccount.GET_ADMINS_FAILED,
        gettingAdminsError: action.payload,
      };
      return state;
    }

    case GetAdminAccount.GET_ADMINS_SUCCESS: {
      state = {
        ...state,
        gettingAdminsStatus: GetAdminAccount.GET_ADMINS_SUCCESS,
        admins: action.payload,
      };
      return state;
    }
  }
  return state;
}
