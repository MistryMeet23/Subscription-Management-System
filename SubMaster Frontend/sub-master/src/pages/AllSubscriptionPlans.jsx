import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Card, Input, Typography, Spin, Tag } from 'antd';
import './AllSubscriptionPlans.css';

const { Title } = Typography;
const { Search } = Input;

const AllSubscriptionPlans = () => {
  const [subscriptionplans, setSubscriptionplans] = useState([]);
  const [filteredSubscriptionplans, setFilteredSubscriptionplans] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5272/api/SubscriptionPlans')
      .then((response) => {
        const filteredData = response.data.filter((subscriptionplans) => subscriptionplans.role_Id !== 1); // Exclude role_Id = 1
        setSubscriptionplans(filteredData);
        setFilteredSubscriptionplans(filteredData); // Initialize filteredSubscriptionplans
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching subscriptionplans:', error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (value) => {
    const filteredData = subscriptionplans.filter((plan) =>
      `${plan.plan_Name} ${plan.description}`.toLowerCase().includes(value.toLowerCase()) ||
      plan.price.toString().toLowerCase().includes(value.toLowerCase()) // Ensure price is treated as a string
    );
    setFilteredSubscriptionplans(filteredData); // Corrected the state update
  };

  const columns = [
    { title: 'ID', dataIndex: 'plan_Id', key: 'plan_Id', align: 'center' },
    {
      title: 'Plan Name',
      dataIndex: 'plan_Name',
      key: 'plan_Name',
      render: (text, record) => `${text} ${record.description}`,
    },
    { title: 'Duration In Days', dataIndex: 'duration_In_Days', key: 'duration_In_Days' },
    { title: 'Features', dataIndex: 'features', key: 'features' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    // {
    //   title: 'Role',
    //   dataIndex: 'role_Id',
    //   key: 'role_Id',
    //   align: 'center',
    //   render: (role) => (
    //     <Tag color={role === 1 ? 'red' : 'green'}>
    //       {role === 1 ? 'Admin' : 'User'}
    //     </Tag>
    //   ),
    // },
  ];

  return (
    <div className="all-subscriptionplans-container">
      <Card className="subscriptionplans-card">
        <Title level={3} className="subscriptionplans-title">
          All Subscription Plans
        </Title>
        <Search
          placeholder="Search by planname, description, or price"
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
            dataSource={filteredSubscriptionplans}
            columns={columns}
            rowKey="plan_Id"
            className="subscriptionplans-table"
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

export default AllSubscriptionPlans;
