import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import PhoneIcon from "@material-ui/icons/Phone";
import { Edit, Camera } from "@material-ui/icons";
import RecentActorsIcon from "@material-ui/icons/RecentActors";
import Contacts from "@material-ui/icons/Contacts";
import Card from "@material-ui/core/Card";
import {
  CardContent,
  Paper,
  TextField,
  Radio,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import DriverInfoList from "./driverInfoList";
import DriverGuarantor from "./driverGuarantor";
import DriverLicenseModal from "./driverLicenseModal";
import CircularSpinner from "../../../components/app.spinner";
import Modal from "../../../components/app.modal";
import { UpdateDriverAccount } from "./actions";

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
  buttonStyle: {
    color: "#232f3e",
    borderColor: "#232f3e !important",
    marginTop: 10,
    marginRight: 1,
    marginLeft: 1,
  },
}));

export default function DriverInfo({ driverInfo, result }) {
  const [open, setOpen] = useState(false);
  console.log(driverInfo);
  const classes = useStyles();
  const [firstName, setFirstName] = useState(driverInfo.firstName);
  const [lastName, setLastName] = useState(driverInfo.lastName);
  const [gender, setGender] = useState(driverInfo.gender);
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(driverInfo.photo);
  const [showModal, setShowModal] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(driverInfo.photo);
  const [driverLicense, setDriverLicense] = useState(driverInfo.driverLicense);
  const [taxiLicense, SeTtaxiLicense] = useState(driverInfo.taxiLicense);
  const [fullName, setFullName] = useState(
    driverInfo.guarrantorInformation.fullName
  );
  const [phoneNumber, setPhoneNumber] = useState(
    driverInfo.guarrantorInformation.phoneNumber
  );
  const [address, setAddress] = useState(
    driverInfo.guarrantorInformation.address
  );
  const [ID, setId] = useState(driverInfo.guarrantorInformation.ID);
  const [placeOfWork, setPlaceOfWork] = useState(
    driverInfo.guarrantorInformation.placeOfWork
  );
  const [positionAtWork, setPositionAtWork] = useState(
    driverInfo.guarrantorInformation.positionAtWork
  );
  const [addressOfPlaceOfWork, setAddressOfWork] = useState(
    driverInfo.guarrantorInformation.addressOfPlaceOfWork
  );
  const [IDType, setIdType] = useState(driverInfo.guarrantorInformation.IDType);

  const [driverLicensePhoto, setDriverLicensePhoto] = useState(
    driverInfo.driverLicensePhoto
  );
  const [driverLicensePhotoPreview, setDriverLicensePhotoPreview] = useState(
    driverInfo.driverLicensePhoto
  );

  const dispatch = useDispatch();

  const { updateAccountStatus } = useSelector((store: any) => ({
    updateAccountStatus: store.Driver.updateAccountStatus,
  }));

  const uploadPayload = () => {
    dispatch({
      type: UpdateDriverAccount.UPDATE_DRIVER_ACCOUNT_MANAGER_CALLER,
      payload: {
        photo,
        password,
        firstName,
        lastName,
        gender,
        userId: driverInfo.userId,
        driverLicensePhoto,
        taxiLicense,
        driverLicense,
        guarrantorInformation: {
          fullName,
          phoneNumber,
          address,
          ID,
          placeOfWork,
          positionAtWork,
          addressOfPlaceOfWork,
          IDType,
        },
      },
    });
  };

  useEffect(() => {
    setFirstName(driverInfo.firstName);
    setLastName(driverInfo.lastName);
    setGender(driverInfo.gender);
    setPhoto(driverInfo.photo);
    setPhotoPreview(driverInfo.photo);
    setDriverLicense(driverInfo.driverLicense);
    SeTtaxiLicense(driverInfo.taxiLicense);
    setDriverLicensePhoto(driverInfo.driverLicensePhoto);
    setDriverLicensePhotoPreview(driverInfo.driverLicensePhoto);
    setFullName(driverInfo.guarrantorInformation.fullName);
    setPhoneNumber(driverInfo.guarrantorInformation.phoneNumber);
    setAddress(driverInfo.guarrantorInformation.address);
    setAddressOfWork(driverInfo.guarrantorInformation.addressOfPlaceOfWork);
    setId(driverInfo.guarrantorInformation.ID);
    setIdType(driverInfo.guarrantorInformation.IDType);
    setPositionAtWork(driverInfo.guarrantorInformation.positionAtWork);
    setPlaceOfWork(driverInfo.guarrantorInformation.placeOfWork);
  }, [driverInfo]);
  if (!driverInfo) {
    return <div></div>;
  }

  const isUpdating =
    updateAccountStatus ===
    UpdateDriverAccount.UPDATE_DRIVER_ACCOUNT_MANAGER_STARTED;

  if (!driverInfo) {
    return <div></div>;
  }

  const handleClose = () => {
    setOpen(false);
  };

  const _onButtonClick = () => {
    setOpen(true);
  };

  return (
    <Card className={classes.root} style={{ width: "100%" }}>
      <CardContent>
        <div className="d-flex mb-5">
          <div className="profile-image mr-5">
            <Avatar
              alt={`${driverInfo.firstName} ${driverInfo.lastName}`}
              src={driverInfo.photo}
              className={classes.large}
              style={{ margin: "auto" }}
            />
          </div>
          <div>
            <div className="d-flex flex-column">
              <Typography
                variant="h5"
                style={{ fontSize: 22 }}
                className="mb-2"
                gutterBottom
              >
                {`${driverInfo.firstName} ${driverInfo.lastName}`}
              </Typography>
              <div className="d-flex align-items-center mb-1">
                <PhoneIcon style={{ marginRight: 10, fontSize: 16 }} />
                <Typography variant="button" display="block" gutterBottom>
                  {driverInfo.phoneNumber}
                </Typography>
              </div>
              <div className="d-flex align-items-center">
                <Contacts style={{ marginRight: 10, fontSize: 16 }} />
                <Typography
                  variant="button"
                  style={{ marginTop: 5 }}
                  display="block"
                  gutterBottom
                >
                  {driverInfo.driverLicense}
                </Typography>
              </div>

              <div className="d-flex justify-content-between">
                <div>
                  <Button
                    startIcon={<Edit />}
                    variant="outlined"
                    color="primary"
                    onClick={() => setShowModal(true)}
                    className={classes.buttonStyle}
                  >
                    Edit profile
                  </Button>
                </div>
              </div>
              {open ? (
                <DriverLicenseModal
                  driverInfo={driverInfo}
                  open={open}
                  handleClose={handleClose}
                />
              ) : null}
            </div>
          </div>
        </div>
        <div className="d-flex flex-row">
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => result(true)}
            endIcon={
              isUpdating ? (
                <CircularSpinner type="circular" color="#fff" size={20} />
              ) : null
            }
            className="m-3"
            disableElevation
          >
            Upload New Result
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={() => result(false)}
            endIcon={
              isUpdating ? (
                <CircularSpinner type="circular" color="#fff" size={20} />
              ) : null
            }
            className="m-3"
            disableElevation
          >
            View Result
          </Button>
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
              overflow: "scroll",
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

            <div className="row my-3">
              <div className="col-md-12">
                <TextField
                  id="license"
                  label="Registration number"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setDriverLicense(e.target.value)}
                  value={driverLicense}
                />
              </div>
            </div>

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
            <p>Guardian / Parent Information</p>
            <div className="row">
              <div className="col-md-6">
                <TextField
                  id="fullname"
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setFullName(e.target.value)}
                  value={fullName}
                />
              </div>
              <div className="col-md-6">
                <TextField
                  value={phoneNumber}
                  type="number"
                  id="outlined-basic"
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>

            <div className="row my-3">
              <div className="col-md-6">
                <TextField
                  id="place-of-work"
                  label="Place of Work"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setPlaceOfWork(e.target.value)}
                  value={placeOfWork}
                />
              </div>
              <div className="col-md-6">
                <TextField
                  id="positionAtWOrk"
                  label="Position at Work"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setPositionAtWork(e.target.value)}
                  value={positionAtWork}
                />
              </div>
            </div>

            <div className="row my-3">
              <div className="col-md-6">
                <TextField
                  id="Address of work"
                  label="Address of place of Work"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setAddressOfWork(e.target.value)}
                  value={addressOfPlaceOfWork}
                />
              </div>
              <div className="col-md-6">
                <TextField
                  value={address}
                  id="address"
                  label="Address"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setAddress(e.target.value)}
                />
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
        <DriverInfoList driver={driverInfo} driverId={driverInfo.userId} />
        <hr />
        <DriverGuarantor guarantor={driverInfo.guarrantorInformation} />
      </CardContent>
    </Card>
  );
}
