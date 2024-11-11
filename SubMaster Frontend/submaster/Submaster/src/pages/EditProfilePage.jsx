import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Card } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './EditProfilePage.css';

const EditProfilePage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('user_Id');
    if (!userId) {
      message.error("User ID is missing. Please log in again.");
      navigate('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5272/api/UserAccounts/${userId}`);
        setUserData(response.data);
        form.setFieldsValue(response.data); // Populate form with user data
      } catch (error) {
        message.error("Failed to load user data. Please try again.");
      }
    };

    fetchUserData();
  }, [form, navigate]);

  const handleFormSubmit = async (values) => {
    setLoading(true);
    const userId = localStorage.getItem('user_Id');

    try {
      await axios.put(`http://localhost:5272/api/UserAccounts/${userId}`, values);
      message.success("Profile updated successfully!");
      navigate('/profile'); // Redirect to Profile page after updating
    } catch (error) {
      message.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="edit-profile-container">
        <Card title="Edit Profile" className="edit-profile-card">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFormSubmit}
            initialValues={userData}
          >
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: 'Please enter your first name' }]}
            >
              <Input placeholder="First Name" />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true, message: 'Please enter your last name' }]}
            >
              <Input placeholder="Last Name" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phone_Number"
            >
              <Input placeholder="Phone Number" />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
            >
              <Input.TextArea placeholder="Address" rows={3} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Save Changes
              </Button>
              <Button type="default" onClick={() => navigate('/profile')} style={{ marginLeft: '10px' }}>
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default EditProfilePage;