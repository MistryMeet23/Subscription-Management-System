import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Typography, Spin, Alert, Button, Space } from 'antd';
import { HomeOutlined, PhoneOutlined, LinkOutlined, EditOutlined } from '@ant-design/icons';
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
        setError('Failed to fetch business data.');
        setLoading(false);
      }
    };

    fetchBusinessData();
  }, [userId]);

  return (
    <div className="my-business-page">
      <Title level={2} className="my-business-page-title">
        My Businesses
      </Title>

      {loading ? (
        <Spin size="large" className="my-business-spinner" />
      ) : error ? (
        <Alert message={error} type="error" showIcon className="my-business-alert" />
      ) : noBusiness ? (
        <Alert
          message="You have no businesses associated with your account."
          description="Please create a business profile to manage it here."
          type="info"
          showIcon
          className="my-business-alert"
        />
      ) : (
        <Row gutter={[24, 24]} className="my-business-row">
          {businessData.map((business) => (
            <Col xs={24} sm={12} md={8} key={business.vendor_Id}>
              <Card
                hoverable
                className="my-business-card"
                cover={
                  <div className="my-business-card-cover">
                    <HomeOutlined className="my-business-card-icon" />
                  </div>
                }
                actions={[
                  <Button
                    type="link"
                    icon={<EditOutlined />}
                    className="my-business-action-button"
                    onClick={() => navigate(`/ManageBusiness/${business.vendor_Id}`)}
                  >
                    Manage Business
                  </Button>,
                ]}
              >
                <Card.Meta
                  title={<Title level={4} className="my-business-card-title">{business.business_Name}</Title>}
                  description={
                    <div className="my-business-card-description">
                      <Text className="my-business-card-text">{business.business_Description}</Text>
                      <Space direction="vertical" size={6} className="my-business-card-space">
                        <Text>
                          <strong>Address:</strong> {business.business_Address}
                        </Text>
                        <Text>
                          <PhoneOutlined style={{ marginRight: '5px' }} /> {business.phone_Number}
                        </Text>
                        {business.website_Url && (
                          <Text>
                            <LinkOutlined style={{ marginRight: '5px' }} />
                            <a href={business.website_Url} target="_blank" rel="noopener noreferrer">
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
          ))}
        </Row>
      )}
    </div>
  );
};

export default MyBusinessPage;
