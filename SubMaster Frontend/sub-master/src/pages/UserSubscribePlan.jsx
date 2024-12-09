import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Button, Row, Col, Typography, Divider, Tag } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import axios from 'axios';

// Importing local logo image
import logo from '../assets/SMSLOGORound.png';

const { Title, Text } = Typography;

const UserSubscribePlan = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { plan } = location.state || {}; // Get plan data from navigation state
  const [vendor, setVendor] = useState(null);
  const [userId, setUserId] = useState(localStorage.getItem('user_Id')); // Get user ID from local storage

  useEffect(() => {
    if (plan?.vendor_Id) {
      axios
        .get(`http://localhost:5272/api/VendorProfiles/${plan.vendor_Id}`)
        .then((response) => setVendor(response.data))
        .catch((error) => console.error('Error fetching vendor data:', error));
    }
  }, [plan]);

  const handleBackToHome = () => {
    navigate('/home');
  };

  const handleJoinSubscription = () => {
    if (!userId) {
      // Handle missing userId
      console.error('User ID is missing!');
      return;
    }

    // Calculate the discount (5% on the plan price)
    const discount = (plan?.price * 5) / 100;

    // Get today's date and calculate the end date based on the duration
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + plan?.duration_In_Days);

    // Log the dates to verify
    console.log('Start Date:', startDate.toISOString());
    console.log('End Date:', endDate.toISOString());

    // Prepare the data for the POST request
    const subscriptionData = {
      UserAccount: {
        user_Id: userId, // Use the actual user ID from local storage
        firstName: localStorage.getItem('firstName'),
        lastName: localStorage.getItem('lastName'),
        email: localStorage.getItem('email'),
        phoneNumber: localStorage.getItem('phoneNumber'),
        // Add other user fields from local storage as necessary
      },
      SubscriptionPlan: {
        plan_Id: plan?.plan_Id, // Ensure you have the plan_Id
        plan_Name: plan?.plan_Name,
        price: plan?.price,
        duration_In_Days: plan?.duration_In_Days,
        description: plan?.description,
        features: plan?.features,
      },
      user_Id: userId,
      plan_Id: plan?.plan_Id,
      start_Date: startDate.toISOString(),
      end_Date: endDate.toISOString(),
      status: 'active',
      payment_Status: 'paid',
      payment_Method: 'cash',
      discount_Applied: discount,
      created_At: startDate.toISOString(),
      updated_At: startDate.toISOString(),
    };

    // Send the data to the backend API
    axios
      .post('http://localhost:5272/api/CustomerSubscriptions', subscriptionData)
      .then((response) => {
        console.log('Subscription successful:', response.data);
        // Navigate to home after successful subscription
        navigate('/AllSubscriptions');
      })
      .catch((error) => {
        console.error('Error subscribing:', error);
      });
  };

  return (
    <div className="subscribe-container">
      <Row justify="center" gutter={[16, 16]}>
        <Col xs={24} sm={16} md={12}>
          <Card
            title={<Title level={3} className="card-title">Subscribe to {plan?.plan_Name}</Title>}
            bordered={false}
            className="subscribe-card"
            actions={[
              <Button
                type="primary"
                icon={<ShoppingCartOutlined />}
                size="large"
                className="add-to-cart-btn"
                onClick={handleJoinSubscription} // Trigger join subscription
              >
                Join the Subscription
              </Button>,
              <Button
                type="default"
                size="large"
                className="join-btn"
                onClick={handleBackToHome} // Back to home
              >
                Back To Home
              </Button>,
            ]}
          >
            <div className="plan-details">
              <Text strong className="plan-price">₹{plan?.price}</Text>
              <br />
              <Text strong>Duration:</Text> {plan?.duration_In_Days} days
              <br />
              <Text strong>Description:</Text> {plan?.description || 'No description available'}
              <br />
              <Divider />
              <Text strong>Features:</Text>
              <Tag color="green">{plan?.features}</Tag>
              <Divider />
              {vendor && (
                <div className="vendor-info">
                  <Text strong>Business:</Text> {vendor.business_Name}
                  <br />
                  <Text strong>Address:</Text> {vendor.business_Address}
                  <br />
                  <Text strong>Contact:</Text> {vendor.phone_Number}
                </div>
              )}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserSubscribePlan;