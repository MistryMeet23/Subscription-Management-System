using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Subscription_Management_System.Data;
using Subscription_Management_System.Models;

namespace Subscription_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerSubscriptionsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CustomerSubscriptionsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/CustomerSubscriptions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomerSubscription>>> GetCustomerSubscriptions()
        {
            return await _context.CustomerSubscriptions.ToListAsync();
        }

        // GET: api/CustomerSubscriptions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CustomerSubscription>> GetCustomerSubscription(int id)
        {
            var customerSubscription = await _context.CustomerSubscriptions.FindAsync(id);

            if (customerSubscription == null)
            {
                return NotFound();
            }

            return customerSubscription;
        }

        // GET: api/CustomerSubscriptions/user/{userId}
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<CustomerSubscription>>> GetCustomerSubscriptionsByUser(int userId)
        {
            var customerSubscriptions = await _context.CustomerSubscriptions
                                                       .Where(cs => cs.User_Id == userId)
                                                       .ToListAsync();

            if (customerSubscriptions == null || !customerSubscriptions.Any())
            {
                return NotFound();
            }

            return customerSubscriptions;
        }

        // PUT: api/CustomerSubscriptions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomerSubscription(int id, CustomerSubscription customerSubscription)
        {
            if (id != customerSubscription.Subscription_Id)
            {
                return BadRequest();
            }

            _context.Entry(customerSubscription).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerSubscriptionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/CustomerSubscriptions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754

        [HttpPost]
        public async Task<ActionResult<CustomerSubscription>> PostCustomerSubscription(CustomerSubscription customerSubscription)
        {
            // Ensure that the User and Plan exist before saving
            var user = await _context.UserAccounts.FindAsync(customerSubscription.User_Id);
            var plan = await _context.SubscriptionPlans.FindAsync(customerSubscription.Plan_Id);

            if (user == null || plan == null)
            {
                return BadRequest("Invalid User or Plan Id.");
            }

            // Automatically populate the navigation properties (optional)
            customerSubscription.UserAccount = user;
            customerSubscription.SubscriptionPlan = plan;

            _context.CustomerSubscriptions.Add(customerSubscription);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCustomerSubscription", new { id = customerSubscription.Subscription_Id }, customerSubscription);
        }


        // DELETE: api/CustomerSubscriptions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomerSubscription(int id)
        {
            var customerSubscription = await _context.CustomerSubscriptions.FindAsync(id);
            if (customerSubscription == null)
            {
                return NotFound();
            }

            _context.CustomerSubscriptions.Remove(customerSubscription);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CustomerSubscriptionExists(int id)
        {
            return _context.CustomerSubscriptions.Any(e => e.Subscription_Id == id);
        }
    }
}
