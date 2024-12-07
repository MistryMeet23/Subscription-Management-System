import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table, Spin, message, Tag, Alert, Empty } from "antd";
import axios from "axios";
import { EditOutlined } from "@ant-design/icons";
import "./ManageBusiness.css";
import moment from "moment"; // Import moment.js to format dates

const ManageBusiness = () => {
  const [vendorId, setVendorId] = useState("");
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const savedVendorId = localStorage.getItem("MyBusinessVendorId");
    console.log("Saved Vendor ID:", savedVendorId);  // Log to check if it's being retrieved correctly
    if (savedVendorId) {
      setVendorId(savedVendorId);
      fetchSubscriptionPlans(savedVendorId);
    } else {
      message.error("Vendor ID not found. Please check your business setup.");
      setLoading(false);
    }
  }, []);

  const fetchSubscriptionPlans = async (vendorId) => {
    try {
      const response = await axios.get(
        `http://localhost:5272/api/SubscriptionPlans/vendor/${vendorId}`
      );
      if (response.status === 404 && response.data.length === 0) {
        // Handle the case where no plans are found for the vendor
        setPlans([]);
      } else {
        setPlans(response.data);
      }
    } catch (error) {
      console.error("Error fetching subscription plans:", error); // Log the error for debugging
      if (error.response) {
        // Check for 404 specifically for vendor id not found and suppress it
        if (error.response.status === 404 && error.response.data) {
          message.info("No subscription plans found for this vendor.");
          setPlans([]); // Ensure that plans array is empty in the case of 404
        } else {
          message.error(`Error: ${error.response.status} - ${error.response.data}`);
        }
      } else if (error.request) {
        message.error("No response received from the server.");
      } else {
        message.error("Error in setting up the request.");
      }
    } finally {
      setLoading(false);
    }
  };
  

  const handleEditClick = (plan) => {
    navigate("/EditBusinessPlan", { state: { plan } });
  };

  const handleAddNewPlanClick = () => {
    navigate("/AddNewPlans");
  };

  const columns = [
    {
      title: "Plan Name",
      dataIndex: "plan_Name",
      key: "plan_Name",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `₹${price.toFixed(2)}`,
    },
    {
      title: "Duration (Days)",
      dataIndex: "duration_In_Days",
      key: "duration_In_Days",
    },
    {
      title: "Description",
      dataIndex: "description", // Assuming the API returns a 'description' field
      key: "description",
      render: (description) => (
        <span className="description-tooltip">{description || "No Description"}</span>
      ),
    },
    {
      title: "Features",
      dataIndex: "features",
      key: "features",
      render: (features) => <span>{features || "N/A"}</span>,
    },
    {
      title: "Active Status",
      dataIndex: "is_Active",
      key: "is_Active",
      render: (isActive) => (
        <Tag color={isActive ? "green" : "volcano"}>{isActive ? "Active" : "Inactive"}</Tag>
      ),
    },
    {
      title: "Created At",
      dataIndex: "created_At",
      key: "created_At",
      render: (createdAt) => moment(createdAt).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div className="action-buttons">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEditClick(record)}
            className="edit-button"
          >
            Edit
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="manage-business-page">
      <div className="manage-business-header">
        <h2 className="manage-business-title">Manage Subscription Plans</h2>
        <Button
          className="add-new-plan-button"
          onClick={handleAddNewPlanClick}
        >
          Add New Plan
        </Button>
      </div>

      {loading ? (
        <div className="spinner-container">
          <Spin size="large" />
        </div>
      ) : plans.length === 0 ? (
        <div className="no-plans-container">
          <Empty
            description="No subscription plans found for this vendor. Please add new plans."
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        </div>
      ) : (
        <div className="plans-list">
          <Table
            dataSource={plans}
            columns={columns}
            rowKey="plan_Id"
            pagination={{ pageSize: 5 }}
            bordered
          />
        </div>
      )}
    </div>
  );
};

export default ManageBusiness;
