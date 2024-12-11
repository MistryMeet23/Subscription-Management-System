import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Card, Input, Typography, Spin, Tag } from 'antd';
import './AllUsers.css';

const { Title } = Typography;
const { Search } = Input;

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5272/api/UserAccounts')
      .then((response) => {
        const filteredData = response.data.filter((user) => user.role_Id !== 1); // Exclude role_Id = 1
        setUsers(filteredData); 
        setFilteredUsers(filteredData); // Initialize filteredUsers
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (value) => {
    const filteredData = users.filter((user) =>
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(value.toLowerCase()) ||
      user.email.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filteredData);
  };

  const columns = [
    { title: 'ID', dataIndex: 'user_Id', key: 'user_Id', align: 'center' },
    {
      title: 'Name',
      dataIndex: 'firstName',
      key: 'firstName',
      render: (text, record) => `${text} ${record.lastName}`,
    },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Phone Number', dataIndex: 'phone_Number', key: 'phone_Number' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    {
      title: 'Role',
      dataIndex: 'role_Id',
      key: 'role_Id',
      align: 'center',
      render: (role) => (
        <Tag color={role === 1 ? 'red' : 'green'}>
          {role === 1 ? 'Admin' : 'User'}
        </Tag>
      ),
    },
  ];

  return (
    <div className="all-users-container">
      <Card className="user-card">
        <Title level={3} className="user-title">
          All Users
        </Title>
        <Search
          placeholder="Search by name or email"
          enterButton="Search"
          allowClear
          onSearch={handleSearch}
          className="search-bar"
        />
        {loading ? (
          <div className="loading-spinner">
            <Spin size="large" />
          </div>
        ) : (
          <Table
            dataSource={filteredUsers}
            columns={columns}
            rowKey="user_Id"
            className="user-table"
            bordered
            pagination={{
              pageSize: 8,
              showSizeChanger: true,
              pageSizeOptions: ['8', '16', '24'],
            }}
          />
        )}
      </Card>
    </div>
  );
};

export default AllUsers;
