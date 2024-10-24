using System.ComponentModel.DataAnnotations;

namespace Subscription_Management_System.Models
{
    public class Login
    {
        [Required(ErrorMessage = "Email Can not be Empty!!!")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password Can not be Empty!!!")]
        public string Password { get; set; }
    }
}
