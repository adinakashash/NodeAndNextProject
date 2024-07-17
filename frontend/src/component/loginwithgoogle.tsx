import React, { useState, useEffect } from 'react';
import axios from 'axios';
import User from '../classes/user';



const GoogleAuth: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = () => {
    window.open('http://localhost:3000/auth/google', '_self'); 
    console.log(user);
    
  };

  const handleLogout = () => {
    axios.get('http://localhost:3000/auth/logout') 
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  };

  useEffect(() => {
    axios.get('http://localhost:3000/profile', { withCredentials: true }) 
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error('Error fetching profile:', error);
      });
  }, []);

  return (
    <div>
      {user ? (
        <>
          <div>
            <h1>Profile</h1>
            <img src={user.image} alt="Profile" />
            <h2>{user.displayName}</h2>
          </div>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <button onClick={handleLogin}>Login with Google</button>
      )}
    </div>
  );
};

export default GoogleAuth;
