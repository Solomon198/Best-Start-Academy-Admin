import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function DriverGuarantorMobile({ guarantor }) {
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
        <div className="d-flex justify-content-around">
          <div className="mr-2">
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
              display="block"
              className="text-muted"
              gutterBottom
            >
              {guarantor.fullName}
            </Typography>
            <Typography
              variant="button"
              display="block"
              className="text-muted"
              gutterBottom
            >
              {guarantor.ID}
            </Typography>
            <Typography
              variant="button"
              display="block"
              className="text-muted"
              gutterBottom
            >
              {guarantor.IDType}
            </Typography>
            <Typography
              variant="button"
              display="block"
              className="text-muted"
              gutterBottom
            >
              {guarantor.phoneNumber}
            </Typography>
            <Typography
              variant="button"
              display="block"
              className="text-muted"
              gutterBottom
            >
              {guarantor.address}
            </Typography>
            <Typography
              variant="button"
              display="block"
              className="text-muted"
              gutterBottom
            >
              {guarantor.addressOfPlaceOfWork}
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
}
