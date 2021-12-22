import React, { useState } from "react";
import { Route, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { useSelector, useDispatch } from "react-redux";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Delete from "@material-ui/icons/Delete";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import "./driversListStyle.css";
import { DeleteSubject } from "./actions";
import DialogComponent from "../../../components/dialog";
import Spinner from "../../../components/app.spinner";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    marginTop: "20px",
    marginRight: "4%",
    marginLeft: "4%",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));
export default function DriversList({ data, onClick }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { deleteSubjectStatus, itemDeleting } = useSelector((store: any) => ({
    deleteSubjectStatus: store.Subject.deleteSubjectStatus,
    itemDeleting: store.Subject.itemDeleting,
  }));
  const [show, showModal] = useState(false);
  const closeDialog = () => showModal(false);
  const showDialog = () => showModal(true);
  const handleDelete = (id) => {
    dispatch({ type: DeleteSubject.DELETE_SUBJECT_CALLER, payload: id });
    closeDialog();
  };
  const isDeleting =
    DeleteSubject.DELETE_SUBJECT_STARTER === deleteSubjectStatus;
  return (
    <List className={classes.root}>
      <ListItem
        style={{ width: "100%" }}
        className="mx-auto"
        alignItems="center"
      >
        <ListItemText
          primary={`${data.name}`}
          id="listItemText"
          style={{ cursor: "pointer" }}
          secondary=""
        />
        <ListItemAvatar>
          {isDeleting && data._id === itemDeleting ? (
            <Spinner type="circular" />
          ) : (
            <Avatar onClick={showDialog}>
              <Delete />
            </Avatar>
          )}
        </ListItemAvatar>
      </ListItem>
      <DialogComponent
        bodyText="Are you sure you want to Delete Subject ?"
        buttonText1="No"
        buttonText2="Yes"
        handleClose={closeDialog}
        handleAction={() => handleDelete(data._id)}
        open={show}
        headerTitle=""
      />
    </List>
  );
}
