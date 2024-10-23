using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Subscription_Management_System.Model
{
    public class Invoice
    {
        [Key, Required]
        public int InvoiceId { get; set; }
        public int? PaymentId { get; set; }

        [JsonIgnore]
        public virtual Payments? Payments { get; set; }

        [Required]
        public int InvoiceNumber { get; set; }

        public DateTime IssueDate { get; set; }

        public DateTime DueDate { get; set; }

        [Required]
        public decimal TotalAmount { get; set; }
    }
}
