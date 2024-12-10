using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Subscription_Management_System.Models
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

        public DateTime Submitted_At { get; set; }
        public DateTime Created_At { get; set; }
        public DateTime Updated_At { get; set; }

        [JsonIgnore]
        public virtual UserAccount? UserAccount { get; set; }

        [JsonIgnore]
        public virtual VendorProfile? VendorProfile { get; set; }

        public Feedback()
        {
            Created_At = DateTime.UtcNow;
            Updated_At = DateTime.UtcNow;
            Submitted_At = DateTime.UtcNow;
        }
    }
}
