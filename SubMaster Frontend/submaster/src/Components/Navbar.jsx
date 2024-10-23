import { useState } from 'react';
import { FaBars } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
                <Link to="/home" className='active'>Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/services">Services</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
            <div className='icon' onClick={toggleMenu}>
              <FaBars />
            </div>
          </nav>
        </div>
      </header>
      {/* <section>
        <div className='container'>
          <div className="content">
            <h2>Responsive Navbar</h2>
          </div>
        </div>
      </section> */}
    </>
  );
}

export default Navbar;
