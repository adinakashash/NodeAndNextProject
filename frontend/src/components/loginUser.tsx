"use client"
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useAppDispatch } from '@/redux/hook';
import { createUser } from '@/redux/slices/userSlice';
import User from '@/classes/user';

export default function Login() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState(0);
  const [email, setEmail] = React.useState('');

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
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const user: User = {
              "name":name,
              "phone":phone,
              "email":email
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
            onChange={(e) => setPhone(parseInt(e.target.value))}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" >Subscribe</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
    <Stack sx={{ width: '50%' }} spacing={2} >
        <Alert variant="filled" severity="error" >
          This is a filled error Alert.
        </Alert>
    </Stack>
    </>
  );
}

