import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button, Typography, message, Space } from 'antd';
import axios from 'axios';
import './MyBusinessPage.css';

const { Title, Paragraph } = Typography;

const MyBusinessPage = () => {
  const [businessData, setBusinessData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        const response = await axios.get('http://localhost:5272/api/VendorProfiles');
        setBusinessData(response.data); // Assuming the response is an array of business profiles
        setLoading(false);
      } catch (error) {
        console.error("API Error:", error);
        message.error('Failed to fetch business data');
        setLoading(false);
      }
    };

    fetchBusinessData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="my-business-page">
      <Title level={2} className="page-title">My Businesses</Title>
      <Row gutter={[24, 24]} className="card-row">
        {businessData.map((business, index) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <Card
              hoverable
              cover={<img alt="Business Logo" src={business.logo_Url} className="card-image" />}
              className="business-card"
            >
              <Title level={4} className="business-title">{business.business_Name}</Title>
              <Paragraph ellipsis={{ rows: 3, expandable: true, symbol: 'more' }} className="business-description">
                {business.business_Description}
              </Paragraph>
              <Space direction="vertical" size={10}>
                <Paragraph><strong>Address:</strong> {business.business_Address}</Paragraph>
                <Paragraph><strong>Phone:</strong> {business.phone_Number}</Paragraph>
                <Paragraph><strong>Tax ID:</strong> {business.tax_Id}</Paragraph>
                <Paragraph>
                  <strong>Website:</strong> 
                  <a href={business.website_Url} target="_blank" rel="noopener noreferrer" className="website-link">{business.website_Url}</a>
                </Paragraph>
              </Space>
              <Button type="primary" className="edit-btn">Edit Business</Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MyBusinessPage;
