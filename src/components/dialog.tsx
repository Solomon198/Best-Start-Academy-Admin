import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

const DialogComponent = ({
  open,
  handleClose,
  handleAction,
  bodyText,
  buttonText1,
  buttonText2,
  headerTitle,
}) => (
  <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{headerTitle}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {bodyText}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        {buttonText1}
      </Button>
      <Button onClick={handleAction} color="primary" autoFocus>
        {buttonText2}
      </Button>
    </DialogActions>
  </Dialog>
);

export default DialogComponent;
