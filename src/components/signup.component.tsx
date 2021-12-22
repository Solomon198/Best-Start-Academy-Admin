import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import "./styles.sheet.css";
import { connect } from "react-redux";
import { inputAction, signUpAction } from "../screens/Auth/auth.actions";

type Props = {
  fullName: string;
  password: string;
  phoneNumber: string;
  history: any;
  signUpStatus?: string;
  errorSignUp: string;

  setFullName: (text: string) => void;
  setPassword: (text: string) => void;
  setPhoneNumber: (text: string) => void;
  doSignUp: (payload: any, navigation: any) => void;
};
const mapStoreToProps = (store: any) => ({
  fullName: store.Auth.fullName,
  password: store.Auth.password,
  signUpStatus: store.Auth.signUpStatus,
  phoneNumber: store.Auth.phoneNumber,
  errorSignUp: store.Auth.errorSignUp,
});

const mapDispatchToProps = (dispatch: any) => ({
  setFullName: (text: string) =>
    dispatch({ type: inputAction.SET_SIGNUP_FULLNAME_CALLER, payload: text }),
  setPassword: (text: string) =>
    dispatch({ type: inputAction.SET_SIGNUP_PASSWORD_CALLER, payload: text }),
  setPhoneNumber: (text: string) =>
    dispatch({
      type: inputAction.SET_SIGNUP_PHONENUMBER_CALLER,
      payload: text,
    }),
  doSignUp: (payload: any, navigation: any) =>
    dispatch({ type: signUpAction.SIGNUP_CALLER, payload, navigation }),
});

class SignUP extends Component<Props> {
  render() {
    return (
      <>
        <Typography className="createAccountTitle" component="h1" variant="h5">
          Create Account
        </Typography>
        {this.props.errorSignUp &&
          this.props.signUpStatus === signUpAction.SIGNUP_FAILED && (
            <div className="alert alert-danger mt-2" role="alert">
              {this.props.errorSignUp}
            </div>
          )}
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={this.props.fullName}
          onChange={(e) => this.props.setFullName(e.target.value)}
          id="fullName"
          label="Full Name"
          name="fullName"
          disabled={this.props.signUpStatus === signUpAction.SIGNUP_STARTED}
          type="text"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="phoneNumber"
          onChange={(e) => this.props.setPhoneNumber(e.target.value)}
          label="Phone Number"
          value={this.props.phoneNumber}
          name="phoneNumber"
          type="number"
          disabled={this.props.signUpStatus === signUpAction.SIGNUP_STARTED}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          value={this.props.password}
          label="Password"
          onChange={(e) => this.props.setPassword(e.target.value)}
          type="password"
          id="password"
          disabled={this.props.signUpStatus === signUpAction.SIGNUP_STARTED}
          autoComplete="current-password"
        />

        <Button
          disabled={this.props.signUpStatus === signUpAction.SIGNUP_STARTED}
          fullWidth
          variant="contained"
          color="primary"
          className="my-3"
          onClick={() => {
            this.props.doSignUp(
              {
                phoneNumber: this.props.phoneNumber,
                password: this.props.password,
                countryCode: "NG",
                fullName: this.props.fullName,
              },
              this.props.history
            );
          }}
        >
          Sign Up
          {this.props.signUpStatus === signUpAction.SIGNUP_STARTED && (
            <span
              className="spinner-border spinner-border-sm ml-3"
              role="status"
              aria-hidden="true"
            ></span>
          )}
        </Button>
        <Grid container>
          <Grid item xs></Grid>
          <Grid item>
            <Link className="links" to="/auth/login">
              {"Have an account? Login"}
            </Link>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default connect(mapStoreToProps, mapDispatchToProps)(SignUP);
