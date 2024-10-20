using System.ComponentModel.DataAnnotations;

namespace Subscription_Management_System.Model
{
    public class UserRoles
    {
        [Required]
        public int RoleId { get; set; }

        [Required]
        public string? RoleName { get; set; }
    }
}
