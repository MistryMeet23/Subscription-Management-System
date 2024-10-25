import { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
  };

  return (
    <>
      <header>
        <div className='container'>
          <nav>
            <div className="logo">
              <h2>Subscription Management System</h2>
            </div>
            <ul className={isOpen ? "nav-link active" : "nav-link"}>
              <li>
                <Link to="/Home">Home</Link>
              </li>
              <li>
                <Link to="/About">About</Link>
              </li>
              <li>
                <Link to="/Services">Services</Link>
              </li>
              <li>
                <Link to="/Contact">Contact</Link>
              </li>
              {isLoggedIn ? (
                <>
                  <li>
                    <Link to="/Profile">Profile</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/Login">Login</Link>
                  </li>
                  <li>
                    <Link to="/Register">Register</Link>
                  </li>
                </>
              )}
            </ul>
            <div className='icon' onClick={toggleMenu}>
              <FaBars />
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Navbar;
