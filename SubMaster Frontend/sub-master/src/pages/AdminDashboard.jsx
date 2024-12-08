<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Layout, Menu, Card, Col, Row, Spin, Dropdown, Button, message } from 'antd';
import { DashboardOutlined, UserOutlined, AppstoreAddOutlined, MessageOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
=======
import React from 'react';
import { Layout, Menu, Breadcrumb, Table, Button, Typography } from 'antd';
import {
  DashboardOutlined,
  TeamOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
>>>>>>> 1e4f8b801cfccae26093f10b994a3ed0f0dfc21a
import axios from 'axios';
import './AdminDashboard.css';
import logo from '../assets/SMSLOGORound.png';

const { Header, Content } = Layout;

<<<<<<< HEAD
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
=======
class AdminDashboard extends React.Component {
  state = {
    collapsed: false,
    currentView: 'dashboard', // Tracks the current view ('dashboard', 'allUsers', or 'allVendors')
    users: [],
    vendors: [],
    loading: false,
>>>>>>> 1e4f8b801cfccae26093f10b994a3ed0f0dfc21a
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
=======
  fetchUsers = () => {
    this.setState({ loading: true });
    axios
      .get('http://localhost:5272/api/UserAccounts')
      .then((response) => {
        this.setState({ users: response.data, loading: false });
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        this.setState({ loading: false });
      });
  };

  fetchVendors = () => {
    this.setState({ loading: true });
    axios
      .get('http://localhost:5272/api/VendorProfiles')
      .then((response) => {
        this.setState({ vendors: response.data, loading: false });
      })
      .catch((error) => {
        console.error('Error fetching vendor data:', error);
        this.setState({ loading: false });
      });
  };

  handleMenuClick = ({ key }) => {
    this.setState({ currentView: key }, () => {
      if (key === 'allUsers') {
        this.fetchUsers();
      } else if (key === 'allVendors') {
        this.fetchVendors();
      }
    });
  };

  render() {
    const { collapsed, currentView, users, vendors, loading } = this.state;

    const userColumns = [
      {
        title: 'First Name',
        dataIndex: 'firstName',
        key: 'firstName',
      },
      {
        title: 'Last Name',
        dataIndex: 'lastName',
        key: 'lastName',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Phone Number',
        dataIndex: 'phone_Number',
        key: 'phoneNumber',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      },
    ];

    const vendorColumns = [
      {
        title: 'Business Name',
        dataIndex: 'business_Name',
        key: 'businessName',
      },
      {
        title: 'Description',
        dataIndex: 'business_Description',
        key: 'businessDescription',
      },
      {
        title: 'Address',
        dataIndex: 'business_Address',
        key: 'businessAddress',
      },
      {
        title: 'Phone Number',
        dataIndex: 'phone_Number',
        key: 'phoneNumber',
      },
    ];

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo-img" />
            <span className={`logo-text ${collapsed ? 'hidden' : ''}`}>Admin</span>
          </div>
          <Menu
            theme="dark"
            defaultSelectedKeys={['dashboard']}
            mode="inline"
            onClick={this.handleMenuClick}
          >
            <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
              Dashboard
            </Menu.Item>
            <Menu.Item key="allUsers" icon={<TeamOutlined />}>
              All Users
            </Menu.Item>
            <Menu.Item key="allVendors" icon={<TeamOutlined />}>
              All Vendors
            </Menu.Item>
            <Menu.Item key="logout" icon={<LogoutOutlined />} style={{ color: '#ff4d4f' }}>
              Logout
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout>
          <Header className="dashboard-header">
            <Breadcrumb>
              <Breadcrumb.Item>Admin</Breadcrumb.Item>
              <Breadcrumb.Item>
                {currentView === 'dashboard'
                  ? 'Dashboard'
                  : currentView === 'allUsers'
                  ? 'All Users'
                  : 'All Vendors'}
              </Breadcrumb.Item>
            </Breadcrumb>
            <Button
              type="primary"
              shape="circle"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={this.toggleCollapse}
              className="collapse-button"
            />
          </Header>

          <Content style={{ margin: '24px 16px' }}>
            {currentView === 'dashboard' && (
              <div>
                <Title level={3}>Dashboard</Title>
                <p>Welcome to the Admin Dashboard!</p>
              </div>
            )}

            {currentView === 'allUsers' && (
              <div>
                <Title level={3}>All Users</Title>
                <Table
                  columns={userColumns}
                  dataSource={users}
                  loading={loading}
                  rowKey="id"
                />
              </div>
            )}

            {currentView === 'allVendors' && (
              <div>
                <Title level={3}>All Vendors</Title>
                <Table
                  columns={vendorColumns}
                  dataSource={vendors}
                  loading={loading}
                  rowKey="vendor_Id"
                />
              </div>
            )}
          </Content>
        </Layout>
      </Layout>
    );
  }
}
>>>>>>> 1e4f8b801cfccae26093f10b994a3ed0f0dfc21a

export default AdminDashboard;
