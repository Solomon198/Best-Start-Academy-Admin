import {
  Subject,
  ValueSetters,
  SearchForDriver,
  GetDriverAnalytics,
  GetTripInformation,
  EnableDriverAccount,
  DisableDriverAccount,
  UpdateDriverAccount,
  DeleteSubject,
  AddSubject,
} from "./actions";

const initialState = {
  drivers: [] as any[],
  deleteSubjectStatus: DeleteSubject.DELETE_SUBJECT_DEFAULT,
  itemDeleting: "",
  viewDriver: null,
  gettingDriversStatus: Subject.GET_SUBJECT_DEFAULT,
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
  AddDriverAccountStatus: AddSubject.ADD_SUBJECTS_MANAGER_DEFAULT,
};

export default function DriverReducer(state = initialState, action: any) {
  switch (action.type) {
    case DeleteSubject.DELETE_SUBJECT_STARTER: {
      state = {
        ...state,
        deleteSubjectStatus: DeleteSubject.DELETE_SUBJECT_STARTER,
        itemDeleting: action.payload,
      };
      return state;
    }
    case DeleteSubject.DELETE_SUBJECT_FAILED: {
      state = {
        ...state,
        deleteSubjectStatus: DeleteSubject.DELETE_SUBJECT_FAILED,
      };
      return state;
    }
    case DeleteSubject.DELETE_SUBJECT_SUCCESS: {
      const subjects = state.drivers.filter(
        (item) => item._id !== action.payload
      );
      state = {
        ...state,
        deleteSubjectStatus: DeleteSubject.DELETE_SUBJECT_SUCCESS,
        drivers: subjects,
      };
      return state;
    }
    case AddSubject.ADD_SUBJECTS_MANAGER_SUCCESS: {
      const drivers = Object.assign([], state.drivers);
      drivers.unshift(action.payload);
      state = {
        ...state,
        AddDriverAccountStatus: AddSubject.ADD_SUBJECTS_MANAGER_SUCCESS,
        drivers,
      };
      return state;
    }

    case AddSubject.ADD_SUBJECTS_MANAGER_FAILED: {
      state = {
        ...state,
        AddDriverAccountStatus: AddSubject.ADD_SUBJECTS_MANAGER_FAILED,
      };
      return state;
    }

    case AddSubject.ADD_SUBJECTS_MANAGER_STARTED: {
      state = {
        ...state,
        AddDriverAccountStatus: AddSubject.ADD_SUBJECTS_MANAGER_STARTED,
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

    case Subject.GET_SUBJECT_STARTER: {
      state = {
        ...state,
        gettingDriversStatus: Subject.GET_SUBJECT_STARTER,
        gettingDriversError: "",
      };
      return state;
    }

    case Subject.GET_SUBJECT_FAILED: {
      state = {
        ...state,
        gettingDriversStatus: Subject.GET_SUBJECT_FAILED,
        gettingDriversError: action.payload,
      };
      return state;
    }

    case Subject.GET_SUBJECT_SUCCESS: {
      state = {
        ...state,
        gettingDriversStatus: Subject.GET_SUBJECT_SUCCESS,
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
