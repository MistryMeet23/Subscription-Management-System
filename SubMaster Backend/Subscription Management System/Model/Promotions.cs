using System.ComponentModel.DataAnnotations;

namespace Subscription_Management_System.Model
{
    public class Promotions
    {
        [Key, Required]
        public int PromotionId { get; set; }

        [Required]
        public string? PromotionCode { get; set; }

        public decimal Discount { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        [Required]
        public int Usagelimit { get; set; }

        [Required]
        public virtual VendorSubscriptionPlans VendorSubscriptionPlans { get; set; }
    }
}
