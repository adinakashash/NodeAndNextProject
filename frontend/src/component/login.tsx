"use client";
import { useState, useContext, FormEvent } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useAppDispatch } from "@/redux/hook";
import { createUser } from "@/redux/slices/userSlice";
import User from "@/classes/user";
import { UserContext } from "./usercontext";

export default function Login() {
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [isWorker, setIsWorker] = useState(false);

  const dispatch = useAppDispatch();
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error('UserContext must be used within a UserProvider');
  }
  const { user, setUser } = userContext;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const tempuser: User = {
      phone,
      address,
      isWorker
    };
    setUser(tempuser);
    dispatch(createUser(user));
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
