import React from 'react';
import { Layout, Row, Col, Space } from 'antd';
import { FacebookOutlined, TwitterOutlined, LinkedinOutlined, InstagramOutlined } from '@ant-design/icons';
import './FooterComponent.css';
import SMSLOGOFull from '../assets/SMSLOGOBG.png'; // Adjust path if needed
import SMSLOGORound from '../assets/SMSLOGORound.png'; // Adjust path if needed

const { Footer } = Layout;

const FooterComponent = () => (
  <Footer className="footer">
    <Row justify="center" align="middle" gutter={24} className="footer-content">
      <Col xs={24} sm={12} md={8} className="footer-logo-container">
        <img className="footer-logo-full" src={SMSLOGOFull} alt="SUBMASTER Logo" />
        <img className="footer-logo-round" src={SMSLOGORound} alt="SUBMASTER Round Logo" />
      </Col>
      <Col xs={24} sm={12} md={8} className="footer-social-container">
        <Space className="footer-social" size="large">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FacebookOutlined />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <TwitterOutlined />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <LinkedinOutlined />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <InstagramOutlined />
          </a>
        </Space>
      </Col>
      <Col xs={24} sm={12} md={8} className="footer-links-container">
        <Space direction="vertical" size="small">
          <a href="/about" className="footer-link">About Us</a>
          <a href="/terms" className="footer-link">Terms of Service</a>
          <a href="/privacy" className="footer-link">Privacy Policy</a>
        </Space>
      </Col>
    </Row>
    <Row justify="center" className="footer-bottom">
      <a href="https://www.yourcompanywebsite.com" className="footer-text">
        SUBMASTER ©2024 Created by InfoWeb Solution
      </a>
    </Row>
  </Footer>
);

export default FooterComponent;
