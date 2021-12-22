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
} from "./actions";

const initialState = {
  drivers: [] as any[],
  viewDriver: null,
  gettingDriversStatus: Driver.GET_DRIVER_DEFAULT,
  gettingDriversError: "",
  searchForDrivers: [],
  gettingSearchForDriversStatus: SearchForDriver.GET_SEARCH_FOR_DRIVER_DEFAULT,
  gettingSearchForDriversError: "",
  gettingDriverAnalyticError: "",
  getDriverAnalyticStatus: GetDriverAnalytics.GET__DRIVER_ANALYTICS_DEFAULT,
  driverAnalytics: null,
  getTripInformationStatus: GetTripInformation.GET_TRIP_INFORMATION_DEFAULT,
  trips: [],
  getTripError: "",
  enableDriverStatus: EnableDriverAccount.ENABLE_DRIVER_ACCOUNT_DEFAULT,
  disableDriverStatus: DisableDriverAccount.DISABLE_DRIVER_ACCOUNT_DEFAULT,

  updateAccountStatus:
    UpdateDriverAccount.UPDATE_DRIVER_ACCOUNT_MANAGER_DEFAULT,
  AddDriverAccountStatus: AddDriverAccount.ADD_DRIVER_ACCOUNT_MANAGER_DEFAULT,
};

