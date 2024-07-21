import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Button, Typography, Avatar, Box } from '@mui/material';
import { styled } from '@mui/system';
import User from '../classes/user';
import { UserContext } from './usercontext';

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

  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error('UserContext must be used within a UserProvider');
  }
  const { user, setUser } = userContext;

  const handleLogin = () => {
    window.open('http://localhost:3000/auth/google', '_self'); 
  };

  const handleLogout = () => {
    axios.get('http://localhost:3000/auth/logout', { withCredentials: true }) 
      .then(() => {
        setUser(null);
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
