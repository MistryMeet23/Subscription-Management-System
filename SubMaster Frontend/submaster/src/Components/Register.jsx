import React from 'react';
import './Register.css';

function Register() {
  return (
    <div className="register-container">
      <div className="register-box">
        <h1>Register</h1>
        <form>
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="first-name">First Name</label>
              <input type="text" id="first-name" placeholder="Enter your First Name" required />
            </div>
            <div className="input-group">
              <label htmlFor="last-name">Last Name</label>
              <input type="text" id="last-name" placeholder="Enter your Last Name" required />
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your Email" required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your Password" required />
          </div>
          <div className="input-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="number" id="phone" placeholder="Enter your Phone Number" required />
          </div>
          <button type="submit" className="register-btn">Register</button>
          <br /><br />
          <center><p>Already Have An Account? <a href="/login">Login</a></p></center>
        </form>
      </div>
    </div>
  );
}

export default Register;
