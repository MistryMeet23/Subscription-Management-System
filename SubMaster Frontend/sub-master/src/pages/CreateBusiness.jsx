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
      user_Id: userId,
      business_Name: values.business_Name,
      business_Description: values.business_Description,
      business_Address: values.business_Address,
      phone_Number: values.phone_Number,
    };
  
    // Log data to verify before sending
    console.log("Sending business data:", businessData);
  
    try {
      const response = await axios.post('http://localhost:5272/api/VendorProfiles', businessData);
      if (response.status === 201) {
        message.success('Business created successfully');
      } else {
        message.error('Failed to create business');
      }
    } catch (error) {
      console.error("API Error:", error.response);
      message.error('An error occurred');
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
