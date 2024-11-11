import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <p className="footer-text">
        &copy; {new Date().getFullYear()} SubMaster. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
