using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace YourNamespace.Models
{
    public class Feedback
    {
        [Key]
        public int Feedback_Id { get; set; }

        [ForeignKey("User_Id")]
        public int User_Id { get; set; }

        [ForeignKey("Vendor_Id")]
        public int Vendor_Id { get; set; }

        public int Rating { get; set; }
        public string? Comments { get; set; }

        public DateTime Submitted_At { get; set; } = DateTime.Now;

        [JsonIgnore]
        public virtual UserAccount UserAccount { get; set; }

        [JsonIgnore]
        public virtual VendorProfile VendorProfile { get; set; }
    }
}
