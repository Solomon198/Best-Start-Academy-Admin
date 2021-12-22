import React from "react";
import Dashboard from "./Paperbase";
import { connect } from "react-redux";
import { LogOut } from "../Auth/auth.actions";
import DialogComponent from "../../components/dialog";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { SnackBarActions } from "../../utilities/utils.actions";
import { GetCvActions } from "./user.actions";
import { User } from "../../types/declarations";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

type Props = {
  LogOut: () => void;
  user: User;
  history?: any;
  snackBar: { severity: string; open: boolean };
  snackBarStatus: string;
  snackBarShow: boolean;
  snackBarMessage: string;
  getCv: (userId: string) => void;
  configureSnack: (payload: {
    show: boolean;
    status?: string;
    message: string;
  }) => void;
};

const mapStateToProps = (state: any) => ({
  state: state.Auth,
  snackBarStatus: state.Utils.snackBarStatus,
  snackBarShow: state.Utils.snackBarShow,
  snackBarMessage: state.Utils.snackBarMessage,
  user: state.Auth.user,
});

const mapDispatchToProps = (dispatch: any) => ({
  getCv: (userId: string) =>
    dispatch({ type: GetCvActions.GET_CV_CALLER, payload: userId }),
  LogOut: () => dispatch({ type: LogOut.LOGOUT_CALLER }),
  configureSnack: (payload: {
    show: boolean;
    status?: string;
    message: string;
  }) => dispatch({ type: SnackBarActions.CONFIGURE_SNACKBAR_CALLER, payload }),
});

class DashboardUser extends React.Component<Props> {
  state = {
    showModal: false,
  };

  componentDidMount() {}

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  logout = () => {
    this.setState({ showModal: false }, () => {
      this.props.LogOut();
    });
  };

  pushLocation(pathName: string) {
    this.props.history.push(pathName);
  }

  navigate(route: string) {
    switch (route) {
      case "/logout": {
        this.toggleModal();
        break;
      }

      default: {
        this.pushLocation(route);
      }
    }
  }
  render() {
    return (
      <>
        <Dashboard
          navigate={(route: string) => this.navigate(route)}
          logOut={() => this.props.LogOut()}
        />

        <Snackbar
          open={this.props.snackBarShow}
          autoHideDuration={12000}
          onClose={() =>
            this.props.configureSnack({
              show: false,
              message: "",
            })
          }
        >
          <Alert
            onClose={() =>
              this.props.configureSnack({
                show: false,
                message: "",
              })
            }
            severity={(this.props.snackBarStatus as any) || "success"}
          >
            {this.props.snackBarMessage}
          </Alert>
        </Snackbar>
        <DialogComponent
          bodyText="Are you sure you want to logout ?"
          buttonText1="Cancel"
          buttonText2="Logout"
          handleClose={this.toggleModal}
          handleAction={this.logout}
          open={this.state.showModal}
          headerTitle="Logout"
        />
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardUser);
