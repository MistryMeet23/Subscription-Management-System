import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Form, message, Select } from "antd";
import axios from "axios";
import "./AddNewPlans.css";

const { Option } = Select;

const AddNewPlans = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5272/api/SubscriptionPlans", {
        plan_Name: values.planName,
        description: values.description,
        price: values.price,
        duration_In_Days: values.duration,
        features: values.features,
        is_Active: values.isActive,
        vendor_Id: localStorage.getItem("MyBusinessVendorId"),
      });
      message.success("Plan added successfully!");
      navigate("/managebusiness");
    } catch (error) {
      message.error("Failed to add plan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-new-plan-page">
      <div className="add-new-plan-header">
        <h2 className="add-new-plan-title">Add New Subscription Plan</h2>
      </div>
      <Form
        layout="vertical"
        onFinish={handleSubmit}
        className="add-new-plan-form"
      >
        <Form.Item
          label="Plan Name"
          name="planName"
          rules={[{ required: true, message: "Please input the plan name!" }]}
        >
          <Input placeholder="Enter plan name" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <Input.TextArea placeholder="Enter plan description" rows={4} />
        </Form.Item>

        <Form.Item
          label="Price (₹)"
          name="price"
          rules={[{ required: true, message: "Please input the price!" }]}
        >
          <Input
            type="number"
            placeholder="Enter price"
            min={0}
            step="0.01"
          />
        </Form.Item>

        <Form.Item
          label="Duration (Days)"
          name="duration"
          rules={[{ required: true, message: "Please input the duration!" }]}
        >
          <Input type="number" placeholder="Enter duration in days" />
        </Form.Item>

        <Form.Item
          label="Features"
          name="features"
        >
          <Input.TextArea placeholder="Enter plan features" rows={4} />
        </Form.Item>

        <Form.Item
          label="Active Status"
          name="isActive"
          rules={[{ required: true, message: "Please select the status!" }]}
        >
          <Select placeholder="Select status">
            <Option value={true}>Active</Option>
            <Option value={false}>Inactive</Option>
          </Select>
        </Form.Item>

        <div className="form-footer">
          <Button
            type="primary"
            htmlType="submit"
            className="submit-button"
            loading={loading}
          >
            Add Plan
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddNewPlans;