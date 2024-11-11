import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function AboutPage() {
  return (
    <>
    <Navbar/>
      <div>
        <h1>Welcome to the About Page</h1>
        <p>This is where you can find all the latest information.</p>
      </div>
      <Footer/>
    </>
  )
}

export default AboutPage