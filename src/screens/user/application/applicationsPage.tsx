import React from "react";
import { connect } from "react-redux";
import ApplicationInfo from "./applicationInfo";
import DescriptionIcon from "@material-ui/icons/Description";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ApplicationSearchBar from "./applicationSearchBar";
import ApplicationsList from "./applicationsList";
import { Application, ValueSetters } from "./actions";
import Spinner from "../../../components/app.spinner";
import { Hidden } from "@material-ui/core";
import { NoRecordsFound } from "../../../components/app.no.records.found";
import { makeStyles, Theme } from "@material-ui/core/styles";

type Props = {
  applications: any;
  viewApplication: any;
  gettingApplicationStatus: string;
  gettingApplicationError: string;
  gettingAcceptedApplicationStatus: string;
  gettingAcceptedApplicationError: string;
  history: any;

  getApplications: () => void;
  setApplicationToView: (applcationData: any) => void;
  getAcceptedApplication: (userId: any) => void;
};

const mapStateToProps = (state: any) => ({
  applications: state.Application.applications,
  viewApplication: state.Application.viewApplication,
  acceptedApplication: state.Application.acceptedApplication,
  gettingApplicationStatus: state.Application.gettingApplicationStatus,
  gettingApplicationError: state.Application.gettingApplicationError,
});

const mapDispatchToProps = (dispatch: any) => ({
  getApplications: () => dispatch({ type: Application.GET_APPLICATION_CALLER }),
  setApplicationToView: (applicationData: any) =>
    dispatch({
      type: ValueSetters.SET_APPLICATION_TO_VIEW_CALLER,
      payload: applicationData,
    }),
});

class ApplicationPage extends React.Component<Props> {
  componentDidMount() {
    this.props.getApplications();
  }

  render() {
    const loading =
      Application.GET_APPLICATION_STARTER ===
      this.props.gettingApplicationStatus;

    return (
      <>
        <div style={{ marginTop: "3px" }}>{loading && <Spinner />}</div>
        {this.props.applications.length === 0 && !loading && (
          <NoRecordsFound
            icon={
              <DescriptionIcon
                style={{
                  color: "#232f3e",
                  margin: "auto",
                  fontSize: "100px",
                }}
              />
            }
            title="No Records Found"
          />
        )}

        <div
          style={{ width: "100%", height: "100%", overflow: "hidden" }}
          className="hide-scroll-bar"
        >
          <div
            className="d-flex hide-scroll-bar scroll"
            style={{ height: "100%" }}
          >
            <div
              className="col-sm-12 col-lg-6 hide-scroll-bar "
              style={{ height: "100%", overflow: "hidden" }}
            >
              {/* <ApplicationSearchBar /> */}
              <div
                className="hide-scroll-bar scroll"
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  overflowY: "scroll",
                  paddingBottom: 120,
                  marginTop: 20,
                }}
              >
                {this.props.applications &&
                  this.props.applications.length > 0 &&
                  this.props.applications.map((app) => (
                    <div>
                      <Hidden mdUp>
                        <ApplicationsList
                          data={app}
                          onClick={(data) => {
                            this.props.setApplicationToView(data);
                            this.props.history.push(
                              "/dashboard/applications/application-information"
                            );
                          }}
                        />
                      </Hidden>
                      <Hidden smDown>
                        <ApplicationsList
                          data={app}
                          onClick={(data) =>
                            this.props.setApplicationToView(data)
                          }
                        />
                      </Hidden>
                    </div>
                  ))}
              </div>
            </div>

            <div className="col-sm-12 col-lg-6 d-none d-lg-block hide-scroll-bar scroll">
              <div
                className="hide-scroll-bar scroll"
                style={{
                  height: "100%",
                  width: "100%",
                  overflowY: "scroll",
                  paddingRight: "37px",
                  position: "absolute",
                  left: "28px",
                }}
              >
                <div>
                  {this.props.applications.length > 0 &&
                  this.props.viewApplication === null ? (
                    <NoRecordsFound
                      icon={
                        <AccountCircleIcon
                          style={{
                            color: "#232f3e",
                            margin: "auto",
                            fontSize: "100px",
                          }}
                        />
                      }
                      title="Select a record from the list"
                    />
                  ) : (
                    <ApplicationInfo appInfo={this.props.viewApplication} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationPage);
