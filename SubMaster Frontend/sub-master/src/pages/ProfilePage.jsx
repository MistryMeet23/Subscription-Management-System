import React, { useEffect, useState } from 'react';
import { Card, Typography, Spin, Avatar, Button, message, Row, Col } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import defaultProfilePicture from '../assets/s1.png';
import './ProfilePage.css';

const { Title, Text } = Typography;

const ContactInfo = ({ userData }) => (
  <Col span={12}>
    <Title level={4}>Contact Information</Title>
    <Text>Email: {userData?.email || "N/A"}</Text><br />
    <Text>Phone: {userData?.phone_Number || "N/A"}</Text><br />
    <Text>Address: {userData?.address || "N/A"}</Text>
  </Col>
);

const SubscriptionInfo = ({ userData }) => (
  <Col span={12}>
    <Title level={4}>Subscription Information</Title>
    <Text>Joined: {userData?.created_At ? new Date(userData.created_At).toLocaleDateString() : "N/A"}</Text><br />
  </Col>
);

const PersonalInfo = ({ userData }) => (
  <Col span={12}>
    <Title level={4}>Personal Information</Title>
    <Text>Date of Birth: {userData?.date_Of_Birth ? new Date(userData.date_Of_Birth).toLocaleDateString() : "N/A"}</Text><br />
  </Col>
);

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
      } catch (error) {
        console.error("Error fetching user data", error);
        message.error("Failed to load user data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleEditProfile = () => {
    navigate('/EditProfilePage');
  };

  if (loading) {
    return (
      <div className="profile-spinner">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <Card className="profile-card">
          <div className="profile-header">
            <Avatar
              size={100}
              src={userData?.profile_Picture_Url || defaultProfilePicture}
              alt="Profile Picture"
              className="profile-avatar"
            />
            <div className="profile-info">
              <Title level={3} className="profile-name">{`${userData?.firstName || ''} ${userData?.lastName || ''}`}</Title>
              <Text type="secondary" className="profile-status">Status: {userData?.status || "N/A"}</Text><br />
              <Button type="primary" onClick={handleEditProfile} className="edit-profile-button">
                Edit Profile
              </Button>
            </div>
          </div>

          <Row gutter={24} className="profile-details">
            <ContactInfo userData={userData} />
            <SubscriptionInfo userData={userData} />
          </Row>

          <Row gutter={24}>
            <PersonalInfo userData={userData} />
          </Row>
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
