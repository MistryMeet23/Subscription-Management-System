using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Subscription_Management_System.Model
{
    public class SubscriptionHistory
    {
        [Key, Required]
        public int HistoryId { get; set; }

        [Required]
        public int VendorSubscriptionPlanId { get; set; }

        [JsonIgnore]
        public virtual VendorSubscriptionPlans? VendorSubscriptionPlans { get; set; }

        [Required]
        [RegularExpression(@"^(Upgraded|Canceled)$", ErrorMessage = "ChangeType must be either 'Upgraded' or 'Canceled'.")]
        public string ChangeType { get; set; } = "Upgraded"; 

        [Required]
        public string? OldValue { get; set; }

        [Required]
        public string? NewValue { get; set; }

        public DateTime ChangedAt { get; set; } = DateTime.UtcNow; 
    }
}
