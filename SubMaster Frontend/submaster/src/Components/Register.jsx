import React, { useState } from 'react';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create the payload for the API
    const userAccount = {
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Password_Hash: password,  // Password to be hashed by API
      Phone: phone
    };

    try {
      const response = await fetch('https://localhost:7280/api/UserAccounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userAccount)
      });

      if (response.ok) {
        setSuccess('Registration successful!');
        setError('');
        // Optionally, clear the form after success
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setPhone('');
      } else {
        setError('Registration failed. Please try again.');
        setSuccess('');
      }
    } catch (error) {
      setError('An error occurred: ' + error.message);
      setSuccess('');
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1>Register</h1>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleSubmit}>
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
          <p>Already Have An Account?</p>
        </form>
      </div>
    </div>
  );
}

export default Register;
