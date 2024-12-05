import React, { useState } from 'react';
import { Form, Input, Button, Typography, Card, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

const { Title } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5272/api/Login', {
        email: values.email,
        password: values.password,
      });

      const { accessToken, success, roleId, userId } = response.data;

      if (success) {
        message.success('Login successful!');
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('user_Id', userId);
        localStorage.setItem('role_Id', roleId);

        if (roleId === 1) {
          navigate('/AdminDashboard');
        } else {
          navigate('/profile');
        }
      } else {
        message.error('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      message.error(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <div className="login-content">
          <Title level={2} className="login-title">Login</Title>
          <Form
            name="login"
            onFinish={onFinish}
            layout="vertical"
            requiredMark={false}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, type: 'email', message: 'Please enter a valid email!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-button"
                loading={loading}
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </Form.Item>
          </Form>
          <div>
            <Link to="/register" className="register-link">
              Don't have an account? Register here
            </Link>
            <Link to="/forgot-password" className="forgot-password-link">
              Forgot your password?
            </Link>
          </div>

        </div>
      </Card>
    </div>
  );
};

export default Login;
