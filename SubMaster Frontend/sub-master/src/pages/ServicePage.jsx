import React, { useEffect, useState } from 'react';
import { Layout, Row, Col, Typography, Card, Button, Input, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ServicePage.css';

const { Title, Paragraph } = Typography;
const { Content } = Layout;
const { Search } = Input;

const ServicePage = () => {
  const [businesses, setBusinesses] = useState([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await axios.get('http://localhost:5272/api/VendorProfiles');
        setBusinesses(response.data);
        setFilteredBusinesses(response.data);
      } catch (error) {
        console.error('Error fetching business data:', error);
        message.error('Failed to load business data.');
      }
    };

    fetchBusinesses();
  }, []);

  const handleSearch = (value) => {
    setSearchQuery(value);
    const filtered = businesses.filter((business) =>
      business.business_Address.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredBusinesses(filtered);
  };

  const handleExploreClick = (vendorId) => {
    if (vendorId) {
      localStorage.setItem('vendor_Id', vendorId); // Save vendor_Id to localStorage
      navigate('/ExplorePlan'); // Navigate to ExplorePlan page
    } else {
      message.error('Vendor ID not available.');
    }
  };

  return (
    <Layout className="service-page">
      <Content className="service-content">
        <Title level={2} className="service-title">
          Our Subscription Services
        </Title>

        <Search
          placeholder="Search by City"
          allowClear
          enterButton="Search"
          size="large"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          onSearch={handleSearch}
          className="service-search-bar"
        />

        <Row gutter={[16, 16]} justify="center" className="service-cards-row">
          {filteredBusinesses.map((business) => (
            <Col xs={24} sm={12} md={8} key={business.vendor_Id}>
              <Card
                className="service-card"
          actions={[
                  <Button
                    type="primary"
                    icon={<SearchOutlined />}
                    className="service-card-button"
                    onClick={() => handleExploreClick(business.vendor_Id)} // Pass the business.vendor_Id to the handler
                  >
                    Explore
                  </Button>,
                ]}
              >
                <div className="service-card-content">
                  <Title level={4} className="service-card-title">
                    {business.business_Name}
                  </Title>
                  <Paragraph className="service-price">Contact for Pricing</Paragraph>
                  <Paragraph className="service-description">
                    {business.business_Description}
                  </Paragraph>
                  <Paragraph className="service-address">
                    Address: {business.business_Address}
                  </Paragraph>
                  <Paragraph className="service-phone">
                    Phone: {business.phone_Number}
                  </Paragraph>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Content>
    </Layout>
  );
};

export default ServicePage;
