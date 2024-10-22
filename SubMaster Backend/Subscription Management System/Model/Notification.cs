﻿using System.ComponentModel.DataAnnotations;

namespace Subscription_Management_System.Model
{
    public class Notification
    {
        [Key, Required]
        public int NotificationId { get; set; }

        [Required]
        public virtual User User { get; set; }

        [Required]
        public string? NotificationType { get; set; }

        [Required]
        public string? Message { get; set; }

        [Required]
        public string? Status { get; set; } = "Unread, Read, Archived";

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        [Required]
        public string? Subject { get; set; }

        [Required]
        public string? Email { get; set; }
    }
}
