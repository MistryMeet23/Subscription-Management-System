using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Subscription_Management_System.Model
{
    public class Promotions
    {
        [Key, Required]
        public int PromotionId { get; set; }

        [Required]
        public string? PromotionCode { get; set; }

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Discount must be a positive value.")]
        public decimal Discount { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Usage limit must be at least 1.")]
        public int UsageLimit { get; set; }

        [Required]
        [ForeignKey("VendorSubscriptionPlans")]
        public int VendorSubscriptionPlanId { get; set; }

        [JsonIgnore]
        public virtual VendorSubscriptionPlans? VendorSubscriptionPlans { get; set; }
    }
}
