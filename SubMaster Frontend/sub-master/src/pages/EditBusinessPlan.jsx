import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Form, Input, InputNumber, message, Select, Spin } from "antd";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import "./EditBusinessPlan.css";

const { Option } = Select;

const EditBusinessPlan = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(state?.plan || {});

  useEffect(() => {
    if (!plan.plan_Id) {
      message.error("No plan data found!");
      navigate("/managebusiness");
    } else {
      form.setFieldsValue({
        planName: plan.plan_Name,
        price: plan.price,
        duration: plan.duration_In_Days,
        features: plan.features,
        isActive: plan.is_Active,
      });
    }
  }, [plan, form, navigate]);

  const handleSubmit = async (values) => {
    setLoading(true);

    const vendorId = localStorage.getItem("MyBusinessVendorId"); // Ensure the vendor ID is stored in local storage

    if (!vendorId) {
      message.error("Vendor ID not found.");
      setLoading(false);
      return;
    }

    // Log the data being sent to the API
    console.log("Updating plan with the following data:", {
      plan_Id: plan.plan_Id, // Ensure the plan Id is passed correctly
      vendor_Id: vendorId, // Add the vendor ID here
      plan_Name: values.planName,
      description: values.features,
      price: values.price,
      duration_In_Days: values.duration,
      features: values.features,
      is_Active: values.isActive,
    });

    try {
      const response = await axios.put(
        `http://localhost:5272/api/SubscriptionPlans/${plan.plan_Id}`,
        {
          plan_Id: plan.plan_Id, // Ensure the plan ID is included in the request body
          vendor_Id: vendorId, // Include the vendor ID
          plan_Name: values.planName,
          description: values.features,
          price: values.price,
          duration_In_Days: values.duration,
          features: values.features,
          is_Active: values.isActive,
        }
      );

      message.success("Plan updated successfully!");
      navigate("/managebusiness");
    } catch (error) {
      // Log the error response to see what went wrong
      console.error("API Error:", error.response || error);
      message.error("Failed to update the plan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-business-plan-page">
      <div className="edit-business-plan-header">
        <h2>Edit Subscription Plan</h2>
      </div>
      <div className="edit-business-plan-form-container">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            planName: plan.plan_Name,
            price: plan.price,
            duration: plan.duration_In_Days,
            features: plan.features,
            isActive: plan.is_Active,
          }}
          className="edit-business-plan-form"
        >
          <Form.Item
            label="Plan Name"
            name="planName"
            rules={[{ required: true, message: "Please input the plan name!" }]}
          >
            <Input placeholder="Enter plan name" />
          </Form.Item>

          <Form.Item
            label="Price (₹)"
            name="price"
            rules={[{ required: true, message: "Please input the price!" }]}
          >
            <InputNumber
              min={0}
              placeholder="Enter price"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            label="Duration (Days)"
            name="duration"
            rules={[{ required: true, message: "Please input the duration!" }]}
          >
            <InputNumber
              min={1}
              placeholder="Enter duration in days"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            label="Features"
            name="features"
            rules={[{ required: true, message: "Please enter the features!" }]}
          >
            <Input.TextArea placeholder="Enter plan features" />
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

          <Form.Item className="edit-form-footer">
            <Button
              type="primary"
              htmlType="submit"
              className="submit-button"
              loading={loading}
              icon={loading ? <LoadingOutlined /> : null}
            >
              {loading ? "Updating..." : "Update Plan"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EditBusinessPlan;
