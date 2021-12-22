import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import InputWrapper from "./inputWrapper";
import {
  setEnvironmentConfigsInput,
  getEnvironmentConfigs,
  setEnvironmentConfigs,
} from "./actions";
import Spinner from "../../../components/app.spinner";
import { Grid, Snackbar } from "@material-ui/core";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  margin: {
    margin: theme.spacing(1),
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

export default function EnvConfigCard() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const {
    amountPerKm,
    radiusOfMatch,
    gettingEnvironmentConfigActionsStatus,
    gettingEnvironmentConfigActionsError,
    settingEnviromentConfigStatus,
    settingEnviromentConfigError,
  } = useSelector((store: any) => ({
    amountPerKm: store.EnvironmentConfig.amountPerKm,
    radiusOfMatch: store.EnvironmentConfig.radiusOfMatch,
    gettingEnvironmentConfigActionsStatus:
      store.EnvironmentConfig.gettingEnvironmentConfigActionsStatus,
    gettingEnvironmentConfigActionsError:
      store.EnvironmentConfig.gettingEnvironmentConfigActionsError,
    settingEnviromentConfigStatus:
      store.EnvironmentConfig.settingEnviromentConfigStatus,
    settingEnviromentConfigError:
      store.EnvironmentConfig.settingEnviromentConfigError,
  }));

  const isSetterLoading =
    setEnvironmentConfigs.SET_ENV_CONFIGS_STARTED ===
    settingEnviromentConfigStatus;

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <Grid container justify="space-between">
            <Grid item>
              <InputWrapper
                label="Set Amount(Per KM)"
                inputField={
                  <TextField
                    value={amountPerKm}
                    disabled={isSetterLoading}
                    type="Number"
                    onChange={(e) => {
                      dispatch({
                        type: setEnvironmentConfigsInput.SET_ENV_CONFIGS_INPUT_CALLER,
                        payload: { amountPerKm: e.target.value },
                      });
                    }}
                    id="outlined-basic"
                    label="Per KM"
                    variant="outlined"
                  />
                }
              />
            </Grid>
            <Grid item>
              <InputWrapper
                label="Set radius of matching drivers"
                inputField={
                  <TextField
                    value={radiusOfMatch}
                    disabled={isSetterLoading}
                    type="Number"
                    fullWidth={true}
                    onChange={(e) => {
                      dispatch({
                        type: setEnvironmentConfigsInput.SET_ENV_CONFIGS_INPUT_CALLER,
                        payload: { radiusOfMatch: e.target.value },
                      });
                    }}
                    id="outlined-basic"
                    label="Set Radius"
                    variant="outlined"
                  />
                }
              />
            </Grid>
            <div>
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="center"
              >
                <Grid item>
                  <Button
                    variant="contained"
                    size="large"
                    disabled={isSetterLoading}
                    color="primary"
                    onClick={() =>
                      dispatch({
                        type: setEnvironmentConfigs.SET_ENV_CONFIGS_CALLER,
                        payload: { amountPerKm, radiusOfMatch },
                      })
                    }
                    className={classes.margin}
                    style={{
                      marginTop: "40px",
                      backgroundColor: "#232f3e",
                      outline: "none",
                    }}
                  >
                    {!isSetterLoading ? (
                      "Update"
                    ) : (
                      <div className="d-flex align-items-center">
                        <Spinner type="circular" color="white" size={20} />
                        <span className="text-white ml-1">
                          Updating...
                        </span>{" "}
                      </div>
                    )}
                  </Button>
                </Grid>
                <Grid item>
                  <div className="mt-4"></div>
                </Grid>
              </Grid>
            </div>
          </Grid>

          <Snackbar
            open={isSetterLoading}
            autoHideDuration={6000}
            onClose={() => !isSetterLoading}
          >
            <Alert onClose={() => !isSetterLoading} severity="info">
              Updating Environment Variables...
            </Alert>
          </Snackbar>
        </CardContent>
      </Card>
    </>
  );
}
