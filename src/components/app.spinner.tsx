import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { CircularProgress, LinearProgress } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    spinnerColor: {
      color: "primary",
    },
  })
);

type Props = {
  size?: number;
  color?: string;
  type?: "linear" | "circular";
};
export default function CircularSpinner(props: Props) {
  const classes = useStyles();
  const spinnerComponent = (type: string) => {
    if (type === "linear") {
      return (
        <LinearProgress
          className={`${!props.color ? classes.spinnerColor : "text-white"}`}
        />
      );
    } else {
      return (
        <CircularProgress
          className={`${!props.color ? classes.spinnerColor : "text-white"}`}
          size={props.size || 40}
        />
      );
    }
  };
  return (
    <div className={classes.root}>
      {spinnerComponent(props.type || "linear")}
      {/* <CircularProgress color="secondary" /> */}
    </div>
  );
}
