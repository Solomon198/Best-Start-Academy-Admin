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

const initialState = {
  customers: [] as any[],
  customersSearchResult: [],
  viewCustomer: null,
  gettingCustomersStatus: Customer.GET_CUSTOMER_DEFAULT,
  gettingCustomersError: "",
  gettingCustomersSearchResultStatus:
    CustomerSearchData.GET_CUSTOMER_SEARCH_RESULT_DEFAULT,
  gettingCustomersSearchResultError: "",

  gettingCustomerAnalyticStatus:
    GetCustomerAnalytics.GET_CUSTOMER_ANALYTICS_DEFAULT,
  customerAnalytics: null,
  gettingCustomerAnalyticsError: "",
  enableCustomerStatus: EnableCustomerAccount.ENABLE_CUSTOMER_ACCOUNT_DEFAULT,
  disableCustomerStatus:
    DisableCustomerAccount.DISABLE_CUSTOMER_ACCOUNT_DEFAULT,
  addAdminStatus: AddAdminAccount.ADD_ADMIN_ACCOUNT_DEFAULT,
  removeAdminStatus: RemoveAdminAccount.REMOVE_ADMIN_ACCOUNT_DEFAULT,

  updateAccountStatus:
    UpdateCustomerAccount.UPDATE_CUSTOMER_ACCOUNT_MANAGER_DEFAULT,
  AddCustomerAccountStatus:
    AddCustomerAccount.ADD_CUSTOMER_ACCOUNT_MANAGER_DEFAULT,
};

