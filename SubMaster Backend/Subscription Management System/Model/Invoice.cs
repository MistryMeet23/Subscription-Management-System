using System.ComponentModel.DataAnnotations;

namespace Subscription_Management_System.Model
{
    public class Invoice
    {
        [Required]
        public int InvoiceId { get; set; }

        [Required]
        public int PaymentId { get; set; }

        [Required]
        public int InvoiceNumber { get; set; }

        public DateTime IssueDate { get; set; }

        public DateTime DueDate { get; set; }

        [Required]
        public decimal TotalAmount { get; set; }
    }
}
