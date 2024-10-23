using System.ComponentModel.DataAnnotations;

namespace Subscription_Management_System.Model
{
    public class Feedback
    {
        [Key, Required]
        public int FeedbackId { get; set; }

        [Required]
        public virtual User User { get; set; }

        [Required]
        public virtual VendorSubscriptionPlans VendorSubscriptionPlans { get; set; }

        public string? FeedbackText { get; set; }

        [Required]
        public int Rating { get; set; }

        public DateTime SubmittedAt { get; set; }
    }
}
