import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import {
  AcceptedApplicationActions,
  DeclinedApplicationActions,
} from './actions';
import CircularSpinner from '../../../components/app.spinner';
import ApplicationDeclineMessage from './applicationDeclineMessageModal';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ApplicationGuarantor({ guarantor, appInfo }) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const {
    declineMessage,
    gettingAcceptedApplicationStatus,
    gettingDeclinedApplicationStatus,
  } = useSelector((state: any) => ({
    declineMessage: state.Application.declineMessage,
    gettingAcceptedApplicationStatus:
      state.Application.gettingAcceptedApplicationStatus,
    gettingDeclinedApplicationStatus:
      state.Application.gettingDeclinedApplicationStatus,
  }));
  if (!guarantor) {
    return <div></div>;
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDecline = () => {
    dispatch({
      type: DeclinedApplicationActions.APPLICATION_DECLINED_CALLER,
      payload: { userId: appInfo.userId, reason: declineMessage },
    });

    setOpen(false);
  };

  const isStartedLoadingStatusForAccept =
    AcceptedApplicationActions.APPLICATION_ACCEPTED_STARTED ===
    gettingAcceptedApplicationStatus;

  const isSuccessLoadingStatusForAccept =
    AcceptedApplicationActions.APPLICATION_ACCEPTED_SUCCESS ===
    gettingAcceptedApplicationStatus;

  const isStartedLoadingStatusForDecline =
    DeclinedApplicationActions.APPLICATION_DECLINED_STARTED ===
    gettingDeclinedApplicationStatus;

  const isSuccessLoadingStatusForDecline =
    DeclinedApplicationActions.APPLICATION_DECLINED_SUCCESS ===
    gettingDeclinedApplicationStatus;

  return (
    <>
      <div style={{ marginTop: '20px', paddingBottom: '80px' }}>
        <h3
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            marginBottom: '20px',
          }}
        >
          Guarantor
        </h3>
        <div className="d-flex justify-content-around mb-4">
          <div>
            <Typography variant="button" display="block" gutterBottom>
              Full Name
            </Typography>
            <Typography variant="button" display="block" gutterBottom>
              ID
            </Typography>
            <Typography variant="button" display="block" gutterBottom>
              ID Type
            </Typography>
            <Typography variant="button" display="block" gutterBottom>
              Phone NO
            </Typography>
            <Typography variant="button" display="block" gutterBottom>
              Address
            </Typography>
            <Typography variant="button" display="block" gutterBottom>
              Work Address
            </Typography>
          </div>
          <div>
            <Typography
              variant="button"
              className="text-muted"
              display="block"
              gutterBottom
            >
              {guarantor.fullName}
            </Typography>
            <Typography
              variant="button"
              className="text-muted"
              display="block"
              gutterBottom
            >
              {guarantor.ID}
            </Typography>
            <Typography
              variant="button"
              className="text-muted"
              display="block"
              gutterBottom
            >
              {guarantor.IDType}
            </Typography>
            <Typography
              variant="button"
              className="text-muted"
              display="block"
              gutterBottom
            >
              {guarantor.phoneNumber}
            </Typography>
            <Typography
              variant="button"
              className="text-muted"
              display="block"
              gutterBottom
            >
              {guarantor.address}
            </Typography>
            <Typography
              variant="button"
              className="text-muted"
              display="block"
              gutterBottom
            >
              {guarantor.addressOfPlaceOfWork}
            </Typography>
          </div>
        </div>
        <div style={{ marginLeft: '90px' }}>
          <Button
            // onClick={() =>
            //   dispatch({
            //     type: DeclinedApplicationActions.APPLICATION_DECLINED_CALLER,
            //     payload: appInfo.userId,
            //   })
            // }
            onClick={handleOpen}
            variant="contained"
            color="secondary"
            className="mr-3"
            startIcon={<RemoveCircleIcon />}
          >
            Decline
          </Button>

          <Button
            onClick={() => {
              dispatch({
                type: AcceptedApplicationActions.APPLICATION_ACCEPTED_CALLER,
                payload: appInfo.userId,
              });
            }}
            variant="contained"
            color="primary"
            startIcon={<AddCircleIcon />}
          >
            {!isStartedLoadingStatusForAccept ? (
              'Accept'
            ) : (
              <div className="d-flex align-items-center">
                <CircularSpinner />
                <span className="text-white ml-1">Accepting...</span>{' '}
              </div>
            )}
          </Button>
          {/* {isStartedLoadingStatusForAccept && (
            <div style={{ marginLeft: '50%', marginTop: '10px' }}>
              <CircularSpinner />
            </div>
          )} */}
        </div>

        <div>
          {open && (
            <ApplicationDeclineMessage
              open={open}
              handleClose={handleClose}
              handleDecline={handleDecline}
            />
          )}
        </div>

        <div className="snackbar">
          <Snackbar
            open={isStartedLoadingStatusForAccept}
            autoHideDuration={4000}
            onClose={() => !isStartedLoadingStatusForAccept}
          >
            <Alert
              onClose={() => !isStartedLoadingStatusForAccept}
              severity="success"
            >
              Application accepted successfully!
            </Alert>
          </Snackbar>
        </div>

        <div className="snackbar">
          <Snackbar
            open={isStartedLoadingStatusForDecline}
            autoHideDuration={4000}
            onClose={() => !isStartedLoadingStatusForDecline}
          >
            <Alert
              onClose={() => !isStartedLoadingStatusForDecline}
              severity="success"
            >
              Application deleted successfully!
            </Alert>
          </Snackbar>
        </div>
      </div>
    </>
  );
}
