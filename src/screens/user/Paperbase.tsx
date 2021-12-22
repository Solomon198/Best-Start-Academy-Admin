import React from "react";
import {
  createMuiTheme,
  createStyles,
  ThemeProvider,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Navigator from "./Navigator";
import Header from "./Header";
import { Switch, Route } from "react-router-dom";
import DriversPage from "./driver/driversPage";
import DriverInfoMobile from "./driver/driverInfoMobile";
import CustomerInfoMobile from "./customer/customerInfoMobile";
import ApplicationInfoMobile from "./application/applicationInfoMobile";
import CustomersPage from "./customer/customersPage";
import SubjectPage from "./subject/driversPage";
import EnvConfigPage from "./envConfig/envConfigPage";
import AdminDashboard from "./adminDashboard/adminPage";
import AdminAccountPage from "./adminAccounts/adminPage";
import Config from "../../configs/env.config";

let theme = createMuiTheme({
  palette: {
    primary: {
      light: "#63ccff",
      main: "#009be5",
      dark: "#006db3",
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: "#18202c",
      },
    },
    MuiButton: {
      label: {
        textTransform: "none",
      },
      contained: {
        "boxShadow": "none",
        "&:active": {
          boxShadow: "none",
        },
      },
    },
    MuiTabs: {
      root: {
        marginLeft: theme.spacing(1),
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: theme.palette.common.white,
      },
    },
    MuiTab: {
      root: {
        textTransform: "none",
        margin: "0 16px",
        minWidth: 0,
        padding: 0,
        [theme.breakpoints.up("md")]: {
          padding: 0,
          minWidth: 0,
        },
      },
    },
    MuiIconButton: {
      root: {
        padding: theme.spacing(1),
      },
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4,
      },
    },
    MuiDivider: {
      root: {
        // backgroundColor: '#404854',
      },
    },
    MuiListItemText: {
      primary: {
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    MuiListItemIcon: {
      root: {
        "color": "inherit",
        "marginRight": 0,
        "& svg": {
          fontSize: 20,
        },
      },
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32,
      },
    },
  },
};

const drawerWidth = 256;

const styles = createStyles({
  root: {
    display: "flex",
    minHeight: "100vh",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  app: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  main: {
    flex: 1,
    background: "#f8f8f8",
  },
  footer: {
    padding: theme.spacing(2),
    background: "#232f3e",
    color: "#f8f8f8",
  },
});

type Props = {
  logOut: () => void;
  navigate: (route: string) => void;
};

export interface PaperbaseProps extends Props, WithStyles<typeof styles> {}

function Paperbase(props: PaperbaseProps) {
  const { classes } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer}>
          <Hidden smUp implementation="js">
            <Navigator
              PaperProps={{
                style: { width: drawerWidth, backgroundColor: "#fafafa" },
              }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              navigate={(route: string) => {
                handleDrawerToggle();
                props.navigate(route);
              }}
            />
          </Hidden>
          <Hidden xsDown implementation="css">
            <Navigator
              navigate={(route: string) => {
                handleDrawerToggle();
                props.navigate(route);
              }}
              PaperProps={{
                style: { width: drawerWidth, backgroundColor: "#fafafa" },
              }}
            />
          </Hidden>
        </nav>
        <div className={classes.app}>
          <Header onDrawerToggle={handleDrawerToggle} />
          <main className={classes.main}>
            <Switch>
              <Route
                exact
                component={CustomersPage}
                path="/dashboard/teachers"
              />

              <Route
                exact
                component={AdminAccountPage}
                path="/dashboard/admin-accounts"
              />
              <Route
                component={CustomerInfoMobile}
                path="/dashboard/customers/customer-information"
              />
              <Route
                component={EnvConfigPage}
                path="/dashboard/environment-configuration"
              />
              <Route exact component={DriversPage} path="/dashboard/students" />
              <Route
                component={DriverInfoMobile}
                path="/dashboard/drivers/driver-information"
              />
              <Route exact component={SubjectPage} path="/dashboard/subjects" />
              <Route
                component={ApplicationInfoMobile}
                path="/dashboard/applications/application-information"
              />
              <Route exact component={AdminDashboard} path="/dashboard" />
            </Switch>
          </main>
        </div>
        <CssBaseline />
      </div>
    </ThemeProvider>
  );
}

export default withStyles(styles)(Paperbase);
