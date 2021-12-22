import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { sendVerificationPin, inputAction } from "../screens/Auth/auth.actions";

type Props = {
  sendVerificationPin: (payload: any, history: any) => void;
  setRessetPasswordPhoneNumber: (phoneNumber: string) => void;
  ressetPasswordPhoneNumber: string;
  sendVerificationPinStatus: string;
  errorVerification: string;
  history: any;
};
const mapStateToProps = (store: any) => ({
  ressetPasswordPhoneNumber: store.Auth.ressetPasswordPhoneNumber,
  sendVerificationPinStatus: store.Auth.sendVerificationPin,
  errorVerification: store.Auth.errorVerification,
});

const mapDispatchToProps = (dispatch: any) => ({
  sendVerificationPin: (payload: any, history: any) =>
    dispatch({
      type: sendVerificationPin.SEND_VERIFICATION_PIN_CALLER,
      payload,
      history,
    }),
  setRessetPasswordPhoneNumber: (phoneNumber: string) =>
    dispatch({
      type: inputAction.SET_VERIFY_RESSET_PASSWORD_PHONE_NUMBER_CALLER,
      payload: phoneNumber,
    }),
});

class ForgotPassord extends React.Component<Props> {
  render() {
    return (
      <>
        <div className="text-center">
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
        </div>

        {this.props.errorVerification &&
          this.props.sendVerificationPinStatus ===
            sendVerificationPin.SEND_VERIFICATION_PIN_FAILED && (
            <div className="alert alert-danger mt-2" role="alert">
              {this.props.errorVerification}
            </div>
          )}

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          disabled={
            sendVerificationPin.SEND_VERIFICATION_PIN_STARTED ===
            this.props.sendVerificationPinStatus
          }
          value={this.props.ressetPasswordPhoneNumber}
          onChange={({ target: { value } }) =>
            this.props.setRessetPasswordPhoneNumber(value)
          }
          type="number"
          id="phoneNumber"
          label="Phone Number"
          name="phoneNumber"
          autoFocus
        />

        <Button
          onClick={() =>
            this.props.sendVerificationPin(
              {
                phoneNumber: this.props.ressetPasswordPhoneNumber,
                countryCode: "NG",
              },
              this.props.history
            )
          }
          disabled={
            sendVerificationPin.SEND_VERIFICATION_PIN_STARTED ===
            this.props.sendVerificationPinStatus
          }
          fullWidth
          variant="contained"
          color="primary"
          className="my-3"
        >
          Send Verification Code
        </Button>
        <Grid container>
          <Grid item xs></Grid>
          <Grid item>
            <Link className="links" to="/auth/signup">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassord);
