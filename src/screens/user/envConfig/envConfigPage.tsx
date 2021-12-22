import React from "react";
import { connect } from "react-redux";
import EnvConfigCard from "./envConfigCard";
import Spinner from "../../../components/app.spinner";
import { getEnvironmentConfigs } from "./actions";

type Props = {
  envConfigs: any;
  gettingEnvironmentConfigActionsStatus: string;
  gettingEnvironmentConfigActionsError: string;
  getEnvConfigs: () => void;
  setEnvConfigs: (envConfigVars: any) => void;
};

const mapStateToProps = (state: any) => ({
  envConfigs: state.EnvironmentConfig.envConfigs,
  gettingEnvironmentConfigActionsStatus:
    state.EnvironmentConfig.gettingEnvironmentConfigActionsStatus,
  gettingEnvironmentConfigActionsError:
    state.EnvironmentConfig.gettingEnvironmentConfigActionsError,
});

const mapDispatchToProps = (dispatch: any) => ({
  getEnvConfigs: () =>
    dispatch({ type: getEnvironmentConfigs.GET_EVN_CONFIGS_CALLER }),
});

class EnvConfigPage extends React.Component<Props> {
  componentDidMount() {
    this.props.getEnvConfigs();
  }

  render() {
    const loading =
      getEnvironmentConfigs.GET_EVN_CONFIGS_STARTED ===
      this.props.gettingEnvironmentConfigActionsStatus;
    return (
      <>
        <div style={{ width: "100%" }}>{loading && <Spinner />}</div>
        <div style={{ width: "50%", margin: "auto", marginTop: "20px" }}>
          <EnvConfigCard />
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EnvConfigPage);
