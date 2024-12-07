import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'antd';

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5272/api/UserAccounts') // Corrected API endpoint
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <div>
      <h2>All Users</h2>
      <Table 
        dataSource={users} 
        columns={[
          { title: 'ID', dataIndex: 'user_Id', key: 'user_Id' }, // Adjusted dataIndex to 'user_Id'
          { title: 'Name', dataIndex: 'firstName', key: 'firstName', render: (text, record) => `${text} ${record.lastName}` }, // Combining first and last name
          { title: 'Email', dataIndex: 'email', key: 'email' },
        ]} 
      />
    </div>
  );
};

export default AllUsers;