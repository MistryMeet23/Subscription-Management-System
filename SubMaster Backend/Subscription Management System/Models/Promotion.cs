using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Subscription_Management_System.Models
{
    public class Promotion
    {
        [Key]
        public int Promotion_Id { get; set; }

        [StringLength(50)]
        public string Promotion_Code { get; set; }

        public decimal Discount_Percentage { get; set; }

        public DateTime Start_Date { get; set; }
        public DateTime End_Date { get; set; }

        public int Usage_Limit { get; set; }
        public DateTime Created_At { get; set; }
        public DateTime Updated_At { get; set; }

        [ForeignKey("Plan_Id")]
        public int Plan_Id { get; set; }

        [JsonIgnore]
        public virtual SubscriptionPlan SubscriptionPlan { get; set; }

        public Promotion()
        {
            Created_At = DateTime.UtcNow;
            Updated_At = DateTime.UtcNow;
        }
    }
}
