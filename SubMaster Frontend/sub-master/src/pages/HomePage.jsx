import React, { useEffect, useState } from 'react';
import { Typography, Button, Row, Col, Card, Carousel, Statistic } from 'antd';
import { Link } from 'react-router-dom';
import { CheckCircleOutlined, SafetyOutlined, CustomerServiceOutlined, ShopOutlined, TeamOutlined } from '@ant-design/icons';
import './HomePage.css';

const { Title, Paragraph } = Typography;

const features = [
  { icon: <CheckCircleOutlined />, text: 'Trusted by Thousands' },
  { icon: <SafetyOutlined />, text: 'Secure and Reliable' },
  { icon: <CustomerServiceOutlined />, text: '24/7 Support' },
];

const testimonials = [
  { name: 'John Doe', feedback: 'Great service! Highly recommend it for business management.' },
  { name: 'Jane Smith', feedback: 'An intuitive platform that saved me a lot of time and effort.' },
  { name: 'Peter Parker', feedback: 'Excellent support and seamless integration with my tools.' },
];

const HomePage = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5272/api/VendorProfiles')
      .then(response => response.json())
      .then(data => setServices(data))
      .catch(error => console.error('Error fetching services:', error));
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-section">
        <Row justify="center" align="middle">
          <Col span={24} className="hero-content">
            <Title className="hero-title">Welcome to SUBMASTER</Title>
            <Paragraph className="hero-description">
              Your trusted partner for business success. Discover the perfect subscription plans tailored to your needs.
            </Paragraph>
            <div className="hero-buttons">
              <Button type="primary" size="large">
                <Link to="/contact">Contact Us</Link>
              </Button>
              <Button size="large" className="ghost-button">
                <Link to="/register">Get Started</Link>
              </Button>
            </div>
          </Col>
        </Row>
      </div>

      {/* Services Section */}
      <div className="services-section">
        <Title className="section-title">Our Services</Title>
        <Row gutter={16} justify="center">
          {services.map(service => (
            <Col xs={24} sm={12} md={8} key={service.vendor_Id}>
              <Card
                hoverable
                className="service-card"
                cover={<ShopOutlined className="service-icon" />}
              >
                <Title level={4} className="service-title">{service.business_Name}</Title>
                <Paragraph className="service-description">{service.business_Description}</Paragraph>
                <Paragraph className="service-address">{service.business_Address}</Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials-section">
        <Title className="section-title">What Our Clients Say</Title>
        <Row gutter={16} justify="center">
          {testimonials.map((testimonial, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <Card className="testimonial-card">
                <Title level={4}>{testimonial.name}</Title>
                <Paragraph className="testimonial-feedback">{testimonial.feedback}</Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Statistics Section */}
      <div className="statistics-section">
        <Title className="section-title">Our Achievements</Title>
        <Row gutter={16} justify="center">
          <Col xs={24} sm={12} md={6}>
            <Card className="statistic-card">
              <Statistic title="Clients Served" value={2000} />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="statistic-card">
              <Statistic title="Projects Completed" value={1500} />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="statistic-card">
              <Statistic title="Awards Won" value={20} />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="statistic-card">
              <Statistic title="Support Cases Solved" value={5000} />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HomePage;
