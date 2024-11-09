using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Subscription_Management_System.Models
{
    public class VendorProfile
    {
        [Key]
        public int Vendor_Id { get; set; }

        [ForeignKey("User_Id")]
        public int User_Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Business_Name { get; set; }

        public string? Business_Description { get; set; }
        public string? Business_Address { get; set; }
        public string? Phone_Number { get; set; }
        public string? Tax_Id { get; set; }
        public string? Website_Url { get; set; }
        public string? Social_Media_Links { get; set; } // Consider using a JSON or List<string>
        public string? Logo_Url { get; set; }

        public DateTime Created_At { get; set; }
        public DateTime Updated_At { get; set; }

        [JsonIgnore]
        public virtual UserAccount UserAccount { get; set; }

        public VendorProfile()
        {
            Created_At = DateTime.UtcNow;
            Updated_At = DateTime.UtcNow;
        }
    }
}
