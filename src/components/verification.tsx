import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import {
  inputAction,
  verifyPin,
  sendVerificationPin,
} from "../screens/Auth/auth.actions";

type Props = {
  vCode: string;
  token: string;
  history: any;
  location: any;
  verifyPinStatus: string;
  phoneNumber: string;
  errorVerification: string;
  sendVerificationPinStatus: string;
  errorVerifyPin: string;
  setVCode: (vCode: string) => void;
  verifyCode: (
    vCode: string,
    token: string,
    history: any,
    isResset: boolean
  ) => void;
  sendVerificationPin: (payload: any) => void;
};
const mapStateToProps = (store: any) => ({
  vCode: store.Auth.vCode,
  token: store.Auth.token,
  verifyPinStatus: store.Auth.verifyPinStatus,
  errorVerifyPin: store.Auth.errorVerifyPin,
  phoneNumber: store.Auth.phoneNumber,
  errorVerification: store.Auth.errorVerification,
  sendVerificationPinStatus: store.Auth.sendVerificationPin,
});

const mapDispatchToProps = (dispatch: any) => ({
  setVCode: (vCode: string) =>
    dispatch({
      type: inputAction.SET_VERIFICATION_CODE_CALLER,
      payload: vCode,
    }),
  verifyCode: (vCode: string, token: string, history: any, isResset: boolean) =>
    dispatch({
      type: verifyPin.VERIFYING_PIN_CALLER,
      payload: { pin: vCode, token, history },
      isResset,
    }),
  sendVerificationPin: (payload: any) =>
    dispatch({
      type: sendVerificationPin.SEND_VERIFICATION_PIN_CALLER,
      payload,
    }),
});

class Verification extends React.Component<Props> {
  render() {
    return (
      <>
        <div className="text-center">
          <Typography component="h1" variant="h5">
            Enter Verification Code
          </Typography>
          {this.props.errorVerifyPin &&
            this.props.verifyPinStatus === verifyPin.VERIFYING_PIN_FAILED && (
              <div className="alert alert-danger mt-2" role="alert">
                {this.props.errorVerifyPin}
              </div>
            )}
          {this.props.errorVerification &&
            this.props.sendVerificationPinStatus ===
              sendVerificationPin.SEND_VERIFICATION_PIN_FAILED && (
              <div className="alert alert-danger mt-2" role="alert">
                {this.props.errorVerification}
              </div>
            )}
        </div>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          disabled={
            this.props.verifyPinStatus === verifyPin.VERIFYING_PIN_STARTED
          }
          type="number"
          id="email"
          label="Enter Code"
          name="email"
          value={this.props.vCode}
          onChange={({ target: { value } }) => this.props.setVCode(value)}
          autoFocus
          className="text-center"
        />

        <Button
          disabled={
            this.props.verifyPinStatus === verifyPin.VERIFYING_PIN_STARTED
          }
          onClick={() =>
            this.props.verifyCode(
              this.props.vCode,
              this.props.token,
              this.props.history,
              this.props.location.isResset
            )
          }
          fullWidth
          variant="contained"
          color="primary"
        >
          Verify Verification code
          {this.props.verifyPinStatus === verifyPin.VERIFYING_PIN_STARTED && (
            <span
              className="spinner-border spinner-border-sm ml-3"
              role="status"
              aria-hidden="true"
            ></span>
          )}
        </Button>
        <p style={{ fontSize: 12, marginTop: 10 }}>
          A verification code has been sent to the phone number you registered
          please enter the verification to verify your account
        </p>
        <Grid container>
          <Grid item xs></Grid>
          <Grid item>
            <Button
              disabled={
                this.props.sendVerificationPinStatus ===
                sendVerificationPin.SEND_VERIFICATION_PIN_STARTED
              }
              onClick={() =>
                this.props.sendVerificationPin({
                  phoneNumber: this.props.phoneNumber,
                  countryCode: "NG",
                })
              }
            >
              {"Resend SMS"}
              {this.props.sendVerificationPinStatus ===
                sendVerificationPin.SEND_VERIFICATION_PIN_STARTED && (
                <span
                  className="spinner-border spinner-border-sm ml-3"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
            </Button>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Verification);
