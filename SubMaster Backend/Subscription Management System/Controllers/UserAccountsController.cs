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
    public class UserAccountsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserAccountsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/UserAccounts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserAccount>>> GetUserAccounts()
        {
            return await _context.UserAccounts.ToListAsync();
        }

        // GET: api/UserAccounts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserAccount>> GetUserAccount(int id)
        {
            var userAccount = await _context.UserAccounts.FindAsync(id);

            if (userAccount == null)
            {
                return NotFound();
            }

            return userAccount;
        }

        // PUT: api/UserAccounts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserAccount(int id, UserAccount updatedUserAccount)
        {
            if (id != updatedUserAccount.User_Id)
            {
                return BadRequest();
            }

            var existingUser = await _context.UserAccounts.FindAsync(id);
            if (existingUser == null)
            {
                return NotFound();
            }

            // Only update fields that are provided, skip Password_Hash if empty or null
            existingUser.FirstName = updatedUserAccount.FirstName ?? existingUser.FirstName;
            existingUser.LastName = updatedUserAccount.LastName ?? existingUser.LastName;
            existingUser.Email = updatedUserAccount.Email ?? existingUser.Email;
            existingUser.Phone_Number = updatedUserAccount.Phone_Number ?? existingUser.Phone_Number;
            existingUser.Address = updatedUserAccount.Address ?? existingUser.Address;

            // Update timestamp
            existingUser.Updated_At = DateTime.UtcNow;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserAccountExists(id))
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



        // POST: api/UserAccounts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UserAccount>> PostUserAccount(UserAccount userAccount)
        {
            // Hash the user's password using bcrypt
            string hashPassword = BCrypt.Net.BCrypt.HashPassword(userAccount.Password_Hash);
            userAccount.Password_Hash = hashPassword;

            _context.UserAccounts.Add(userAccount);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserAccount", new { id = userAccount.User_Id }, userAccount);
        }

        // DELETE: api/UserAccounts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserAccount(int id)
        {
            var userAccount = await _context.UserAccounts.FindAsync(id);
            if (userAccount == null)
            {
                return NotFound();
            }

            _context.UserAccounts.Remove(userAccount);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("email/{email}")]
        public async Task<ActionResult> CheckEmail(string email)
        {
            var user = await _context.UserAccounts.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null)
            {
                return NotFound(new { message = "Email not found." });
            }

            return Ok(new { userId = user.User_Id });
        }

        [HttpPost("ResetPassword/{id}")]
        public async Task<IActionResult> ResetPassword(int id, [FromBody] ResetPassword model)
        {
            try
            {
                var userAccount = await _context.UserAccounts.FindAsync(id);
                if (userAccount == null)
                {
                    return NotFound("User not found");
                }

                // Hash the new password
                string hashedPassword = BCrypt.Net.BCrypt.HashPassword(model.NewPassword);
                userAccount.Password_Hash = hashedPassword;

                // Save changes to the database
                _context.Entry(userAccount).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return Ok("Password reset successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        private bool UserAccountExists(int id)
        {
            return _context.UserAccounts.Any(e => e.User_Id == id);
        }
    }
}