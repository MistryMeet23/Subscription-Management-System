using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Subscription_Management_System.Models
{
    public class SubscriptionHistory
    {
        [Key]
        public int History_Id { get; set; }

        [ForeignKey("Plan_Id")]
        public int Plan_Id { get; set; }

        [Required]
        public string Change_Type { get; set; } // "upgraded" or "canceled"

        public string? Old_Value { get; set; }
        public string? New_Value { get; set; }

        public DateTime Changed_At { get; set; } = DateTime.Now;

        [JsonIgnore]
        public virtual SubscriptionPlan SubscriptionPlan { get; set; }
    }
}
