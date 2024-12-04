import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Typography, Card, Spin, message } from 'antd';
import { TeamOutlined, InfoCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import './AboutPage.css';
import ErrorPage from '../pages/ErrorPage'; // Import ErrorPage

const { Title, Paragraph } = Typography;
const { Content, Footer } = Layout;

const AboutPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Simulate fetching data for the About page, which could fail
    const fetchData = async () => {
      try {
        // Simulate successful data fetching here
        // If something goes wrong, setError(true)
      } catch (error) {
        setError(true); // Set error if something goes wrong during data fetching
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <ErrorPage />; // Show ErrorPage if there was an error
  }

  if (loading) {
    return (
      <div className="about-spinner">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Layout className="about-page">
      <Content className="about-content">
        <Title level={3} className="about-header-title">
          About Us
        </Title>
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              className="about-card"
              title={<span className="about-card-title"><InfoCircleOutlined /> Our Mission</span>}
            >
              <Paragraph className="about-card-description">
                We are committed to delivering the best products and services tailored to your needs. Our goal is to help you achieve your goals with cutting-edge technology and professional solutions.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              className="about-card"
              title={<span className="about-card-title"><TeamOutlined /> Our Team</span>}
            >
              <Paragraph className="about-card-description">
                Our team consists of passionate professionals with diverse skills, working together to deliver exceptional results. We believe in collaboration and continuous learning.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              className="about-card"
              title={<span className="about-card-title"><EnvironmentOutlined /> Our Values</span>}
            >
              <Paragraph className="about-card-description">
                We value integrity, transparency, and excellence. We strive to foster an environment of trust and respect while delivering high-quality services to our clients.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default AboutPage;
