import { DashboardAnalytic, GetTripsByStatus } from "./actions";

const intialState = {
  analytics: null,
  gettingAnalyticStatus: DashboardAnalytic.GET_DASHBOARD_ANALYTIC_DEFAULT,
  gettingAnalyticsError: "",

  gettingTripsStatus: GetTripsByStatus.GET_TRIPS_BY_STATUS_DEFAULT,
  trips: [],
  gettingTripsError: "",
  status: "",
};

function DashboardReducer(state = intialState, action: any) {
  switch (action.type) {
    case GetTripsByStatus.GET_TRIPS_BY_STATUS_STARTED: {
      state = {
        ...state,
        gettingTripsStatus: GetTripsByStatus.GET_TRIPS_BY_STATUS_STARTED,
        gettingTripsError: "",
        status: action.payload + "",
      };
      return state;
    }

    case GetTripsByStatus.GET_TRIPS_BY_STATUS_FAILED: {
      state = {
        ...state,
        gettingTripsStatus: GetTripsByStatus.GET_TRIPS_BY_STATUS_FAILED,
        gettingTripsError: action.payload,
      };
      return state;
    }

    case GetTripsByStatus.GET_TRIPS_BY_STATUS_SUCCESS: {
      state = {
        ...state,
        gettingTripsStatus: GetTripsByStatus.GET_TRIPS_BY_STATUS_SUCCESS,
        trips: action.payload,
      };
      return state;
    }

    case DashboardAnalytic.GET_DASHBOARD_ANALYTIC_STARTED: {
      state = {
        ...state,
        gettingAnalyticStatus: DashboardAnalytic.GET_DASHBOARD_ANALYTIC_STARTED,
        gettingAnalyticsError: "",
      };
      return state;
    }

    case DashboardAnalytic.GET_DASHBOARD_ANALYTIC_FAILED: {
      state = {
        ...state,
        gettingAnalyticStatus: DashboardAnalytic.GET_DASHBOARD_ANALYTIC_FAILED,
        gettingAnalyticsError: action.payload,
      };
      return state;
    }

    case DashboardAnalytic.GET_DASHBOARD_ANALYTIC_SUCCESS: {
      state = {
        ...state,
        gettingAnalyticStatus: DashboardAnalytic.GET_DASHBOARD_ANALYTIC_SUCCESS,
        analytics: action.payload,
      };
      return state;
    }
  }

  return state;
}

export default DashboardReducer;
