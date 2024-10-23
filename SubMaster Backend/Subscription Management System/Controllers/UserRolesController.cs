using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Subscription_Management_System.Data;
using Subscription_Management_System.Model;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

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

        // GET: api/<UserRolesController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserRoles>>> GetUserRoles()
        {
            return await _context.UserRoles.ToListAsync();
        }

        // GET api/<UserRolesController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserRoles>> GetUserRoles(int id)
        {
            var ur = await _context.UserRoles.FindAsync(id);
            if(ur == null)
            { 
                return NotFound();
            }
            return ur;
        }

        // POST api/<UserRolesController>
        [HttpPost]
        public async Task<ActionResult<UserRoles>> Post(UserRoles userRoles)
        {
            _context.UserRoles.Add(userRoles);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetUserRoles),new {id= userRoles.RoleId }, userRoles);
        }

        // PUT api/<UserRolesController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, UserRoles userRoles)
        {
            if (id != userRoles.RoleId)
            {
                return BadRequest();
            }

            // Check if the entity exists
            if (!EntityExists(id))
            {
                return NotFound();
            }

            _context.Entry(userRoles).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EntityExists(id))
                {
                    return NotFound();
                }
                throw; // Re-throw the exception for further handling
            }

            return NoContent();
        }

        private bool EntityExists(int id)
        {
            return _context.UserRoles.Any(e=>e.RoleId == id);
        }

        // DELETE api/<UserRolesController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var ur = await _context.UserRoles.FindAsync(id);
            if (ur == null)
            {
                return NotFound(); // Corrected this check
            }

            _context.UserRoles.Remove(ur);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }

}
