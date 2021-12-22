import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const handleDecline = () => {
  return <h1>Hi</h1>;
};

export default function ApplicationGuarantorMobile({ guarantor }) {
  const dispatch = useDispatch();

  const { gettingAcceptedApplicationStatus, gettingDeclinedApplicationStatus } =
    useSelector((state: any) => ({
      gettingAcceptedApplicationStatus:
        state.Application.gettingAcceptedApplicationStatus,
      gettingDeclinedApplicationStatus:
        state.Application.gettingDeclinedApplicationStatus,
    }));

  if (!guarantor) {
    return <div></div>;
  }

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
        <div className="d-flex justify-content-around mb-5">
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
            variant="contained"
            color="secondary"
            className="mr-3"
            startIcon={<RemoveCircleIcon />}
          >
            Decline
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleIcon />}
          >
            Accept
          </Button>
        </div>
      </div>
    </>
  );
}
