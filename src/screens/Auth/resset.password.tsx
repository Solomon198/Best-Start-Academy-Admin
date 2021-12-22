import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import "./styles.sheet.css";
import { connect } from "react-redux";
import { inputAction, ressetPassword } from "./auth.actions";

type Props = {
  ressetPassword: string;
  confirmRessetPassword: string;
  errorRessetPassword: string;
  accessToken: string;
  ressetPasswordStatus: string;
  setConfirmNewPassword: (password: string) => void;
  setNewPassword: (password: string) => void;
  doRessetPassword: (
    payload: { accessToken: string; password: string },
    confirmPassword: string
  ) => void;
};

const mapStoreToProps = (store: any) => ({
  ressetPassword: store.Auth.ressetPassword,
  confirmRessetPassword: store.Auth.confirmRessetPassword,
  errorRessetPassword: store.Auth.errorRessetPassword,
  ressetPasswordStatus: store.Auth.ressetPasswordStatus,
  accessToken: store.Auth.ressetToken,
});

const mapDispatchToProps = (dispatch: any) => ({
  setNewPassword: (password: string) =>
    dispatch({ type: inputAction.SET_NEW_PASSWORD_CALLER, payload: password }),
  setConfirmNewPassword: (password: string) =>
    dispatch({
      type: inputAction.SET_CONFIRM_NEW_PASSWORD_CALLER,
      payload: password,
    }),
  doRessetPassword: (payload: any, confirmPassword) =>
    dispatch({
      type: ressetPassword.RESSET_PASSWORD_CALLER,
      payload,
      confirmPassword,
    }),
});

class RessetPassword extends React.Component<Props> {
  render() {
    return (
      <>
        <Typography className="createAccountTitle" component="h1" variant="h5">
          Set a new password
        </Typography>
        {this.props.errorRessetPassword &&
          this.props.ressetPasswordStatus ===
            ressetPassword.RESSET_PASSWORD_FAILED && (
            <div className="alert alert-danger mt-2" role="alert">
              {this.props.errorRessetPassword}
            </div>
          )}
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          disabled={
            ressetPassword.RESSET_PASSWORD_STARTED ===
            this.props.ressetPasswordStatus
          }
          value={this.props.ressetPassword}
          onChange={(e) => this.props.setNewPassword(e.target.value)}
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          onChange={(e) => this.props.setConfirmNewPassword(e.target.value)}
          required
          disabled={
            ressetPassword.RESSET_PASSWORD_STARTED ===
            this.props.ressetPasswordStatus
          }
          value={this.props.confirmRessetPassword}
          fullWidth
          name="password"
          label="Confirm Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />

        <Button
          fullWidth
          variant="contained"
          onClick={() =>
            this.props.doRessetPassword(
              {
                accessToken: this.props.accessToken,
                password: this.props.ressetPassword,
              },
              this.props.confirmRessetPassword
            )
          }
          disabled={
            ressetPassword.RESSET_PASSWORD_STARTED ===
            this.props.ressetPasswordStatus
          }
          color="primary"
          className="my-3"
        >
          Resset password
          {this.props.ressetPasswordStatus ===
            ressetPassword.RESSET_PASSWORD_STARTED && (
            <span
              className="spinner-border spinner-border-sm ml-3"
              role="status"
              aria-hidden="true"
            ></span>
          )}
        </Button>
      </>
    );
  }
}

export default connect(mapStoreToProps, mapDispatchToProps)(RessetPassword);
