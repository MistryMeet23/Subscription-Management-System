using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Subscription_Management_System.Model
{
    public class UserSubscriptions
    {
        [Key, Required]
        public int SubscriptionId { get; set; }

        [Required]
        [ForeignKey("User")]
        public int UserId { get; set; }

        [Required]
        [ForeignKey("VendorSubscriptionPlans")]
        public int VendorSubscriptionPlanId { get; set; }

        [JsonIgnore]
        public virtual User? User { get; set; }

        [JsonIgnore]
        public virtual VendorSubscriptionPlans? VendorSubscriptionPlans { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [Required]
        public string Status { get; set; } = "Active";

        [Required]
        public string PaymentStatus { get; set; } = "Pending";

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public string? PaymentMethod { get; set; }

        public decimal Discount { get; set; } = 0;
    }
}
