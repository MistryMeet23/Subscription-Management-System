import React, { useEffect, useState } from 'react';
import { Menu, Dropdown, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/react.svg';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('user_Id'); // Get user ID from localStorage

    if (token && userId) {
      setIsLoggedIn(true);

      // Fetch user data based on user ID
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:5272/api/UserAccounts/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the request headers
            },
          });
          setUserName(response.data.firstName); // Set the user's first name from the response data
        } catch (error) {
          console.error('Failed to fetch user data:', error);
          message.error('Failed to load user data.');
        }
      };

      fetchUserData();
    } else {
      setIsLoggedIn(false);
      setUserName('');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user_Id');
    setIsLoggedIn(false);
    setUserName('');
    navigate('/');
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="profile">
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Menu
      mode="horizontal"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: '60px',
        fontSize: '18px',
        fontWeight: '490',
        padding: '0 30px',
        borderBottom: '1px solid #e8e8e8',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Menu.Item key="logo" style={{ marginRight: 'auto' }}>
        <Link to="/">
          <img 
            src={logo} 
            alt="Logo" 
            style={{ height: '40px', marginRight: '15px' }}
          />
        </Link>
      </Menu.Item>

      <Menu.Item key="home" style={{ padding: '0 15px' }}>
        <Link to="/">Home</Link>
      </Menu.Item>

      <Menu.Item key="service" style={{ padding: '0 15px' }}>
        <Link to="/service">Service</Link>
      </Menu.Item>

      <Menu.Item key="about" style={{ padding: '0 15px' }}>
        <Link to="/about">About</Link>
      </Menu.Item>

      <Menu.Item key="contact" style={{ padding: '0 15px' }}>
        <Link to="/contact">Contact</Link>
      </Menu.Item>

      {isLoggedIn ? (
        <Dropdown overlay={userMenu} placement="bottomRight">
          <Menu.Item key="user" style={{ padding: '0 15px', cursor: 'pointer' }}>
            {userName || 'User'}
          </Menu.Item>
        </Dropdown>
      ) : (
        <>
          <Menu.Item key="login" style={{ padding: '0 15px' }}>
            <Link to="/login">Login</Link>
          </Menu.Item>
          <Menu.Item key="register" style={{ padding: '0 15px' }}>
            <Link to="/register">Register</Link>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
};

export default Navbar;
