import React, { useState } from "react";
import clsx from "clsx";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import "../Auth/styles.sheet.css";
import Drawer, { DrawerProps } from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Dashboard from "@material-ui/icons/Dashboard";
import AirplayIcon from "@material-ui/icons/Airplay";
import WorkIcon from "@material-ui/icons/Work";
import { Security } from "@material-ui/icons";
import PeopleIcon from "@material-ui/icons/People";
import LogoutIcon from "@material-ui/icons/Power";
import SettingsInputComponentIcon from "@material-ui/icons/SettingsInputComponent";
import { Omit } from "@material-ui/types";
import { useLocation } from "react-router-dom";
import Config from "../../configs/env.config";

const styles = (theme: Theme) =>
  createStyles({
    categoryHeader: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    categoryHeaderPrimary: {
      color: theme.palette.common.black,
    },
    item: {
      "paddingTop": 5,
      "paddingBottom": 5,
      "marginBottom": 10,
      "color": "#232f3e",
      "&:hover": {
        // backgroundColor: 'rgba(255, 255, 255, 0.08)',
        backgroundColor: "#e6ebf1",
      },
      "&:focus": {
        // color: '#425874',
        color: "#11329c",
        backgroundColor: "#e3e9fc",
      },
    },
    itemCategory: {
      backgroundColor: "#fafafa",
      boxShadow: "0 -1px 0 #f1f1f1 inset",
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    firebase: {
      fontSize: 24,
      color: theme.palette.common.white,
      textAlign: "center",
    },
    itemActiveItem: {
      color: "#0a0e13",
    },
    itemPrimary: {
      fontSize: "inherit",
    },
    itemIcon: {
      minWidth: "auto",
      marginRight: theme.spacing(2),
      color: "#232f3e",
    },
    divider: {
      marginTop: theme.spacing(2),
    },
  });

type Props = {
  navigate: (route: string) => void;
};

export interface NavigatorProps
  extends Props,
    Omit<DrawerProps, "classes">,
    WithStyles<typeof styles> {}

function Navigator(props: NavigatorProps) {
  const { classes, ...other } = props;
  const [categories, setCategories] = useState([
    {
      id: "",
      children: [
        { id: "Dashboard", icon: <WorkIcon />, route: "/dashboard" },
        {
          id: "Admin Accounts",
          icon: <Security />,
          route: "/dashboard/admin-accounts",
          // route: '/dashboard/credentials',
        },
        {
          id: "Students",
          icon: <PeopleIcon />,
          route: "/dashboard/students",
          // route: '/dashboard/credentials',
        },
        {
          id: "Teachers",
          icon: <PeopleIcon />,
          route: "/dashboard/teachers",
        },
        {
          id: "Subjects",
          icon: <AirplayIcon />,
          route: "/dashboard/subjects",
        },
        {
          id: "Result Manager",
          icon: <Dashboard />,
          route: "/dashboard/subjects",
        },
        // {
        //   id: "Environment Configuration",
        //   icon: <SettingsInputComponentIcon />,
        //   route: "/dashboard/environment-configuration",
        // },
        // { id: "Help", icon: <HelpIcon />, route: "/dashboard/help" },
        { id: "LogOut", icon: <LogoutIcon />, route: "/logout" },
      ],
    },
  ]);
  const location = useLocation();

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem
          className={clsx(classes.firebase, classes.item, classes.itemCategory)}
        >
          {/* {Config().APP_NAME} */}
          <img
            src="/img/logo/logo1.jpg"
            style={{ width: 60, margin: "auto" }}
          />
        </ListItem>

        {categories.map(({ id, children }) => (
          <React.Fragment key={id}>
            {children.map(({ id: childId, icon, route }) => (
              <ListItem
                key={childId}
                onClick={() => props.navigate(route)}
                button
                className={clsx(
                  classes.item,
                  route === location.pathname && classes.itemActiveItem
                )}
              >
                <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.itemPrimary,
                  }}
                >
                  {childId}
                </ListItemText>
              </ListItem>
            ))}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}

export default withStyles(styles)(Navigator);
