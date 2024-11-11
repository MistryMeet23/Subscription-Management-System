import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <>
    <Navbar/>
      <div>
        <h1>Welcome to the Home Page</h1>
        <p>This is where you can find all the latest information.</p>
      </div>
      <Footer/>
    </>
  );
};

export default HomePage;