export default function CustomerReducer(state = initialState, action: any) {
  switch (action.type) {
    case AddCustomerAccount.ADD_CUSTOMER_ACCOUNT_MANAGER_SUCCESS: {
      const customers = Object.assign([], state.customers);
      customers.unshift(action.payload);
      state = {
        ...state,
        AddCustomerAccountStatus:
          AddCustomerAccount.ADD_CUSTOMER_ACCOUNT_MANAGER_SUCCESS,
        customers,
      };
      return state;
    }

    case AddCustomerAccount.ADD_CUSTOMER_ACCOUNT_MANAGER_FAILED: {
      state = {
        ...state,
        AddCustomerAccountStatus:
          AddCustomerAccount.ADD_CUSTOMER_ACCOUNT_MANAGER_FAILED,
      };
      return state;
    }

    case AddCustomerAccount.ADD_CUSTOMER_ACCOUNT_MANAGER_STARTED: {
      state = {
        ...state,
        AddCustomerAccountStatus:
          AddCustomerAccount.ADD_CUSTOMER_ACCOUNT_MANAGER_STARTED,
      };
      return state;
    }

    case UpdateCustomerAccount.UPDATE_CUSTOMER_ACCOUNT_MANAGER_STARTED: {
      state = {
        ...state,
        updateAccountStatus:
          UpdateCustomerAccount.UPDATE_CUSTOMER_ACCOUNT_MANAGER_STARTED,
      };
      return state;
    }

    case UpdateCustomerAccount.UPDATE_CUSTOMER_ACCOUNT_MANAGER_FAILED: {
      state = {
        ...state,
        updateAccountStatus:
          UpdateCustomerAccount.UPDATE_CUSTOMER_ACCOUNT_MANAGER_FAILED,
      };
      return state;
    }

    case UpdateCustomerAccount.UPDATE_CUSTOMER_ACCOUNT_MANAGER_SUCCESS: {
      const customers = state.customers.map((person) => {
        if (person.userId === action.payload.userId) {
          return action.payload;
        }
        return person;
      });
      state = {
        ...state,
        updateAccountStatus:
          UpdateCustomerAccount.UPDATE_CUSTOMER_ACCOUNT_MANAGER_SUCCESS,
        customers,
        viewCustomer: action.payload,
      };
      return state;
    }

    case RemoveAdminAccount.REMOVE_ADMIN_ACCOUNT_STARTED: {
      state = {
        ...state,
        removeAdminStatus: RemoveAdminAccount.REMOVE_ADMIN_ACCOUNT_STARTED,
      };
      return state;
    }

    case RemoveAdminAccount.REMOVE_ADMIN_ACCOUNT_FAILED: {
      state = {
        ...state,
        removeAdminStatus: RemoveAdminAccount.REMOVE_ADMIN_ACCOUNT_FAILED,
      };
      return state;
    }

    case RemoveAdminAccount.REMOVE_ADMIN_ACCOUNT_SUCCESS: {
      const viewCustomer: any = Object.assign({}, state.viewCustomer);
      viewCustomer.isAdmin = false;
      const customers: any[] = state.customers.map((val: any) => {
        if (val.userId === action.payload) {
          val.isAdmin = false;
        }
        return val;
      });
      state = {
        ...state,
        removeAdminStatus: RemoveAdminAccount.REMOVE_ADMIN_ACCOUNT_SUCCESS,
        viewCustomer,
        customers,
      };
      return state;
    }

    case AddAdminAccount.ADD_ADMIN_ACCOUNT_STARTED: {
      state = {
        ...state,
        addAdminStatus: AddAdminAccount.ADD_ADMIN_ACCOUNT_STARTED,
      };
      return state;
    }

    case AddAdminAccount.ADD_ADMIN_ACCOUNT_FAILED: {
      state = {
        ...state,
        addAdminStatus: AddAdminAccount.ADD_ADMIN_ACCOUNT_FAILED,
      };
      return state;
    }

    case AddAdminAccount.ADD_ADMIN_ACCOUNT_SUCCESS: {
      const viewCustomer: any = Object.assign({}, state.viewCustomer);
      viewCustomer.isAdmin = true;
      const customers: any[] = state.customers.map((val: any) => {
        if (val.userId === action.payload) {
          val.isAdmin = true;
        }
        return val;
      });
      state = {
        ...state,
        addAdminStatus: AddAdminAccount.ADD_ADMIN_ACCOUNT_SUCCESS,
        viewCustomer,
        customers,
      };
      return state;
    }

    case DisableCustomerAccount.DISABLE_CUSTOMER_ACCOUNT_STARTED: {
      state = {
        ...state,
        disableCustomerStatus:
          DisableCustomerAccount.DISABLE_CUSTOMER_ACCOUNT_STARTED,
      };
      return state;
    }

    case DisableCustomerAccount.DISABLE_CUSTOMER_ACCOUNT_FAILED: {
      state = {
        ...state,
        disableCustomerStatus:
          DisableCustomerAccount.DISABLE_CUSTOMER_ACCOUNT_FAILED,
      };
      return state;
    }

    case DisableCustomerAccount.DISABLE_CUSTOMER_ACCOUNT_SUCCESS: {
      const viewCustomer: any = Object.assign({}, state.viewCustomer);
      viewCustomer.accountDisabled = true;
      const customers: any[] = state.customers.map((val: any) => {
        if (val.userId === action.payload) {
          val.accountDisabled = true;
        }
        return val;
      });
      state = {
        ...state,
        disableCustomerStatus:
          DisableCustomerAccount.DISABLE_CUSTOMER_ACCOUNT_SUCCESS,
        viewCustomer,
        customers,
      };
      return state;
    }

    case EnableCustomerAccount.ENABLE_CUSTOMER_ACCOUNT_STARTED: {
      state = {
        ...state,
        enableCustomerStatus:
          EnableCustomerAccount.ENABLE_CUSTOMER_ACCOUNT_STARTED,
      };
      return state;
    }

    case EnableCustomerAccount.ENABLE_CUSTOMER_ACCOUNT_FAILED: {
      state = {
        ...state,
        enableCustomerStatus:
          EnableCustomerAccount.ENABLE_CUSTOMER_ACCOUNT_FAILED,
      };
      return state;
    }

    case EnableCustomerAccount.ENABLE_CUSTOMER_ACCOUNT_SUCCESS: {
      const viewCustomer: any = Object.assign({}, state.viewCustomer);
      const customers: any[] = state.customers.map((val: any) => {
        if (val.userId === action.payload) {
          val.accountDisabled = false;
        }
        return val;
      });
      viewCustomer.accountDisabled = false;
      state = {
        ...state,
        enableCustomerStatus:
          EnableCustomerAccount.ENABLE_CUSTOMER_ACCOUNT_SUCCESS,
        viewCustomer,
        customers,
      };
      return state;
    }

    case GetCustomerAnalytics.GET_CUSTOMER_ANALYTICS_STARTED: {
      state = {
        ...state,
        gettingCustomerAnalyticStatus:
          GetCustomerAnalytics.GET_CUSTOMER_ANALYTICS_STARTED,
        gettingCustomerAnalyticsError: "",
        customerAnalytics: null,
      };
      return state;
    }

    case GetCustomerAnalytics.GET_CUSTOMER_ANALYTICS_FAILED: {
      state = {
        ...state,
        gettingCustomerAnalyticStatus:
          GetCustomerAnalytics.GET_CUSTOMER_ANALYTICS_FAILED,
        gettingCustomerAnalyticsError: action.payload,
        customerAnalytics: null,
      };
      return state;
    }
    case GetCustomerAnalytics.GET_CUSTOMER_ANALYTICS_SUCCESS: {
      state = {
        ...state,
        gettingCustomerAnalyticStatus:
          GetCustomerAnalytics.GET_CUSTOMER_ANALYTICS_SUCCESS,
        gettingCustomerAnalyticsError: "",
        customerAnalytics: action.payload,
      };
      return state;
    }

    case ValueSetters.SET_CUSTOMER_TO_VIEW: {
      state = { ...state, viewCustomer: action.payload };
      return state;
    }
    case Customer.GET_CUSTOMER_STARTER: {
      state = {
        ...state,
        gettingCustomersStatus: Customer.GET_CUSTOMER_STARTER,
        gettingCustomersError: "",
      };
      return state;
    }

    case Customer.GET_CUSTOMER_FAILURE: {
      state = {
        ...state,
        gettingCustomersStatus: Customer.GET_CUSTOMER_FAILURE,
        gettingCustomersError: action.payload,
      };
      return state;
    }

    case Customer.GET_CUSTOMER_SUCCESS: {
      state = {
        ...state,
        gettingCustomersStatus: Customer.GET_CUSTOMER_SUCCESS,
        customers: action.payload,
      };
      return state;
    }

    case CustomerSearchData.GET_CUSTOMER_SEARCH_RESULT_STARTED: {
      state = {
        ...state,
        gettingCustomersSearchResultStatus:
          CustomerSearchData.GET_CUSTOMER_SEARCH_RESULT_STARTED,
        gettingCustomersSearchResultError: "",
      };
      return state;
    }

    case CustomerSearchData.GET_CUSTOMER_SEARCH_RESULT_SUCCESS: {
      state = {
        ...state,
        gettingCustomersSearchResultStatus:
          CustomerSearchData.GET_CUSTOMER_SEARCH_RESULT_SUCCESS,
        customersSearchResult: action.payload,
      };
      return state;
    }

    case CustomerSearchData.GET_CUSTOMER_SEARCH_RESULT_FAILED: {
      state = {
        ...state,
        gettingCustomersSearchResultStatus:
          CustomerSearchData.GET_CUSTOMER_SEARCH_RESULT_FAILED,
        gettingCustomersSearchResultError: action.payload,
      };
      return state;
    }
  }
  return state;
}
