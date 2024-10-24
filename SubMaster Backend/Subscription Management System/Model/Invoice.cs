using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Subscription_Management_System.Model
{
    public class Invoice
    {
        [Key, Required]
        public int InvoiceId { get; set; }

        [ForeignKey("Payments")]
        public int? PaymentId { get; set; }

        [JsonIgnore]
        public virtual Payments? Payments { get; set; }

        [Required]
        public int InvoiceNumber { get; set; }

        public DateTime IssueDate { get; set; }

        public DateTime DueDate { get; set; }

        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "TotalAmount must be a positive value.")]
        public decimal TotalAmount { get; set; }
    }
}
