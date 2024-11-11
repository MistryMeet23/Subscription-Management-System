import React, { useState } from 'react';
import { Form, Input, Button, Typography, Card, message, Row, Col } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './RegisterPage.css';

const { Title } = Typography;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  // Function to handle form submission
  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Prepare the user data object (password hashing handled on server)
      const userData = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password_Hash: values.password, // Password sent raw; hashing occurs on server
      };

      console.log('Sending data to API:', userData);

      // Send data to the API
      const response = await fetch('http://localhost:5272/api/UserAccounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error('Registration failed. Please try again.');
      }
      const data = await response.json();
      message.success('Registration successful!');
      console.log('Registered user:', data);

      // Redirect to login page after successful registration
      navigate('/login');
    } catch (error) {
      message.error(error.message || 'Registration failed. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <Card className="register-card">
        <div className="register-image" /> {/* Image on the left side */}
        <div className="register-content"> {/* Wrap content for layout */}
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
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  rules={[{ required: true, message: 'Please enter your last name!' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, type: 'email', message: 'Please enter a valid email!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password" // Change from password_Hash to password
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="register-button" loading={loading}>
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

export default Register;
