using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Subscription_Management_System.Model
{
    public class Notification
    {
        [Key, Required]
        public int NotificationId { get; set; }

        [Required]
        public int UserId { get; set; }

        [JsonIgnore]
        public virtual User? User { get; set; }

        [Required]
        public string? NotificationType { get; set; }

        [Required]
        public string? Message { get; set; }

        [Required]
        public string Status { get; set; } = "Unread"; 

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        [Required]
        public string? Subject { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = "Invalid Email Address")] 
        public string? Email { get; set; }
    }
}
