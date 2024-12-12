import React, { useState, useEffect } from 'react';
import { Layout, Menu, Card, Col, Row, Spin, Dropdown, Button, message, Typography } from 'antd';
import { DashboardOutlined, UserOutlined, AppstoreAddOutlined, MessageOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';
import './AdminDashboard.css';
import logo from '../assets/SMSLOGORound.png';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement);

const { Header, Content } = Layout;
const { Title: AntTitle } = Typography;

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    users: 0,
    vendors: 0,
    subscriptions: 0,
    feedbacks: 0,
  });
  const [adminName, setAdminName] = useState('');
  const [userCountData, setUserCountData] = useState([]);
  const [vendorCountData, setVendorCountData] = useState([]);
  const [subscriptionCountData, setSubscriptionCountData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem('role_Id');
    if (userRole !== '1') {
      navigate('/login');
      return;
    }

    const admin = localStorage.getItem('adminName');
    setAdminName(admin || 'Admin');

    axios
      .get('http://localhost:5272/api/stats')
      .then((response) => {
        setStats(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching stats:', error);
        setLoading(false);
      });

    axios
      .get('http://localhost:5272/api/UserAccounts')
      .then((response) => {
        setStats((prevStats) => ({
          ...prevStats,
          users: response.data.length,
        }));
        setUserCountData([response.data.length]);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });

    axios
      .get('http://localhost:5272/api/VendorProfiles')
      .then((response) => {
        setStats((prevStats) => ({
          ...prevStats,
          vendors: response.data.length,
        }));
        setVendorCountData([response.data.length]);
      })
      .catch((error) => {
        console.error('Error fetching vendor data:', error);
      });

    axios
      .get('http://localhost:5272/api/SubscriptionPlans')
      .then((response) => {
        setStats((prevStats) => ({
          ...prevStats,
          subscriptions: response.data.length,
        }));
        setSubscriptionCountData([response.data.length]);
      })
      .catch((error) => {
        console.error('Error fetching subscription data:', error);
      });

    axios
      .get('http://localhost:5272/api/Feedbacks')
      .then((response) => {
        setStats((prevStats) => ({
          ...prevStats,
          feedbacks: response.data.length,
        }));
      })
      .catch((error) => {
        console.error('Error fetching feedback data:', error);
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/home');
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

  // Chart.js data and options for User, Vendor, and Subscription counts
  const userChartData = {
    labels: ['Users'],
    datasets: [
      {
        label: 'User Count',
        data: userCountData,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const vendorChartData = {
    labels: ['Vendors'],
    datasets: [
      {
        label: 'Vendor Count',
        data: vendorCountData,
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
        fill: true,
      },
    ],
  };

  const subscriptionChartData = {
    labels: ['Subscriptions'],
    datasets: [
      {
        label: 'Subscription Count',
        data: subscriptionCountData,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

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
            <AntTitle level={3} style={{ textAlign: 'center' }}>
              Admin Overview
            </AntTitle>
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
                  onClick={() => navigateTo('/AllFeedback')}
                  hoverable
                >
                  <MessageOutlined className="card-icon" />
                  <h2>{stats.feedbacks}</h2>
                </Card>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Card title="User Count Graph" bordered={false}>
                  <div style={{ height: '300px', width: '100%' }}>
                    <Bar data={userChartData} options={chartOptions} />
                  </div>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Vendor Count Graph" bordered={false}>
                  <div style={{ height: '300px', width: '100%' }}>
                    <Line data={vendorChartData} options={chartOptions} />
                  </div>
                </Card>
              </Col>
              <Col span={12}>
              <br/>
                <Card title="Subscription Count Graph" bordered={false}>
                  <div style={{ height: '300px', width: '100%' }}>
                    <Bar data={subscriptionChartData} options={chartOptions} />
                  </div>
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
