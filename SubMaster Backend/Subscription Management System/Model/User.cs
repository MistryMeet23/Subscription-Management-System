using System.ComponentModel.DataAnnotations;

namespace Subscription_Management_System.Model
{
    public class User
    {
        [Key, Required]
        public int UserId { get; set; }

        [Required]
        public string? Name { get; set; }

        [Required]
        public string? Email { get; set; }

        [Required]
        public string? Password { get; set; }

        [Required]
        public virtual UserRoles UserRoles { get; set; }

        public string? Status { get; set; } = "Active";

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public int PhoneNumber { get; set; }

        public string? UserPic { get; set; }

        public DateTime DOB { get; set; }
    }
}
