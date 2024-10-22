using System.ComponentModel.DataAnnotations;

namespace Subscription_Management_System.Model
{
    public class SubscriptionHistory
    {
        [Key, Required]
        public int HistoryId { get; set; }

        [Required]
        public virtual VendorSubscriptionPlans VendorSubscriptionPlans { get; set; }

        [Required]
        public string? ChangeType { get; set; } = "Upgraded, Canceled";

        [Required]
        public string? OldValue { get; set; }

        [Required]
        public string? NewValue { get; set; }

        public DateTime ChangedAt { get; set; }
    }
}
