import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Typography, Spin, Button, Space, Tooltip } from 'antd';
import { PhoneOutlined, LinkOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MyBusinessPage.css';

const { Title, Text } = Typography;

const MyBusinessPage = () => {
  const [businessData, setBusinessData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noBusiness, setNoBusiness] = useState(false);

  const userId = localStorage.getItem('user_Id');
  const apiUrl = `http://localhost:5272/api/VendorProfiles/user/${userId}`;
  const navigate = useNavigate();

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        const response = await axios.get(apiUrl);
        if (response.data.length === 0) {
          setNoBusiness(true);
        } else {
          setBusinessData(response.data);
        }
        setLoading(false);
      } catch (err) {
        setError('There was an issue fetching your business data. Please try again later.');
        setLoading(false);
      }
    };

    fetchBusinessData();
  }, [userId]);

  const handleManageBusiness = (vendorId) => {
    localStorage.setItem('MyBusinessVendorId', vendorId);
    navigate('/ManageBusiness');
  };

  return (
    <div className="my-business-page">
      <div className="my-business-header">
        <Title level={2} className="my-business-title">My Businesses</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate('/createbusiness')}
          className="my-business-add-button"
        >
          Add New Business
        </Button>
      </div>

      {loading ? (
        <div className="my-business-spinner-container">
          <Spin size="large" className="my-business-spinner" />
        </div>
      ) : error ? (
        <div className="my-business-error-message">
          <Text className="my-business-error-text">There was an issue fetching your business data. Please try again later.</Text>
        </div>
      ) : noBusiness ? (
        <div className="my-business-no-business">
          <Title level={4} className="my-business-no-business-title">
            No businesses found
          </Title>
          <Text className="my-business-no-business-description">
            Start by creating your first business profile.
          </Text>
        </div>
      ) : (
        <Row gutter={[24, 24]} className="my-business-row">
          {businessData.map((business) => {
            const firstLetter = business.business_Name ? business.business_Name[0].toUpperCase() : '';
            const bgColor = getRandomColor();

            return (
              <Col xs={24} sm={12} md={8} lg={8} key={business.vendor_Id}>
                <Card
                  hoverable
                  className="my-business-card"
                  cover={
                    <div>
                      <div className="my-business-avatar" style={{ backgroundColor: bgColor }}>
                        {firstLetter}
                      </div>
                    </div>
                  }
                  actions={[
                    <Tooltip title="Manage Business">
                      <Button
                        type="link"
                        icon={<EditOutlined />}
                        className="my-business-manage-button"
                        onClick={() => handleManageBusiness(business.vendor_Id)}
                      >
                        Manage
                      </Button>
                    </Tooltip>,
                  ]}
                >
                  <Card.Meta
                    title={<Title level={4} className="my-business-card-title">{business.business_Name}</Title>}
                    description={
                      <div className="my-business-card-description">
                        <Space direction="vertical" size={8}>
                          <Text className="my-business-address">
                            <strong>Address:</strong> {business.business_Address}
                          </Text>
                          <Text>
                            <PhoneOutlined /> {business.phone_Number}
                          </Text>
                          {business.website_Url && (
                            <Text>
                              <LinkOutlined />{' '}
                              <a
                                href={business.website_Url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="my-business-link"
                              >
                                {business.website_Url}
                              </a>
                            </Text>
                          )}
                        </Space>
                      </div>
                    }
                  />
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </div>
  );
};

export default MyBusinessPage;
