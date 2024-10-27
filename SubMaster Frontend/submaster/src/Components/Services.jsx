import React from 'react'
import Navbar from './Navbar'
import "./Services.css"

function Services() {
  return (
    <>
    <Navbar />
    <center>
    <h1 style={{marginTop:"50px", color:"wheat"}}>Our Services</h1><br/>
    <div className='row'>
      <div className='box'>
        <img src="https://img.freepik.com/free-vector/saas-technology-abstract-concept-illustration_335657-3886.jpg?uid=R86875981&ga=GA1.1.53413832.1701341519&semt=ais_hybrid" alt="" />
        <h3>Subscription Lifecycle Management</h3>
        <p>Facilitates the subscription process, enabling users to sign up for services or products.<br/>
           Allows creating, updating, and managing different subscription <br/> plans.
           Supports free trials with automated transitions to paid plans.
        </p>
        <button className='btn'>See More</button>
      </div>

      <div className='box1'>
        <img src="https://img.freepik.com/free-vector/credit-card-payment-concept-illustration_114360-584.jpg?uid=R86875981&ga=GA1.1.53413832.1701341519&semt=ais_hybrid" alt="" />
        <h3>Payments Management</h3>
        <p>Integration with various payment providers (e.g., PayPal, Stripe).<br/>
        Automated handling of failed payments and retries.<br/><br/>
        Offers dunning management to handle failed payments and notify customers for retry.
        </p>
        <button className='btn'>See More</button>
      </div>

      <div className='box2'>
        <img src="https://img.freepik.com/free-vector/hand-drawn-business-planning_23-2149150731.jpg?uid=R86875981&ga=GA1.1.53413832.1701341519&semt=ais_hybrid" alt="" />
        <h3>Pricing and Plan Management</h3>
        <p>Configures different subscription plans (tiered, volume-based, freemium, and trial).<br/>
        Enables pricing experiments, like A/B testing of pricing models.<br/>
        Supports add-ons, discounts, and custom pricing for specific customer segments.
        </p>
        <button className='btn'>See More</button>
      </div>

      <div className='box3'>
        <img src="https://img.freepik.com/premium-vector/team-collaboration-software-shields-data-integrity-with-endtoend-security_1263357-12238.jpg?uid=R86875981&ga=GA1.1.53413832.1701341519&semt=ais_hybrid" alt="" />
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