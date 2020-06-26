import React, { useContext, Fragment } from "react";
import { GlobalContext } from "../../context";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const AlertDialog = () => {
  const classes = useStyles();
  const { alert, clearAlert } = useContext(GlobalContext);
  return alert ? (
    <Container className={classes.root}>
      <Alert
        onClose={() => {
          clearAlert();
        }}
        severity="warning"
      >
        <AlertTitle>Alert</AlertTitle>
        {JSON.stringify(alert)}
      </Alert>
    </Container>
  ) : (
    <Fragment></Fragment>
  );
};

export default AlertDialog;