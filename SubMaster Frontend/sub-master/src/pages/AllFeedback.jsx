import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Card, Input, Typography, Spin, Tag } from 'antd';
import './AllFeedback.css';

const { Title } = Typography;
const { Search } = Input;

const AllFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5272/api/Feedbacks')
      .then((response) => {
        setFeedbacks(response.data);
        setFilteredFeedbacks(response.data); // Initialize filteredFeedbacks
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching feedbacks:', error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (value) => {
    const filteredData = feedbacks.filter((feedback) =>
      `${feedback.comments}`.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredFeedbacks(filteredData);
  };

  const columns = [
    { title: 'Feedback ID', dataIndex: 'feedback_Id', key: 'feedback_Id', align: 'center' },
    { title: 'User ID', dataIndex: 'user_Id', key: 'user_Id', align: 'center' },
    { title: 'Vendor ID', dataIndex: 'vendor_Id', key: 'vendor_Id', align: 'center' },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      align: 'center',
      render: (rating) => <Tag color="blue">{rating}</Tag>,
    },
    { title: 'Comments', dataIndex: 'comments', key: 'comments' },
    { title: 'Submitted At', dataIndex: 'submitted_At', key: 'submitted_At' },
  ];

  return (
    <div className="all-feedback-container">
      <Card className="feedback-card">
        <Title level={3} className="feedback-title">
          All Feedbacks
        </Title>
        <Search
          placeholder="Search by comments"
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
            dataSource={filteredFeedbacks}
            columns={columns}
            rowKey="feedback_Id"
            className="feedback-table"
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

export default AllFeedback;
