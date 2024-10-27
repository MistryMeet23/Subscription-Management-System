import React from 'react';
import Navbar from './Navbar';

function About() {
  return (
    <>
      <Navbar />
      <div className='header'>
        <h1 style={{ color: "wheat"}}>About Page</h1>
        <img style={{borderRadius: "10px", width: "15%"}} src="https://img.freepik.com/premium-vector/team-professionals-engaged-collaborative-discussion-with-digital-tools-collaboration-teamwork-communication-discussion-partnership-business-project-flat-illustration_585735-39119.jpg?uid=R86875981&ga=GA1.1.53413832.1701341519&semt=ais_hybrid" alt="" />
      </div>

      <p style={{ marginTop: "10px", color: "burlywood", fontSize: "1.2rem", fontWeight: "bold", textAlign: "center" }}>
        Welcome to SMS, where we make subscription management simple and effective.<br />
        Our platform is designed to help businesses streamline their subscription processes, enhance customer engagement, and optimize revenue.<br />
        With a focus on flexibility, scalability, and security, we empower companies to manage their subscriber data, billing, and communication all in one place.
      </p><br/><br/>

      <div className='row' style={{ justifyContent: 'center', display: 'flex', flexWrap: 'wrap' }}>
        <div className='column'>
          <div className='card'>
            <div className='container'>
              <h1><b>Our Mission</b></h1>
              <p>We aim to support businesses of all sizes by providing a reliable,<br /> user-friendly subscription management solution that scales with their needs.<br /> By reducing complexity and automating key tasks,<br /> we enable our clients to focus on what <br /> matters most: delivering value to their customers.</p>
            </div>
          </div>
        </div>

        <div className='column'>
          <div className='card'>
            <div className='container'>
              <h1><b>Our Vision</b></h1>
              <p>To be a leading provider of subscription management solutions,<br /> recognized for our innovative features,<br /> exceptional customer support,<br /> and commitment to helping businesses<br /> thrive in a subscription-based economy.</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        background: "url('./assets/image.png') no-repeat center center / cover",
        minHeight: "10vh",
        position: "relative",
      }}></div>
    </>
  );
}

export default About;
