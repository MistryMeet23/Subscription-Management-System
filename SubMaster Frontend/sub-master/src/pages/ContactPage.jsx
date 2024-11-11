import React from 'react';
import { Form, Input, Button, Row, Col, Typography, Card } from 'antd';
import { MailOutlined, UserOutlined, MessageOutlined } from '@ant-design/icons';
import Footer from '../components/Footer';
import './ContactPage.css';
import contactImage from '../assets/contact.jpg'; // Replace with your image path

const { Title, Text } = Typography;

function ContactPage() {
  const onFinish = (values) => {
    console.log('Form values:', values);
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
                      />
                    </Form.Item>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        { required: true, message: 'Please enter your email' },
                        { type: 'email', message: 'Please enter a valid email' }
                      ]}
                    >
                      <Input
                        placeholder="email@example.com"
                        prefix={<MailOutlined />}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Message"
                      name="message"
                      rules={[{ required: true, message: 'Please enter your message' }]}
                    >
                      <Input.TextArea
                        rows={4}
                        placeholder="Type your message here"
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit" className="contact-button">
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
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
