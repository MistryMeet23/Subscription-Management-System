import React, { useState } from 'react';
import { Form, Input, Button, message, Card, Typography, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LoadingOutlined } from '@ant-design/icons';
import './ForgotPasswordPage.css';

const { Title } = Typography;

const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [userId, setUserId] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const checkEmail = async () => {
    setLoading(true);
    try {
      const email = form.getFieldValue('email');
      const response = await axios.get(`http://localhost:5272/api/UserAccounts/email/${email}`);

      if (response.status === 200 && response.data.userId) {
        setUserId(response.data.userId);
        setEmailVerified(true);
        setEmailChecked(true);
        message.success('Email found. Please enter a new password.');
      } else {
        message.error('Email not registered.');
      }
    } catch (error) {
      message.error(error.response?.data?.message || 'Error checking email.');
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:5272/api/UserAccounts/ResetPassword/${userId}`, {
        newPassword: values.newPassword,
      });

      if (response.status === 200) {
        message.success('Password reset successful! Please log in.');
        form.resetFields();  // Reset form fields after success
        navigate('/login');
      } else {
        message.error('Error resetting password.');
      }
    } catch (error) {
      message.error(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-content">
        <div className="forgot-password-left">
          <img
            src="./src/assets/bg3.jpg"
            alt="Background"
            className="forgot-password-image"
          />
        </div>
        <div className="forgot-password-right">
          <Card className="forgot-password-card">
            <Title level={2} className="forgot-password-title">Reset Password</Title>
            <Form form={form} name="forgot-password" onFinish={onFinish} layout="vertical">
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, type: 'email', message: 'Please enter your email!' }]}
              >
                <Input disabled={emailChecked} />
              </Form.Item>

              {!emailChecked && (
                <Form.Item>
                  <Button type="primary" onClick={checkEmail} className="check-email-button" loading={loading}>
                    Check Email
                  </Button>
                </Form.Item>
              )}

              {emailChecked && (
                <>
                  <Form.Item
                    label="New Password"
                    name="newPassword"
                    rules={[{ required: true, message: 'Please enter a new password!' }]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    dependencies={['newPassword']}
                    rules={[ 
                      { required: true, message: 'Please confirm your password!' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('newPassword') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('Passwords do not match!'));
                        },
                      }),
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} className="reset-password-button">
                      {loading ? 'Submitting...' : 'Reset Password'}
                    </Button>
                  </Form.Item>
                </>
              )}
              {emailVerified && !loading && <p>Email verified! You can now reset your password.</p>}
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
