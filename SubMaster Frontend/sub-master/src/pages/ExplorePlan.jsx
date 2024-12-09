import React, { useEffect, useState } from 'react';
import { Layout, Row, Col, Typography, Card, Button, message } from 'antd';
import { ShoppingCartOutlined, FrownOutlined } from '@ant-design/icons'; // Import icons
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import './ExplorePlan.css';

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const ExplorePlan = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Retrieve vendor_Id from localStorage
  const vendorId = localStorage.getItem('vendor_Id');
  
  // Initialize the useNavigate hook
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlansByVendor = async () => {
      try {
        if (!vendorId) {
          message.error('Vendor ID is missing.');
          return;
        }

        const response = await axios.get(`http://localhost:5272/api/SubscriptionPlans/vendor/${vendorId}`);
        
        // Check if the response contains no plans
        if (response.data && response.data.length === 0) {
          setError('No subscription plans available for this vendor.');
        } else {
          setPlans(response.data);
        }
      } catch (error) {
        console.error('Error fetching plans:', error);
        setError('Failed to load subscription plans.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlansByVendor(); // Fetch the plans based on the vendorId
  }, [vendorId]); // Re-run when vendorId changes

  const handleSubscribe = (plan) => {
    // Save the selected plan in localStorage
    localStorage.setItem('selectedPlan', JSON.stringify(plan));

    // Navigate to UserSubscribePlan.jsx, passing plan details as state
    navigate('/USP', { state: { plan } });
  };

  return (
    <Layout className="explore-plan-page">
      <Content className="explore-plan-content">
        <Title level={2} className="explore-plan-title">
          Explore Our Subscription Plans
        </Title>
        
        {loading ? (
          <Title level={4}>Loading plans...</Title>
        ) : error ? (
          <Row justify="center" align="middle" style={{ color: 'red', padding: '20px' }}>
            <FrownOutlined style={{ fontSize: '40px', marginRight: '10px' }} />
            <Title level={4} style={{ color: 'red' }}>{error}</Title>
          </Row>
        ) : (
          <Row gutter={[16, 16]} justify="center">
            {plans.map((plan) => (
              <Col xs={24} sm={12} md={8} key={plan.plan_Id}>
                <Card
                  hoverable
                  className="explore-plan-card"
                  actions={[
                    <Button
                      type="primary"
                      icon={<ShoppingCartOutlined />}
                      className="explore-plan-button"
                      onClick={() => handleSubscribe(plan)}
                    >
                      Subscribe Now
                    </Button>,
                  ]}
                >
                  <Title level={4} className="explore-plan-card-title">{plan.plan_Name}</Title>
                  <Paragraph className="explore-plan-price">{plan.price ? ` ₹${plan.price}` : 'Contact for Pricing'}</Paragraph>
                  <Paragraph className="explore-plan-description">{plan.description || 'No description available'}</Paragraph>
                  <Paragraph className="plan-features">Features: {plan.features || 'No features listed'}</Paragraph>
                  <Paragraph className="plan-duration">Duration: {plan.duration_In_Days} days</Paragraph>
                  <Paragraph className="plan-status">{plan.is_Active ? 'Active' : 'Inactive'}</Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Content>
    </Layout>
  );
};

export default ExplorePlan;
