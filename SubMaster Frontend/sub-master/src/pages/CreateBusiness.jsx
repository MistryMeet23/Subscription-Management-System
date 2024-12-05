import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import './CreateBusiness.css';

const CreateBusiness = () => {
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem('user_Id'); // Fetch user_Id from local storage

  const onFinish = async (values) => {
    setLoading(true);

    const businessData = {
      user_Id: parseInt(userId), // Ensure user_Id is a number
      business_Name: values.business_Name,
      business_Description: values.business_Description,
      business_Address: values.business_Address,
      phone_Number: values.phone_Number,
      tax_Id: values.tax_Id || 'TAX12345', // Example tax ID
      website_Url: values.website_Url || 'https://example.com', // Example website URL
      social_Media_Links: values.social_Media_Links || 'https://twitter.com/example', // Example social link
      logo_Url: values.logo_Url || 'https://example.com/logo.png', // Example logo URL
      created_At: new Date().toISOString(),
      updated_At: new Date().toISOString(),
    };

    try {
      const response = await axios.post('http://localhost:5272/api/VendorProfiles', businessData);
      if (response.status === 201) {
        message.success('Business created successfully');
        // Navigate to MyBusinessPage (adjust based on your routing setup)
        window.location.href = '/MyBusinessPage';
      } else {
        message.error('Failed to create business');
      }
    } catch (error) {
      console.error('API Error:', error.response || error);
      message.error('An error occurred while creating the business');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-business-container">
      <h2>Create Business</h2>
      <Form layout="vertical" onFinish={onFinish} className="create-business-form">
        <Form.Item
          label="Business Name"
          name="business_Name"
          rules={[{ required: true, message: 'Please enter your business name' }]}
        >
          <Input placeholder="Enter business name" />
        </Form.Item>

        <Form.Item
          label="Business Description"
          name="business_Description"
          rules={[{ required: true, message: 'Please enter a business description' }]}
        >
          <Input.TextArea placeholder="Enter business description" />
        </Form.Item>

        <Form.Item
          label="Business Address"
          name="business_Address"
          rules={[{ required: true, message: 'Please enter the business address' }]}
        >
          <Input placeholder="Enter business address" />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone_Number"
          rules={[
            { required: true, message: 'Please enter a phone number' },
            { pattern: /^[0-9]{10}$/, message: 'Please enter a valid 10-digit phone number' },
          ]}
        >
          <Input placeholder="Enter phone number" />
        </Form.Item>

        <Form.Item
          label="Tax ID"
          name="tax_Id"
          rules={[{ required: false }]}
        >
          <Input placeholder="Enter Tax ID (optional)" />
        </Form.Item>

        <Form.Item
          label="Website URL"
          name="website_Url"
          rules={[{ type: 'url', message: 'Please enter a valid URL' }]}
        >
          <Input placeholder="Enter website URL (optional)" />
        </Form.Item>

        <Form.Item
          label="Social Media Links"
          name="social_Media_Links"
          rules={[{ required: false }]}
        >
          <Input placeholder="Enter social media links (optional)" />
        </Form.Item>

        <Form.Item
          label="Logo URL"
          name="logo_Url"
          rules={[{ type: 'url', message: 'Please enter a valid URL' }]}
        >
          <Input placeholder="Enter logo URL (optional)" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Create Business
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateBusiness;
