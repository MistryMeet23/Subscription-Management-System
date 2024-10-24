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
    public class SubscriptionHistoriesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SubscriptionHistoriesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/SubscriptionHistories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SubscriptionHistory>>> GetSubscriptionHistories()
        {
            return await _context.SubscriptionHistories.ToListAsync();
        }

        // GET: api/SubscriptionHistories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SubscriptionHistory>> GetSubscriptionHistory(int id)
        {
            var subscriptionHistory = await _context.SubscriptionHistories.FindAsync(id);

            if (subscriptionHistory == null)
            {
                return NotFound();
            }

            return subscriptionHistory;
        }

        // PUT: api/SubscriptionHistories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSubscriptionHistory(int id, SubscriptionHistory subscriptionHistory)
        {
            if (id != subscriptionHistory.History_Id)
            {
                return BadRequest();
            }

            _context.Entry(subscriptionHistory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubscriptionHistoryExists(id))
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

        // POST: api/SubscriptionHistories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SubscriptionHistory>> PostSubscriptionHistory(SubscriptionHistory subscriptionHistory)
        {
            _context.SubscriptionHistories.Add(subscriptionHistory);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSubscriptionHistory", new { id = subscriptionHistory.History_Id }, subscriptionHistory);
        }

        // DELETE: api/SubscriptionHistories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubscriptionHistory(int id)
        {
            var subscriptionHistory = await _context.SubscriptionHistories.FindAsync(id);
            if (subscriptionHistory == null)
            {
                return NotFound();
            }

            _context.SubscriptionHistories.Remove(subscriptionHistory);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SubscriptionHistoryExists(int id)
        {
            return _context.SubscriptionHistories.Any(e => e.History_Id == id);
        }
    }
}
