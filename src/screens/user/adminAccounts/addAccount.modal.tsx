import React, { useEffect, useState } from "react";
import {
  Paper,
  TextField,
  Avatar,
  Radio,
  Button,
  Fab,
} from "@material-ui/core";
import { Camera, Add } from "@material-ui/icons";
import CircularSpinner from "../../../components/app.spinner";
import Modal from "../../../components/app.modal";
import { useDispatch, useSelector } from "react-redux";
import { AddAdminAccount } from "./actions";

export default function AddAccount() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [photo, setPhoto] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [photoPreview, setPhotoPreview] = useState("");
  const { addAdminAccountStatus } = useSelector((store: any) => ({
    addAdminAccountStatus: store.Admin.addAdminAccountStatus,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    setFirstName("");
    setLastName("");
    setGender("");
    setPhoto("");
    setPhotoPreview("");
    setPhoneNumber("");
    setPassword("");
  }, [showModal]);
  const isAdding =
    addAdminAccountStatus === AddAdminAccount.ADD_ADMIN_ACCOUNT_MANAGER_STARTED;
  const addAccount = () => {
    dispatch({
      type: AddAdminAccount.ADD_ADMIN_ACCOUNT_MANAGER_CALLER,
      payload: {
        photo,
        password,
        firstName,
        lastName,
        gender,
        phoneNumber,
        countryCode: "NG",
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
          New Admin
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
          }}
        >
          <h5 style={{ fontWeight: "bold", marginBottom: 20 }}>Create Admin</h5>

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
            value={phoneNumber}
            id="phone-number"
            label="Phone Number"
            variant="outlined"
            type="number"
            fullWidth
            className="mt-3"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

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
            onClick={() => addAccount()}
            endIcon={
              isAdding ? (
                <CircularSpinner type="circular" color="#fff" size={20} />
              ) : null
            }
            className="mt-3"
            disableElevation
          >
            {isAdding ? "Creating admin ..." : "Add admin"}
          </Button>
        </Paper>
      </Modal>
    </div>
  );
}
