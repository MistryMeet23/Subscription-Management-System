using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Subscription_Management_System.Models
{
    public class Invoice
    {
        [Key]
        public int Invoice_Id { get; set; }

        [ForeignKey("Payment_Id")]
        public int Payment_Id { get; set; }

        [StringLength(50)]
        public string Invoice_Number { get; set; }

        public DateTime Issue_Date { get; set; }
        public DateTime Due_Date { get; set; }
        public DateTime Created_At { get; set; }
        public DateTime Updated_At { get; set; }

        [Required]
        public decimal Total_Amount { get; set; }

        [JsonIgnore]
        public virtual Payment Payment { get; set; }
        public Invoice()
        {
            Created_At = DateTime.UtcNow;
            Updated_At = DateTime.UtcNow;
        }
    }
}
