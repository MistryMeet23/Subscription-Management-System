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
    public class VendorProfilesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public VendorProfilesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/VendorProfiles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VendorProfile>>> GetVendorProfiles()
        {
            return await _context.VendorProfiles.ToListAsync();
        }

        // GET: api/VendorProfiles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<VendorProfile>> GetVendorProfile(int id)
        {
            var vendorProfile = await _context.VendorProfiles.FindAsync(id);

            if (vendorProfile == null)
            {
                return NotFound();
            }

            return vendorProfile;
        }

        // PUT: api/VendorProfiles/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVendorProfile(int id, VendorProfile vendorProfile)
        {
            if (id != vendorProfile.Vendor_Id)
            {
                return BadRequest();
            }

            _context.Entry(vendorProfile).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VendorProfileExists(id))
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

        // POST: api/VendorProfiles
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<VendorProfile>> PostVendorProfile(VendorProfile vendorProfile)
        {
            var userAccount = await _context.UserAccounts.FindAsync(vendorProfile.User_Id);
            if (userAccount == null)
            {
                return BadRequest(new { error = "Invalid UserAccount" });
            }

            vendorProfile.UserAccount = userAccount;
            _context.VendorProfiles.Add(vendorProfile);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetVendorProfile", new { id = vendorProfile.Vendor_Id }, vendorProfile);
        }

        // DELETE: api/VendorProfiles/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVendorProfile(int id)
        {
            var vendorProfile = await _context.VendorProfiles.FindAsync(id);
            if (vendorProfile == null)
            {
                return NotFound();
            }

            _context.VendorProfiles.Remove(vendorProfile);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool VendorProfileExists(int id)
        {
            return _context.VendorProfiles.Any(e => e.Vendor_Id == id);
        }
    }
}
