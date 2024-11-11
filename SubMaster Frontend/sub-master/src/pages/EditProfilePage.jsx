import React, { useEffect, useState } from 'react';
import { Card, Form, Input, Button, DatePicker, message, Upload, Avatar, Spin } from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import defaultProfilePicture from '../assets/s1.png';
import './EditProfilePage.css';

const EditProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [file, setFile] = useState(null); // For storing the uploaded file
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
          dateOfBirth: response.data.date_Of_Birth ? moment(response.data.date_Of_Birth) : null,
        });
      } catch (error) {
        console.error("Error fetching user data", error);
        message.error("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate, form]);

  const onFinish = async (values) => {
    const userId = localStorage.getItem('user_Id');
    const accessToken = localStorage.getItem('accessToken');
    
    const formData = new FormData();
    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);
    formData.append('email', values.email);
    formData.append('phone_Number', values.phone);
    formData.append('address', values.address);
    formData.append('date_Of_Birth', values.dateOfBirth ? values.dateOfBirth.format('YYYY-MM-DD') : null);
    if (file) {
      formData.append('profile_Picture_Url', file);
    }

    try {
      const response = await axios.put(`http://localhost:5272/api/UserAccounts/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',  // Necessary for file uploads
        },
      });
      message.success("Profile updated successfully!");
      navigate('/profile');
    } catch (error) {
      console.error("Error updating profile", error);
      message.error("Failed to update profile.");
    }
  };

  const handleFileChange = (info) => {
    if (info.file.status === 'done') {
      setFile(info.file.originFileObj);
    }
  };

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
        <div className="profile-avatar-section">
          <Avatar
            size={100}
            src={userData.profile_Picture_Url || defaultProfilePicture}
            icon={<UserOutlined />}
          />
          <Upload
            onChange={handleFileChange}
            showUploadList={false}  // Hide the default upload list
          >
            <Button icon={<UploadOutlined />}>Change Avatar</Button>
          </Upload>
        </div>

        <Form form={form} layout="vertical" onFinish={onFinish} className="edit-profile-form">
          <Form.Item name="firstName" label="First Name" rules={[{ required: true, message: 'Please enter your first name' }]}>
            <Input placeholder="First Name" />
          </Form.Item>

          <Form.Item name="lastName" label="Last Name" rules={[{ required: true, message: 'Please enter your last name' }]}>
            <Input placeholder="Last Name" />
          </Form.Item>

          <Form.Item name="email" label="Email" rules={[{ type: 'email', message: 'Please enter a valid email' }]}>
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item name="phone" label="Phone Number" rules={[{ required: true, message: 'Please enter your phone number' }]}>
            <Input placeholder="Phone Number" />
          </Form.Item>

          <Form.Item name="address" label="Address" rules={[{ required: true, message: 'Please enter your address' }]}>
            <Input placeholder="Address" />
          </Form.Item>

          <Form.Item name="dateOfBirth" label="Date of Birth">
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="update-button">
              Update Profile
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default EditProfilePage;
