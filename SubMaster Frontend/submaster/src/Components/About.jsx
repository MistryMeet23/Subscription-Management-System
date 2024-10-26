import React from 'react'
import Navbar from './Navbar'

function About() {
  return (
    <>
      <Navbar />
      <center>
        <h1 style={{ color: "white" }}>About Page</h1>
        <div
          style={{
            background:
              "url('./assets/image.png') no-repeat center center / cover",
            minHeight: "50vh",
            position: "relative",
          }}
        ></div>
      </center>
    </>
  );
}

export default About