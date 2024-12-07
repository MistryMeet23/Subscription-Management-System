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
    public class SubscriptionPlansController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SubscriptionPlansController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/SubscriptionPlans
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SubscriptionPlan>>> GetSubscriptionPlans()
        {
            return await _context.SubscriptionPlans.Include(sp => sp.VendorProfile).ToListAsync();
        }

        // GET: api/SubscriptionPlans/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SubscriptionPlan>> GetSubscriptionPlan(int id)
        {
            var subscriptionPlan = await _context.SubscriptionPlans
                .Include(sp => sp.VendorProfile) // Ensure VendorProfile is loaded
                .FirstOrDefaultAsync(sp => sp.Plan_Id == id);

            if (subscriptionPlan == null)
            {
                return NotFound();
            }

            return subscriptionPlan;
        }

        // GET: api/SubscriptionPlans/vendor/5
        [HttpGet("vendor/{vendorId}")]
        public async Task<ActionResult<IEnumerable<SubscriptionPlan>>> GetSubscriptionPlansByVendorId(int vendorId)
        {
            var subscriptionPlans = await _context.SubscriptionPlans
                .Where(sp => sp.Vendor_Id == vendorId)
                .Include(sp => sp.VendorProfile) // Include VendorProfile for related data
                .ToListAsync();

            if (!subscriptionPlans.Any())
            {
                return NotFound($"No subscription plans found for Vendor_Id {vendorId}");
            }

            return subscriptionPlans;
        }


        // PUT: api/SubscriptionPlans/5
        // PUT: api/SubscriptionPlans/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSubscriptionPlan(int id, SubscriptionPlan subscriptionPlan)
        {
            if (id != subscriptionPlan.Plan_Id)
            {
                return BadRequest("The Plan_Id in the URL and the body must match.");
            }

            // Ensure VendorProfile exists
            var vendorProfile = await _context.VendorProfiles.FindAsync(subscriptionPlan.Vendor_Id);
            if (vendorProfile == null)
            {
                return BadRequest("Invalid VendorProfile");
            }

            // Set timestamps for tracking updates
            subscriptionPlan.Updated_At = DateTime.UtcNow;

            // Attach and mark entity as modified
            _context.Attach(subscriptionPlan);
            _context.Entry(subscriptionPlan).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubscriptionPlanExists(id))
                {
                    return NotFound($"Subscription Plan with ID {id} does not exist.");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/SubscriptionPlans
        [HttpPost]
        public async Task<ActionResult<SubscriptionPlan>> PostSubscriptionPlan(SubscriptionPlan subscriptionPlan)
        {
            // Ensure VendorProfile exists before adding a new subscription plan
            var vendorProfile = await _context.VendorProfiles.FindAsync(subscriptionPlan.Vendor_Id);
            if (vendorProfile == null)
            {
                return BadRequest("Invalid VendorProfile");
            }

            subscriptionPlan.Created_At = DateTime.UtcNow;
            subscriptionPlan.Updated_At = DateTime.UtcNow;

            _context.SubscriptionPlans.Add(subscriptionPlan);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSubscriptionPlan", new { id = subscriptionPlan.Plan_Id }, subscriptionPlan);
        }

        // DELETE: api/SubscriptionPlans/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubscriptionPlan(int id)
        {
            var subscriptionPlan = await _context.SubscriptionPlans.FindAsync(id);
            if (subscriptionPlan == null)
            {
                return NotFound();
            }

            _context.SubscriptionPlans.Remove(subscriptionPlan);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SubscriptionPlanExists(int id)
        {
            return _context.SubscriptionPlans.Any(e => e.Plan_Id == id);
        }
    }
}
