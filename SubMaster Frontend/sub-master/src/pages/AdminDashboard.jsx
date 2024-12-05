import React from 'react';
import { Layout, Menu, Breadcrumb, Row, Col, Card, Statistic, List, Progress, Typography, Avatar, Divider, Space, Button, Tooltip } from 'antd';
import {
  DashboardOutlined,
  TeamOutlined,
  SolutionOutlined,
  AppstoreAddOutlined,
  FileTextOutlined,
  SettingOutlined,
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

    // Data for the list and statistics
    const recentActivities = [
      'User1 logged in',
      'User2 updated profile',
      'Vendor added a subscription',
      'User3 posted a complaint',
    ];

    const systemStatus = [
      { title: 'Database Status', status: 'Operational', color: 'green' },
      { title: 'API Response', status: 'Stable', color: 'blue' },
      { title: 'Server Health', status: 'Good', color: 'orange' },
    ];

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo-img" />
            <span className={`logo-text ${collapsed ? 'hidden' : ''}`}>Admin</span>
          </div>

          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<DashboardOutlined />}>
              <Tooltip title="Dashboard Overview">
                Dashboard
              </Tooltip>
            </Menu.Item>
            <Menu.Item key="2" icon={<TeamOutlined />}>
              <Tooltip title="Manage All Users">
                All Users
              </Tooltip>
            </Menu.Item>
            <Menu.Item key="3" icon={<SolutionOutlined />}>
              <Tooltip title="Manage Vendors">
                All Vendors
              </Tooltip>
            </Menu.Item>
            <Menu.Item key="4" icon={<AppstoreAddOutlined />}>
              <Tooltip title="View Subscriptions">
                Subscriptions
              </Tooltip>
            </Menu.Item>
            <Menu.Item key="5" icon={<FileTextOutlined />}>
              <Tooltip title="View Complaints">
                Complaints
              </Tooltip>
            </Menu.Item>
            <Menu.Item key="6" icon={<SettingOutlined />}>
              <Tooltip title="Settings">
                Settings
              </Tooltip>
            </Menu.Item>
            <Menu.Item key="7" icon={<LogoutOutlined />} style={{ color: '#ff4d4f' }}>
              <Tooltip title="Logout">
                Logout
              </Tooltip>
            </Menu.Item>
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
            <Title level={3}>Admin Overview</Title>

            <Row gutter={[24, 24]}>
              {/* Statistics Cards */}
              <Col span={8}>
                <Card>
                  <Statistic title="Total Users" value={1234} valueStyle={{ color: '#3f8600' }} />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic title="New Registrations" value={56} valueStyle={{ color: '#108ee9' }} />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic title="Active Sessions" value={123} />
                </Card>
              </Col>
            </Row>

            <Divider />

            <Row gutter={[24, 24]}>
              {/* Recent Activities */}
              <Col span={12}>
                <Card title="Recent Activities">
                  <List
                    itemLayout="horizontal"
                    dataSource={recentActivities}
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar icon={<TeamOutlined />} />}
                          title={item}
                        />
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>

              {/* System Status */}
              <Col span={12}>
                <Card title="System Status">
                  {systemStatus.map((item, index) => (
                    <Space key={index} direction="horizontal" style={{ marginBottom: '16px' }}>
                      <Typography.Text strong>{item.title}:</Typography.Text>
                      <Typography.Text type={item.color}>{item.status}</Typography.Text>
                    </Space>
                  ))}
                  <Progress percent={75} status="active" showInfo={false} />
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