// src/pages/index.tsx
import React, { useState, useEffect } from 'react';
import { AppBar, Tabs, Tab } from '@mui/material';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../style/App.css'; // קובץ ה-CSS עבור האנימציה

const HomePage = () => {
  const [index, setIndex] = useState(0);
  const images = [
    "https://img.lovepik.com/photo/40180/3915.jpg_wh860.jpg",
    "https://img.lovepik.com/background/20211021/large/lovepik-meadow-city-background-image_401435691.jpg",
    "https://img.lovepik.com/photo/20211122/medium/lovepik-city-road-picture_500758925.jpg"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div>
      <AppBar position="static">
        <Tabs variant="fullWidth">
          <Tab label="Home" href="/" />
          <Tab label="About" href="/about" />
          <Tab label="Instructions" href="/instructions" />
        </Tabs>
      </AppBar>
      <TransitionGroup>
        <CSSTransition key={index} timeout={1000} classNames="fade">
          <img src={images[index]} alt={`Image ${index}`} className="slider-image" />
        </CSSTransition>
      </TransitionGroup>
      <h1>Welcome to the Home Page</h1>
    </div>
  );
};

export default HomePage;
