import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import PhoneIcon from "@material-ui/icons/Phone";
import RecentActorsIcon from "@material-ui/icons/RecentActors";
import LocalTaxiIcon from "@material-ui/icons/LocalTaxi";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import DriverInfoListMobile from "./driverInfoListMobile";
import DriverGuarantorMobile from "./driverGuarantorMobile";
import DriverLicenseModal from "./driverLicenseModal";

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
  },
  pos: {
    marginBottom: 12,
  },
  large: {
    width: theme.spacing(14),
    height: theme.spacing(14),
  },
  buttonStyle: {
    color: "#232f3e",
    borderColor: "#232f3e !important",
    marginTop: 10,
  },
}));

export default function DriverInfoMobile() {
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const { driverInfo } = useSelector((state: any) => ({
    driverInfo: state.Driver.viewDriver,
  }));

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
                style={{ fontSize: 20 }}
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
                <LocalTaxiIcon style={{ marginRight: 10, fontSize: 16 }} />
                <Typography
                  variant="button"
                  style={{ marginTop: 5 }}
                  display="block"
                  gutterBottom
                >
                  {driverInfo.taxiLicense}
                </Typography>
              </div>
              {/* <Typography variant="body1" display="block" gutterBottom>
                {driverInfo.driverLicense}
              </Typography> */}
              <Button
                startIcon={<RecentActorsIcon />}
                variant="outlined"
                color="primary"
                onClick={_onButtonClick}
                className={classes.buttonStyle}
              >
                View Driver's License
              </Button>
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
        <DriverInfoListMobile basicInfo={driverInfo} />
        <hr />
        <DriverGuarantorMobile guarantor={driverInfo.guarrantorInformation} />
      </CardContent>
    </Card>
  );
}
