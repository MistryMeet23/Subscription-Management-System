import React from 'react'
import Navbar from './Navbar'
import "./Services.css"

function Services() {
  return (
    <>
    <Navbar />
    <center>
    <h1 style={{marginTop:"100px", color:"wheat"}}>Our Services</h1><br/>
    <div className='row'>
      <div className='box'>
        <h3>Subscription Lifecycle Management</h3>
        <p>Facilitates the subscription process, enabling users to sign up for services or products.<br/>
           Allows creating, updating, and managing different subscription <br/> plans.
           Supports free trials with automated transitions to paid plans.
        </p>
        <button className='btn'>See More</button>
      </div>

      <div className='box'>
        <h3>Payments Management</h3>
        <p>Integration with various payment providers (e.g., PayPal, Stripe).<br/>
        Automated handling of failed payments and retries.<br/><br/>
        Offers dunning management to handle failed payments and notify customers for retry.
        </p>
        <button className='btn'>See More</button>
      </div>

      <div className='box'>
        <h3>Pricing and Plan Management</h3>
        <p>Configures different subscription plans (tiered, volume-based, freemium, and trial).<br/>
        Enables pricing experiments, like A/B testing of pricing models.<br/>
        Supports add-ons, discounts, and custom pricing for specific customer segments.
        </p>
        <button className='btn'>See More</button>
      </div>

      <div className='box'>
        <h3>Security and Compliance</h3>
        <p>Data security measures like PCI DSS compliance for payment data protection.<br/>
        GDPR compliance for managing customer data privacy and handling user consent.<br/>
        Two-factor authentication (2FA) for added security.
        </p>
        <button className='btn'>See More</button>
      </div>
    </div>
    </center>
    </>
  )
}

export default Services