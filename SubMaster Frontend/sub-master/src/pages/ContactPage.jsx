import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Typography, Card, message, Spin, Rate } from 'antd';
import { MailOutlined, UserOutlined, MessageOutlined } from '@ant-design/icons';
import axios from 'axios';
import Footer from '../components/Footer';
import './ContactPage.css';
import contactImage from '../assets/contact.jpg'; // Replace with your image path

const { Title, Text } = Typography;

function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    const feedbackData = {
      user_Id: 1, // Replace with actual user ID
      vendor_Id: 2, // Replace with actual vendor ID
      rating: values.rating,
      comments: values.message,
      submitted_At: new Date().toISOString(),
      created_At: new Date().toISOString(),
      updated_At: new Date().toISOString(),
    };
  
    try {
      const response = await axios.post('http://localhost:5272/api/Feedbacks', feedbackData, {
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.status === 201 || response.status === 200) { // Handle both 201 and 200 statuses
        setLoading(false);
        setSubmitSuccess(true);
        message.success('Your feedback has been submitted successfully!');
      } else {
        setLoading(false);
        message.error(`Unexpected status code: ${response.status}`);
      }
    } catch (error) {
      setLoading(false);
      const errorMessage =
        error.response && error.response.data
          ? `Error: ${error.response.data}`
          : 'There was an error submitting your feedback. Please try again.';
      message.error(errorMessage);
    }
  };
  

  return (
    <>
      <div className="contact-page">
        <Row justify="center" align="middle">
          <Col xs={24} sm={24} md={16} lg={14} xl={12} className="contact-card-col">
            <Card className="contact-card">
              <Row gutter={16}>
                {/* Left side image */}
                <Col span={12}>
                  <img src={contactImage} alt="Contact Us" className="contact-image" />
                </Col>

                {/* Right side form */}
                <Col span={12}>
                  <Title level={2} className="contact-title">Contact Us</Title>
                  <Text className="contact-description">
                    Feel free to reach out to us for any queries, suggestions, or feedback!
                  </Text>
                  <Text className="contact-info-text">📧 Email us at: support@example.com</Text>
                  <Form
                    name="contact-form"
                    layout="vertical"
                    onFinish={onFinish}
                    className="contact-form"
                  >
                    <Form.Item
                      label="Full Name"
                      name="name"
                      rules={[{ required: true, message: 'Please enter your full name' }]}
                    >
                      <Input
                        placeholder="John Doe"
                        prefix={<UserOutlined />}
                        aria-label="Full Name"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        { required: true, message: 'Please enter your email' },
                        { type: 'email', message: 'Please enter a valid email' },
                      ]}
                    >
                      <Input
                        placeholder="email@example.com"
                        prefix={<MailOutlined />}
                        aria-label="Email"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Rating"
                      name="rating"
                      rules={[{ required: true, message: 'Please provide a rating' }]}
                    >
                      <Rate allowHalf />
                    </Form.Item>
                    <Form.Item
                      label="Message"
                      name="message"
                      rules={[{ required: true, message: 'Please enter your message' }]}
                    >
                      <Input.TextArea
                        rows={4}
                        placeholder="Type your message here"
                        aria-label="Message"
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit" className="contact-button" disabled={loading}>
                        {loading ? <Spin /> : 'Submit'}
                      </Button>
                    </Form.Item>
                  </Form>
                  {submitSuccess && <Text type="success">Thank you for your feedback! We'll get back to you soon.</Text>}
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ContactPage;
