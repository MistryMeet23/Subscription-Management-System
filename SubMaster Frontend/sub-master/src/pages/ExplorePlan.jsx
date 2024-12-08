import React, { useEffect, useState } from 'react';
import { Layout, Row, Col, Typography, Card, Button, message } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import axios from 'axios';
import './ExplorePlan.css';

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const ExplorePlan = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get('http://localhost:5272/api/SubscriptionPlans');
        setPlans(response.data);
      } catch (error) {
        console.error('Error fetching plans:', error);
        message.error('Failed to load subscription plans.');
      }
    };

    fetchPlans();
  }, []);

  return (
    <Layout className="explore-plan-page">
      <Content className="explore-plan-content">
        <Title level={2} className="explore-plan-title">
          Explore Our Subscription Plans
        </Title>
        <Row gutter={[16, 16]} justify="center">
          {plans.map((plan) => (
            <Col xs={24} sm={12} md={8} key={plan.id}>
              <Card
                hoverable
                className="explore-plan-card"
                cover={<img alt="plan" src={plan.imageUrl || 'https://via.placeholder.com/300'} />}
                actions={[
                  <Button type="primary" icon={<ShoppingCartOutlined />} className="explore-plan-button">
                    Subscribe Now
                  </Button>,
                ]}
              >
                <Title level={4} className="explore-plan-card-title">{plan.name}</Title>
                <Paragraph className="explore-plan-price">{plan.price ? ` ₹${plan.price}` : 'Contact for Pricing'}</Paragraph>
                <Paragraph className="explore-plan-description">{plan.description}</Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </Content>
    </Layout>
  );
};

export default ExplorePlan;
