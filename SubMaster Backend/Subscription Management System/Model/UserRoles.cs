using System.ComponentModel.DataAnnotations;

namespace Subscription_Management_System.Model
{
    public class UserRole
    {
        [Key, Required]
        public int UserRoleId { get; set; }

        [Required]
        [StringLength(50, ErrorMessage = "Role name cannot exceed 50 characters.")]
        public string RoleName { get; set; }

        // Navigation property
        public ICollection<User> Users { get; set; } 
    }
}
