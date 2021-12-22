import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",
      width: 400,
      padding: theme.spacing(2, 4, 3),
    },
    large: {
      width: theme.spacing(100),
      height: theme.spacing(50),
    },
  })
);

type Props = {
  handleClose: () => void;
  open: boolean;
  children?: any;
};

export default function DriverLicenseModal(props: Props) {
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {props.children}
      </Modal>
    </div>
  );
}
