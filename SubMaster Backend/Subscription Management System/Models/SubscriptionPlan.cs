using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Subscription_Management_System.Models
{
    public class SubscriptionPlan
    {
        [Key]
        public int Plan_Id { get; set; }

        [Required]
        [ForeignKey("VendorProfile")]
        public int Vendor_Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Plan_Name { get; set; }

        public string? Description { get; set; }

        [Required]
        [Range(0.01, 99999.99, ErrorMessage = "Price must be between 0.01 and 99999.99.")]
        public decimal Price { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Duration must be at least 1 day.")]
        public int Duration_In_Days { get; set; }

        public string? Features { get; set; } 

        [DefaultValue(true)]
        public bool Is_Active { get; set; } = true;

        public DateTime Created_At { get; set; } = DateTime.UtcNow;

        public DateTime Updated_At { get; set; } = DateTime.UtcNow;


        [JsonIgnore]
        public virtual VendorProfile? VendorProfile { get; set; } // Made nullable
    }
}
