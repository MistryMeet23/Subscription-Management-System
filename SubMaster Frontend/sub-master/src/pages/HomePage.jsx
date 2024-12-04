import React from 'react';
import { Typography, Button, Row, Col } from 'antd';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const HomePage = () => (
  <div className="home-page">
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col span={24} style={{ textAlign: 'center' }}>
        <Title level={1}>Welcome to Our Website!</Title>
        <Paragraph>
          We are glad to have you here. Explore our platform and make the most of our services.
        </Paragraph>
        
        <Row gutter={16} justify="center" style={{ marginTop: '20px' }}>
          <Col>
            <Button type="primary" size="large">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </Col>
          <Col>
            <Button type="default" size="large">
              <Link to="/register">Get Started</Link>
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
);

export default HomePage;