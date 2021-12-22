import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Avatar from '@material-ui/core/Avatar';

function rand() {
  return 0;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    right: '50%',
    top: '10%',
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      padding: theme.spacing(2, 4, 3),
    },
    large: {
      width: theme.spacing(100),
      height: theme.spacing(50),
    },
  })
);

export default function DriverLicenseModal({ driverInfo, open, handleClose }) {
  const classes = useStyles();
  //   getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div style={{ textAlign: 'center' }}>
        <Avatar
          variant="square"
          alt={`${driverInfo.firstName} ${driverInfo.lastName}`}
          src={driverInfo.driverLicensePhoto}
          className={classes.large}
          style={{ margin: 'auto' }}
        />
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
