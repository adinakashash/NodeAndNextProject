"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useAppDispatch } from "@/redux/hook";
import { createUser } from "@/redux/slices/userSlice";
import User from "@/classes/user";

export default function Login() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handlePasswordChange = (e:any) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e:any) => {
    setConfirmPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const isPasswordMatch =
    password && confirmPassword && password === confirmPassword;
  const dispatch = useAppDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen}>
          Sign Up
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries((formData as any).entries());
              const user: User = {
                name,
                phone,
                email,
                password,
              };
              console.log(user);
              dispatch(createUser(user));
              handleClose();
              handleClose();
            },
          }}
        >
          <DialogTitle>Login</DialogTitle>
          <DialogContent>
            <DialogContentText>
              please full all the information
            </DialogContentText>
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
            <TextField
              onChange={(e) => setName(e.target.value)}
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Full Name"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              onChange={(e) => setPhone(e.target.value)}
              autoFocus
              required
              margin="dense"
              id="Numbered Name"
              name="Numbered Name"
              label="Phone Number"
              type="Number"
              fullWidth
              variant="standard"
            />
            <div>
              <TextField
                onChange={handlePasswordChange}
                required
                margin="dense"
                id="password"
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                variant="standard"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={toggleShowPassword}
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                onChange={handleConfirmPasswordChange}
                required
                margin="dense"
                id="confirm-password"
                name="confirm-password"
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                fullWidth
                variant="standard"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={toggleShowConfirmPassword}
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <div
                style={{
                  marginTop: "8px",
                  color: isPasswordMatch ? "green" : "red",
                }}
              >
                {password && confirmPassword && (
                  <span>
                    {isPasswordMatch
                      ? "Passwords match"
                      : "Passwords do not match"}
                  </span>
                )}
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
      <Stack sx={{ width: "50%" }} spacing={2}>
        <Alert variant="filled" severity="error">
          This is a filled error Alert.
        </Alert>
      </Stack>
    </>
  );
}
