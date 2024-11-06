using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Subscription_Management_System.Models
{
    public class UserAccount
    {
        [Key]
        public int User_Id { get; set; }

        [Required]
        [StringLength(100)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(100)]
        public string LastName { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(100)]
        public string Email { get; set; }

        [Required]
        public string Password_Hash { get; set; }

        [DefaultValue(2)]
        public int Role_Id { get; set; } = 2; // Default to user role

        public string? Phone_Number { get; set; }

        public string? Address { get; set; }

        public string? Profile_Picture_Url { get; set; }

        public DateTime? Date_Of_Birth { get; set; }

        [DefaultValue("active")]
        public string Status { get; set; } = "active";

        public DateTime Created_At { get; set; }
        public DateTime Updated_At { get; set; }

        // Foreign Key Relationship
        [JsonIgnore]
        [ForeignKey("Role_Id")]
        public virtual UserRole? Role { get; set; }

        public UserAccount()
        {
            Created_At = DateTime.UtcNow;
            Updated_At = DateTime.UtcNow;
        }

    }
}
