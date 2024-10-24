﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace YourNamespace.Models
{
    public class Payment
    {
        [Key]
        public int Payment_Id { get; set; }

        [ForeignKey("User_Id")]
        public int User_Id { get; set; }

        [ForeignKey("Plan_Id")]
        public int Plan_Id { get; set; }

        [Required]
        public decimal Amount { get; set; }

        public DateTime Payment_Date { get; set; } = DateTime.Now;

        public string Payment_Method { get; set; }

        public string Transaction_Id { get; set; }

        public string Payment_Status { get; set; }

        [JsonIgnore]
        public virtual UserAccount UserAccount { get; set; }

        [JsonIgnore]
        public virtual SubscriptionPlan SubscriptionPlan { get; set; }
    }
}
