import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom'; // Import useHistory for navigation
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate(); // Initialize useHistory

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      const response = await fetch('http://localhost:5272/api/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Store the access token if needed
        localStorage.setItem('accessToken', data.accessToken);

        // Redirect based on the role ID
        if (data.role_Id === 2) {
          history('/home'); // Redirect to Hom.jsx
        } else if (data.role_Id === 1) {
          // history.push('/Admin/Home'); // Redirect to Admin/Home.jsx
        }
      } else {
        // Handle login failure (e.g., show an error message)
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during login.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
          <br /><br />
          <center><p>Don't Have An Account? <a href="/register">Sign up</a></p></center>
        </form>
      </div>
    </div>
  );
}

export default Login;
