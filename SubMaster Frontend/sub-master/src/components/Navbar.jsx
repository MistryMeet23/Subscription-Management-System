import React, { useEffect, useState } from 'react';
import { Menu, Dropdown, Button, message } from 'antd';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import logo1 from '../assets/react.svg';
import logo from '../assets/SMSLOGOFull.png';
import './Navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [roleId, setRoleId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('user_Id');
    const storedRoleId = localStorage.getItem('role_Id');

    if (token && userId) {
      setIsLoggedIn(true);
      setRoleId(storedRoleId);

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
      setRoleId(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user_Id');
    localStorage.removeItem('role_Id');
    setIsLoggedIn(false);
    setUserName('');
    setRoleId(null);
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
      {roleId === "1" && (
        <Menu.Item key="dashboard">
          <Link to="/AdminDashboard">Admin Dashboard</Link>
        </Menu.Item>
      )}
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const businessMenu = (
    <Menu>
      <Menu.Item key="createBusiness">
        <Link to="/create-business">Create a Business</Link>
      </Menu.Item>
      <Menu.Item key="myBusinessPage">
        <Link to="/MyBusinessPage">My Business Page</Link>
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

            {roleId !== "1" && (
              <Dropdown overlay={businessMenu} placement="bottomRight">
                <Menu.Item key="myBusiness" className="my-business-dropdown">
                  <Button type="primary">My Business</Button>
                </Menu.Item>
              </Dropdown>
            )}
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
