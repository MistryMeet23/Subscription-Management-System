using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Subscription_Management_System.Model
{
    public class VendorSubscriptionPlans
    {
        [Key, Required]
        public int PlanId { get; set; }

        [Required]
        [ForeignKey("Vendor")]
        public int VendorId { get; set; }

        [JsonIgnore]
        public virtual Vendor Vendor { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "Plan name cannot exceed 100 characters.")]
        public string? PlanName { get; set; }

        [Required]
        [StringLength(500, ErrorMessage = "Description cannot exceed 500 characters.")]
        public string? Description { get; set; }

        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "Price must be a positive value.")]
        public decimal Price { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Duration must be at least 1 day.")]
        public int DurationInDays { get; set; }

        public bool AutoRenew { get; set; } = false;

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Required]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public object Feedbacks { get; internal set; }
    }
}
