import React from "react";
import { connect } from "react-redux";
import DriverInfo from "./driverInfo";
import DriverSearchBar from "./driverSearchBar";
import DriversList from "./driversList";
import { Driver, SearchForDriver, ValueSetters } from "./actions";
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
  drivers: state.Driver.drivers,
  viewDriver: state.Driver.viewDriver,
  searchForDrivers: state.Driver.searchForDrivers,
  gettingDriversStatus: state.Driver.gettingDriversStatus,
  gettingDriversError: state.Driver.gettingDriversError,
  gettingSearchForDriversStatus: state.Driver.gettingSearchForDriversStatus,
  gettingSearchForDriversError: state.Driver.gettingSearchForDriversError,
});

const mapDispatchToProps = (dispatch: any) => ({
  getDrivers: () => dispatch({ type: Driver.GET_DRIVER_CALLER }),
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
    const loading =
      Driver.GET_DRIVER_STARTER === this.props.gettingDriversStatus;

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
          style={{ width: "100%", height: "100%", overflow: "hidden" }}
          className="hide-scroll-bar"
        >
          <div
            className="d-flex hide-scroll-bar scroll"
            style={{ height: "100%" }}
          >
            <div
              className="col-sm-12 col-lg-6 hide-scroll-bar"
              style={{
                height: "100%",
                overflow: "hidden",
              }}
            >
              <Hidden mdUp>
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
                      // this.props.history.push(
                      //   `/dashboard/drivers/driver-information`
                      // );
                    }}
                  />
                ) : null}
              </Hidden>
              <Hidden smDown>
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
              </Hidden>

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

            <div className="col-sm-12 d-none d-lg-block col-lg-6 hide-scroll-bar scroll">
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
                  {this.props.viewDriver && (
                    <DriverInfo driverInfo={this.props.viewDriver} />
                  )}
                </div>
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
