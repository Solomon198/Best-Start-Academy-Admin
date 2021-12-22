import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PhoneIcon from '@material-ui/icons/Phone';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ApplicationGuarantor from './applicationGuarantor';
import ApplicationLicenseModal from './applicationLicenseModal';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
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
    color: '#232f3e',
    borderColor: '#232f3e !important',
    marginTop: 10,
  },
}));

export default function ApplicationInfo({ appInfo }) {
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  if (!appInfo) {
    return <div></div>;
  }

  const handleClose = () => {
    setOpen(false);
  };

  const _onButtonClick = () => {
    setOpen(true);
  };

  return (
    <Card className={classes.root} style={{ width: '100%' }}>
      <CardContent>
        <div className="d-flex mb-5">
          <div className="profile-image mr-5">
            <Avatar
              alt={`${appInfo.firstName} ${appInfo.lastName}`}
              src={appInfo.photo}
              className={classes.large}
              style={{ margin: 'auto' }}
            />
          </div>
          <div>
            <div>
              <Typography
                variant="h5"
                style={{ fontSize: 22 }}
                gutterBottom
              >{`${appInfo.firstName} ${appInfo.lastName}`}</Typography>

              <div className="d-flex align-items-center mb-1">
                <PhoneIcon style={{ marginRight: 10, fontSize: 16 }} />
                <Typography variant="button" display="block" gutterBottom>
                  {appInfo.phoneNumber}
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
                  {appInfo.taxiLicense}
                </Typography>
              </div>
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
                <ApplicationLicenseModal
                  appInfo={appInfo}
                  open={open}
                  handleClose={handleClose}
                />
              ) : null}
            </div>
          </div>
        </div>
        {/* <DriverInfoList basicInfo={appInfo} /> */}
        <hr />
        <ApplicationGuarantor
          appInfo={appInfo}
          guarantor={appInfo.guarrantorInformation}
        />
      </CardContent>
    </Card>
  );
}
