import React from 'react';
import './Login.css';

function Login() {
  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        <form>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your Email" required/>
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your Password" required/>
          </div>
          <button type="submit" className="login-btn">Login</button><br/><br/>
          <p>Don't Have An Account</p>
        </form>
      </div>
    </div>
  );
}

export default Login;
