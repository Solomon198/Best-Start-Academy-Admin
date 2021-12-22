import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import PhoneIcon from "@material-ui/icons/Phone";
import "./adminListStyle.css";

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

export default function AdminList({ data, onClick }) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItem
        onClick={() => onClick(data)}
        style={{ width: "100%" }}
        className="mx-auto"
        alignItems="center"
      >
        <ListItemAvatar>
          <Avatar alt={`${data?.firtName} ${data.lastName}`} src={data.photo} />
        </ListItemAvatar>
        <ListItemText
          primary={`${data?.firtName} ${data.lastName}`}
          id="listItemText"
          style={{ cursor: "pointer" }}
          secondary={
            <React.Fragment>
              <PhoneIcon style={{ fontSize: 14, marginRight: 5 }} />
              <Typography
                component="span"
                variant="body2"
                style={{ marginRight: 8 }}
                className={classes.inline}
                color="textPrimary"
              >
                {data.phoneNumber}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}
