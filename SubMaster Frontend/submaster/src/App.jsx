import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <nav className="navbar">
        <ul className="navbar-menu">
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>

      <div className="content">
        <h1>Subscription Management System</h1>
      </div>
    </>
  );
}

export default App;
