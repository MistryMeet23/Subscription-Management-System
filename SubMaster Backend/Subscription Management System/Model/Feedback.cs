using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Subscription_Management_System.Model
{
    public class Feedback
    {
        [Key, Required]
        public int FeedbackId { get; set; }

        [Required]
        public int VendorSubscriptionPlanId { get; set; }

        [JsonIgnore]
        public virtual VendorSubscriptionPlans? VendorSubscriptionPlans { get; set; }

        public string? FeedbackText { get; set; }

        [Required]
        [Range(1, 5, ErrorMessage = "Rating must be between 1 and 5")]
        public int Rating { get; set; }

        public DateTime SubmittedAt { get; set; } = DateTime.UtcNow; 

        public int? UserId { get; set; }

        [JsonIgnore]
        public virtual User? User { get; set; }
    }
}
