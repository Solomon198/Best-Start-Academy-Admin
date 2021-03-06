import React from "react";
import { connect } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import TextField from "@material-ui/core/TextField";
import "./style.css";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { FolderOpen, Close } from "@material-ui/icons";
import CloudUpload from "@material-ui/icons/CloudUpload";
import CheckIcon from "@material-ui/icons/Check";
import { Avatar } from "@material-ui/core";
import { SnackBarActions } from "../../../utilities/utils.actions";
import CircularProgress from "@material-ui/core/CircularProgress";
import BackDrop from "../../../components/backdrop";
import FileViewer from "@suzubara/react-file-viewer";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import {
  DeleteCredentialAction,
  AddCredentialsAction,
} from "../../user/user.actions";
import { credential } from "../../../types/declarations";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DeleteIcon from "@material-ui/icons/Delete";
import firebase from "firebase";
import DialogComponent from "../../../components/dialog";
import axios from "axios";
import config from "../../../configs/env.config";

const configuration = config();

const mapStateToProps = (state: any) => ({
  cv: state.User.cv,
  addCredentialStatus: state.User.addCredentialStatus,
  deleteCredentialStatus: state.User.deleteCredentialStatus,
  user: state.Auth.user,
});

type Props = {
  cv: any;
  addCredentialStatus: string;
  deleteCredentialStatus: string;
  user: any;
  driverInfo: any;
  uploadNew: boolean;
  close: () => void;

  configureSnack: (payload: {
    show: boolean;
    status?: string;
    message: string;
  }) => void;
  addCredential: (payload: credential) => void;
  deleteCredential: (credentialId: string, userId: string) => void;
};

const mapDispatchStateToProps = (dispatch: any) => ({
  configureSnack: (payload: {
    show: boolean;
    status?: string;
    message: string;
  }) => dispatch({ type: SnackBarActions.CONFIGURE_SNACKBAR_CALLER, payload }),
  addCredential: (payload: credential) =>
    dispatch({ type: AddCredentialsAction.ADD_CREDENTIALS_CALLER, payload }),
  deleteCredential: (credentialId: string, userId: string) =>
    dispatch({
      type: DeleteCredentialAction.DELETE_CREDENTIALS_CALLER,
      payload: { credentialId, userId },
    }),
});

class Credentials extends React.Component<Props> {
  state = {
    addCredential: false,
    file: "",
    filePath: "",
    fileType: "",
    name: "",
    uploading: false,
    progress: 0,
    showDeleteDialog: false,
    previewUrl: "",
    previewType: "",
    deleting: false,
    fileId: "",
    deleteUrl: "",
    term: "",
    session: "",
    viewResult: this.props.uploadNew,
    loading: false,
  };
  showInitials() {
    let showInitials = false;
    if (Object.keys(this.props.cv || {}).length < 1) {
      showInitials = true;
    } else {
      if (this.props.cv.credentials.length < 1) {
        showInitials = true;
      }
    }

    return showInitials;
  }

  status() {
    if (this.state.uploading) {
      const progress = isNaN(this.state.progress) ? 0 : this.state.progress;
      return "Uploading Credential ... " + progress + "%";
    }

    if (
      this.props.deleteCredentialStatus ===
        DeleteCredentialAction.DELETE_CREDENTIALS_STARTED ||
      this.state.deleting
    ) {
      return "Deleting Credential ... ";
    }
    return "Saving Credentials .... ";
  }

  toggleDialog = () => {
    this.setState({ showDeleteDialog: !this.state.showDeleteDialog });
  };

  viewResult() {
    if (!this.state.term || !this.state.session) {
      return this.props.configureSnack({
        message: "Please enter term and session coorectly",
        status: "error",
        show: true,
      });
    }

    this.setState({ loading: true });
    const { session, term } = this.state;
    const { driverLicense } = this.props.driverInfo;

    axios
      .get(configuration.API_ENDPOINT + "/result", {
        params: {
          regNo: driverLicense,
          session,
          term,
        },
      })
      .then((data: any) => {
        this.setState({ loading: false });
        if (!(data as any).data.payload) {
          this.props.configureSnack({
            message: "Could not find result",
            status: "error",
            show: true,
          });
        } else {
          this.setState({
            filePath: data.data.payload.result,
            file: data.data.payload.result,
          });
        }
      })
      .catch((e) => {
        this.setState({ loading: false }, () => {
          this.props.configureSnack({
            message: e.message,
            status: "error",
            show: true,
          });
        });
        console.log(e);
      });
  }

