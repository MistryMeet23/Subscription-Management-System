using MailKit.Net.Smtp;
using MimeKit;

namespace Subscription_Management_System.Models
{
    public class EmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendWelcomeEmail(string userEmail, string userName)
        {
            var emailSettings = _configuration.GetSection("EmailSettings");
            var smtpServer = emailSettings.GetValue<string>("SmtpServer");
            var smtpPort = emailSettings.GetValue<int>("SmtpPort");
            var senderEmail = emailSettings.GetValue<string>("SenderEmail");
            var senderPassword = emailSettings.GetValue<string>("SenderPassword");

            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress("Your App", senderEmail));
            emailMessage.To.Add(new MailboxAddress(userName, userEmail));
            emailMessage.Subject = "Welcome to Our Service!";
            emailMessage.Body = new TextPart("plain")
            {
                Text = $"Hi {userName},\n\nWelcome to our SubMaster! We're excited to have you on board.\n\nBest Regards,\nSubMaster"
            };

            using (var smtpClient = new SmtpClient())
            {
                await smtpClient.ConnectAsync(smtpServer, smtpPort, MailKit.Security.SecureSocketOptions.StartTls);
                await smtpClient.AuthenticateAsync(senderEmail, senderPassword);
                await smtpClient.SendAsync(emailMessage);
                await smtpClient.DisconnectAsync(true);
            }
        }
    }
}