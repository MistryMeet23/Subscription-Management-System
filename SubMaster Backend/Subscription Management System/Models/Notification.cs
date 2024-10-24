using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Subscription_Management_System.Models
{
    public class Notification
    {
        [Key]
        public int Notification_Id { get; set; }

        [ForeignKey("User_Id")]
        public int User_Id { get; set; }

        [Required]
        public string Notification_Type { get; set; }

        [Required]
        public string Message { get; set; }

        [DefaultValue("unread")]
        public string Status { get; set; } = "unread";

        public DateTime Created_At { get; set; } = DateTime.Now;

        public DateTime? Sent_At { get; set; }

        [Required]
        [StringLength(255)]
        public string Subject { get; set; }

        [DefaultValue(false)]
        public bool Is_Email { get; set; } = false;

        [JsonIgnore]
        public virtual UserAccount UserAccount { get; set; }
    }
}
