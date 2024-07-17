import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Tabs, Tab } from '@mui/material';
import { useRouter } from 'next/navigation';

const HomePage = () => {
    const router = useRouter(); 

  const handleSubmitLocation = () => {
    router.push('/login');
  };

  return (
    <div>
      <Router>
        <AppBar position="static">
          <Tabs variant="fullWidth">
            <Tab label="Home" component={Link} to="/" />
            <Tab label="About" component={Link} to="/about" />
            <Tab label="Instructions" component={Link} to="/instructions" />
            <Tab label="Login" onClick={handleSubmitLocation} />
          </Tabs>
        </AppBar>
        <Routes>
          <Route path="/" />
          <Route path="/about" />
          <Route path="/instructions" element={<div><h1>Instructions Page Content</h1></div>} />
          <Route path="/login"/>
        </Routes>
      </Router>
    </div>
  );
};

export default HomePage;
