import React, { useEffect, useState } from 'react';
import { Card, Typography, Spin, Button, message, Row, Col } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ErrorPage from '../pages/ErrorPage'; // Adjust import if needed
import './ProfilePage.css';

const { Title, Text } = Typography;

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false); // New state to track errors
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
        setHasError(true); // Set error state
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleEditProfile = () => {
    navigate('/EditProfilePage');
  };

  const handleShowAllSubscriptions = () => {
    navigate('/AllSubscriptions');
  };

  // Show loading spinner while loading
  if (loading) {
    return (
      <div className="profile-spinner">
        <Spin size="large" />
      </div>
    );
  }

  // Show error page if there's an error
  if (hasError) {
    return <ErrorPage />;
  }

  return (
    <>
      <div className="profile-container">
        <Card bordered={false} className="profile-card">
          <div className="profile-header">
            <Title level={2} className="profile-title">
              {`${userData?.firstName || ''} ${userData?.lastName || ''}`}
            </Title>
            <Text className="profile-status" type="secondary">
              Status: {userData?.status || "N/A"}
            </Text>
            <Button
              type="primary"
              onClick={handleEditProfile}
              className="edit-profile-button"
            >
              Edit Profile
            </Button>
          </div>

          <Row gutter={32} className="profile-details">
            <Col span={24} sm={12}>
              <Card title="Contact Information" bordered={false} className="profile-info-card">
                <Text><strong>Email:</strong> {userData?.email || "N/A"}</Text><br />
                <Text><strong>Phone:</strong> {userData?.phone_Number || "N/A"}</Text><br />
                <Text><strong>Address:</strong> {userData?.address || "N/A"}</Text>
              </Card>
            </Col>

            <Col span={24} sm={12}>
              <Card title="Subscription Information" bordered={false} className="profile-info-card">
                <Text><strong>Joined:</strong> {userData?.created_At ? new Date(userData.created_At).toLocaleDateString() : "N/A"}</Text>
                <Button
                  type="link"
                  onClick={handleShowAllSubscriptions}
                  className="show-subscriptions-button"
                >
                  Show My All Subscriptions
                </Button>
              </Card>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
};

export default ProfilePage;
