import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import PhoneIcon from "@material-ui/icons/Phone";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Card, Button, Paper, TextField, Radio } from "@material-ui/core";
import { Edit, Camera } from "@material-ui/icons";
import CardContent from "@material-ui/core/CardContent";
import AdminInfoList from "./adminInfoItem";
import { UpdateAdminAccount } from "./actions";
import Modal from "../../../components/app.modal";
import CircularSpinner from "../../../components/app.spinner";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 16,
    // color: '#4fc3f7',
  },
  pos: {
    marginBottom: 12,
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
}));

export default function AdminInfo({ adminInfo }) {
  const classes = useStyles();
  const [firstName, setFirstName] = useState(adminInfo.firtName);
  const [lastName, setLastName] = useState(adminInfo.lastName);
  const [gender, setGender] = useState(adminInfo.gender);
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(adminInfo.photo);
  const [showModal, setShowModal] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(adminInfo.photo);
  const { updateAccountStatus } = useSelector((store: any) => ({
    updateAccountStatus: store.Admin.updateAccountStatus,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    setFirstName(adminInfo.firtName);
    setLastName(adminInfo.lastName);
    setGender(adminInfo.gender);
    setPhoto(adminInfo.photo);
    setPhotoPreview(adminInfo.photo);
  }, [adminInfo]);
  if (!adminInfo) {
    return <div></div>;
  }

  const uploadPayload = () => {
    dispatch({
      type: UpdateAdminAccount.UPDATE__ADMIN_ACCOUNT_MANAGER_CALLER,
      payload: {
        photo,
        password,
        firstName,
        lastName,
        gender,
        userId: adminInfo.userId,
      },
    });
  };
  const isUpdating =
    updateAccountStatus ===
    UpdateAdminAccount.UPDATE__ADMIN_ACCOUNT_MANAGER_STARTED;
  if (!adminInfo) {
    return <div></div>;
  }

  return (
    <Card className={classes.root} style={{ width: "100%" }}>
      <CardContent>
        <div className="d-flex align-items-center mb-5">
          <div className="profile-image mr-5">
            <Avatar
              alt={`${adminInfo.firtName} ${adminInfo.lastName}`}
              src={adminInfo.photo}
              className={classes.large}
              style={{ margin: "auto" }}
            />
          </div>

          <div>
            <div>
              <Typography
                variant="h5"
                style={{ fontSize: 22 }}
                className="mb-2"
                gutterBottom
              >
                {`${adminInfo.firtName} ${adminInfo.lastName}`}
              </Typography>
              <div className="">
                <div className="align-items-center d-flex ">
                  <PhoneIcon style={{ marginRight: 10, fontSize: 16 }} />
                  <Typography
                    variant="button"
                    style={{ marginTop: 3 }}
                    display="block"
                    gutterBottom
                  >
                    {adminInfo.phoneNumber}
                  </Typography>
                </div>
                <Button
                  startIcon={<Edit />}
                  variant="outlined"
                  color="primary"
                  fullWidth
                  className="mt-2"
                  style={{
                    color: "#232f3e",
                    borderColor: "#000",
                    marginTop: 10,
                    marginRight: 1,
                    marginLeft: 1,
                  }}
                  onClick={() => setShowModal(true)}
                  // className={classes.buttonStyle}
                >
                  Edit profile
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Modal
          open={showModal}
          handleClose={() => (!isUpdating ? setShowModal(false) : null)}
        >
          <Paper
            style={{
              backgroundColor: "white",
              width: "40%",
              height: "100%",
              borderRadius: 5,
              marginTop: 10,
              padding: 50,
              position: "absolute",
              left: "30%",
            }}
          >
            <h5 style={{ fontWeight: "bold", marginBottom: 20 }}>
              Edit Profile
            </h5>

            <div className=" w-100 mb-3">
              <label htmlFor="btn-upload">
                <input
                  id="btn-upload"
                  name="btn-upload"
                  style={{ display: "none" }}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    let fr = new FileReader();
                    let files: any = e.target.files;
                    fr.onload = function (e) {
                      setPhoto(files[0]);
                      setPhotoPreview(this.result);
                    };
                    fr.readAsDataURL(files[0]);
                  }}
                />
                <Avatar
                  alt="Remy Sharp"
                  src={photoPreview}
                  style={{ width: 100, height: 100 }}
                />
                <Avatar style={{ marginTop: -30, marginLeft: 60 }}>
                  <Camera />
                </Avatar>
              </label>
            </div>
            <div className="row">
              <div className="col-md-6">
                <TextField
                  id="outlined-basic"
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                />
              </div>
              <div className="col-md-6">
                <TextField
                  value={lastName}
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            {/* 
            <TextField
              id="outlined-basic"
              label="Email Address"
              variant="outlined"
              fullWidth
              type="email"
              className="my-2"
              value={}
            /> */}

            <div
              className="row mx-1 py-2 my-3"
              style={{ backgroundColor: "#f4f4f4", borderRadius: 5 }}
            >
              <div className="col-md-6">
                <Radio
                  // onChange={handleChange}
                  checked={gender === "male"}
                  name="radio-button-demo"
                  inputProps={{ "aria-label": "A" }}
                  value="male"
                  onChange={(e) => setGender(e.target.value)}
                />
                <span>Male</span>
              </div>
              <div className="col-md-6">
                <Radio
                  onChange={(e) => setGender(e.target.value)}
                  value="female"
                  checked={gender === "female"}
                  name="radio-button-demo"
                  inputProps={{ "aria-label": "A" }}
                />
                <span>Female</span>
              </div>
            </div>
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              value={password}
              className="my-2"
            />

            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => uploadPayload()}
              endIcon={
                isUpdating ? (
                  <CircularSpinner type="circular" color="#fff" size={20} />
                ) : null
              }
              className="mt-3"
              disableElevation
            >
              {isUpdating ? "Updating profile ..." : "Update Profile"}
            </Button>
          </Paper>
        </Modal>
        <AdminInfoList user={adminInfo} userId={adminInfo.userId || ""} />
      </CardContent>
    </Card>
  );
}
