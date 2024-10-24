using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Subscription_Management_System.Model
{
    public class Vendor
    {
        [Key, Required]
        public int VendorId { get; set; }

        [Required]
        [ForeignKey("UserRoles")]
        public int UserRoleId { get; set; }

        [JsonIgnore]
        public virtual UserRole? UserRoles { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "Business name cannot exceed 100 characters.")]
        public string? BusinessName { get; set; }

        [Required]
        [StringLength(500, ErrorMessage = "Business description cannot exceed 500 characters.")]
        public string? BusinessDescription { get; set; }

        [Required]
        [Phone(ErrorMessage = "Invalid phone number format.")]
        public string PhoneNumber { get; set; }

        [Url(ErrorMessage = "Invalid website URL format.")]
        public string? Website { get; set; }

        public string? SocialLinks { get; set; }

        public string? LogoUrl { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Required]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
