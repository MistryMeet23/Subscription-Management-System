import React, { useState } from 'react';
import { Form, Input, Button, Typography, Card, Row, Col, message } from 'antd';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './RegisterPage.css';

const { Title } = Typography;

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password_Hash: values.password, // Assuming API handles hashing
    };

    try {
      const response = await axios.post('http://localhost:5272/api/UserAccounts', payload);
      if (response.status === 201) {
        message.success('Registration successful!');
        navigate('/login');
      } else {
        message.error('Registration failed. Please try again.');
      }
    } catch (error) {
      console.log(error.response);
      message.error(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <Card className="register-card">
        <div className="register-content">
          <Title level={2} className="register-title">Register</Title>
          <Form
            name="register"
            onFinish={onFinish}
            layout="vertical"
            requiredMark={false}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  rules={[{ required: true, message: 'Please enter your first name!' }]}
                >
                  <Input placeholder="Enter your first name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  rules={[{ required: true, message: 'Please enter your last name!' }]}
                >
                  <Input placeholder="Enter your last name" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, type: 'email', message: 'Please enter a valid email!' }]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please enter your password!' }]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="register-button"
                loading={loading}
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Register'}
              </Button>
            </Form.Item>
          </Form>
          <Link to="/login" className="login-link">
            Already have an account? Login here
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;
