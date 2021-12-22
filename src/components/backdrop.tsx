import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);

export default function SimpleBackdrop({ open, children }) {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={open}>
      {children}
    </Backdrop>
  );
}
