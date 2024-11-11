import React from 'react';
import { Form, Input, Button, Row, Col, Typography, Card } from 'antd';
import { MailOutlined, UserOutlined, MessageOutlined } from '@ant-design/icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const { Title, Text } = Typography;

function ContactPage() {
  const onFinish = (values) => {
    console.log('Form values:', values);
  };

  return (
    <>
      <Navbar />
      <div className="contact-page">
        <Row justify="center">
          <Col xs={24} sm={18} md={14} lg={10} xl={8}>
            <Card className="contact-card">
              <Title level={2} className="contact-title">Contact Us</Title>
              <Text className="contact-description">
                Feel free to reach out to us for any queries, suggestions, or feedback!
              </Text>
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
                    prefix={<MessageOutlined />}
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="contact-button">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Card>
            <div className="contact-info">
              <Text className="contact-info-text">📧 Email us at: support@example.com</Text>
              <Text className="contact-info-text">📞 Call us at: +123 456 7890</Text>
            </div>
          </Col>
        </Row>
      </div>
      <Footer />
    </>
  );
}

export default ContactPage;
