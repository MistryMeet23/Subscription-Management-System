import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Perform logout actions
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user_Id');
    localStorage.removeItem('role_Id');

    message.success('You have been logged out.');

    // Redirect to login page
    navigate('/login');
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;
