import React from 'react';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import DescriptionIcon from '@material-ui/icons/Description';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

export const NoRecordsFound = ({ icon, title }) => {
  const classes = useStyles();
  return (
    <Grid container direction="column" alignItems="center" className="mt-5">
      <Grid item>{icon}</Grid>
      <Grid item>
        <Typography
          style={{ textAlign: 'center' }}
          variant="button"
          display="block"
          gutterBottom
        >
          {title}
        </Typography>
      </Grid>
    </Grid>
  );
};
