using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Subscription_Management_System.Migrations
{
    /// <inheritdoc />
    public partial class InitialDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Role_Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Role_Name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Role_Id);
                });

            migrationBuilder.CreateTable(
                name: "UserAccounts",
                columns: table => new
                {
                    User_Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FirstName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    LastName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Email = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Password_Hash = table.Column<string>(type: "text", nullable: false),
                    Role_Id = table.Column<int>(type: "integer", nullable: false),
                    Phone_Number = table.Column<string>(type: "text", nullable: true),
                    Address = table.Column<string>(type: "text", nullable: true),
                    Profile_Picture_Url = table.Column<string>(type: "text", nullable: true),
                    Date_Of_Birth = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Status = table.Column<string>(type: "text", nullable: false),
                    Created_At = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Updated_At = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserAccounts", x => x.User_Id);
                    table.ForeignKey(
                        name: "FK_UserAccounts_Roles_Role_Id",
                        column: x => x.Role_Id,
                        principalTable: "Roles",
                        principalColumn: "Role_Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Notifications",
                columns: table => new
                {
                    Notification_Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    User_Id = table.Column<int>(type: "integer", nullable: false),
                    Notification_Type = table.Column<string>(type: "text", nullable: false),
                    Message = table.Column<string>(type: "text", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: false),
                    Created_At = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Sent_At = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Subject = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    Is_Email = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notifications", x => x.Notification_Id);
                    table.ForeignKey(
                        name: "FK_Notifications_UserAccounts_User_Id",
                        column: x => x.User_Id,
                        principalTable: "UserAccounts",
                        principalColumn: "User_Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "VendorProfiles",
                columns: table => new
                {
                    Vendor_Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    User_Id = table.Column<int>(type: "integer", nullable: false),
                    Business_Name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    Business_Description = table.Column<string>(type: "text", nullable: true),
                    Business_Address = table.Column<string>(type: "text", nullable: true),
                    Phone_Number = table.Column<string>(type: "text", nullable: true),
                    Tax_Id = table.Column<string>(type: "text", nullable: true),
                    Website_Url = table.Column<string>(type: "text", nullable: true),
                    Social_Media_Links = table.Column<string>(type: "text", nullable: true),
                    Logo_Url = table.Column<string>(type: "text", nullable: true),
                    Created_At = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Updated_At = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VendorProfiles", x => x.Vendor_Id);
                    table.ForeignKey(
                        name: "FK_VendorProfiles_UserAccounts_User_Id",
                        column: x => x.User_Id,
                        principalTable: "UserAccounts",
                        principalColumn: "User_Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Feedbacks",
                columns: table => new
                {
                    Feedback_Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    User_Id = table.Column<int>(type: "integer", nullable: false),
                    Vendor_Id = table.Column<int>(type: "integer", nullable: false),
                    Rating = table.Column<int>(type: "integer", nullable: false),
                    Comments = table.Column<string>(type: "text", nullable: true),
                    Submitted_At = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Feedbacks", x => x.Feedback_Id);
                    table.ForeignKey(
                        name: "FK_Feedbacks_UserAccounts_User_Id",
                        column: x => x.User_Id,
                        principalTable: "UserAccounts",
                        principalColumn: "User_Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Feedbacks_VendorProfiles_Vendor_Id",
                        column: x => x.Vendor_Id,
                        principalTable: "VendorProfiles",
                        principalColumn: "Vendor_Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SubscriptionPlans",
                columns: table => new
                {
                    Plan_Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Vendor_Id = table.Column<int>(type: "integer", nullable: false),
                    Plan_Name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Price = table.Column<decimal>(type: "numeric", nullable: false),
                    Duration_In_Days = table.Column<int>(type: "integer", nullable: false),
                    Features = table.Column<string>(type: "text", nullable: true),
                    Is_Active = table.Column<bool>(type: "boolean", nullable: false),
                    Created_At = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Updated_At = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubscriptionPlans", x => x.Plan_Id);
                    table.ForeignKey(
                        name: "FK_SubscriptionPlans_VendorProfiles_Vendor_Id",
                        column: x => x.Vendor_Id,
                        principalTable: "VendorProfiles",
                        principalColumn: "Vendor_Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CustomerSubscriptions",
                columns: table => new
                {
                    Subscription_Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    User_Id = table.Column<int>(type: "integer", nullable: false),
                    Plan_Id = table.Column<int>(type: "integer", nullable: false),
                    Start_Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    End_Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: false),
                    Payment_Status = table.Column<string>(type: "text", nullable: false),
                    Payment_Method = table.Column<string>(type: "text", nullable: false),
                    Discount_Applied = table.Column<decimal>(type: "numeric", nullable: true),
                    Created_At = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Updated_At = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomerSubscriptions", x => x.Subscription_Id);
                    table.ForeignKey(
                        name: "FK_CustomerSubscriptions_SubscriptionPlans_Plan_Id",
                        column: x => x.Plan_Id,
                        principalTable: "SubscriptionPlans",
                        principalColumn: "Plan_Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CustomerSubscriptions_UserAccounts_User_Id",
                        column: x => x.User_Id,
                        principalTable: "UserAccounts",
                        principalColumn: "User_Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Payments",
                columns: table => new
                {
                    Payment_Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    User_Id = table.Column<int>(type: "integer", nullable: false),
                    Plan_Id = table.Column<int>(type: "integer", nullable: false),
                    Amount = table.Column<decimal>(type: "numeric", nullable: false),
                    Payment_Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Payment_Method = table.Column<string>(type: "text", nullable: false),
                    Transaction_Id = table.Column<string>(type: "text", nullable: false),
                    Payment_Status = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Payments", x => x.Payment_Id);
                    table.ForeignKey(
                        name: "FK_Payments_SubscriptionPlans_Plan_Id",
                        column: x => x.Plan_Id,
                        principalTable: "SubscriptionPlans",
                        principalColumn: "Plan_Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Payments_UserAccounts_User_Id",
                        column: x => x.User_Id,
                        principalTable: "UserAccounts",
                        principalColumn: "User_Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Promotions",
                columns: table => new
                {
                    Promotion_Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Promotion_Code = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Discount_Percentage = table.Column<decimal>(type: "numeric", nullable: false),
                    Start_Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    End_Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Usage_Limit = table.Column<int>(type: "integer", nullable: false),
                    Plan_Id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Promotions", x => x.Promotion_Id);
                    table.ForeignKey(
                        name: "FK_Promotions_SubscriptionPlans_Plan_Id",
                        column: x => x.Plan_Id,
                        principalTable: "SubscriptionPlans",
                        principalColumn: "Plan_Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SubscriptionHistories",
                columns: table => new
                {
                    History_Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Plan_Id = table.Column<int>(type: "integer", nullable: false),
                    Change_Type = table.Column<string>(type: "text", nullable: false),
                    Old_Value = table.Column<string>(type: "text", nullable: true),
                    New_Value = table.Column<string>(type: "text", nullable: true),
                    Changed_At = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubscriptionHistories", x => x.History_Id);
                    table.ForeignKey(
                        name: "FK_SubscriptionHistories_SubscriptionPlans_Plan_Id",
                        column: x => x.Plan_Id,
                        principalTable: "SubscriptionPlans",
                        principalColumn: "Plan_Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Invoices",
                columns: table => new
                {
                    Invoice_Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Payment_Id = table.Column<int>(type: "integer", nullable: false),
                    Invoice_Number = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Issue_Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Due_Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Total_Amount = table.Column<decimal>(type: "numeric", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Invoices", x => x.Invoice_Id);
                    table.ForeignKey(
                        name: "FK_Invoices_Payments_Payment_Id",
                        column: x => x.Payment_Id,
                        principalTable: "Payments",
                        principalColumn: "Payment_Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CustomerSubscriptions_Plan_Id",
                table: "CustomerSubscriptions",
                column: "Plan_Id");

            migrationBuilder.CreateIndex(
                name: "IX_CustomerSubscriptions_User_Id",
                table: "CustomerSubscriptions",
                column: "User_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Feedbacks_User_Id",
                table: "Feedbacks",
                column: "User_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Feedbacks_Vendor_Id",
                table: "Feedbacks",
                column: "Vendor_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Invoices_Payment_Id",
                table: "Invoices",
                column: "Payment_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_User_Id",
                table: "Notifications",
                column: "User_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_Plan_Id",
                table: "Payments",
                column: "Plan_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_User_Id",
                table: "Payments",
                column: "User_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Promotions_Plan_Id",
                table: "Promotions",
                column: "Plan_Id");

            migrationBuilder.CreateIndex(
                name: "IX_SubscriptionHistories_Plan_Id",
                table: "SubscriptionHistories",
                column: "Plan_Id");

            migrationBuilder.CreateIndex(
                name: "IX_SubscriptionPlans_Vendor_Id",
                table: "SubscriptionPlans",
                column: "Vendor_Id");

            migrationBuilder.CreateIndex(
                name: "IX_UserAccounts_Role_Id",
                table: "UserAccounts",
                column: "Role_Id");

            migrationBuilder.CreateIndex(
                name: "IX_VendorProfiles_User_Id",
                table: "VendorProfiles",
                column: "User_Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CustomerSubscriptions");

            migrationBuilder.DropTable(
                name: "Feedbacks");

            migrationBuilder.DropTable(
                name: "Invoices");

            migrationBuilder.DropTable(
                name: "Notifications");

            migrationBuilder.DropTable(
                name: "Promotions");

            migrationBuilder.DropTable(
                name: "SubscriptionHistories");

            migrationBuilder.DropTable(
                name: "Payments");

            migrationBuilder.DropTable(
                name: "SubscriptionPlans");

            migrationBuilder.DropTable(
                name: "VendorProfiles");

            migrationBuilder.DropTable(
                name: "UserAccounts");

            migrationBuilder.DropTable(
                name: "Roles");
        }
    }
}
