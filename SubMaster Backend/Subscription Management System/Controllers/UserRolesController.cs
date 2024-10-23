using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Subscription_Management_System.Data;
using Subscription_Management_System.Model;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Subscription_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserRolesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserRolesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Get all user roles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserRoles>>> GetUserRoles()
        {
            return await _context.UserRoles.ToListAsync();
        }

        // Get a user role by ID
        [HttpGet("{id}")]
        public async Task<ActionResult<UserRoles>> GetUserRole(int id)
        {
            var role = await _context.UserRoles.FindAsync(id);
            if (role == null)
            {
                return NotFound();
            }

            return role;
        }

        // Create a new user role
        [HttpPost]
        public async Task<ActionResult<UserRoles>> PostUserRole(UserRoles userRole)
        {
            _context.UserRoles.Add(userRole);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUserRole), new { id = userRole.RoleId }, userRole);
        }

        // Update an existing user role
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserRole(int id, UserRoles userRole)
        {
            if (id != userRole.RoleId)
            {
                return BadRequest();
            }

            _context.Entry(userRole).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserRoleExists(id))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }

        // Delete a user role
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserRole(int id)
        {
            var userRole = await _context.UserRoles.FindAsync(id);
            if (userRole == null)
            {
                return NotFound();
            }

            _context.UserRoles.Remove(userRole);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserRoleExists(int id)
        {
            return _context.UserRoles.Any(e => e.RoleId == id);
        }
    }
}