export default function DriverReducer(state = initialState, action: any) {
  switch (action.type) {
    case AddDriverAccount.ADD_DRIVER_ACCOUNT_MANAGER_SUCCESS: {
      const drivers = Object.assign([], state.drivers);
      drivers.unshift(action.payload);
      state = {
        ...state,
        AddDriverAccountStatus:
          AddDriverAccount.ADD_DRIVER_ACCOUNT_MANAGER_SUCCESS,
        drivers,
      };
      return state;
    }

    case AddDriverAccount.ADD_DRIVER_ACCOUNT_MANAGER_FAILED: {
      state = {
        ...state,
        AddDriverAccountStatus:
          AddDriverAccount.ADD_DRIVER_ACCOUNT_MANAGER_FAILED,
      };
      return state;
    }

    case AddDriverAccount.ADD_DRIVER_ACCOUNT_MANAGER_STARTED: {
      state = {
        ...state,
        AddDriverAccountStatus:
          AddDriverAccount.ADD_DRIVER_ACCOUNT_MANAGER_STARTED,
      };
      return state;
    }

    case UpdateDriverAccount.UPDATE_DRIVER_ACCOUNT_MANAGER_STARTED: {
      state = {
        ...state,
        updateAccountStatus:
          UpdateDriverAccount.UPDATE_DRIVER_ACCOUNT_MANAGER_STARTED,
      };
      return state;
    }

    case UpdateDriverAccount.UPDATE_DRIVER_ACCOUNT_MANAGER_FAILED: {
      state = {
        ...state,
        updateAccountStatus:
          UpdateDriverAccount.UPDATE_DRIVER_ACCOUNT_MANAGER_FAILED,
      };
      return state;
    }

    case UpdateDriverAccount.UPDATE_DRIVER_ACCOUNT_MANAGER_SUCCESS: {
      const drivers = state.drivers.map((person) => {
        if (person.userId === action.payload.userId) {
          return action.payload;
        }
        return person;
      });
      state = {
        ...state,
        updateAccountStatus:
          UpdateDriverAccount.UPDATE_DRIVER_ACCOUNT_MANAGER_SUCCESS,
        drivers,
        viewDriver: action.payload,
      };
      return state;
    }

    case DisableDriverAccount.DISABLE_DRIVER_ACCOUNT_STARTED: {
      state = {
        ...state,
        disableDriverStatus:
          DisableDriverAccount.DISABLE_DRIVER_ACCOUNT_STARTED,
      };
      return state;
    }

    case DisableDriverAccount.DISABLE_DRIVER_ACCOUNT_FAILED: {
      state = {
        ...state,
        disableDriverStatus: DisableDriverAccount.DISABLE_DRIVER_ACCOUNT_FAILED,
      };
      return state;
    }

    case DisableDriverAccount.DISABLE_DRIVER_ACCOUNT_SUCCESS: {
      const viewDriver: any = Object.assign({}, state.viewDriver);
      viewDriver.accountDisabled = true;
      const drivers: any[] = state.drivers.map((val: any) => {
        if (val.userId === action.payload) {
          val.accountDisabled = true;
        }
        return val;
      });
      state = {
        ...state,
        disableDriverStatus:
          DisableDriverAccount.DISABLE_DRIVER_ACCOUNT_SUCCESS,
        viewDriver,
        drivers,
      };
      return state;
    }

    case EnableDriverAccount.ENABLE_DRIVER_ACCOUNT_STARTED: {
      state = {
        ...state,
        enableDriverStatus: EnableDriverAccount.ENABLE_DRIVER_ACCOUNT_STARTED,
      };
      return state;
    }

    case EnableDriverAccount.ENABLE_DRIVER_ACCOUNT_FAILED: {
      state = {
        ...state,
        enableDriverStatus: EnableDriverAccount.ENABLE_DRIVER_ACCOUNT_FAILED,
      };
      return state;
    }

    case EnableDriverAccount.ENABLE_DRIVER_ACCOUNT_SUCCESS: {
      const viewDriver: any = Object.assign({}, state.viewDriver);
      const drivers: any[] = state.drivers.map((val: any) => {
        if (val.userId === action.payload) {
          val.accountDisabled = false;
        }
        return val;
      });
      viewDriver.accountDisabled = false;
      state = {
        ...state,
        enableDriverStatus: EnableDriverAccount.ENABLE_DRIVER_ACCOUNT_SUCCESS,
        viewDriver,
        drivers,
      };
      return state;
    }

    case GetTripInformation.GET_TRIP_INFORMATION_STARTED: {
      state = {
        ...state,
        getTripInformationStatus:
          GetTripInformation.GET_TRIP_INFORMATION_STARTED,
        getTripError: "",
        trips: [],
      };
      return state;
    }

    case GetTripInformation.GET_TRIP_INFORMATION_FAILED: {
      state = {
        ...state,
        getTripInformationStatus:
          GetTripInformation.GET_TRIP_INFORMATION_FAILED,
        getTripError: action.payload,
      };
      return state;
    }

    case GetTripInformation.GET_TRIP_INFORMATION_SUCCESS: {
      state = {
        ...state,
        getTripInformationStatus:
          GetTripInformation.GET_TRIP_INFORMATION_SUCCESS,
        getTripError: "",
        trips: action.payload,
      };
      return state;
    }

    case GetDriverAnalytics.GET__DRIVER_ANALYTICS_STARTED: {
      state = {
        ...state,
        getDriverAnalyticStatus:
          GetDriverAnalytics.GET__DRIVER_ANALYTICS_STARTED,
        gettingDriverAnalyticError: "",
        driverAnalytics: null,
      };
      return state;
    }

    case GetDriverAnalytics.GET__DRIVER_ANALYTICS_FAILED: {
      state = {
        ...state,
        getDriverAnalyticStatus:
          GetDriverAnalytics.GET__DRIVER_ANALYTICS_FAILED,
        gettingDriverAnalyticError: action.payload,
      };
      return state;
    }

    case GetDriverAnalytics.GET__DRIVER_ANALYTICS_SUCCESS: {
      state = {
        ...state,
        getDriverAnalyticStatus:
          GetDriverAnalytics.GET__DRIVER_ANALYTICS_SUCCESS,
        driverAnalytics: action.payload,
      };
      return state;
    }

    case ValueSetters.SET_DRIVER_TO_VIEW: {
      state = {
        ...state,
        viewDriver: action.payload,
      };
      return state;
    }

    case Driver.GET_DRIVER_STARTER: {
      state = {
        ...state,
        gettingDriversStatus: Driver.GET_DRIVER_STARTER,
        gettingDriversError: "",
      };
      return state;
    }

    case Driver.GET_DRIVER_FAILED: {
      state = {
        ...state,
        gettingDriversStatus: Driver.GET_DRIVER_FAILED,
        gettingDriversError: action.payload,
      };
      return state;
    }

    case Driver.GET_DRIVER_SUCCESS: {
      state = {
        ...state,
        gettingDriversStatus: Driver.GET_DRIVER_SUCCESS,
        drivers: action.payload,
      };
      return state;
    }

    case SearchForDriver.GET_SEARCH_FOR_DRIVER_STARTER: {
      state = {
        ...state,
        gettingSearchForDriversStatus:
          SearchForDriver.GET_SEARCH_FOR_DRIVER_STARTER,
        gettingSearchForDriversError: "",
      };
      return state;
    }

    case SearchForDriver.GET_SEARCH_FOR_DRIVER_FAILED: {
      state = {
        ...state,
        gettingSearchForDriversStatus:
          SearchForDriver.GET_SEARCH_FOR_DRIVER_FAILED,
        gettingSearchForDriversError: action.payload,
      };
      return state;
    }

    case SearchForDriver.GET_SEARCH_FOR_DRIVER_SUCCESS: {
      state = {
        ...state,
        gettingSearchForDriversStatus:
          SearchForDriver.GET_SEARCH_FOR_DRIVER_SUCCESS,
        searchForDrivers: action.payload,
      };
      return state;
    }
  }
  return state;
}
