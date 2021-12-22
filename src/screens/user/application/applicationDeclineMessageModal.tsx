import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import Modal from '@material-ui/core/Modal';
import { DeclineMessageSetter } from './actions';

function rand() {
  return 0;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    right: '50%',
    top: '20%',
    left: '30%',
  };

  //   const top = 50 + rand();
  //   const left = 50 + rand();

  //   return {
  //     top: `${top}%`,
  //     left: `${left}%`,
  //     transform: `translate(-${top}%, -${left}%)`,
  //   };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      borderRadius: 5,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    buttonStyle: {
      color: '#232f3e',
      border: '2px solid #232f3e',
      marginTop: 10,
    },
  })
);

export default function ApplicationDeclineMessage({
  open,
  handleClose,
  handleDecline,
}) {
  const { declineMessage } = useSelector((state: any) => ({
    declineMessage: state.Application.declineMessage,
  }));

  const dispatch = useDispatch();

  const handleDeclineMessage = (e) => {
    dispatch({
      type: DeclineMessageSetter.SET_DECLINE_MESSAGE,
      payload: e.target.value,
    });
  };

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Typography
        variant="body1"
        align="center"
        style={{ fontSize: '18px', marginBottom: '20px' }}
        // display="block"
        gutterBottom
      >
        Decline Message
      </Typography>
      <div className="form-group">
        <textarea
          className="form-control"
          placeholder="Enter Decline Message Here..."
          rows={3}
          onChange={handleDeclineMessage}
          //   onChange={(e) => setDeclineMessage(e.target.value)}
        ></textarea>
      </div>
      <Button
        variant="outlined"
        endIcon={<SendIcon />}
        onClick={handleDecline}
        size="small"
        className={classes.buttonStyle}
      >
        Send
      </Button>
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
