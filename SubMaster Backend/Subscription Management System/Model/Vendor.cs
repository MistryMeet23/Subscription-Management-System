using System.ComponentModel.DataAnnotations;

namespace Subscription_Management_System.Model
{
    public class Vendor
    {
        [Key, Required]
        public int VendorId { get; set; }

        [Required]
        public virtual UserRoles UserRoles { get; set; }

        [Required]
        public string? BusinessName { get; set; }

        [Required]
        public string? BusinessDescription { get; set; }

        [Required]
        public int PhoneNumber { get; set; }

        public string? Website { get; set; }

        public string? Sociallinks { get; set; }

        public string? LogoUrl { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
    }
}
