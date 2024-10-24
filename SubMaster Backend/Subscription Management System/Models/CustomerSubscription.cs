﻿using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace YourNamespace.Models
{
    public class CustomerSubscription
    {
        [Key]
        public int Subscription_Id { get; set; }

        [ForeignKey("User_Id")]
        public int User_Id { get; set; }

        [ForeignKey("Plan_Id")]
        public int Plan_Id { get; set; }

        [Required]
        public DateTime Start_Date { get; set; }

        [Required]
        public DateTime End_Date { get; set; }

        [DefaultValue("active")]
        public string Status { get; set; } = "active";

        [DefaultValue("pending")]
        public string Payment_Status { get; set; } = "pending";

        public string Payment_Method { get; set; }

        public decimal? Discount_Applied { get; set; }

        public DateTime Created_At { get; set; } = DateTime.Now;
        public DateTime Updated_At { get; set; } = DateTime.Now;

        [JsonIgnore]
        public virtual UserAccount UserAccount { get; set; }

        [JsonIgnore]
        public virtual SubscriptionPlan SubscriptionPlan { get; set; }
    }
}