  uploadDocument() {
    if (!this.state.term || !this.state.session) {
      return this.props.configureSnack({
        message: "Please enter term and session coorectly",
        status: "error",
        show: true,
      });
    }
    let time = new Date().getTime();
    this.setState({ uploading: true });
    const storageRef = firebase
      .storage()
      .ref("user/profile")
      .child("IMG" + time);
    const uploadTask = storageRef.put(this.state.file as any);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
      },
      (error) => {
        // Handle unsuccessful uploads
        this.setState({ uploading: false });
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          const { driverLicense } = this.props.driverInfo;
          const { session, term } = this.state;
          const payload = {
            regNo: driverLicense,
            term,
            session,
            result: downloadURL,
          };

          axios
            .post(configuration.API_ENDPOINT + "/result", payload)
            .then((val) => {
              this.setState({ uploading: false, addCredential: false }, () => {
                this.props.close();
                this.props.configureSnack({
                  message: "Result uploaded successfully",
                  status: "success",
                  show: true,
                });
              });
            });

          // this.props.addCredential({
          //   name: this.state.name,
          //   fileType: this.state.fileType,
          //   url: downloadURL,
          //   userId: this.props.user.userId,
          // });
        });
      }
    );
  }

  deleteCredential = async () => {
    this.setState({ deleting: true, showDeleteDialog: false });
    const fileRef = firebase.storage().refFromURL(this.state.deleteUrl);

    try {
      await fileRef.delete();
    } catch (e) {}

    this.setState({ deleting: false }, () => {
      this.props.deleteCredential(this.state.fileId, this.props.user.userId);
    });
  };

  render() {
    console.log(this.props.driverInfo);
    const cv = this.props.cv || {};
    const isRemote = this.state.filePath.indexOf("https") >= 0 ? true : false;
    const doc = [
      {
        uri: this.state.filePath,
        fileType: "application/pdf",
      },
    ];
    console.log(this.state);
    return (
      <div
        style={{
          backgroundColor: "white",
          height: "100%",
          width: "100%",
        }}
      >
        {!this.showInitials() && !this.state.addCredential && (
          <div
            style={{
              height: "100%",
              width: "100%",
              backgroundColor: "white",
            }}
          >
            <div className="row px-3" style={{ width: "100%", height: "100%" }}>
              <div
                className="col-md-7 d-flex flex-column  mt-5 align-items-center text-center mx-auto"
                style={{
                  height: "100%",
                  width: "100%",
                  borderRightWidth: 1,
                  borderRightColor: "rgba(255,255,255,0.05)",
                  borderRightStyle: "solid",
                }}
              >
                <Avatar
                  src={cv.profilePicture}
                  style={{ width: 100, height: 100, marginBottom: 10 }}
                />
                <h5 className="">My Credentials</h5>
                <List style={{ width: "100%" }}>
                  {cv.credentials.map((creds, index) => (
                    <ListItem
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        this.setState({
                          previewUrl: creds.url,
                          previewType: creds.fileType,
                        })
                      }
                    >
                      <ListItemAvatar>
                        <img
                          src="/img/credential.png"
                          alt="credential icon"
                          style={{ width: 40, height: 40 }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        style={{ color: "#000", marginLeft: 10 }}
                        secondaryTypographyProps={{
                          style: { color: "#000" },
                        }}
                        primary={creds.name}
                        secondary={creds.fileType}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          onClick={() =>
                            this.setState({
                              showDeleteDialog: true,
                              fileId: creds.id,
                              deleteUrl: creds.url,
                            })
                          }
                          edge="end"
                          aria-label="comments"
                        >
                          <Avatar style={{ backgroundColor: "#df4759" }}>
                            <DeleteIcon />
                          </Avatar>
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </div>
              <div className="col-md-5" style={{ width: "100%" }}>
                <div
                  className="d-none d-md-block"
                  style={{ width: "100%", height: "100%" }}
                >
                  {this.state.previewUrl ? (
                    <embed
                      src={this.state.previewUrl}
                      type={this.state.previewType}
                      height="100%"
                      width="100%"
                    ></embed>
                  ) : (
                    <div
                      style={{ width: "100%", height: "inherit" }}
                      className=" d-flex flex-column justify-content-center align-items-center"
                    >
                      {this.state.loading ? (
                        <>
                          <h4 className="mt-5">Loading Result .... </h4>
                        </>
                      ) : (
                        <>
                          <h4 className="mt-5">No Previews</h4>
                          <span>Select a Credential to preview</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "white",
          }}
        >
          <div className="row px-3" style={{ width: "100%", height: "100%" }}>
            <div
              className="col-md-4 flex flex-column justify-content-center align-items-center text-center mx-auto"
              style={{ height: "100%", width: "100%", flexDirection: "row" }}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                inputProps={{
                  style: {
                    color: "#000",
                    textAlign: "center",
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: "#000",
                  },
                }}
                type="number"
                className="outline"
                value={this.state.session}
                onChange={(e) => this.setState({ session: e.target.value })}
                id="credential"
                label="Year"
                placeholder="2019"
                color="primary"
                name="credential"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                inputProps={{
                  style: {
                    color: "#000",
                    textAlign: "center",
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: "#000",
                  },
                }}
                type="number"
                className="outline"
                value={this.state.term}
                onChange={(e) => this.setState({ term: e.target.value })}
                id="credenkktial"
                label="Term"
                placeholder="e.g 1 for first term e.t.c."
                color="primary"
                name="credential"
                autoFocus
              />
              {this.state.viewResult && (
                <label style={{ width: "100%" }} htmlFor="btn-upload-file">
                  <input
                    id="btn-upload-file"
                    name="btn-upload-file"
                    style={{ display: "none" }}
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => {
                      let fr = new FileReader();
                      let files: any = e.target.files;
                      let _this = this;
                      let size = (files[0].size / 1000000).toFixed(1);
                      if (parseFloat(size) > 5) {
                        this.props.configureSnack({
                          message: "File size must be less than 5MB",
                          status: "error",
                          show: true,
                        });
                      } else {
                        fr.onload = function (e) {
                          _this.setState({
                            file: files[0],
                            filePath: this.result,
                            fileType: files[0].type,
                          });
                        };

                        fr.readAsDataURL(files[0]);
                      }
                    }}
                  />

                  <Button
                    startIcon={<FolderOpen style={{ marginRight: 10 }} />}
                    endIcon={
                      this.state.file ? (
                        <Avatar
                          style={{ background: "forestgreen", marginLeft: 10 }}
                        >
                          <CheckIcon />
                        </Avatar>
                      ) : null
                    }
                    size="large"
                    variant="outlined"
                    color="primary"
                    style={{ width: "100%" }}
                    component="span"
                  >
                    Select Result
                  </Button>
                </label>
              )}
              {this.state.viewResult && (
                <Button
                  onClick={() => this.uploadDocument()}
                  startIcon={<CloudUpload />}
                  size="large"
                  variant="contained"
                  disabled={!this.state.file}
                  color="primary"
                  style={{ width: "100%" }}
                >
                  {this.state.uploading ? "uploading...." : " Upload Result"}
                </Button>
              )}

              {!this.state.viewResult && (
                <Button
                  onClick={() => this.viewResult()}
                  startIcon={<CloudUpload />}
                  size="large"
                  variant="contained"
                  color="primary"
                  style={{ width: "100%" }}
                >
                  View Result
                </Button>
              )}
              <Button
                onClick={() => this.props.close()}
                startIcon={<Close />}
                size="large"
                variant="contained"
                color="secondary"
                className="mt-3"
                style={{ width: "100%" }}
              >
                Cancel
              </Button>
            </div>
            <div className="col-md-8">
              <div
                className="d-none d-md-block"
                style={{
                  width: window.screen.width / 2,
                  maxWidth: "100%",
                }}
              >
                {this.state.file ? (
                  isRemote ? (
                    <embed
                      style={{
                        width: "100%",
                        height: window.screen.height - 200,
                      }}
                      src={this.state.filePath}
                      type="application/pdf"
                    />
                  ) : (
                    <DocViewer
                      key={Math.random()}
                      config={{
                        header: {
                          disableHeader: true,
                          disableFileName: true,
                          retainURLParams: true,
                        },
                      }}
                      pluginRenderers={DocViewerRenderers}
                      documents={doc}
                    />
                  )
                ) : (
                  <div
                    style={{ width: "100%" }}
                    className=" d-flex flex-column justify-content-center align-items-center"
                  >
                    {this.state.loading ? (
                      <>
                        <h4 className="mt-5">Loading Result .... </h4>
                      </>
                    ) : (
                      <>
                        <h4 className="mt-5">No Previews</h4>
                        <span>Select a Credential to preview</span>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* {this.showInitials() && !this.state.addCredential && (
          <div
            style={{
              height: "100%",
              width: "100%",
              backgroundColor: "white",
            }}
            className="d-flex flex-column justify-content-center align-items-center px-3 text-center"
          >
            <img src="/img/credential.png" alt="credential icon" />
            <h4 className="mt-3">Upload Student Result</h4>
            <span className="">add a result for a student, lorem ipsum</span>
          </div>
        )} */}
        {/* <Fab
          onClick={() =>
            this.setState({
              addCredential: true,
              name: "",
              file: "",
              fileType: "",
              progress: 0,
            })
          }
          color="primary"
          style={{ position: "absolute", bottom: 50, right: 50 }}
          aria-label="add"
        >
          <AddIcon />
        </Fab> */}

        <BackDrop
          open={
            this.props.addCredentialStatus ===
              AddCredentialsAction.ADD_CREDENTIALS_STARTED ||
            this.state.uploading ||
            this.state.deleting ||
            DeleteCredentialAction.DELETE_CREDENTIALS_STARTED ===
              this.props.deleteCredentialStatus
          }
        >
          <CircularProgress color="inherit" />
          <h5 style={{ marginLeft: 20 }}> {this.status()} </h5>
        </BackDrop>
        <DialogComponent
          bodyText="Are you sure you want to delete credential"
          buttonText1="Cancel"
          buttonText2="Delete"
          handleClose={this.toggleDialog}
          handleAction={this.deleteCredential}
          open={this.state.showDeleteDialog}
          headerTitle="Remove Credential"
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchStateToProps)(Credentials);
