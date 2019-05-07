using System;
using System.Collections.Generic;

namespace BuyAndSellApi.Models.Entities
{
    public partial class User
    {
        public User()
        {
            OrderBuyer = new HashSet<Order>();
            OrderSeller = new HashSet<Order>();
            UserRole = new HashSet<UserRole>();
        }

        public int Id { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public char? Gender { get; set; }
        public int AddressId { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string ProfilePicture { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public bool? Active { get; set; }
        public DateTime LastOnline { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime LastUpdated { get; set; }

        public virtual Address Address { get; set; }
        public virtual ICollection<Order> OrderBuyer { get; set; }
        public virtual ICollection<Order> OrderSeller { get; set; }
        public virtual ICollection<UserRole> UserRole { get; set; }
    }
}
