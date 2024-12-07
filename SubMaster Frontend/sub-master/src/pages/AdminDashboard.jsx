import React from 'react';
import { Layout, Menu, Breadcrumb, Row, Col, Card, List, Avatar, Typography, Button, Tooltip } from 'antd';
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
    users: [], // Store users data
    loading: true, // Loading state for API data
  };

  toggleCollapse = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  // Fetch users from the API
  componentDidMount() {
    axios
      .get('http://localhost:5272/api/UserAccounts') // Replace with your actual API URL
      .then((response) => {
        this.setState({ users: response.data, loading: false });
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        this.setState({ loading: false });
      });
  }

  render() {
    const { collapsed, users, loading } = this.state;

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo-img" />
            <span className={`logo-text ${collapsed ? 'hidden' : ''}`}>Admin</span>
          </div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<DashboardOutlined />}>Dashboard</Menu.Item>
            <Menu.Item key="2" icon={<TeamOutlined />}>All Users</Menu.Item>
            <Menu.Item key="7" icon={<LogoutOutlined />} style={{ color: '#ff4d4f' }}>Logout</Menu.Item>
          </Menu>
        </Sider>

        <Layout>
          <Header className="dashboard-header">
            <Breadcrumb>
              <Breadcrumb.Item>Admin</Breadcrumb.Item>
              <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
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
            <Title level={3}>All Users</Title>
            <Row gutter={[24, 24]}>
              <Col span={24}>
                <Card>
                  <List
                    loading={loading}
                    itemLayout="horizontal"
                    dataSource={users}
                    renderItem={(user) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar>{user.firstName.charAt(0)}</Avatar>}
                          title={`${user.firstName} ${user.lastName}`}
                          description={
                            <>
                              <Typography.Text>Email: {user.email}</Typography.Text>
                              <br />
                              <Typography.Text>Status: {user.status}</Typography.Text>
                            </>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default AdminDashboard;
