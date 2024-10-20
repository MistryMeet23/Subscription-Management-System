using System.ComponentModel.DataAnnotations;

namespace Subscription_Management_System.Model
{
    public class VendorSubscriptionPlans
    {
        [Required]
        public int PlanId { get; set; }

        [Required]
        public int VendorId { get; set; }

        [Required]
        public string? PlanName { get; set; }

        [Required]
        public string? Description { get; set; }

        [Required]
        public decimal Price { get;  set; }

        [Required]
        public int DurationOfDays { get; set; }

        [Required]
        public string? Features { get; set; }

        [Required]
        public string? IsActive { get; set; } = "Active";

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
    }
}
