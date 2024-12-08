import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Card, Input, Typography, Spin, Tag } from 'antd';
import './AllVendors.css';

const { Title } = Typography;
const { Search } = Input;

const AllVendors = () => {
  const [vendors, setVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5272/api/VendorProfiles')
      .then((response) => {
        const filteredData = response.data.filter((vendor) => vendor.role_Id !== 1); // Exclude role_Id = 1
        setVendors(filteredData);
        setFilteredVendors(filteredData); // Initialize filteredVendors
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching vendors:', error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (value) => {
    const filteredData = vendors.filter((vendor) =>
      `${vendor.business_Name} ${vendor.business_Description}`.toLowerCase().includes(value.toLowerCase()) ||
      vendor.business_Address.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredVendors(filteredData);
  };

  const columns = [
    { title: 'ID', dataIndex: 'vendor_Id', key: 'vendor_Id', align: 'center' },
    {
      title: 'Business Name',
      dataIndex: 'business_Name',
      key: 'business_Name',
      render: (text, record) => `${text} ${record.business_Description}`,
    },
    { title: 'Business Address', dataIndex: 'business_Address', key: 'business_Address' },
    { title: 'Phone Number', dataIndex: 'phone_Number', key: 'phone_Number' },
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
    <div className="all-vendors-container">
      <Card className="vendor-card">
        <Title level={3} className="vendor-title">
          All Vendors
        </Title>
        <Search
          placeholder="Search by Business Name or Business Description"
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
            dataSource={filteredVendors}
            columns={columns}
            rowKey="vendor_Id"
            className="vendor-table"
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

export default AllVendors;
