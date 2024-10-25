import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Login.css';
// import axios from "axios"

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

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

        // Fetch user details after successful login
        const userResponse = await fetch('http://localhost:5272/api/UserAccounts/1', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${data.accessToken}`, // Include token if needed
          },
        });
        console.log(userResponse)
        
        const userData = await userResponse.json();

        // Store user data in local storage or context
        localStorage.setItem('userDetails', JSON.stringify(userData)); // Or use context

        // Redirect to Profile page
        navigate('/Profile'); // Redirect to Profile component
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
