import {
  Application,
  ValueSetters,
  AcceptedApplicationActions,
  DeclinedApplicationActions,
  DeclineMessageSetter,
} from './actions';

const initialState = {
  applications: [] as any[],
  viewApplication: null,
  declineMessage: '',
  gettingApplicationStatus: Application.GET_APPLICATION_DEFAULT,
  gettingApplicationError: '',
  gettingAcceptedApplicationStatus:
    AcceptedApplicationActions.APPLICATION_ACCEPTED_DEFAULT,
  gettingAcceptedApplicationError: '',
  gettingDeclinedApplicationStatus:
    DeclinedApplicationActions.APPLICATION_DECLINED_DEFAULT,
  gettingDeclinedApplicationError: '',
};

export default function ApplicationReducer(state = initialState, action: any) {
  switch (action.type) {
    case DeclineMessageSetter.SET_DECLINE_MESSAGE: {
      state = {
        ...state,
        declineMessage: action.payload,
      };
      return state;
    }

    case ValueSetters.SET_APPLICATION_TO_VIEW: {
      state = {
        ...state,
        viewApplication: action.payload,
      };
      return state;
    }

    case Application.GET_APPLICATION_STARTER: {
      state = {
        ...state,
        gettingApplicationStatus: Application.GET_APPLICATION_STARTER,
        gettingApplicationError: '',
      };
      return state;
    }

    case Application.GET_APPLICATION_SUCCESS: {
      state = {
        ...state,
        gettingApplicationStatus: Application.GET_APPLICATION_SUCCESS,
        applications: action.payload,
      };
      return state;
    }

    case Application.GET_APPLICATION_FAILURE: {
      state = {
        ...state,
        gettingApplicationStatus: Application.GET_APPLICATION_FAILURE,
        gettingApplicationError: action.payload,
      };
      return state;
    }

    case AcceptedApplicationActions.APPLICATION_ACCEPTED_STARTED: {
      state = {
        ...state,
        gettingAcceptedApplicationStatus:
          AcceptedApplicationActions.APPLICATION_ACCEPTED_STARTED,
        gettingAcceptedApplicationError: '',
      };
      return state;
    }

    case AcceptedApplicationActions.APPLICATION_ACCEPTED_SUCCESS: {
      const applications: any[] = Object.assign([], state.applications);
      let filteredApplications = applications.filter(
        (application: any) => application.userId !== action.payload
      );
      state = {
        ...state,
        gettingAcceptedApplicationStatus:
          AcceptedApplicationActions.APPLICATION_ACCEPTED_SUCCESS,
        applications: filteredApplications,
        viewApplication: null,
      };
      return state;
    }

    case AcceptedApplicationActions.APPLICATION_ACCEPTED_FAILED: {
      state = {
        ...state,
        gettingAcceptedApplicationStatus:
          AcceptedApplicationActions.APPLICATION_ACCEPTED_FAILED,
        gettingAcceptedApplicationError: action.payload,
      };
      return state;
    }

    case DeclinedApplicationActions.APPLICATION_DECLINED_STARTED: {
      state = {
        ...state,
        gettingDeclinedApplicationStatus:
          DeclinedApplicationActions.APPLICATION_DECLINED_STARTED,
        gettingDeclinedApplicationError: '',
      };

      return state;
    }

    case DeclinedApplicationActions.APPLICATION_DECLINED_SUCCESS: {
      state = {
        ...state,
        gettingDeclinedApplicationStatus:
          DeclinedApplicationActions.APPLICATION_DECLINED_SUCCESS,
        applications: state.applications.filter(
          (application: any) => application.userId !== action.payload.userId
        ),
        viewApplication: null,
      };
      return state;
    }

    case DeclinedApplicationActions.APPLICATION_DECLINED_FAILED: {
      state = {
        ...state,
        gettingDeclinedApplicationStatus:
          DeclinedApplicationActions.APPLICATION_DECLINED_FAILED,
        gettingDeclinedApplicationError: action.payload,
      };
      return state;
    }
  }
  return state;
}
