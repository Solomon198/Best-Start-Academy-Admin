import React, { useEffect, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { useDispatch, useSelector } from "react-redux";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { IconButton, Paper, Switch } from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import { SupervisorAccount } from "@material-ui/icons";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import { RemoveAdminAccount } from "./actions";
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

  const { removeAdminStatus } = useSelector((store: any) => ({
    removeAdminStatus: store.Admin.removeAdminStatus,
  }));

  const dispatch = useDispatch();

  useEffect(() => {}, [userId]);

  const isRemovingAdmin =
    RemoveAdminAccount.REMOVE_ADMIN_ACCOUNT_MANAGER_STARTED ===
    removeAdminStatus;

  const handleRemoveAdmin = () => {
    dispatch({
      type: RemoveAdminAccount.REMOVE_ADMIN_ACCOUNT_MANAGER_CALLER,
      payload: userId,
    });
  };

  return (
    <>
      <List className={classes.root}>
        {user.isAdmin && (
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
        )}
      </List>
    </>
  );
}
