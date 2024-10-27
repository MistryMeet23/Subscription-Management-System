import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <h3>About Us</h3>
          <p>Welcome to SMS, where we make subscription management simple and effective.<br/>
Our platform is designed to help businesses streamline their subscription processes,<br/> enhance customer engagement, and optimize revenue.<br/>
With a focus on flexibility, scalability, and security,<br/> we empower companies to manage their subscriber data,<br/> billing, and communication all in one place.</p>
        </div>
        <div className="footer-content">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/Home">Home</a></li>
            <li><a href="/About">About</a></li>
            <li><a href="/Services">Services</a></li>
            <li><a href="/Contact">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Subscription Management System. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
