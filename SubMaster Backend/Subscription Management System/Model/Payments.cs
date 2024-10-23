using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Subscription_Management_System.Model
{
    public class Payments
    {
        [Key, Required]
        public int PaymentId { get; set; }

        [Required]
        public int UserId { get; set; }

        [JsonIgnore]
        public virtual User? User { get; set; }

        [Required]
        public int VendorSubscriptionPlanId { get; set; }

        [JsonIgnore]
        public virtual VendorSubscriptionPlans? VendorSubscriptionPlans { get; set; }

        [Required]
        public decimal Amount { get; set; }

        public DateTime PaymentDate { get; set; } = DateTime.UtcNow; 

        public string? PaymentMethod { get; set; }

        [Required]
        public int TransactionId { get; set; }

        [Required]
        public string PaymentStatus { get; set; } = "Success"; 
    }
}
