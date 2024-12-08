import React, { useState, useEffect } from 'react';
import { Layout, Menu, Card, Col, Row, Spin, Dropdown, Button, message, Typography } from 'antd';
import { DashboardOutlined, UserOutlined, AppstoreAddOutlined, MessageOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboard.css';
import logo from '../assets/SMSLOGORound.png';

const { Header, Content } = Layout;
const { Title } = Typography;

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    users: 0,
    vendors: 0,
    subscriptions: 0,
    feedbacks: 0,
  });
  const [adminName, setAdminName] = useState('');
  const navigate = useNavigate();

  // Fetch stats and validate admin role on component mount
  useEffect(() => {
    const userRole = localStorage.getItem('role_Id');
    if (userRole !== '1') {
      navigate('/login');
      return;
    }

    // Fetch the admin name from localStorage or API
    const admin = localStorage.getItem('adminName');
    setAdminName(admin || 'Admin');

    // Fetch stats data
    axios
      .get('http://localhost:5272/api/stats') // Update the endpoint as per your API
      .then((response) => {
        setStats(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching stats:', error);
        setLoading(false);
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
    message.success('Logged out successfully');
  };

  const menu = (
    <Menu onClick={({ key }) => key === 'logout' && handleLogout()}>
      <Menu.Item key="logout" icon={<LogoutOutlined />} style={{ color: '#ff4d4f' }}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const navigateTo = (path) => navigate(path);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="dashboard-header">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo-img" />
          <span className="logo-text">Admin Dashboard</span>
        </div>
        <div className="header-right">
          <span className="admin-name">{adminName}</span>
          <Dropdown overlay={menu} trigger={['click']}>
            <Button className="logout-btn">Logout</Button>
          </Dropdown>
        </div>
      </Header>

      <Content style={{ margin: '24px 16px' }}>
        {loading ? (
          <Spin size="large" />
        ) : (
          <div className="dashboard-content">
            <Title level={3} style={{ textAlign: 'center' }}>
              Admin Overview
            </Title>
            <Row gutter={16}>
              <Col span={6}>
                <Card
                  title="All Users"
                  bordered={false}
                  className="dashboard-card"
                  onClick={() => navigateTo('/users')}
                  hoverable
                >
                  <UserOutlined className="card-icon" />
                  <h2>{stats.users}</h2>
                </Card>
              </Col>
              <Col span={6}>
                <Card
                  title="All Vendors"
                  bordered={false}
                  className="dashboard-card"
                  onClick={() => navigateTo('/admin/vendors')}
                  hoverable
                >
                  <AppstoreAddOutlined className="card-icon" />
                  <h2>{stats.vendors}</h2>
                </Card>
              </Col>
              <Col span={6}>
                <Card
                  title="All Subscriptions"
                  bordered={false}
                  className="dashboard-card"
                  onClick={() => navigateTo('/admin/subscriptions')}
                  hoverable
                >
                  <AppstoreAddOutlined className="card-icon" />
                  <h2>{stats.subscriptions}</h2>
                </Card>
              </Col>
              <Col span={6}>
                <Card
                  title="All Feedback"
                  bordered={false}
                  className="dashboard-card"
                  onClick={() => navigateTo('/admin/feedback')}
                  hoverable
                >
                  <MessageOutlined className="card-icon" />
                  <h2>{stats.feedbacks}</h2>
                </Card>
              </Col>
            </Row>
          </div>
        )}
      </Content>
    </Layout>
  );
};

export default AdminDashboard;
