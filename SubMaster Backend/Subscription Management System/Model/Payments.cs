using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Subscription_Management_System.Model
{
    public class Payments
    {
        [Key, Required]
        public int PaymentId { get; set; }

        [Required]
        [ForeignKey("User")]
        public int UserId { get; set; }

        [JsonIgnore]
        public virtual User? User { get; set; }

        [Required]
        [ForeignKey("VendorSubscriptionPlans")]
        public int VendorSubscriptionPlanId { get; set; }

        [JsonIgnore]
        public virtual VendorSubscriptionPlans? VendorSubscriptionPlans { get; set; }

        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "Amount must be a positive value.")]
        public decimal Amount { get; set; }

        public DateTime PaymentDate { get; set; } = DateTime.UtcNow;

        public string? PaymentMethod { get; set; }

        [Required]
        public int TransactionId { get; set; }

        [Required]
        public string PaymentStatus { get; set; } = "Success";
    }
}
