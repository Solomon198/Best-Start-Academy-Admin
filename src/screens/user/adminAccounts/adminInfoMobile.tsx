import React from "react";
import { useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import PhoneIcon from "@material-ui/icons/Phone";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import AdminInfoComponent from "./adminInfoItemMobile";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 16,
    // color: '#4fc3f7',
  },
  pos: {
    marginBottom: 12,
  },
  large: {
    width: theme.spacing(14),
    height: theme.spacing(14),
  },
}));

export default function AdminInfoMobile() {
  const classes = useStyles();

  const { adminInfo } = useSelector((state: any) => ({
    adminInfo: state.Admin.viewAdmin,
  }));

  if (!adminInfo) {
    return <div></div>;
  }

  return (
    <Card className={classes.root} style={{ width: "100%" }}>
      <CardContent>
        <div className="d-flex align-items-center mb-5">
          <div className="profile-image mr-5">
            <Avatar
              alt={`${adminInfo.firtName} ${adminInfo.lastName}`}
              src={adminInfo.photo}
              className={classes.large}
              style={{ margin: "auto" }}
            />
          </div>
          <div>
            <div>
              <Typography
                variant="h5"
                style={{ fontSize: 20 }}
                className="mb-2"
                gutterBottom
              >{`${adminInfo.firtName} ${adminInfo.lastName}`}</Typography>
              <div className="d-flex align-items-center">
                <PhoneIcon style={{ marginRight: 10, fontSize: 16 }} />
                <Typography
                  variant="button"
                  style={{ marginTop: 3 }}
                  display="block"
                  gutterBottom
                >
                  {adminInfo.phoneNumber}
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <AdminInfoComponent basicInfo={adminInfo} />
      </CardContent>
    </Card>
  );
}
