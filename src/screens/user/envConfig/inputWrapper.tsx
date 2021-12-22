import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  })
);

export default function InputWrapper({ label, inputField }) {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div className="">
        <div style={{ marginBottom: '10px' }}>
          <small>{label}</small>
        </div>
        <div>{inputField}</div>
      </div>
    </form>
  );
}
