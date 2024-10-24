import React from 'react';
import './Login.css';

function Login() {
  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        <form>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your Email" required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your Password" required />
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
