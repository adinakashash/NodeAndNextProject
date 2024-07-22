import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography, Avatar, Box } from '@mui/material';
import { styled } from '@mui/system';
import User from '../classes/user';
import { RootState, AppDispatch } from '../redux/store';
import { setUser, fetchUser } from '../redux/slices/currentUserSlice';
import { WorkerClass } from '@/classes/worker';

const ProfileContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  '&:hover': {
    '.profile-avatar': {
      opacity: 0.7,
    },
  },
});

const ProfileAvatar = styled(Avatar)({
  width: 140,
  height: 140,
  marginBottom: '20px',
  transition: '0.3s',
});

const GoogleAuth: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  let user = useSelector((state: RootState) => state.cuurentuser.user); 
  if (user instanceof WorkerClass) {
    user = user.user;
  }
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleLogin = () => {
    window.open('http://localhost:3000/auth/google', '_self'); 
  };

  const handleLogout = () => {
    axios.get('http://localhost:3000/auth/logout', { withCredentials: true }) 
      .then(() => {
        dispatch(setUser(null));
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  };

  return (
    <div>
      {user ? (
        <ProfileContainer>
          <ProfileAvatar
            src={user.image}
            alt="Profile"
            className="profile-avatar"
          />
          <Typography variant="h5" component="div">
            {user.displayName}
          </Typography>
          <Button variant="contained" color="primary" onClick={handleLogout}>
            Logout
          </Button>
        </ProfileContainer>
      ) : (
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login with Google
        </Button>
      )}
    </div>
  );
};

export default GoogleAuth;
