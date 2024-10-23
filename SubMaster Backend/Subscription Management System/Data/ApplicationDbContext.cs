using Microsoft.EntityFrameworkCore;
using Subscription_Management_System.Model;

namespace Subscription_Management_System.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<UserRoles> UserRoles { get; set; }
        public DbSet<Vendor> Vendors { get; set; }
        public DbSet<VendorSubscriptionPlans> VendorSubscriptionPlans { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<Payments> Payments { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Promotions> Promotions { get; set; }
        public DbSet<SubscriptionHistory> SubscriptionHistories { get; set; }
        public DbSet<UserSubscriptions> UserSubscriptions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Invoice>()
                .HasOne(i => i.Payments)
                .WithMany()
                .HasForeignKey(i => i.PaymentId);

            modelBuilder.Entity<Feedback>()
                .HasOne(f => f.VendorSubscriptionPlans)
                .WithMany()
                .HasForeignKey("VendorSubscriptionPlanId");

            modelBuilder.Entity<Notification>()
                .HasOne(n => n.User)
                .WithMany()
                .HasForeignKey("UserId");

            modelBuilder.Entity<Payments>()
                .HasOne(p => p.User)
                .WithMany()
                .HasForeignKey("UserId");

            modelBuilder.Entity<Payments>()
                .HasOne(p => p.VendorSubscriptionPlans)
                .WithMany()
                .HasForeignKey("VendorSubscriptionPlanId");

            modelBuilder.Entity<Promotions>()
                .HasOne(p => p.VendorSubscriptionPlans)
                .WithMany()
                .HasForeignKey("VendorSubscriptionPlanId");

            modelBuilder.Entity<UserSubscriptions>()
                .HasOne(us => us.User)
                .WithMany()
                .HasForeignKey("UserId");

            modelBuilder.Entity<UserSubscriptions>()
                .HasOne(us => us.VendorSubscriptionPlans)
                .WithMany()
                .HasForeignKey("VendorSubscriptionPlanId");

            modelBuilder.Entity<VendorSubscriptionPlans>()
                .HasOne(vsp => vsp.Vendor)
                .WithMany()
                .HasForeignKey("VendorId");

        }
    }
}
