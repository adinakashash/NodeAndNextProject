"use client";
import { useState, useEffect, FormEvent } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { createUser } from "@/redux/slices/userSlice";
import{setUser,fetchUser} from "@/redux/slices/currentUserSlice"
import User from "@/classes/user";
import Cookies from "js-cookie";

export default function Login() {
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(""); 
  const [isWorker, setIsWorker] = useState(false);

  const dispatch = useAppDispatch();
  useEffect(() => {
    const storedUser = Cookies.get('user');
    if (storedUser) {
      const user = JSON.parse(storedUser) as User;
      dispatch(setUser(user));
    }
  }, [dispatch]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newUser: User = { 
      email, 
      phone,
      address,
      isWorker
    };
    // Save user to cookies and Redux store
    Cookies.set('user', JSON.stringify(newUser), { secure: true });
    dispatch(createUser(newUser)); 
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        bgcolor: 'background.paper',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '100%',
          maxWidth: 400,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: 'background.paper',
        }}
      >
        <TextField
          onChange={(e) => setEmail(e.target.value)} 
          required
          margin="dense"
          id="email"
          name="email"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        />
        <TextField
          onChange={(e) => setAddress(e.target.value)}
          required
          margin="dense"
          id="address"
          name="address"
          label="Address"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          onChange={(e) => setPhone(e.target.value)}
          required
          margin="dense"
          id="phone"
          name="phone"
          label="Phone Number"
          type="text"
          fullWidth
          variant="standard"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isWorker}
              onChange={(e) => setIsWorker(e.target.checked)}
              name="isWorker"
              color="primary"
            />
          }
          label="Is Worker"
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 2,
          }}
        >
          <Button
            type="submit"
            variant="contained"
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
