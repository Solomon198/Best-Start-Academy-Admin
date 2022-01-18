import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GetDriverAnalytics,
  GetTripInformation,
  EnableDriverAccount,
  DisableDriverAccount,
} from "./actions";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {
  IconButton,
  Button,
  Paper,
  ListItemText,
  Switch,
} from "@material-ui/core";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { Visibility, Replay, Lock, LockOpen } from "@material-ui/icons";
import Spinner from "../../../components/app.spinner";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import Modal from "../../../components/app.modal";
import ParcelComponent from "../../../components/render.parcel";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
    },
    listItem: {
      backgroundColor: "#f8f8f8",
      marginTop: 3,
      marginBottom: 3,
      borderRadius: 10,
    },
    listItem2: {
      backgroundColor: "#f8f8f8",
      marginTop: 3,
      marginBottom: 3,
      borderRadius: 10,
      width: "80%",
    },
  })
);

export default function DriverInfoList({ driverId, driver }) {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  const [headerTitle, setHeaderTitle] = useState("");
  const {
    getDriverAnalyticStatus,
    gettingDriverAnalyticError,
    driverAnalytics,
    trips,
    getTripInformationStatus,
    enableDriverStatus,
    disableDriverStatus,
  } = useSelector((store: any) => ({
    gettingDriverAnalyticError: store.Driver.gettingDriverAnalyticError,
    getDriverAnalyticStatus: store.Driver.getDriverAnalyticStatus,
    driverAnalytics: store.Driver.driverAnalytics,
    enableDriverStatus: store.Driver.enableDriverStatus,
    disableDriverStatus: store.Driver.disableDriverStatus,
    getTripInformationStatus: store.Driver.getTripInformationStatus,
    trips: store.Driver.trips,
    getTripError: store.Driver.getTripError,
  }));

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch({
  //     type: GetDriverAnalytics.GET__DRIVER_ANALYTICS_CALLER,
  //     payload: driverId,
  //   });
  // }, [driverId]);
  const isLoading =
    GetDriverAnalytics.GET__DRIVER_ANALYTICS_STARTED ===
    getDriverAnalyticStatus;
  const isLoadingTrip =
    GetTripInformation.GET_TRIP_INFORMATION_STARTED ===
    getTripInformationStatus;
  const isEnabling =
    EnableDriverAccount.ENABLE_DRIVER_ACCOUNT_STARTED === enableDriverStatus;
  const isDisabling =
    DisableDriverAccount.DISABLE_DRIVER_ACCOUNT_STARTED === disableDriverStatus;

  const handleRetry = () => {
    dispatch({
      type: GetDriverAnalytics.GET__DRIVER_ANALYTICS_CALLER,
      payload: driverId,
    });
  };

  const handleEnableAccount = () => {
    dispatch({
      type: EnableDriverAccount.ENABLE_DRIVER_ACCOUNT_CALLER,
      payload: driverId,
    });
  };

  const handleDisableAccount = () => {
    dispatch({
      type: DisableDriverAccount.DISABLE_DRIVER_ACCOUNT_CALLER,
      payload: driverId,
    });
  };

  const handleGetCompletedTrips = () => {
    dispatch({
      type: GetTripInformation.GET_TRIP_INFORMATION_CALLER,
      payload: {
        status: 3,
        isDriver: true,
        userId: driverId,
      },
    });
    setShowModal(true);
    setHeaderTitle("Completed Trips");
  };

  const handleGetFailedTrips = () => {
    dispatch({
      type: GetTripInformation.GET_TRIP_INFORMATION_CALLER,
      payload: {
        status: 4,
        isDriver: true,
        userId: driverId,
      },
    });
    setShowModal(true);
    setHeaderTitle("Cancelled Trips");
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: "center" }}>
        <Spinner type="circular" />
        <h6 className="mt-2">Getting Account activity...</h6>
      </div>
    );
  }

  if (gettingDriverAnalyticError) {
    return (
      <div className="text-center">
        <h6 className="text-danger">{gettingDriverAnalyticError}</h6>
        <Button
          onClick={handleRetry}
          startIcon={<Replay />}
          variant="contained"
          color="secondary"
        >
          Retry
        </Button>
      </div>
    );
  }

  if (!driverAnalytics) {
    return <></>;
  }
  return (
    <>
      <List
        subheader={
          <h5
            style={{
              fontWeight: "bold",
              marginBottom: 20,
            }}
          >
            Account Settings
          </h5>
        }
        className={classes.root}
      >
        {/* <ListItem className={classes.listItem}>
          <ListItemIcon>
            <LocalShippingIcon style={{ color: "green" }} />
          </ListItemIcon>
          <ListItemText
            id="switch-list-label-wifi"
            primary="Completed Trips"
            secondary={`${driverAnalytics.completedTrips} completed trips.`}
          />
          <IconButton onClick={() => handleGetCompletedTrips()}>
            <Visibility />
          </IconButton>
        </ListItem> */}
        {/* <ListItem className={classes.listItem}>
          <ListItemIcon>
            <LocalShippingIcon style={{ color: "red" }} />
          </ListItemIcon>
          <ListItemText
            id="switch-list-label-bluetooth"
            primary="Cancelled Trips"
            secondary={`${driverAnalytics.cancelledTrips} cancelled trips.`}
          />

          <IconButton onClick={() => handleGetFailedTrips()}>
            <Visibility />
          </IconButton>
        </ListItem> */}
        {/* <ListItem className={classes.listItem}>
          <ListItemIcon>
            <AttachMoneyIcon style={{ color: "brown" }} />
          </ListItemIcon>
          <ListItemText
            id="switch-list-label-bluetooth"
            primary="Total Money Earned"
            secondary={`₦${
              driverAnalytics.totalMoneyEarned || 0
            } amount earned.`}
          />
          <IconButton>
            <Visibility />
          </IconButton>
        </ListItem> */}
        {/* <ListItem className={classes.listItem}>
          <ListItemIcon>
            <AccountBalanceWalletIcon style={{ color: "blueviolet" }} />
          </ListItemIcon>
          <ListItemText
            id="switch-list-label-bluetooth"
            primary="Balance"
            secondary={`₦${driverAnalytics.balance || 0} Account balance.`}
          />
        </ListItem> */}
        {driver.accountDisabled ? (
          <ListItem className={classes.listItem}>
            <ListItemIcon>
              <Lock style={{ color: "red" }} />
            </ListItemIcon>
            <ListItemText
              id="switch-list-label-wifi"
              primary="Unblock Account"
              secondary={`Toggle to unblock driver account.`}
            />
            {isEnabling ? (
              <IconButton>
                <Spinner type="circular" />
              </IconButton>
            ) : (
              <Switch
                checked={driver.accountDisabled}
                onChange={() => handleEnableAccount()}
                name="checkedA"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
            )}
          </ListItem>
        ) : (
          <ListItem className={classes.listItem}>
            <ListItemIcon>
              <LockOpen style={{ color: "green" }} />
            </ListItemIcon>
            <ListItemText
              id="switch-list-label-wifi"
              primary="Block Account"
              secondary={`Toggle to block driver account.`}
            />
            {isDisabling ? (
              <IconButton>
                <Spinner type="circular" />
              </IconButton>
            ) : (
              <Switch
                checked={driver.accountDisabled}
                onChange={() => handleDisableAccount()}
                name="checkedA"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
            )}
          </ListItem>
        )}
      </List>
      <Modal open={showModal} handleClose={() => setShowModal(false)}>
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

          {!isLoadingTrip && trips?.length === 0 && (
            <div
              style={{ height: "100%" }}
              className="text-center d-flex flex-column justify-content-center align-items-center"
            >
              <div></div>
              <p className="mt-3"> No {headerTitle}</p>
            </div>
          )}

          {trips?.length > 0 && !isLoadingTrip && (
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
                {trips.map((trip) => (
                  <ParcelComponent driverView={true} parcel={trip} />
                ))}
              </div>
            </>
          )}
        </Paper>
      </Modal>
    </>
  );
}
