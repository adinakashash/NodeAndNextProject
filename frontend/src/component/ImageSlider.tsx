// src/components/ImageSlider.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../style/ImageSlider.css';

const IMAGE_URLS = [
"https://mail.google.com/mail/u/0?ui=2&ik=1786816541&attid=0.1&permmsgid=msg-a:r-2882523800217159764&th=19032a70b956c31f&view=att&disp=safe&realattid=f_lxmf084y0",
'https://img.lovepik.com/photo/40180/3915.jpg_wh860.jpg',
"https://mail.google.com/mail/u/0?ui=2&ik=1786816541&attid=0.1&permmsgid=msg-a:r-2882523800217159764&th=19032a70b956c31f&view=att&disp=safe&realattid=f_lxmf084y0",
'https://img.lovepik.com/background/20211021/large/lovepik-meadow-city-background-image_401435691.jpg',
"https://mail.google.com/mail/u/0?ui=2&ik=1786816541&attid=0.1&permmsgid=msg-a:r-2882523800217159764&th=19032a70b956c31f&view=att&disp=safe&realattid=f_lxmf084y0",
'https://img.lovepik.com/photo/20211122/medium/lovepik-city-road-picture_500758925.jpg'
];

const ImageSlider: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % IMAGE_URLS.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="image-slider">
      <TransitionGroup>
        <CSSTransition key={currentImageIndex} timeout={1000} classNames="fade">
          <img src={IMAGE_URLS[currentImageIndex]} alt={`Slide ${currentImageIndex}`} />
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default ImageSlider;
