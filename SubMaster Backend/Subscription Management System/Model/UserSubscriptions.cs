using System.ComponentModel.DataAnnotations;

namespace Subscription_Management_System.Model
{
    public class UserSubscriptions
    {
        [Key, Required]
        public int SubscriptionId { get; set; }

        [Required]
        public virtual User User { get; set; }

        [Required]
        public virtual VendorSubscriptionPlans VendorSubscriptionPlans { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        [Required]
        public string? Status { get; set; } = "Active";

        [Required]
        public string? PaymentStatus { get; set; } = "Pending";

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public string? PaymentMethod { get; set; }

        public decimal Discount { get; set; }
    }
}
