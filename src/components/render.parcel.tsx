import React from 'react';
import moment from 'moment';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Room, AttachMoney, DriveEta, TripOrigin } from '@material-ui/icons';
import { Avatar, ListItemAvatar, ListItem } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    listItem: {
      backgroundColor: '#f8f8f8',
      marginTop: 3,
      marginBottom: 3,
      borderRadius: 10,
    },
    listItem2: {
      backgroundColor: '#f8f8f8',
      marginTop: 3,
      marginBottom: 20,
      borderRadius: 10,
      width: '80%',
    },
  })
);
function ParcelComponent({ parcel, driverView }) {
  const classes = useStyles();

  return (
    <ListItem className={`${classes.listItem2} mx-auto`}>
      <ListItemText
        id='switch-list-label-bluetooth'
        primary={
          <>
            <p
              style={{
                fontSize: 12,
                marginTop: 0,
                marginBottom: 10,
                fontWeight: 500,
                color: 'gray',
              }}
            >
              {moment(parcel.date).format('LLLL')}
            </p>
            <div className='d-flex mb-2'>
              <div>
                <Avatar src={parcel.parcelOwner.photo} />
              </div>
              <div>
                <div
                  className='d-flex align-items-center'
                  style={{ marginLeft: 10 }}
                >
                  <p style={{ margin: 0, padding: 0, fontSize: 15 }}>
                    {`${parcel.parcelOwner.firtName} ${parcel.parcelOwner.lastName}`}
                    <span
                      style={{
                        fontSize: 15,
                        fontStyle: 'italic',
                        color: 'gray',
                        fontWeight: 300,
                      }}
                    >
                      ~~ Customer
                    </span>
                  </p>
                </div>
                <p
                  style={{
                    fontSize: 12,
                    marginTop: 0,
                    marginBottom: 10,
                    color: 'gray',
                    marginLeft: 10,
                  }}
                >
                  {parcel.parcelOwner.phoneNumber}
                </p>
              </div>
            </div>
            <div className='d-flex mb-2'>
              <div>
                <Avatar src={parcel.parcelPicker.photo} />
              </div>
              <div>
                <div
                  className='d-flex align-items-center'
                  style={{ marginLeft: 10 }}
                >
                  <p style={{ margin: 0, padding: 0, fontSize: 15 }}>
                    {`${parcel.parcelPicker.firstName} ${parcel.parcelPicker.lastName}`}
                    <span
                      style={{
                        fontSize: 13,
                        fontStyle: 'italic',
                        color: 'gray',
                        fontWeight: 300,
                      }}
                    >
                      ~~ Driver
                    </span>
                  </p>
                </div>
                <p
                  style={{
                    fontSize: 12,
                    marginTop: 0,
                    marginBottom: 10,
                    color: 'gray',
                    marginLeft: 10,
                  }}
                >
                  {parcel.parcelPicker.phoneNumber}
                </p>
              </div>
            </div>
            <div>
              <TripOrigin className='text-success' />
              <span
                style={{
                  fontWeight: 400,
                  fontSize: 13,
                  marginLeft: 5,
                }}
              >
                {parcel.parcelLocationPhysicalAddress}
              </span>
            </div>
            <div style={{ marginTop: 5 }}>
              <Room className='text-danger' />
              <span
                style={{
                  fontWeight: 400,
                  fontSize: 13,
                  marginLeft: 5,
                }}
              >
                {parcel.parcelDestinationPhysicalAddress}
              </span>
            </div>
            {(parcel.driverReject || parcel.userReject) && (
              <div
                className='text-center'
                style={{ backgroundColor: '#f2f2f2', borderRadius: 5 }}
              >
                <p className='text-danger' style={{ margin: 0 }}>
                  Delivery cancelled
                </p>
                <span style={{ fontSize: 12, fontWeight: 200 }}>
                  {parcel.userReject
                    ? `Parcel delivery cancelled by Customer`
                    : 'Driver Cancelled delivery'}
                </span>
              </div>
            )}
            <div className='row mt-1'>
              <div className='col-sm-12 col-md-12 col-lg-6 mt-1'>
                <ListItem
                  style={{
                    borderRadius: 10,
                    backgroundColor: '#f0f0f0',
                  }}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <DriveEta />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary='Distance'
                    secondary={`${parcel.distance}km`}
                  />
                </ListItem>
              </div>
              <div className='col-sm-12 col-md-12 col-lg-6 mt-1'>
                <ListItem
                  style={{
                    borderRadius: 10,
                    backgroundColor: '#f0f0f0',
                  }}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <AttachMoney />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary='Price'
                    secondary={`₦${parcel.parcelPrice}`}
                  />
                </ListItem>
              </div>
            </div>
          </>
        }
      />
    </ListItem>
  );
}

export default ParcelComponent;
