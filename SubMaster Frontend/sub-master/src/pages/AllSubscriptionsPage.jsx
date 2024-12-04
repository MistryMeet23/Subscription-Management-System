import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Typography, Spin } from 'antd';
import './AllSubscriptions.css';

const { Title, Text } = Typography;

const AllSubscriptionsPage = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an API call
    setTimeout(() => {
      const fetchedSubscriptions = [
        { id: 1, title: 'Premium Plan', duration: '1 Year', plan: 'Monthly Payment' },
        { id: 2, title: 'Basic Plan', duration: '6 Months', plan: 'Quarterly Payment' },
        { id: 3, title: 'Enterprise Plan', duration: '2 Years', plan: 'Annual Payment' },
        { id: 4, title: 'Starter Plan', duration: '3 Months', plan: 'Monthly Payment' },
        { id: 5, title: 'Pro Plan', duration: '1 Year', plan: 'Bi-Annual Payment' },
      ];
      setSubscriptions(fetchedSubscriptions);
      setLoading(false);
    }, 1000); // Simulating a delay
  }, []);

  const handleShowDetails = (id) => {
    console.log(`Show details for subscription ID: ${id}`);
    // Navigate to subscription details page or show a modal with details
  };

  if (loading) {
    return <Spin size="large" style={{ display: 'block', margin: '20px auto' }} />;
  }

  return (
    <div className="subscriptions-container">
      <Title level={2}>All Subscriptions</Title>
      <Row gutter={32}>
        {subscriptions.map((subscription) => (
          <Col span={24} sm={12} md={8} lg={6} key={subscription.id}>
            <Card
              hoverable
              title={subscription.title}
              bordered={false}
              className="subscription-card"
            >
              <Text><strong>Duration:</strong> {subscription.duration}</Text><br />
              <Text><strong>Plan:</strong> {subscription.plan}</Text><br />
              <Button
                type="primary"
                onClick={() => handleShowDetails(subscription.id)}
                className="show-details-button"
                aria-label={`Show details for ${subscription.title}`}
              >
                Show
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AllSubscriptionsPage;
