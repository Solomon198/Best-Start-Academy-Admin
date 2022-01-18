import React from "react";
import { connect } from "react-redux";
import DriverInfo from "./driverInfo";
import DriverSearchBar from "./driverSearchBar";
import DriversList from "./driversList";
import { Subject, SearchForDriver, ValueSetters } from "./actions";
import Spinner from "../../../components/app.spinner";
import { Hidden, Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { NoRecordsFound } from "../../../components/app.no.records.found";
import DescriptionIcon from "@material-ui/icons/Description";
import AddDriverAccount from "./addAccount.modal";

type Props = {
  drivers: any;
  viewDriver: any;
  searchForDrivers: any;
  gettingDriversStatus: string;
  gettingDriversError: string;
  gettingSearchForDriversStatus: string;
  gettingSearchForDriversError: string;
  history: any;
  getDrivers: () => void;
  getSearchForDrivers: (text: string) => void;
  setDriverToView: (driverData: any) => void;
};

const mapStateToProps = (state: any) => ({
  drivers: state.Subject.drivers,
  viewDriver: state.Subject.viewDriver,
  searchForDrivers: state.Subject.searchForDrivers,
  gettingDriversStatus: state.Subject.gettingDriversStatus,
  gettingDriversError: state.Subject.gettingDriversError,
  gettingSearchForDriversStatus: state.Subject.gettingSearchForDriversStatus,
  gettingSearchForDriversError: state.Subject.gettingSearchForDriversError,
});

const mapDispatchToProps = (dispatch: any) => ({
  getDrivers: () => dispatch({ type: Subject.GET_SUBJECT_CALLER }),
  getSearchForDrivers: (text: string) =>
    dispatch({
      type: SearchForDriver.GET_SEARCH_FOR_DRIVER_CALLER,
      payload: text,
    }),
  setDriverToView: (driverData: any) =>
    dispatch({
      type: ValueSetters.SET_DRIVER_TO_VIEW_CALLER,
      payload: driverData,
    }),
});

class DriversPage extends React.Component<Props> {
  componentDidMount() {
    this.props.getDrivers();
  }
  render() {
    console.log(this.props.gettingDriversStatus);
    const loading =
      Subject.GET_SUBJECT_STARTER === this.props.gettingDriversStatus;

    return (
      <>
        {loading && (
          <div style={{ marginTop: "3px" }}>
            <Spinner />
          </div>
        )}
        {this.props.drivers.length === 0 && !loading && (
          <NoRecordsFound icon={<DescriptionIcon />} title="No Records Found" />
        )}

        <div
          style={{ width: "70%", height: "100%", overflow: "hidden" }}
          className="hide-scroll-bar mx-auto"
        >
          <div
            className="d-flex hide-scroll-bar scroll"
            style={{ height: "100%" }}
          >
            <div
              className="col-sm-12 col-lg-12 hide-scroll-bar justify-content-center"
              style={{
                height: "100%",
                overflow: "hidden",
                width: "90%",
              }}
            >
              <h1 className="ml-5">Subjects</h1>
              {/* <Hidden mdUp>
                {this.props.drivers.length > 0 ? (
                  <DriverSearchBar
                    isLoading={
                      SearchForDriver.GET_SEARCH_FOR_DRIVER_STARTER ===
                      this.props.gettingSearchForDriversStatus
                    }
                    doSearch={(text) => this.props.getSearchForDrivers(text)}
                    drivers={this.props.searchForDrivers || []}
                    onSelected={(value) => {
                      this.props.setDriverToView(value);
                     
                    }}
                  />
                ) : null}
              </Hidden> */}
              {/* <Hidden smDown>
                {this.props.drivers.length > 0 ? (
                  <DriverSearchBar
                    isLoading={
                      SearchForDriver.GET_SEARCH_FOR_DRIVER_STARTER ===
                      this.props.gettingSearchForDriversStatus
                    }
                    doSearch={(text) => this.props.getSearchForDrivers(text)}
                    drivers={this.props.searchForDrivers || []}
                    onSelected={(value) => this.props.setDriverToView(value)}
                  />
                ) : null}
              </Hidden> */}

              <div
                className="hide-scroll-bar scroll"
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  paddingBottom: 120,
                  overflowY: "scroll",
                  marginTop: 20,
                }}
              >
                {this.props.drivers &&
                  this.props.drivers.map((driver) => (
                    <div>
                      <Hidden mdUp>
                        <DriversList
                          key={driver.id}
                          data={driver}
                          onClick={(data) => {
                            this.props.setDriverToView(data);
                            // this.props.history.push(
                            //   "/dashboard/drivers/driver-information"
                            // );
                          }}
                        />
                      </Hidden>
                      <Hidden smDown>
                        <DriversList
                          key={driver.id}
                          data={driver}
                          onClick={(data) => this.props.setDriverToView(data)}
                        />
                      </Hidden>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <AddDriverAccount />
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DriversPage);
