import {
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/User";
import useCurrentUser from "../util/useCurrentUser";

const ProfilePage = () => {
  const router = useRouter();
  const { deleteUserById } = useContext(UserContext);
  const { user } = useCurrentUser();

  const handleDelete = async () => {
    await deleteUserById(user._id);
    router.push("/register");
  };

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  if (!user)
    return (
      <Typography align="center" component={"div"}>
        <CircularProgress size={200} thickness={4} />
      </Typography>
    );

  return (
    <Container>
      <Typography variant="h5">Name: {user.name}</Typography>
      <Typography variant="h5">Email: {user.email}</Typography>
      <Typography variant="h5">Admin? {user.isAdmin ? "Yes" : "No"}</Typography>
      <Typography variant="h5">
        Date Created: {moment(user.dateCreated).format("MMMM Do, YYYY")}
      </Typography>
      <Button
        fullWidth
        color="secondary"
        variant="contained"
        size="large"
        onClick={() => {
          setOpen(true);
        }}
      >
        Delete My Profile
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Event?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete your profile?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProfilePage;
