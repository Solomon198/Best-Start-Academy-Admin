import React, { useEffect, useState } from "react";
import {
  Paper,
  TextField,
  Avatar,
  Radio,
  Button,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { Camera, Add } from "@material-ui/icons";
import CircularSpinner from "../../../components/app.spinner";
import Modal from "../../../components/app.modal";
import { useDispatch, useSelector } from "react-redux";
import { AddDriverAccount } from "./actions";

export default function AddAccount() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [driverPhoneNumber, setDriverPhoneNumber] = useState("");
  const [photo, setPhoto] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [photoPreview, setPhotoPreview] = useState("");
  const [driverLicense, setDriverLicense] = useState("");
  const [taxiLicense, SeTtaxiLicense] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [ID, setId] = useState("");
  const [placeOfWork, setPlaceOfWork] = useState("");
  const [positionAtWork, setPositionAtWork] = useState("");
  const [addressOfPlaceOfWork, setAddressOfWork] = useState("");
  const [IDType, setIdType] = useState("");
  const [driverLicensePhoto, setDriverLicensePhoto] = useState("");
  const [driverLicensePhotoPreview, setDriverLicensePhotoPreview] =
    useState("");

  const { AddDriverAccountStatus } = useSelector((store: any) => ({
    AddDriverAccountStatus: store.Driver.AddDriverAccountStatus,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    setFirstName("");
    setDriverPhoneNumber("");
    setLastName("");
    setGender("");
    setPhoto("");
    setPhotoPreview("");
    setDriverLicense("");
    SeTtaxiLicense("");
    setDriverLicensePhoto("");
    setDriverLicensePhotoPreview("");
    setFullName("");
    setPhoneNumber("");
    setAddress("");
    setAddressOfWork("");
    setId("");
    setIdType("");
    setPositionAtWork("");
    setPlaceOfWork("");
  }, [showModal]);

  const isAdding =
    AddDriverAccountStatus ===
    AddDriverAccount.ADD_DRIVER_ACCOUNT_MANAGER_STARTED;
  const addAccount = () => {
    dispatch({
      type: AddDriverAccount.ADD_DRIVER_ACCOUNT_MANAGER_CALLER,
      payload: {
        photo,
        password,
        firstName,
        lastName,
        gender,
        phoneNumber: driverPhoneNumber,
        driverLicensePhoto,
        countryCode: "NG",
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

  return (
    <div>
      <div
        style={{
          position: "absolute",
          right: 10,
          zIndex: 100,
          bottom: 10,
          marginTop: 30,
        }}
      >
        <Fab
          style={{ textTransform: "capitalize" }}
          color="primary"
          variant="extended"
          onClick={() => setShowModal(true)}
        >
          <Add />
          New Student
        </Fab>
      </div>
      <Modal
        open={showModal}
        handleClose={() => (!isAdding ? setShowModal(false) : null)}
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
            Create Driver Account
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
                    setPhotoPreview(this.result as any);
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

          {/* <p style={{ marginBottom: -10 }}>Driver License</p> */}
          {/* <div
            className="my-3"
            style={{
              width: "100%",
              borderColor: "#e8e8e8",
              borderWidth: 1,
              borderStyle: "solid",
              borderRadius: 5,
            }}
          >
            <label
              style={{ width: "100%", display: "block" }}
              htmlFor="btn-upload-driver-License"
            >
              <input
                id="btn-upload-driver-License"
                name="btn-upload"
                style={{ display: "none" }}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  let fr = new FileReader();
                  let files: any = e.target.files;
                  fr.onload = function (e) {
                    setDriverLicensePhoto(files[0]);
                    setDriverLicensePhotoPreview(this.result as any);
                  };
                  fr.readAsDataURL(files[0]);
                }}
              />
              <Avatar
                style={{ width: "100%", height: 150 }}
                variant="square"
                src={driverLicensePhotoPreview}
              />
              <Avatar
                style={{ position: "absolute", top: "55%", right: "50%" }}
              >
                <Camera />
              </Avatar>
            </label>
          </div> */}
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

          <TextField
            id="phone-number-user"
            label="Phone Number"
            variant="outlined"
            fullWidth
            className="mt-3"
            type="number"
            onChange={(e) => setDriverPhoneNumber(e.target.value)}
            value={driverPhoneNumber}
          />

          <div className="row my-3">
            <div className="col-md-12">
              <TextField
                id="license"
                label="Driver License"
                variant="outlined"
                fullWidth
                onChange={(e) => setDriverLicense(e.target.value)}
                value={driverLicense}
              />
            </div>
            {/* <div className="col-md-6">
              <TextField
                value={taxiLicense}
                id="taxi-license"
                label="Taxi license"
                variant="outlined"
                fullWidth
                onChange={(e) => SeTtaxiLicense(e.target.value)}
              />
            </div> */}
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
          <p>Guarrantor Information</p>
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
            {/* <div className="col-md-6">
              <TextField
                id="guarrantor-id"
                label="ID"
                variant="outlined"
                fullWidth
                onChange={(e) => setId(e.target.value)}
                value={ID}
              />
            </div> */}
            {/* <div className="col-md-6">
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-outlined-label">
                  ID type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={IDType}
                  onChange={(e) => setIdType(e.target.value as any)}
                  label="Identity type"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"drl"}>Driver License</MenuItem>
                  <MenuItem value={"nin"}>National Identity Number</MenuItem>
                  <MenuItem value={"vc"}>Voters Card</MenuItem>
                </Select>
              </FormControl>
            </div> */}
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
            onClick={() => addAccount()}
            endIcon={
              isAdding ? (
                <CircularSpinner type="circular" color="#fff" size={20} />
              ) : null
            }
            className="mt-3"
            disableElevation
          >
            {isAdding ? "Adding Driver ..." : "Add driver"}
          </Button>
        </Paper>
      </Modal>
    </div>
  );
}
