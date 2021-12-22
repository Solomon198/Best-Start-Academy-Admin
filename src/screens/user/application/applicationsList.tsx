import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import './applicationsListStyle.css';

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

export default function ApplicationsList({ data, onClick }) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItem
        onClick={() => onClick(data)}
        style={{ width: '100%' }}
        className="mx-auto"
        alignItems="center"
      >
        <ListItemAvatar>
          <Avatar alt={`${data.firstName} ${data.lastName}`} src={data.photo} />
        </ListItemAvatar>
        <ListItemText
          primary={`${data.firstName} ${data.lastName}`}
          id="listItemText"
          style={{ cursor: 'pointer' }}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
                style={{ marginRight: 8 }}
              >
                L/NO -
              </Typography>
              {data.driverLicense}
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}
