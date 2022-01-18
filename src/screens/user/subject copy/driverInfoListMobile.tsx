import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

export default function DriverInfoListMobile({ basicInfo }) {
  const classes = useStyles();

  return (
    <List
      subheader={
        <ListSubheader style={{ textAlign: 'center' }}>
          Basic Info
        </ListSubheader>
      }
      className={classes.root}
    >
      <ListItem>
        <ListItemIcon>
          <LocalShippingIcon style={{ color: 'green' }} />
        </ListItemIcon>
        <ListItemText id="switch-list-label-wifi" primary="Completed Trips" />
        <ListItemSecondaryAction>
          <small style={{ fontSize: '14px' }}>{basicInfo.completedTrips}</small>
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <LocalShippingIcon style={{ color: 'red' }} />
        </ListItemIcon>
        <ListItemText
          id="switch-list-label-bluetooth"
          primary="Cancelled Trips"
        />
        <ListItemSecondaryAction>
          <small style={{ fontSize: '14px' }}>{basicInfo.cancelledTrips}</small>
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <AttachMoneyIcon style={{ color: 'brown' }} />
        </ListItemIcon>
        <ListItemText
          id="switch-list-label-bluetooth"
          primary="Total Money Earned"
        />
        <ListItemSecondaryAction>
          <small style={{ fontSize: '14px' }}>
            {basicInfo.totalMoneySpent}
          </small>
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <AccountBalanceWalletIcon style={{ color: 'blueviolet' }} />
        </ListItemIcon>
        <ListItemText id="switch-list-label-bluetooth" primary="Balance" />
        <ListItemSecondaryAction>
          <small style={{ fontSize: '14px' }}>{basicInfo.balance}</small>
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
}
