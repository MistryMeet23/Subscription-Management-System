import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Typography, Spin, Tag, Space } from 'antd';
import { CreditCardOutlined, CalendarOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import './AllSubscriptions.css';

const { Title, Text } = Typography;

const AllSubscriptionsPage = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the API
    fetch('http://localhost:5272/api/CustomerSubscriptions/user/6')
      .then((response) => response.json())
      .then((data) => {
        const fetchedSubscriptions = data.map((subscription) => ({
          id: subscription.subscription_Id,
          title: `Plan ${subscription.plan_Id}`,
          duration: `${new Date(subscription.start_Date).toLocaleDateString()} to ${new Date(subscription.end_Date).toLocaleDateString()}`,
          plan: subscription.payment_Method,
          status: subscription.status,
          paymentStatus: subscription.payment_Status,
          discount: subscription.discount_Applied,
          createdAt: new Date(subscription.created_At).toLocaleDateString(),
          updatedAt: new Date(subscription.updated_At).toLocaleDateString(),
        }));
        setSubscriptions(fetchedSubscriptions);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching subscriptions:', error);
        setLoading(false);
      });
  }, []);

  const handleShowDetails = (id) => {
    console.log(`Show details for subscription ID: ${id}`);
    // Navigate to subscription details page or show a modal with details
  };

  if (loading) {
    return <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />;
  }

  return (
    <div className="subscriptions-container">
      <Title level={2} className="page-title">All Subscriptions</Title>
      <Row gutter={[16, 24]}>
        {subscriptions.map((subscription) => (
          <Col span={24} sm={12} md={8} lg={6} key={subscription.id}>
            <Card
              hoverable
              title={subscription.title}
              bordered={false}
              extra={<Tag color={subscription.status === 'active' ? 'green' : 'volcano'}>{subscription.status}</Tag>}
              className="subscription-card"
              // actions={[
              //   <Button
              //     type="link"
              //     onClick={() => handleShowDetails(subscription.id)}
              //     icon={<CreditCardOutlined />}
              //     size="small"
              //   >
              //     View Details
              //   </Button>,
              // ]}
            >
              <Space direction="vertical" size={8}>
                <Text><CalendarOutlined /> <strong>Duration:</strong> {subscription.duration}</Text>
                <Text><strong>Payment Method:</strong> {subscription.plan}</Text>
                <Text><strong>Discount:</strong> {subscription.discount}%</Text>
                <Text><strong>Created At:</strong> {subscription.createdAt}</Text>
                <Text><strong>Updated At:</strong> {subscription.updatedAt}</Text>
              </Space>
              <Space size={12} style={{ marginTop: '15px' }}>
                <Tag color={subscription.paymentStatus === 'pending' ? 'orange' : 'green'}>
                  {subscription.paymentStatus === 'pending' ? <CloseCircleOutlined /> : <CheckCircleOutlined />}
                  {subscription.paymentStatus}
                </Tag>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AllSubscriptionsPage;
