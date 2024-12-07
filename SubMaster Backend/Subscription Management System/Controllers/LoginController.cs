using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Subscription_Management_System.Data;
using Subscription_Management_System.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Subscription_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _config;

        public LoginController(ApplicationDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        public class LoginResponse
        {
            public string AccessToken { get; set; }
            public bool Success { get; set; }
            public int RoleId { get; set; }
            public int UserId { get; set; }
        }

        [HttpPost]
        public async Task<ActionResult<LoginResponse>> LoginUser(Login login)
        {
            try
            {
                var user = await _context.UserAccounts.FirstOrDefaultAsync(u => u.Email == login.Email);

                if (user != null)
                {
                    return await VerifyUserPassword(login, user);
                }

                return NotFound("User Not Found!!!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        private async Task<ActionResult<LoginResponse>> VerifyUserPassword(Login login, UserAccount user)
        {
            var checkUserPassword = BCrypt.Net.BCrypt.Verify(login.Password, user.Password_Hash);
            if (checkUserPassword)
            {
                var jwtToken = CreateJWTToken(user.User_Id, user.Role_Id);
                return Ok(new LoginResponse
                {
                    AccessToken = jwtToken,
                    Success = true,
                    RoleId = user.Role_Id,
                    UserId = user.User_Id
                });
            }
            else
            {
                return BadRequest(new LoginResponse { Success = false });
            }
        }

        private string CreateJWTToken(int userId, int roleId)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId.ToString()),
                new Claim("role_id", roleId.ToString()),
                new Claim("user_id", userId.ToString())
            };

            var securityToken = new JwtSecurityToken(
                _config["Jwt:Issuer"],
                _config["Jwt:Issuer"],
                claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(securityToken);
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout([FromBody] string token)
        {
            await _context.RevokedTokens.AddAsync(new RevokedToken
            {
                Token = token,
                RevokedAt = DateTime.UtcNow
            });
            await _context.SaveChangesAsync();
            return Ok(new { Message = "Logged out successfully." });
        }

    }
}
