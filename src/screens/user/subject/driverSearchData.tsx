import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

export default function DriverSearchData({ data, onClick }) {
  return (
    <div className="d-flex align-items-center" onClick={onClick}>
      <div className="mr-3">
        <Avatar alt={`${data.firstName} ${data.lastName}`} src={data.photo} />
      </div>
      <div>
        <Typography variant="h6" align="center">
          {`${data.firstName} ${data.lastName}`}
        </Typography>
      </div>
    </div>
  );
}
