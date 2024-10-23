using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Subscription_Management_System.Model
{
    public class User
    {
        [Key, Required]
        public int UserId { get; set; }

        [Required]
        public string? Name { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string? Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "Password must be at least 6 characters long.", MinimumLength = 6)]
        public string? Password { get; set; }

        public string Status { get; set; } = "Active";

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        [Phone(ErrorMessage = "Invalid Phone Number")]
        public string? PhoneNumber { get; set; } 

        public string? UserPic { get; set; }

        [DataType(DataType.Date)]
        public DateTime DOB { get; set; }

        public int? RoleId { get; set; }

        [JsonIgnore]
        public virtual UserRoles? Role { get; set; }
    }
}
