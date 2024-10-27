import React from 'react';
import Navbar from './Navbar';

function Contact() {
  return (
    <>
      <Navbar />
      <center>
        <h1 style={{ color: "wheat", marginTop: "20px" }}>Contact Page</h1>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <div style={{ width: '50%', height: '500px', marginRight: '0.5px' }}>
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15687059.314462785!2d73.72247860399697!3d20.594588613472155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDM1JzM5LjgiTiA3M8KwNDMnMjkuOSJF!5e0!3m2!1sen!2sin!4v1632190634374!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
          <div style={{ width: '40%', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '0px' }}>
            <form>
              <div style={{ marginBottom: '10px' }}>
                <label style={{marginRight: "480px"}}>First Name:-</label>
                <input type="text" name="firstname" placeholder='Enter Your First Name' style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{marginRight: "480px"}}>Last Name:-</label>
                <input type="text" name="lastname" placeholder='Enter Your Last Name' style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{marginRight: "520px"}}>Email:-</label>
                <input type="email" name="email" placeholder='Enter Your Email' style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{marginRight: "450px"}}>Phone Number:-</label>
                <input type="tel" name="phonenumber" placeholder='Enter Your Phone Number' style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{marginRight: "490px"}}>Message:-</label>
                <textarea name="message" rows="4" placeholder='Enter Your Message' style={{ width: '100%', padding: '8px', marginTop: '5px' }}></textarea>
              </div>
              <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </center>
    </>
  );
}

export default Contact;
