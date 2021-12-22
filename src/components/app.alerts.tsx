import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  })
);

type Props = {
  severity: "error" | "warning" | "info" | "success";
  title: string;
  body: string;
};

export default function DescriptionAlerts(Props: Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert severity={Props.severity}>
        <AlertTitle>{Props.title}</AlertTitle>
        {Props.body}
      </Alert>
    </div>
  );
}
