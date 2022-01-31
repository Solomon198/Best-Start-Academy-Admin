import React, { useEffect, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { useDispatch, useSelector } from "react-redux";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { IconButton, Button, Paper, Switch } from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import {
  Replay,
  Visibility,
  LockOpen,
  Lock,
  SupervisorAccount,
} from "@material-ui/icons";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import {
  GetCustomerAnalytics,
  EnableCustomerAccount,
  DisableCustomerAccount,
  AddAdminAccount,
  RemoveAdminAccount,
} from "./actions";
import Spinner from "../../../components/app.spinner";
import ParcelComponent from "../../../components/render.parcel";
import Modal from "../../../components/app.modal";
import { GetTripInformation } from "../driver/actions";

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
      width: "100%",
    },
  })
);

export default function CustomerInfoList({ userId, user }) {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  const [headerTitle, setHeaderTitle] = useState("");
  const {
    gettingCustomerAnalyticStatus,
    customerAnalytics,
    gettingCustomerAnalyticsError,
    trips,
    getTripError,
    getTripInformationStatus,
    enableCustomerStatus,
    disableCustomerStatus,
    addAdminStatus,
    removeAdminStatus,
  } = useSelector((store: any) => ({
    gettingCustomerAnalyticStatus: store.Customer.gettingCustomerAnalyticStatus,
    customerAnalytics: store.Customer.customerAnalytics,
    gettingCustomerAnalyticsError: store.Customer.gettingCustomerAnalyticsError,
    getTripInformationStatus: store.Driver.getTripInformationStatus,
    trips: store.Driver.trips,
    getTripError: store.Driver.getTripError,
    enableCustomerStatus: store.Customer.enableCustomerStatus,
    disableCustomerStatus: store.Customer.disableCustomerStatus,
    addAdminStatus: store.Customer.addAdminStatus,
    removeAdminStatus: store.Customer.removeAdminStatus,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: GetCustomerAnalytics.GET_CUSTOMER_ANALYTICS_CALLER,
      payload: userId,
    });
  }, [userId]);

  const isLoading =
    GetCustomerAnalytics.GET_CUSTOMER_ANALYTICS_STARTED ===
    gettingCustomerAnalyticStatus;

  const isLoadingTrip =
    GetTripInformation.GET_TRIP_INFORMATION_STARTED ===
    getTripInformationStatus;

  const isEnabling =
    EnableCustomerAccount.ENABLE_CUSTOMER_ACCOUNT_STARTED ===
    enableCustomerStatus;
  const isDisabling =
    DisableCustomerAccount.DISABLE_CUSTOMER_ACCOUNT_STARTED ===
    disableCustomerStatus;

  const isAddingAdmin =
    AddAdminAccount.ADD_ADMIN_ACCOUNT_STARTED === addAdminStatus;
  const isRemovingAdmin =
    RemoveAdminAccount.REMOVE_ADMIN_ACCOUNT_STARTED === removeAdminStatus;

  const handleRetry = () => {
    dispatch({
      type: GetCustomerAnalytics.GET_CUSTOMER_ANALYTICS_CALLER,
      payload: userId,
    });
  };

  const handleAddAdmin = () => {
    dispatch({
      type: AddAdminAccount.ADD_ADMIN_ACCOUNT_CALLER,
      payload: userId,
    });
  };

  const handleRemoveAdmin = () => {
    dispatch({
      type: RemoveAdminAccount.REMOVE_ADMIN_ACCOUNT_CALLER,
      payload: userId,
    });
  };

  const handleEnableAccount = () => {
    dispatch({
      type: EnableCustomerAccount.ENABLE_CUSTOMER_ACCOUNT_CALLER,
      payload: userId,
    });
  };

  const handleDisableAccount = () => {
    dispatch({
      type: DisableCustomerAccount.DISABLE_CUSTOMER_ACCOUNT_CALLER,
      payload: userId,
    });
  };

  const handleGetCompletedTrips = () => {
    dispatch({
      type: GetTripInformation.GET_TRIP_INFORMATION_CALLER,
      payload: {
        status: 3,
        isDriver: false,
        userId: userId,
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
        isDriver: false,
        userId: userId,
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

  if (gettingCustomerAnalyticsError) {
    return (
      <div className="text-center">
        <h6 className="text-danger">{gettingCustomerAnalyticsError}</h6>
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

  if (!customerAnalytics) {
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
        {user.accountDisabled ? (
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
                checked={user.accountDisabled}
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
                checked={user.accountDisabled}
                onChange={() => handleDisableAccount()}
                name="checkedA"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
            )}
          </ListItem>
        )}

        {user.isAdmin ? (
          <ListItem className={classes.listItem}>
            <ListItemIcon>
              <SupervisorAccount style={{ color: "red" }} />
            </ListItemIcon>
            <ListItemText
              id="switch-list-label-wifi"
              primary="Remove admin privilege"
              secondary={`Toggle to remove user as admin.`}
            />
            {isRemovingAdmin ? (
              <IconButton>
                <Spinner type="circular" />
              </IconButton>
            ) : (
              <Switch
                checked={user.isAdmin}
                onChange={() => handleRemoveAdmin()}
                name="checkedA"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
            )}
          </ListItem>
        ) : (
          <ListItem className={classes.listItem}>
            <ListItemIcon>
              <SupervisorAccount style={{ color: "green" }} />
            </ListItemIcon>
            <ListItemText
              id="switch-list-label-wifi"
              primary="Grant Admin privilege"
              secondary={`Toggle to add user as admin.`}
            />
            {isAddingAdmin ? (
              <IconButton>
                <Spinner type="circular" />
              </IconButton>
            ) : (
              <Switch
                checked={user.isAdmin}
                onChange={() => handleAddAdmin()}
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
