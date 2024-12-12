import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Typography, Spin, Tag, Space, message } from 'antd';
import {
  CreditCardOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { jsPDF } from 'jspdf'; // Import jsPDF
import './AllSubscriptions.css';

const { Title, Text } = Typography;

const AllSubscriptionsPage = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [plans, setPlans] = useState({}); // To store plan names

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch('http://localhost:5272/api/CustomerSubscriptions/user/18');
        if (!response.ok) {
          throw new Error('Failed to fetch subscriptions');
        }
        const data = await response.json();
        
        // Assuming a separate endpoint or predefined object for plan names
        const fetchedPlans = {
          1: "Basic Plan",
          2: "Standard Plan",
          3: "Premium Plan",
        };

        // Format the data with plan names
        const formattedData = data.map((subscription) => ({
          id: subscription.subscription_Id,
          subscriptionName: fetchedPlans[subscription.plan_Id] || 'Unknown Plan', // Show plan name
          planName: fetchedPlans[subscription.plan_Id] || 'Unknown Plan', // Plan name displayed in both places
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
        
        setPlans(fetchedPlans); // Store the fetched plans
        setSubscriptions(formattedData);
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
        message.error('Failed to load subscriptions. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  const handleDownloadInvoice = async (subscriptionId) => {
    try {
      console.log(`Fetching payment details for Subscription ID: ${subscriptionId}`);
      
      const response = await fetch(`http://localhost:5272/api/Payments/${subscriptionId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch payment details: ${response.statusText}`);
      }
  
      const paymentData = await response.json();
  
      console.log('Fetched payment data:', paymentData);
  
      // Create PDF using jsPDF
      const doc = new jsPDF();
      doc.setDrawColor(0, 56, 114); // Dark Blue
      doc.setLineWidth(1);
      doc.rect(5, 5, 200, 287); // Border around the entire document
      const logoUrl = 'src/assets/SMSLOGORound.jpg'; // Path to your logo image
      doc.addImage(logoUrl, 'JPEG', 80, 15, 50, 50);  // Adjust the logo size as needed

      doc.setFont('Times', 'bold');
      doc.setFontSize(24);
      doc.setTextColor(0, 56, 114);  // Dark Blue Color
      doc.text('SubMaster', 105, 80, null, null, 'center');
      
      doc.setFontSize(18);
      doc.text('Invoice', 105, 90, null, null, 'center');
  
      doc.setLineWidth(0.5);
      doc.setDrawColor(0, 56, 114);  // Dark Blue Color
      doc.line(14, 95, 196, 95);

      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(12);
      
      const tableStartY = 105;
      const cellPadding = 5;
      doc.setTextColor(0, 0, 0);  // Black text for table
      doc.setFont('Helvetica', 'bold');
      doc.rect(14, tableStartY, 180, 10, 'S'); // Table header background box
      doc.text('Payment ID', 18, tableStartY + 7);
      doc.text('User ID', 60, tableStartY + 7);
      doc.text('Amount', 110, tableStartY + 7);
      doc.text('Payment Date', 160, tableStartY + 7);
      
      doc.setFont('Helvetica', 'normal');
      const formattedAmount = `₹ ${paymentData.amount.toLocaleString()}`; // Format the amount as INR
      doc.text(paymentData.payment_Id.toString(), 18, tableStartY + 20);
      doc.text(paymentData.user_Id.toString(), 60, tableStartY + 20);
      doc.text(formattedAmount, 110, tableStartY + 20);
      doc.text(new Date(paymentData.payment_Date).toLocaleString(), 160, tableStartY + 20);

      const row2Y = tableStartY + 30;
      doc.rect(14, row2Y, 180, 10, 'S'); // Table row background box
      doc.text('Plan ID', 18, row2Y + 7);
      doc.text('Payment Method', 60, row2Y + 7);
      doc.text('Transaction ID', 110, row2Y + 7);
      doc.text('Payment Status', 160, row2Y + 7);

      doc.setFont('Helvetica', 'normal');
      doc.text(paymentData.plan_Id.toString(), 18, row2Y + 20);
      doc.text(paymentData.payment_Method, 60, row2Y + 20);
      doc.text(paymentData.transaction_Id.toString(), 110, row2Y + 20);
      doc.text(paymentData.payment_Status, 160, row2Y + 20);

      const messageY = row2Y + 35;
      doc.setFont('Helvetica', 'italic');
      doc.setFontSize(14);
      doc.setTextColor(0, 102, 204);  // Blue text for message
      doc.text('Thank you for choosing SubMaster!', 14, messageY);

      const signatureY = messageY + 25;
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);  // Black text for signature
      doc.text('Signature:', 14, signatureY);
      doc.line(50, signatureY + 2, 150, signatureY + 2);  // Line for signature

      const footerY = 270;
      doc.setLineWidth(0.5);
      doc.setDrawColor(0, 56, 114);  // Dark Blue Color
      doc.line(14, footerY, 196, footerY);

      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100); // Gray color for footer
      doc.text('SubMaster | Address: 123 Business Ave, City, Country | Phone: (123) 456-7890', 14, footerY + 10);
      doc.text('Email: contact@submaster.com | www.submaster.com', 14, footerY + 15);

      doc.save(`Invoice_${paymentData.payment_Id}.pdf`);
    } catch (error) {
      console.error('Error in handleDownloadInvoice:', error);
      message.error('Failed to download the invoice. Please try again.');
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
              title={`${subscription.subscriptionName} - ${subscription.planName}`} // Display both subscription and plan name
              bordered={false}
              extra={
                <Tag color={subscription.status === 'active' ? 'green' : 'volcano'}>
                  {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                </Tag>
              }
              className="subscription-card"
              actions={[<Button
                  type="link"
                  onClick={() => handleDownloadInvoice(subscription.id)}
                  icon={<CreditCardOutlined />}
                  size="small"
                >
                  Download Invoice
                </Button>]}

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
                <Tag
                  color={subscription.paymentStatus === 'pending' ? 'orange' : 'green'}
                >
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
