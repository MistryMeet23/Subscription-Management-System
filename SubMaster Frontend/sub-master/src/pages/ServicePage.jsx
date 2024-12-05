import React, { useEffect, useState } from 'react';
import { Layout, Row, Col, Typography, Card, Button, message } from 'antd';
import { ShoppingCartOutlined, SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import './ServicePage.css';

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const ServicePage = () => {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await axios.get('http://localhost:5272/api/VendorProfiles');
        setBusinesses(response.data);
      } catch (error) {
        console.error('Error fetching business data:', error);
        message.error('Failed to load business data.');
      }
    };

    fetchBusinesses();
  }, []);

  return (
    <Layout className="service-page">
      <Content className="service-content">
        <Title level={2} className="service-title">
          Our Subscription Services
        </Title>
        <Row gutter={[16, 16]} justify="center">
          {businesses.map((business) => (
            <Col xs={24} sm={12} md={8} key={business.vendor_Id}>
              <Card
                hoverable
                cover={
                  <img
                    alt={business.business_Name}
                    src={business.logo_Url || 'https://via.placeholder.com/300'}
                    className="service-card-image"
                  />
                }
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
                <Title level={4} className="service-card-title">{business.business_Name}</Title>
                <Paragraph className="service-price">Contact for Pricing</Paragraph>
                <Paragraph className="service-description">{business.business_Description}</Paragraph>
                <Paragraph className="service-address">Address: {business.business_Address}</Paragraph>
                <Paragraph className="service-phone">Phone: {business.phone_Number}</Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </Content>
    </Layout>
  );
};

export default ServicePage;
