import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./adminCardStyle.css";

const useStyles = makeStyles({
  root: {},
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function AdminCard({ icon, title, titleValue }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <div className="card-body d-flex justify-content-between align-items-center">
          <div className="card-body-icon mr-4">
            <div className="card-body-item">
              <span>{icon}</span>
            </div>
          </div>
          <div className="card-body-text">
            <div>
              <small style={{ fontSize: "15px" }}>{title}</small>
              <h1 style={{ fontWeight: 500 }}>{titleValue}</h1>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
