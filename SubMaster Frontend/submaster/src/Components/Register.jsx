import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  // Define state for form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Initialize navigate for redirection
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    // Create the payload for the API
    const userAccount = {
      user_Id: 0, // Assuming user_Id will be assigned by the backend
      firstName: firstName,
      lastName: lastName,
      email: email,
      password_Hash: password, // Password to be hashed by API
      role_Id: 2, // Assuming a default role
      phone_Number: phone,
      status: 'active',
      created_At: new Date().toISOString(), // Current timestamp for created_At
      updated_At: new Date().toISOString(), // Current timestamp for updated_At
    };

    try {
      const response = await fetch('http://localhost:5272/api/UserAccounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Correct media type for JSON
        },
        body: JSON.stringify(userAccount), // Send the JSON as a string
      });

      if (response.ok) {
        setSuccess('Registration successful!');
        setError('');
        // Redirect to login page after successful registration
        setTimeout(() => {
          navigate('/login'); // Redirect to the login page
        }, 2000);
        // Optionally, clear the form after success
        resetForm();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Registration failed. Please try again.');
        setSuccess('');
      }
    } catch (error) {
      setError('An error occurred: ' + error.message);
      setSuccess('');
    }
  };

  // Function to reset the form fields
  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setPhone('');
  };

  // Basic email validation function
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1>Register</h1>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="first-name">First Name</label>
              <input
                type="text"
                id="first-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your First Name"
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="last-name">Last Name</label>
              <input
                type="text"
                id="last-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your Last Name"
                required
              />
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your Password"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your Phone Number"
              required
            />
          </div>
          <button type="submit" className="register-btn">Register</button>
          <br /><br />
          <center>
            <p>Already Have An Account? <a href="/login">Login</a></p>
          </center>
        </form>
      </div>
    </div>
  );
}

export default Register;