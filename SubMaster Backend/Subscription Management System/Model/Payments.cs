using System.ComponentModel.DataAnnotations;

namespace Subscription_Management_System.Model
{
    public class Payments
    {
        [Required]
        public int PaymentId { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public int PlanId { get; set; }

        [Required]
        public decimal Amount { get; set; }

        public DateTime PaymentDate { get; set; }

        public string? PaymentMethod { get; set; }

        [Required]
        public int TransactionId { get; set; }

        [Required]
        public string? PaymentStatus { get; set; } = "Success, Failed, Pending";
    }
}
