using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BuyAndSellApi.Models.Entities
{
    [Table("user")]
    public partial class User
    {
        public User()
        {
            OrderBuyer = new HashSet<Order>();
            OrderSeller = new HashSet<Order>();
            UserRole = new HashSet<UserRole>();
        }

        [Key, Column("id")] public int Id { get; set; }

        [Required, Column("first_name"), StringLength(45)]
        public string FirstName { get; set; }

        [Column("middle_name"), StringLength(45)]
        public string MiddleName { get; set; }

        [Column("last_name"), StringLength(45)]
        public string LastName { get; set; }

        [Column("date_of_birth")] public DateTime DateOfBirth { get; set; }
        [Column("gender")] public char? Gender { get; set; }
        [Column("address_id")] public int AddressId { get; set; }
        [Column("phone_number"), StringLength(15)] public string PhoneNumber { get; set; }
        [Column("email"), StringLength(50)] public string Email { get; set; }
        [Required, Column("profile_picture"), StringLength(75)] public string ProfilePicture { get; set; }
        [Required, Column("user_name"), StringLength(50)] public string UserName { get; set; }
        [Required, Column("password"), StringLength(100)] public string Password { get; set; }

        [Column("active"), DefaultValue("true")]
        public bool? Active { get; set; }

        [Column("last_online")] public DateTime LastOnline { get; set; }
        [Column("created_at")] public DateTime CreatedAt { get; set; }
        [Column("last_updated")] public DateTime LastUpdated { get; set; }

        [ForeignKey("AddressId")] public virtual Address Address { get; set; }
        public virtual ICollection<Order> OrderBuyer { get; set; }
        public virtual ICollection<Order> OrderSeller { get; set; }
        public virtual ICollection<UserRole> UserRole { get; set; }
    }
}