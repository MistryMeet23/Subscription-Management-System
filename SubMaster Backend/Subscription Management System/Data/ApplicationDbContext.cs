using Microsoft.EntityFrameworkCore;
using Subscription_Management_System.Model;
public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<UserRole> UserRoles { get; set; }
    public DbSet<Feedback> Feedbacks { get; set; }
    public DbSet<Invoice> Invoices { get; set; }
    public DbSet<Notification> Notifications { get; set; }
    public DbSet<Payments> Payments { get; set; }
    public DbSet<Promotions> Promotions { get; set; }
    public DbSet<SubscriptionHistory> SubscriptionHistories { get; set; }
    public DbSet<UserSubscriptions> UserSubscriptions { get; set; }
    public DbSet<Vendor> Vendors { get; set; }
    public DbSet<VendorSubscriptionPlans> VendorSubscriptionPlans { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Configure User
        modelBuilder.Entity<User>()
            .HasKey(u => u.UserId);

        modelBuilder.Entity<User>()
            .Property(u => u.FirstName)
            .IsRequired()
            .HasMaxLength(100);

        modelBuilder.Entity<User>()
            .Property(u => u.LastName)
            .IsRequired()
            .HasMaxLength(100);

        modelBuilder.Entity<User>()
            .Property(u => u.Email)
            .IsRequired()
            .HasMaxLength(100);

        modelBuilder.Entity<User>()
            .Property(u => u.Password)
            .IsRequired()
            .HasMaxLength(255);

        modelBuilder.Entity<User>()
            .HasOne(u => u.UserRole)
            .WithMany(ur => ur.Users)
            .HasForeignKey(u => u.UserRoleId); // Ensure this points to UserRoleId

        // Configure UserRole
        modelBuilder.Entity<UserRole>()
            .HasKey(ur => ur.UserRoleId);

        modelBuilder.Entity<UserRole>()
            .Property(ur => ur.RoleName)
            .IsRequired();

        // Configure Feedback
        modelBuilder.Entity<Feedback>()
            .HasKey(f => f.FeedbackId);

        modelBuilder.Entity<Feedback>()
            .Property(f => f.FeedbackText)
            .IsRequired();

        modelBuilder.Entity<Feedback>()
            .Property(f => f.Rating)
            .IsRequired();

        modelBuilder.Entity<Feedback>()
            .HasOne(f => f.User)
            .WithMany()
            .HasForeignKey(f => f.UserId);

        modelBuilder.Entity<Feedback>()
            .HasOne(f => f.VendorSubscriptionPlans)
            .WithMany()
            .HasForeignKey(f => f.VendorSubscriptionPlanId);

        // Configure Invoice
        modelBuilder.Entity<Invoice>()
            .HasKey(i => i.InvoiceId);

        modelBuilder.Entity<Invoice>()
            .Property(i => i.InvoiceNumber)
            .IsRequired();

        modelBuilder.Entity<Invoice>()
            .HasOne(i => i.Payments)
            .WithMany()
            .HasForeignKey(i => i.PaymentId);

        // Configure Notification
        modelBuilder.Entity<Notification>()
            .HasKey(n => n.NotificationId);

        modelBuilder.Entity<Notification>()
            .Property(n => n.Message)
            .IsRequired();

        modelBuilder.Entity<Notification>()
            .HasOne(n => n.User)
            .WithMany()
            .HasForeignKey(n => n.UserId);

        // Configure Payments
        modelBuilder.Entity<Payments>()
            .HasKey(p => p.PaymentId);

        modelBuilder.Entity<Payments>()
            .Property(p => p.Amount)
            .IsRequired();

        modelBuilder.Entity<Payments>()
            .HasOne(p => p.User)
            .WithMany()
            .HasForeignKey(p => p.UserId);

        modelBuilder.Entity<Payments>()
            .HasOne(p => p.VendorSubscriptionPlans)
            .WithMany()
            .HasForeignKey(p => p.VendorSubscriptionPlanId);

        // Configure Promotions
        modelBuilder.Entity<Promotions>()
            .HasKey(pr => pr.PromotionId);

        modelBuilder.Entity<Promotions>()
            .Property(pr => pr.PromotionCode)
            .IsRequired();

        modelBuilder.Entity<Promotions>()
            .Property(pr => pr.Discount)
            .IsRequired();

        modelBuilder.Entity<Promotions>()
            .HasOne(pr => pr.VendorSubscriptionPlans)
            .WithMany()
            .HasForeignKey(pr => pr.VendorSubscriptionPlanId);

        // Configure SubscriptionHistory
        modelBuilder.Entity<SubscriptionHistory>()
            .HasKey(sh => sh.HistoryId);

        modelBuilder.Entity<SubscriptionHistory>()
            .Property(sh => sh.ChangeType)
            .IsRequired();

        modelBuilder.Entity<SubscriptionHistory>()
            .HasOne(sh => sh.VendorSubscriptionPlans)
            .WithMany()
            .HasForeignKey(sh => sh.VendorSubscriptionPlanId);

        // Configure UserSubscriptions
        modelBuilder.Entity<UserSubscriptions>()
            .HasKey(us => us.SubscriptionId);

        modelBuilder.Entity<UserSubscriptions>()
            .HasOne(us => us.User)
            .WithMany()
            .HasForeignKey(us => us.UserId);

        modelBuilder.Entity<UserSubscriptions>()
            .HasOne(us => us.VendorSubscriptionPlans)
            .WithMany()
            .HasForeignKey(us => us.VendorSubscriptionPlanId);

        // Configure Vendor
        modelBuilder.Entity<Vendor>()
            .HasKey(v => v.VendorId);

        modelBuilder.Entity<Vendor>()
            .Property(v => v.BusinessName)
            .IsRequired()
            .HasMaxLength(100);

        modelBuilder.Entity<Vendor>()
            .HasOne(v => v.UserRoles)
            .WithMany()
            .HasForeignKey(v => v.UserRoleId);

        // Configure VendorSubscriptionPlans
        modelBuilder.Entity<VendorSubscriptionPlans>()
            .HasKey(vsp => vsp.PlanId);

        modelBuilder.Entity<VendorSubscriptionPlans>()
            .HasOne(vsp => vsp.Vendor)
            .WithMany()
            .HasForeignKey(vsp => vsp.VendorId);
    }
}
