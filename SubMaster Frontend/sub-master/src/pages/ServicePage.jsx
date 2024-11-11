import React from 'react';
import { Layout, Row, Col, Typography, Card, Button } from 'antd';
import { ShoppingCartOutlined, SearchOutlined } from '@ant-design/icons';
import './ServicePage.css';

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const services = [
  {
    title: 'Basic Subscription',
    price: '₹19.99/month',
    description: 'Get started with the basic features to manage your needs.',
    imageUrl: 'https://images.all-free-download.com/images/thumbjpg/orange_crush_514795.jpg', // Replace with actual image URL
  },
  {
    title: 'Pro Subscription',
    price: '₹49.99/month',
    description: 'Unlock advanced features for professional use.',
    imageUrl: 'https://images.all-free-download.com/images/thumbjpg/orange_crush_514795.jpg', // Replace with actual image URL
  },
  {
    title: 'Premium Subscription',
    price: '₹99.99/month',
    description: 'Enjoy all premium features for maximum efficiency.',
    imageUrl: 'https://images.all-free-download.com/images/thumbjpg/orange_crush_514795.jpg', // Replace with actual image URL
  },
  {
    title: 'Business Subscription',
    price: '₹199.99/month',
    description: 'Ideal for teams with additional collaboration tools.',
    imageUrl: 'https://images.all-free-download.com/images/thumbjpg/orange_crush_514795.jpg', // Replace with actual image URL
  },
  {
    title: 'Enterprise Subscription',
    price: '₹499.99/month',
    description: 'Custom solutions for enterprise-level management.',
    imageUrl: 'https://images.all-free-download.com/images/thumbjpg/orange_crush_514795.jpg', // Replace with actual image URL
  },
  {
    title: 'Custom Subscription',
    price: 'Contact for Pricing',
    description: 'Tailored solutions for your specific business needs.',
    imageUrl: 'https://images.all-free-download.com/images/thumbjpg/orange_crush_514795.jpg', // Replace with actual image URL
  },
];

const ServicePage = () => {
  return (
    <Layout className="service-page">
      <Content className="service-content">
        <Title level={2} className="service-title">
          Our Subscription Services
        </Title>
        <Row gutter={[16, 16]} justify="center">
          {services.slice(0, 3).map((service, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <Card
                hoverable
                cover={<img alt={service.title} src={service.imageUrl} className="service-card-image" />}
                className="service-card"
                actions={[
                  <Button type="primary" icon={<ShoppingCartOutlined />} className="service-card-button">
                    Get This
                  </Button>,
                  <Button type="default" icon={<SearchOutlined />} className="service-card-button">
                    Explore
                  </Button>,
                ]}
              >
                <Title level={4} className="service-card-title">{service.title}</Title>
                <Paragraph className="service-price">{service.price}</Paragraph>
                <Paragraph className="service-description">{service.description}</Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
        <Row gutter={[16, 16]} justify="center" className="service-cards-row">
          {services.slice(3).map((service, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <Card
                hoverable
                cover={<img alt={service.title} src={service.imageUrl} className="service-card-image" />}
                className="service-card"
                actions={[
                  <Button type="primary" icon={<ShoppingCartOutlined />} className="service-card-button">
                    Get This
                  </Button>,
                  <Button type="default" icon={<SearchOutlined />} className="service-card-button">
                    Explore
                  </Button>,
                ]}
              >
                <Title level={4} className="service-card-title">{service.title}</Title>
                <Paragraph className="service-price">{service.price}</Paragraph>
                <Paragraph className="service-description">{service.description}</Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </Content>
    </Layout>
  );
};

export default ServicePage;
