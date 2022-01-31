import React from "react";
import { connect } from "react-redux";
import AdminCard from "./adminCard";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import PeopleIcon from "@material-ui/icons/People";
import AdminChart from "./adminChart/adminChart";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import { DashboardAnalytic, GetTripsByStatus } from "./actions";
import Spinner from "../../../components/app.spinner";
import Modal from "../../../components/app.modal";
import { Paper } from "@material-ui/core";
import ParcelComponent from "../../../components/render.parcel";

type Props = {
  analytics: any;
  gettingAnalyticStatus: string;
  gettingAnalyticsError: string;
  gettingTripsStatus: string;
  trips: any[];
  gettingTripsError: string;
  status: string;
  history: any;

  getAnalytics: () => void;
  getTripsByStatus: (status: string) => void;
};
const mapStateToProps = (state: any) => ({
  analytics: state.Dashboard.analytics,
  gettingAnalyticStatus: state.Dashboard.gettingAnalyticStatus,
  gettingAnalyticsError: state.Dashboard.gettingAnalyticsError,
  gettingTripsStatus: state.Dashboard.gettingTripsStatus,
  trips: state.Dashboard.trips,
  gettingTripsError: state.Dashboard.gettingTripsError,
  status: state.Dashboard.status,
});

const mapDispatchStateToProps = (dispatch: any) => ({
  getAnalytics: () =>
    dispatch({ type: DashboardAnalytic.GET_DASHBOARD_ANALYTIC_CALLER }),
  getTripsByStatus: (status: string) =>
    dispatch({
      type: GetTripsByStatus.GET_TRIPS_BY_STATUS_CALLER,
      payload: status,
    }),
});

class AdminDashboard extends React.Component<Props> {
  state = {
    showModal: false,
  };
  componentDidMount() {
    this.props.getAnalytics();
  }

  getTrips(status: string) {
    this.setState(
      {
        showModal: true,
      },
      () => {
        this.props.getTripsByStatus(status);
      }
    );
  }

  render() {
    const loading =
      DashboardAnalytic.GET_DASHBOARD_ANALYTIC_STARTED ===
      this.props.gettingAnalyticStatus;

    const isLoadingTrip =
      GetTripsByStatus.GET_TRIPS_BY_STATUS_STARTED ===
      this.props.gettingTripsStatus;
    const headerTitle =
      this.props.status === "3" ? "Completed trips" : "Cancelled trips";
    return (
      <>
        <div style={{ marginTop: "3px", width: "100%" }}>
          {loading && <Spinner type="linear" />}
        </div>
        <div className="container my-4">
          <div
            className="row mb-5"
            style={{ overflow: "hidden", minHeight: 200 }}
          >
            <div
              style={{ cursor: "pointer" }}
              className="col-sm-12 col-lg-6 mb-4 mb-lg-0"
              onClick={() => this.props.history.push("/dashboard/students")}
            >
              <AdminCard
                icon={<PeopleIcon style={{ fontSize: 30, color: "green" }} />}
                title="Number of Students"
                titleValue={
                  this.props.analytics !== null
                    ? this.props.analytics.drivers
                    : ""
                }
              />
            </div>

            <div
              style={{ cursor: "pointer" }}
              className="col-sm-12 col-lg-6 mb-4 mb-lg-0"
              onClick={() => this.props.history.push("/dashboard/teachers")}
            >
              <AdminCard
                icon={<PeopleIcon style={{ fontSize: 30, color: "blue" }} />}
                title="Number of Teachers"
                titleValue={
                  this.props.analytics !== null
                    ? this.props.analytics.users
                    : ""
                }
              />
            </div>
          </div>
          <div className="col-12 d-none d-md-block">
            <AdminChart
              chartData={
                this.props.analytics !== null ? this.props.analytics : ""
              }
            />
          </div>
        </div>
        <Modal
          open={this.state.showModal}
          handleClose={() =>
            this.setState({
              showModal: false,
            })
          }
        >
          <Paper
            style={{
              backgroundColor: "white",
              width: "50%",
              height: "100%",
              borderRadius: 5,
              marginTop: 10,
              padding: 10,
              position: "absolute",
              left: "25%",
            }}
          >
            {isLoadingTrip && (
              <div
                style={{ height: "100%" }}
                className="text-center d-flex flex-column justify-content-center align-items-center"
              >
                <div></div>
                <Spinner type="circular" />
                <h6 className="mt-3">Fetching {headerTitle}....</h6>
              </div>
            )}
            {this.props.trips?.length > 0 && !isLoadingTrip && (
              <>
                <p style={{ fontSize: "bold", textAlign: "center" }}>
                  {headerTitle}
                </p>
                <div
                  style={{
                    overflow: "scroll",
                    height: "100%",
                    position: "absolute",
                    width: "98%",
                    paddingBottom: 100,
                  }}
                >
                  {this.props.trips.map((trip) => (
                    <ParcelComponent driverView={false} parcel={trip} />
                  ))}
                </div>
              </>
            )}
          </Paper>
        </Modal>
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchStateToProps
)(AdminDashboard);
