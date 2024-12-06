import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, Spin, Alert, Button, Space, Modal } from 'antd';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ManageBusiness.css';

const { Title, Text } = Typography;

const ManageBusiness = () => {
  const { vendor_Id } = useParams(); // Vendor ID from URL
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const apiUrl = `http://localhost:5272/api/SubscriptionPlans/vendor/${vendor_Id}`;

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(apiUrl);
        if (response.data.length === 0) {
          setPlans([]);
        } else {
          setPlans(response.data);
        }
      } catch (err) {
        setError('Failed to fetch subscription plans.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [vendor_Id]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="manage-business-page">
      <Row className="manage-business-header">
        <Col span={12}>
          <Title level={3}>Manage Subscription Plans</Title>
        </Col>
        <Col span={12} className="manage-business-add-button">
          <Button type="primary" onClick={openModal}>
            Add New Plan
          </Button>
        </Col>
      </Row>

      {loading ? (
        <Spin size="large" className="manage-business-spinner" />
      ) : error ? (
        <Alert message={error} type="error" showIcon className="manage-business-alert" />
      ) : plans.length === 0 ? (
        <Alert
          message="No subscription plans available."
          description="You can add a new plan using the button above."
          type="info"
          showIcon
          className="manage-business-alert"
        />
      ) : (
        <Row gutter={[24, 24]} className="manage-business-row">
          {plans.map((plan) => (
            <Col xs={24} sm={12} md={8} key={plan.plan_Id}>
              <Card hoverable className="manage-business-card">
                <Card.Meta
                  title={<Title level={4} className="manage-business-card-title">{plan.plan_Name}</Title>}
                  description={
                    <div className="manage-business-card-description">
                      <Space direction="vertical" size={6}>
                        <Text><strong>Description:</strong> {plan.description}</Text>
                        <Text><strong>Price:</strong> ${plan.price.toFixed(2)}</Text>
                        <Text><strong>Duration:</strong> {plan.duration_In_Days} days</Text>
                        <Text><strong>Features:</strong> {plan.features}</Text>
                        <Text><strong>Status:</strong> {plan.is_Active ? 'Active' : 'Inactive'}</Text>
                      </Space>
                    </div>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Add Plan Modal */}
      <Modal
        title="Add New Plan"
        visible={isModalOpen}
        onCancel={closeModal}
        footer={null}
        className="manage-business-modal"
      >
        <p>Form to add a new plan will go here.</p>
      </Modal>
    </div>
  );
};

export default ManageBusiness;
