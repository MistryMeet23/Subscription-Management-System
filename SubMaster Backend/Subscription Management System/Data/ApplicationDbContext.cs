using Microsoft.EntityFrameworkCore;
using Subscription_Management_System.Model;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace Subscription_Management_System.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<Promotions> ProvidedPromotions { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Payments> Payments { get; set; }
        public DbSet<SubscriptionHistory> SubscriptionHistory { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserRoles> UserRoles { get; set; }
        public DbSet<UserSubscriptions> UserSubscriptions { get; set; }
        public DbSet<Vendor> Vendors { get; set; }
        public DbSet<VendorSubscriptionPlans> VendorsSubscriptionPlans { get; set; }

    }
}
