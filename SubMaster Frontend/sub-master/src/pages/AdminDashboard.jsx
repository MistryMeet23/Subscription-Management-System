import React, { useState, useEffect } from 'react';
import { Layout, Menu, Card, Col, Row, Spin, Dropdown, Button, message } from 'antd';
import { DashboardOutlined, UserOutlined, AppstoreAddOutlined, MessageOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboard.css';
import logo from '../assets/SMSLOGORound.png';

const { Header, Content } = Layout;

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    users: 0,
    vendors: 0,
    subscriptions: 0,
    feedbacks: 0
  });
  const [adminName, setAdminName] = useState('');
  const navigate = useNavigate();

  // Fetch stats on component mount
  useEffect(() => {
    const userRole = localStorage.getItem('role_Id');
    if (userRole !== '1') {
      navigate('/login');
    } else {
      // Fetch the data for counts
      axios.get('http://localhost:5272/api/stats') // Modify this URL with the correct API endpoint for stats
        .then(response => {
          setStats(response.data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching stats:', err);
          setLoading(false);
        });

      // Set Admin Name (assumed from localStorage or API)
      const admin = localStorage.getItem('adminName'); // Replace with actual logic to fetch admin's name
      setAdminName(admin || 'Admin');
    }
  }, [navigate]);

  const handleMenuClick = (key) => {
    if (key === '1') {
      navigate('/AdminDashboard');
    } else if (key === '2') {
      navigate('/users');
    } else if (key === '3') {
      navigate('/admin/vendors');
    } else if (key === '4') {
      navigate('/admin/feedback');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('role_Id');
    localStorage.removeItem('adminName'); // Clear admin name from local storage
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
            <Row gutter={16}>
              <Col span={6}>
                <Card
                  title="All Users"
                  bordered={false}
                  className="dashboard-card"
                  onClick={() => navigate('/users')}
                  hoverable
                  actions={[<UserOutlined key="users" className="card-icon" />]}
                >
                  <h2>{stats.users}</h2>
                </Card>
              </Col>
              <Col span={6}>
                <Card
                  title="All Vendors"
                  bordered={false}
                  className="dashboard-card"
                  onClick={() => navigate('/admin/vendors')}
                  hoverable
                  actions={[<AppstoreAddOutlined key="vendors" className="card-icon" />]}
                >
                  <h2>{stats.vendors}</h2>
                </Card>
              </Col>
              <Col span={6}>
                <Card
                  title="All Subscriptions"
                  bordered={false}
                  className="dashboard-card"
                  onClick={() => navigate('/admin/feedback')}
                  hoverable
                  actions={[<AppstoreAddOutlined key="subscriptions" className="card-icon" />]}
                >
                  <h2>{stats.subscriptions}</h2>
                </Card>
              </Col>
              <Col span={6}>
                <Card
                  title="All Feedback"
                  bordered={false}
                  className="dashboard-card"
                  onClick={() => navigate('/admin/feedback')}
                  hoverable
                  actions={[<MessageOutlined key="feedback" className="card-icon" />]}
                >
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
