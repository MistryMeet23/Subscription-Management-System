import React from 'react';
import { Layout, Menu, Breadcrumb, Table, Button, Typography } from 'antd';
import {
  DashboardOutlined,
  TeamOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import './AdminDashboard.css';
import logo from '../assets/react.svg';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

class AdminDashboard extends React.Component {
  state = {
    collapsed: false,
    currentView: 'dashboard', // Tracks the current view ('dashboard', 'allUsers', or 'allVendors')
    users: [],
    vendors: [],
    loading: false,
  };

  toggleCollapse = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

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

export default AdminDashboard;
