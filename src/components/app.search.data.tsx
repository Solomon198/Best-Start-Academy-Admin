import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    // maxWidth: '36ch',
    marginTop: '20px',
    marginRight: '4%',
    marginLeft: '4%',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function SearchData({ data, onClick }) {
  const classes = useStyles();
  return (
    <div className="d-flex align-items-center" onClick={onClick}>
      <div className="mr-3">
        <Avatar alt={`${data.firstName} ${data.lastName}`} src={data.photo} />
      </div>
      <div>
        <Typography>
          {`${data.firstName || data.firtName} ${data.lastName}`}
        </Typography>
        <Typography
          component="span"
          variant="body2"
          className={classes.inline}
          color="textPrimary"
          style={{ marginRight: 8 }}
        >
          {data.taxiLicense || data.phoneNumber}
        </Typography>
      </div>
    </div>
  );
}
