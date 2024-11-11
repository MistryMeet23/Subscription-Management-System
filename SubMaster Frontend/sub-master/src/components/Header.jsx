// src/components/Header.jsx
import React, { useEffect, useState } from 'react';
import { Typography, Button } from 'antd';
import './Header.css';  // Import the CSS file
import s1Image from '../assets/s1.png';
import s2Image from '../assets/s2.jpg';
import s3Image from '../assets/contact.jpg';

const { Title } = Typography;

const HeaderComponent = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [s1Image, s2Image, s3Image];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000); // Increased interval for smoother transition (5 seconds)
    return () => clearInterval(interval); // Clean up on component unmount
  }, [images.length]);

  return (
    <div className="header-container">
      
      <div className="slider-container">
        <div className="slider-overlay"></div>
        <img src={images[currentImage]} alt="Slider" className="slider-image" />
      </div>
    </div>
  );
};

export default HeaderComponent;
