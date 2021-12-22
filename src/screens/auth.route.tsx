/* eslint-disable */
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";
import Login from "../screens/Auth/user.login";
import SignUp from "../screens/Auth/user.signup";
import ForgotPassword from "../screens/Auth/user.forgot.password";
import RessetPassword from "../screens/Auth/resset.password";
import Avatar from "@material-ui/core/Avatar";
import Verification from "./Auth/verification";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Config from "../configs/env.config";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      {Config().APP_NAME + " "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: 80,
    height: 80,
  },
  form: {
    width: "90%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    marginRight: "3%",
    marginLeft: "3%",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function AuthRoute() {
  const classes = useStyles();
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid
        style={{
          backgroundImage: 'url("/img/delivery4.png")',
        }}
        item
        xs={false}
        sm={4}
        md={7}
        className={classes.image}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <img className={classes.avatar} src="/img/logo/logo2.jpg" />
          {/* <LockOutlinedIcon /> */}

          <form className={classes.form} noValidate>
            <Router>
              <Switch>
                <Route path="/auth/signup" component={SignUp} />
                <Route path="/auth/login" component={Login} />
                <Route
                  path="/auth/forgot-password"
                  component={ForgotPassword}
                />
                <Route path="/auth/verification" component={Verification} />
                <Route
                  path="/auth/resset-password"
                  component={RessetPassword}
                />
                <Redirect to="/auth/login" />
              </Switch>
            </Router>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default AuthRoute;
