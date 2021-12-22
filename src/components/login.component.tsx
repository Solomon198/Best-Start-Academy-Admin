import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import "./styles.sheet.css";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { inputAction, loginAction } from "../screens/Auth/auth.actions";
import userDashboard from "../screens/user/user.dashboard";

type Props = {
  history: any;
  phoneNumber: string;
  password: string;
  loginStatus: string;
  errorLogin: string;
  setLoginPhoneNumber: (phone: string) => void;
  setLoginPassword: (pwd: string) => void;
  doLogin: (payload: any) => void;
};

const mapStoreToProps = (store: any) => ({
  phoneNumber: store.Auth.lPhoneNumber,
  password: store.Auth.lPassword,
  loginStatus: store.Auth.loginStatus,
  errorLogin: store.Auth.errorLogin,
});

const mapDispatchToProps = (dispatch: any) => ({
  setLoginPhoneNumber: (phone: string) =>
    dispatch({
      type: inputAction.SET_LOGIN_PHONENUMBER_CALLER,
      payload: phone,
    }),
  setLoginPassword: (pwd: string) =>
    dispatch({ type: inputAction.SET_LOGIN_PASSWORD_CALLER, payload: pwd }),
  doLogin: (payload: any) =>
    dispatch({ type: loginAction.LOGIN_CALLER, payload }),
});

class Login extends React.Component<Props> {
  render() {
    return (
      <>
        <Typography
          style={{ fontWeight: "bold", marginBottom: 10 }}
          className=""
          component="h1"
          variant="h5"
        >
          Admin
        </Typography>
        {this.props.errorLogin &&
          this.props.loginStatus === loginAction.LOGIN_FAILED && (
            <div className="alert alert-danger mt-2" role="alert">
              {this.props.errorLogin}
            </div>
          )}
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="number"
          disabled={loginAction.LOGIN_STARTED === this.props.loginStatus}
          id="number"
          label="Phone Number"
          value={this.props.phoneNumber}
          onChange={(e) => this.props.setLoginPhoneNumber(e.target.value)}
          name="number"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          onChange={(e) => this.props.setLoginPassword(e.target.value)}
          required
          disabled={loginAction.LOGIN_STARTED === this.props.loginStatus}
          value={this.props.password}
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />

        <Button
          disabled={loginAction.LOGIN_STARTED === this.props.loginStatus}
          onClick={() =>
            this.props.doLogin({
              phoneNumber: this.props.phoneNumber,
              password: this.props.password,
              countryCode: "NG",
            })
          }
          // onClick={() => this.props.history.push('/dashboard')}
          fullWidth
          variant="contained"
          color="primary"
          className="my-3"
        >
          Sign In
          {/* {this.props.loginStatus === loginAction.LOGIN_STARTED && (
            <span
              className="spinner-border spinner-border-sm ml-3"
              role="status"
              aria-hidden="true"
            ></span>
          )} */}
        </Button>
        {/* {this.props.loginStatus !== loginAction.LOGIN_STARTED && (
          <Grid container>
            <Grid item xs>
              <Link className="links" to="/auth/forgot-password">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link className="links" to="/auth/signup">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        )} */}
      </>
    );
  }
}

export default connect(mapStoreToProps, mapDispatchToProps)(Login);
