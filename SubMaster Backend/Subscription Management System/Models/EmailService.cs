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

            // Create the email message
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress("SubMaster", senderEmail));
            emailMessage.To.Add(new MailboxAddress(userName, userEmail));
            emailMessage.Subject = "Welcome to SubMaster!";

            // Create the email body with an image
            var builder = new BodyBuilder();

            // Add a text part
            builder.HtmlBody = $@"
        <html>
            <body>
                <h1>Welcome to SubMaster, {userName}!</h1>
                <p>We're thrilled to have you onboard. Here's to a seamless subscription experience!</p>
                <img src='cid:submaster-logo' alt='SubMaster Logo' width='300'/>
                <p>Best Regards,<br>SubMaster Team</p>
            </body>
        </html>";

            // Attach the image
            var imagePath = "wwwroot/images/SMSLOGORound.png"; // Update this to the actual path of your image
            var image = builder.LinkedResources.Add(imagePath);
            image.ContentId = "submaster-logo";
            image.ContentType.MediaType = "image/png";
            image.ContentType.Name = "submaster-logo.png";
            emailMessage.Body = builder.ToMessageBody();

            // Send the email
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