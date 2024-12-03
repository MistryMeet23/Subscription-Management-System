import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const ErrorPage = ({ error }) => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div style={{ padding: '50px' }}>
      <Result
        status="500" 
        title="Oops! Something went wrong."
        subTitle={error ? error.message : "An unknown error occurred."}
        extra={<Button type="primary" onClick={handleBackToHome}>Back to Home</Button>}
      />
    </div>
  );
};

export default ErrorPage;
