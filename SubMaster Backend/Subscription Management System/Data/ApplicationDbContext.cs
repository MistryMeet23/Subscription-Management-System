using Microsoft.EntityFrameworkCore;
using System.Data;
using YourNamespace.Models;

namespace YourNamespace.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        // Define DbSets for all models
        public DbSet<UserAccount> UserAccounts { get; set; }
        public DbSet<UserRole> Roles { get; set; }
        public DbSet<VendorProfile> VendorProfiles { get; set; }
        public DbSet<SubscriptionPlan> SubscriptionPlans { get; set; }
        public DbSet<CustomerSubscription> CustomerSubscriptions { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<Promotion> Promotions { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<SubscriptionHistory> SubscriptionHistories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // UserAccount Model
            modelBuilder.Entity<UserAccount>(entity =>
            {
                entity.HasKey(u => u.User_Id);
                entity.Property(u => u.FirstName).IsRequired();
                entity.Property(u => u.LastName).IsRequired();
                entity.Property(u => u.Email).IsRequired();
                entity.HasOne(u => u.Role)
                    .WithMany()
                    .HasForeignKey(u => u.Role_Id)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // Role Model
            modelBuilder.Entity<UserRole>(entity =>
            {
                entity.HasKey(r => r.Role_Id);
                entity.Property(r => r.Role_Name).IsRequired();
            });

            // VendorProfile Model
            modelBuilder.Entity<VendorProfile>(entity =>
            {
                entity.HasKey(v => v.Vendor_Id);
                entity.HasOne(v => v.UserAccount)
                    .WithMany()
                    .HasForeignKey(v => v.User_Id)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // SubscriptionPlan Model
            modelBuilder.Entity<SubscriptionPlan>(entity =>
            {
                entity.HasKey(sp => sp.Plan_Id);
                entity.HasOne(sp => sp.VendorProfile)
                    .WithMany()
                    .HasForeignKey(sp => sp.Vendor_Id)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // CustomerSubscription Model
            modelBuilder.Entity<CustomerSubscription>(entity =>
            {
                entity.HasKey(cs => cs.Subscription_Id);
                entity.HasOne(cs => cs.UserAccount)
                    .WithMany()
                    .HasForeignKey(cs => cs.User_Id)
                    .OnDelete(DeleteBehavior.Cascade);
                entity.HasOne(cs => cs.SubscriptionPlan)
                    .WithMany()
                    .HasForeignKey(cs => cs.Plan_Id)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // Notification Model
            modelBuilder.Entity<Notification>(entity =>
            {
                entity.HasKey(n => n.Notification_Id);
                entity.HasOne(n => n.UserAccount)
                    .WithMany()
                    .HasForeignKey(n => n.User_Id)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // Payment Model
            modelBuilder.Entity<Payment>(entity =>
            {
                entity.HasKey(p => p.Payment_Id);
                entity.HasOne(p => p.UserAccount)
                    .WithMany()
                    .HasForeignKey(p => p.User_Id)
                    .OnDelete(DeleteBehavior.Cascade);
                entity.HasOne(p => p.SubscriptionPlan)
                    .WithMany()
                    .HasForeignKey(p => p.Plan_Id)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // Invoice Model
            modelBuilder.Entity<Invoice>(entity =>
            {
                entity.HasKey(i => i.Invoice_Id);
                entity.HasOne(i => i.Payment)
                    .WithMany()
                    .HasForeignKey(i => i.Payment_Id)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // Promotion Model
            modelBuilder.Entity<Promotion>(entity =>
            {
                entity.HasKey(pr => pr.Promotion_Id);
                entity.HasOne(pr => pr.SubscriptionPlan)
                    .WithMany()
                    .HasForeignKey(pr => pr.Plan_Id)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // Feedback Model
            modelBuilder.Entity<Feedback>(entity =>
            {
                entity.HasKey(fb => fb.Feedback_Id);
                entity.HasOne(fb => fb.UserAccount)
                    .WithMany()
                    .HasForeignKey(fb => fb.User_Id)
                    .OnDelete(DeleteBehavior.Cascade);
                entity.HasOne(fb => fb.VendorProfile)
                    .WithMany()
                    .HasForeignKey(fb => fb.Vendor_Id)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // SubscriptionHistory Model
            modelBuilder.Entity<SubscriptionHistory>(entity =>
            {
                entity.HasKey(sh => sh.History_Id);
                entity.HasOne(sh => sh.SubscriptionPlan)
                    .WithMany()
                    .HasForeignKey(sh => sh.Plan_Id)
                    .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}
