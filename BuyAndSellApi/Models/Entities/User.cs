using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BuyAndSellApi.Models.Entities
{
    [Table("user", Schema = "account")]
    public partial class User : BaseEntity
    {
        public User()
        {
            OrderBuyer = new HashSet<OrderProduct>();
            OrderSeller = new HashSet<OrderProduct>();
            UserRole = new HashSet<UserRole>();
        }


        [Required, StringLength(45)] public string FirstName { get; set; }

        [StringLength(45)] public string MiddleName { get; set; }

        [StringLength(45)] public string LastName { get; set; }

        public DateTime DateOfBirth { get; set; }
        public char? Gender { get; set; }
        public int AddressId { get; set; }
        [StringLength(50)] public string Email { get; set; }

        [Required, StringLength(75)] public string ProfilePicture { get; set; }

        [Required, StringLength(50)] public string UserName { get; set; }

        [Required, StringLength(100)] public string Password { get; set; }


        public DateTime LastOnline { get; set; }

        [ForeignKey("AddressId")] public virtual Address Address { get; set; }
        public virtual ICollection<OrderProduct> OrderBuyer { get; set; }
        public virtual ICollection<OrderProduct> OrderSeller { get; set; }
        public virtual ICollection<UserRole> UserRole { get; set; }
    }
}