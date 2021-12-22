import {
  getEnvironmentConfigs,
  setEnvironmentConfigs,
  setEnvironmentConfigsInput,
} from './actions';

const initalState = {
  gettingEnvironmentConfigActionsStatus:
    getEnvironmentConfigs.GET_EVN_CONFIGS_DEFAULT,
  gettingEnvironmentConfigActionsError: '',
  settingEnviromentConfigStatus: setEnvironmentConfigs.SET_ENV_CONFIGS_DEFAULT,
  settingEnviromentConfigError: '',
  amountPerKm: 0,
  radiusOfMatch: 0,
};

function EnviromentConfiguration(state = initalState, action: any) {
  switch (action.type) {
    case getEnvironmentConfigs.GET_EVN_CONFIGS_STARTED: {
      state = {
        ...state,
        gettingEnvironmentConfigActionsStatus:
          getEnvironmentConfigs.GET_EVN_CONFIGS_STARTED,
        gettingEnvironmentConfigActionsError: '',
      };
      return state;
    }

    case getEnvironmentConfigs.GET_EVN_CONFIGS_SUCCESS: {
      state = {
        ...state,
        gettingEnvironmentConfigActionsStatus:
          getEnvironmentConfigs.GET_EVN_CONFIGS_SUCCESS,
        ...action.payload,
      };
      return state;
    }

    case getEnvironmentConfigs.GET_EVN_CONFIGS_FAILED: {
      state = {
        ...state,
        gettingEnvironmentConfigActionsStatus:
          getEnvironmentConfigs.GET_EVN_CONFIGS_FAILED,
        gettingEnvironmentConfigActionsError: action.payload,
      };
      return state;
    }

    case setEnvironmentConfigs.SET_ENV_CONFIGS_STARTED: {
      state = {
        ...state,
        settingEnviromentConfigStatus:
          setEnvironmentConfigs.SET_ENV_CONFIGS_STARTED,
        settingEnviromentConfigError: '',
      };
      return state;
    }

    case setEnvironmentConfigs.SET_ENV_CONFIGS_FAILED: {
      state = {
        ...state,
        settingEnviromentConfigStatus:
          setEnvironmentConfigs.SET_ENV_CONFIGS_FAILED,
        settingEnviromentConfigError: action.payload,
      };
      return state;
    }

    case setEnvironmentConfigs.SET_ENV_CONFIGS_SUCCESS: {
      state = {
        ...state,
        settingEnviromentConfigStatus:
          setEnvironmentConfigs.SET_ENV_CONFIGS_SUCCESS,
        ...action.payload,
      };
      return state;
    }

    case setEnvironmentConfigsInput.SET_ENV_CONFIGS_INPUT: {
      state = {
        ...state,
        ...action.payload,
      };
      return state;
    }
  }
  return state;
}

export default EnviromentConfiguration;
