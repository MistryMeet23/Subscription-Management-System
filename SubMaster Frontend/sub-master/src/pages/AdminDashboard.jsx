import React from 'react';
import { Layout, Menu, Button, Breadcrumb, Card, Row, Col, Typography } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  FileTextOutlined,
  TeamOutlined,
  SolutionOutlined,
  AppstoreAddOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import './AdminDashboard.css';
import logo from '../assets/react.svg';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

class AdminDashboard extends React.Component {
  state = { collapsed: false };

  toggleCollapse = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        {/* Sider (Sidebar) */}
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo-img" />
            <span className={`logo-text ${collapsed ? 'hidden' : ''}`}>Admin Dashboard</span>
          </div>

          {/* Collapse Button */}
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={this.toggleCollapse}
            className="collapse-button"
          />

          {/* Sidebar Menu */}
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" style={{ fontWeight: 'bold' }}>
            <Menu.Item key="1" icon={<DashboardOutlined />}>Dashboard</Menu.Item>
            <Menu.Item key="2" icon={<TeamOutlined />}>All User</Menu.Item>
            <Menu.Item key="3" icon={<SolutionOutlined />}>All Vendor</Menu.Item>
            <Menu.Item key="4" icon={<AppstoreAddOutlined />}>All Subscription</Menu.Item>
            <Menu.Item key="5" icon={<FileTextOutlined />}>All Complaints</Menu.Item>
            <Menu.Item key="6" icon={<SettingOutlined />}>Settings</Menu.Item>
            <Menu.Item key="7" icon={<LogoutOutlined />} style={{ color: '#ff4d4f' }}>Logout</Menu.Item>
          </Menu>
        </Sider>

        {/* Layout Content */}
        <Layout>
          <Header className="dashboard-header">
            <Breadcrumb>
              <Breadcrumb.Item>Admin</Breadcrumb.Item>
              <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            </Breadcrumb>
          </Header>

          <Content style={{ margin: '24px 16px 0' }}>
            <div className="dashboard-content">
              <Title level={3} style={{ marginBottom: '24px' }}>Admin Overview</Title>

              <Row gutter={16}>
                <Col span={8}>
                  <Card title="Total Users" bordered={false}>1,234</Card>
                </Col>
                <Col span={8}>
                  <Card title="New Registrations" bordered={false}>56</Card>
                </Col>
                <Col span={8}>
                  <Card title="Active Sessions" bordered={false}>123</Card>
                </Col>
              </Row>

              <Row gutter={16} style={{ marginTop: '20px' }}>
                <Col span={12}>
                  <Card title="Recent Activities" bordered={false}>
                    <p>User1 logged in</p>
                    <p>User2 updated profile</p>
                    <p>User3 added a comment</p>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card title="System Status" bordered={false}>All systems operational.</Card>
                </Col>
              </Row>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default AdminDashboard;
