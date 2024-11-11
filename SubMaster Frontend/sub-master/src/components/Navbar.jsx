import React, { useEffect, useState } from 'react';
import { Menu, Dropdown, Button, message } from 'antd';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/react.svg';
import './Navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('user_Id');

    if (token && userId) {
      setIsLoggedIn(true);

      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:5272/api/UserAccounts/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserName(response.data.firstName);
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

  const handleHomeClick = () => {
    navigate('/home');
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

  const menuKeys = ['home', 'service', 'about', 'contact'];

  return (
    <Menu
      mode="horizontal"
      className="navbar-menu"
      selectedKeys={[location.pathname.replace('/', '') || 'home']}
    >
      <Menu.Item key="logo" className="navbar-logo" onClick={handleHomeClick}>
        <img src={logo} alt="Logo" className="logo-img" />
      </Menu.Item>

      <div className="navbar-right">
        {menuKeys.map((key) => (
          <Menu.Item key={key} onClick={key === 'home' ? handleHomeClick : undefined}>
            <Link to={`/${key}`}>{key.charAt(0).toUpperCase() + key.slice(1)}</Link>
          </Menu.Item>
        ))}

        {isLoggedIn ? (
          <>
            <Dropdown overlay={userMenu} placement="bottomRight">
              <Menu.Item key="user" className="user-menu-item">
                {userName || 'User'}
              </Menu.Item>
            </Dropdown>
            <Menu.Item key="createBusiness">
              <Button type="primary" onClick={() => navigate('/create-business')}>
                Create a Business
              </Button>
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item key="login">
              <Link to="/login">Login</Link>
            </Menu.Item>
            <Menu.Item key="register">
              <Link to="/register">Register</Link>
            </Menu.Item>
          </>
        )}
      </div>
    </Menu>
  );
};

export default Navbar;