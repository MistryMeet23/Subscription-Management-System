import React, { useState } from "react";
import { Form, Input, Button, Typography, Card, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./RegisterPage.css";

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
      const response = await axios.post("http://localhost:5272/api/UserAccounts", payload);
      if (response.status === 201) {
        message.success(
          "Registration successful! A welcome email has been sent to your inbox."
        );
        navigate("/login");
      } else {
        message.error("Registration failed. Please try again.");
      }
    } catch (error) {
      console.log(error.response);
      message.error(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="register-container">
      <div className="register-content">
        <div className="register-left">
          <img
            src="./src/assets/bg2.jpg"
            alt="Background"
            className="register-image"
          />
        </div>
        <div className="register-right">
          <Card className="register-card">
            <Title level={2} className="register-title">Register</Title>
            <Form
              name="register"
              onFinish={onFinish}
              layout="vertical"
              requiredMark={false}
            >
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true, message: "Please enter your first name!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true, message: "Please enter your last name!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, type: "email", message: "Please enter a valid email!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please enter your password!" }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="register-button"
                  loading={loading}
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Register"}
                </Button>
              </Form.Item>
            </Form>
            <div>
              <Link to="/login" className="register-link">
                Already have an account? Login here
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
 