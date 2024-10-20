using System.ComponentModel.DataAnnotations;

namespace Subscription_Management_System.Model
{
    public class Feedback
    {
        [Required]
        public int FeedbackId { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public int PlanId { get; set; }

        public string? FeedbackText { get; set; }

        [Required]
        public int Rating { get; set; }

        public DateTime SubmittedAt { get; set; }
    }
}
