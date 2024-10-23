using System.ComponentModel.DataAnnotations;

namespace Subscription_Management_System.Model
{
    public class UserRoles
    {
        [Key, Required]
        public int RoleId { get; set; }

        [Required]
        [StringLength(50, ErrorMessage = "Role name cannot exceed 50 characters.")]
        public string? RoleName { get; set; }
    }
}