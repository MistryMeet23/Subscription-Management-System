using System.ComponentModel.DataAnnotations;

namespace YourNamespace.Models
{
    public class UserRole
    {
        [Key]
        public int Role_Id { get; set; }

        [StringLength(50)]
        public string Role_Name { get; set; }
    }
}
