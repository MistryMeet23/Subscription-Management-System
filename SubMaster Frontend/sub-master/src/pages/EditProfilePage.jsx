import React, { useEffect, useState } from 'react';
import { Card, Form, Input, Button, message, Spin, Row, Col } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EditProfilePage.css';
import ErrorPage from '../pages/ErrorPage'; // Import ErrorPage

const EditProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null); // State for error handling
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    const userId = localStorage.getItem('user_Id');
    const accessToken = localStorage.getItem('accessToken');

    if (!userId || !accessToken) {
      message.error("User ID or Access Token is missing. Redirecting to login.");
      navigate('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5272/api/UserAccounts/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUserData(response.data);
        form.setFieldsValue({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          phone: response.data.phone_Number,
          address: response.data.address,
        });
      } catch (error) {
        console.error("Error fetching user data", error);
        setError(true); // Set error state if there's an error
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate, form]);

  const onFinish = async (values) => {
    setLoading(true);
    const userId = localStorage.getItem('user_Id');
    const accessToken = localStorage.getItem('accessToken');
  
    const payload = {
      User_Id: userId,
      FirstName: values.firstName,
      LastName: values.lastName,
      Email: values.email,
      Phone_Number: values.phone,
      Address: values.address,
      Password_Hash: userData.password_Hash, // Use the existing password hash
    };
  
    try {
      const response = await axios.put(
        `http://localhost:5272/api/UserAccounts/${userId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 200 || response.status === 204) {
        message.success('Profile updated successfully!');
        navigate('/profile');
      } else {
        message.error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      if (error.response) {
        message.error(`Error: ${error.response.data.message || 'Failed to update profile'}`);
      } else if (error.request) {
        message.error('No response from server. Please try again later.');
      } else {
        message.error('Error updating profile.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <ErrorPage />; // Show ErrorPage if there was an error
  }

  if (loading) {
    return (
      <div className="profile-spinner">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="edit-profile-container">
      <Card title="Edit Profile" className="edit-profile-card">
        <Form form={form} layout="vertical" onFinish={onFinish} className="edit-profile-form">
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="firstName" label="First Name" rules={[{ required: true, message: 'Please enter your first name' }]}>
                <Input placeholder="First Name" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="lastName" label="Last Name" rules={[{ required: true, message: 'Please enter your last name' }]}>
                <Input placeholder="Last Name" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="email" label="Email" rules={[{ type: 'email', message: 'Please enter a valid email' }]}>
                <Input placeholder="Email" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="phone" label="Phone Number" rules={[{ required: true, message: 'Please enter your phone number' }]}>
                <Input placeholder="Phone Number" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="address" label="Address" rules={[{ required: true, message: 'Please enter your address' }]}>
                <Input placeholder="Address" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="update-button">
                  Update Profile
                </Button>
                <Button onClick={() => navigate('/profile')} className="cancel-button">
                  Cancel
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default EditProfilePage;
