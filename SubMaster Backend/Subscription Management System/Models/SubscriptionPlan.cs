using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace YourNamespace.Models
{
    public class SubscriptionPlan
    {
        [Key]
        public int Plan_Id { get; set; }

        [ForeignKey("Vendor_Id")]
        public int Vendor_Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Plan_Name { get; set; }

        public string? Description { get; set; }

        [Required]
        [Range(0.01, 99999.99)]
        public decimal Price { get; set; }

        [Required]
        public int Duration_In_Days { get; set; }

        public string? Features { get; set; } // Store as JSON

        [DefaultValue(true)]
        public bool Is_Active { get; set; } = true;

        public DateTime Created_At { get; set; } = DateTime.Now;
        public DateTime Updated_At { get; set; } = DateTime.Now;

        [JsonIgnore]
        public virtual VendorProfile VendorProfile { get; set; }
    }
}
