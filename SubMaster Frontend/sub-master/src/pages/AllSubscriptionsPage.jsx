import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Typography, Spin, Tag, Space, message } from 'antd';
import {
  CreditCardOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import './AllSubscriptions.css';

const { Title, Text } = Typography;

const AllSubscriptionsPage = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [plans, setPlans] = useState({});

  useEffect(() => {
    const fetchPlanAndSubscriptionData = async () => {
      const vendorId = localStorage.getItem('vendor_Id'); // Retrieve vendor ID from local storage
      if (!vendorId) {
        message.error('Vendor not found. Please log in again.');
        setLoading(false);
        return;
      }

      try {
        // Fetch Subscription Plans
        const planResponse = await fetch(`http://localhost:5272/api/SubscriptionPlans/vendor/${vendorId}`);
        if (!planResponse.ok) {
          throw new Error('Failed to fetch subscription plans');
        }
        const planData = await planResponse.json();

        // Create a map for plans
        const fetchedPlans = {};
        planData.forEach((plan) => {
          fetchedPlans[plan.plan_Id] = plan.plan_Name;
        });

        // Fetch Subscriptions
        const userId = localStorage.getItem('user_Id'); // Retrieve user ID from local storage
        const subscriptionResponse = await fetch(`http://localhost:5272/api/CustomerSubscriptions/user/${userId}`);
        if (!subscriptionResponse.ok) {
          throw new Error('Failed to fetch subscriptions');
        }
        const subscriptionData = await subscriptionResponse.json();

        // Format the subscriptions data
        const formattedData = subscriptionData.map((subscription) => ({
          id: subscription.subscription_Id,
          subscriptionName: fetchedPlans[subscription.plan_Id] || 'Unknown Plan',
          planName: fetchedPlans[subscription.plan_Id] || 'Unknown Plan',
          duration: `${new Date(subscription.start_Date).toLocaleDateString()} to ${new Date(
            subscription.end_Date
          ).toLocaleDateString()}`,
          plan: subscription.payment_Method,
          status: subscription.status,
          paymentStatus: subscription.payment_Status,
          discount: subscription.discount_Applied,
          createdAt: new Date(subscription.created_At).toLocaleDateString(),
          updatedAt: new Date(subscription.updated_At).toLocaleDateString(),
        }));

        setPlans(fetchedPlans);
        setSubscriptions(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
        message.error('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlanAndSubscriptionData();
  }, []);

  
  const handleDownloadInvoice = async (paymentId) => {
    try {
      const userId = localStorage.getItem('user_Id'); // Get user ID from local storage
      if (!userId) {
        message.error('User not found. Please log in again.');
        return;
      }
  
      // Fetch payment data using the paymentId
      const response = await fetch(`http://localhost:5272/api/Payments/${paymentId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch payment data');
      }
  
      const payment = await response.json();
  
      // Log the payment data to check its structure
      console.log("Payment Data:", payment);
  
      // Prepare invoice details from payment data
      const invoiceId = payment.transaction_Id || `INV-${payment.payment_Id}`;
      const date = new Date(payment.payment_Date).toLocaleDateString();
      const paymentMethod = payment.payment_Method || 'N/A';
      const amountPaid = `₹${payment.amount || 0}`;
      const paymentStatus = payment.payment_Status || 'N/A';
  
      // Initialize jsPDF for PDF creation
      const doc = new jsPDF();
  
      // Add Invoice Header
      doc.setFontSize(18);
      doc.text("Invoice", 14, 20);
      doc.setFontSize(12);
      doc.text(`Invoice ID: ${invoiceId}`, 14, 30);
      doc.text(`Date: ${date}`, 14, 40);
  
      // Add Payment Details Table
      const tableData = [
        { key: "Payment Method", value: paymentMethod },
        { key: "Amount Paid", value: amountPaid },
        { key: "Payment Status", value: paymentStatus },
      ];
  
      doc.setFontSize(14);
      doc.text("Payment Summary", 14, 50);
  
      // Generate Table using autoTable
      doc.autoTable({
        startY: 60,
        head: [["Detail", "Value"]],
        body: tableData.map((row) => [row.key, row.value]),
        theme: "grid",
        headStyles: { fillColor: [22, 160, 133] }, // Custom header color
        bodyStyles: { textColor: [0, 0, 0] }, // Custom body text color
        alternateRowStyles: { fillColor: [240, 240, 240] }, // Alternate row colors
      });
  
      // Save PDF
      doc.save(`Invoice_${paymentId}.pdf`);
      message.success("Invoice downloaded successfully.");
    } catch (error) {
      console.error("Error in handleDownloadInvoice:", error);
      message.error("Failed to download the invoice. Please try again.");
    }
  };
  

  if (loading) {
    return <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />;
  }

  return (
    <div className="subscriptions-container">
      <Title level={2} className="page-title">All Subscriptions</Title>
      <Row gutter={[16, 24]}>
        {subscriptions.map((subscription) => (
          <Col span={24} sm={12} md={8} lg={6} key={subscription.id}>
            <Card
              hoverable
              title={subscription.subscriptionName}
              bordered={false}
              extra={
                <Tag color={subscription.status === 'active' ? 'green' : 'volcano'}>
                  {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                </Tag>
              }
              className="subscription-card"
              actions={[
                <Button
                  type="link"
                  onClick={() => handleDownloadInvoice(subscription.id)}
                  icon={<CreditCardOutlined />}
                  size="small"
                >
                  Download Invoice
                </Button>,
              ]}
            >
              <Space direction="vertical" size={8}>
                <Text>
                  <CalendarOutlined /> <strong>Duration:</strong> {subscription.duration}
                </Text>
                <Text>
                  <strong>Payment Method:</strong> {subscription.plan}
                </Text>
                <Text>
                  <strong>Discount:</strong> {subscription.discount}%
                </Text>
              </Space>
              <Space size={12} style={{ marginTop: '15px' }}>
                <Tag color={subscription.paymentStatus === 'pending' ? 'orange' : 'green'}>
                  {subscription.paymentStatus === 'pending' ? (
                    <>
                      <CloseCircleOutlined /> Pending
                    </>
                  ) : (
                    <>
                      <CheckCircleOutlined /> Paid
                    </>
                  )}
                </Tag>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AllSubscriptionsPage;