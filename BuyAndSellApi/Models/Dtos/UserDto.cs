using System;

namespace BuyAndSellApi.Models.Dtos
{
    public class UserDto
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string MiddleName { get; set; }

        public string LastName { get; set; }

        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; }
        public int AddressId { get; set; }
        public string Email { get; set; }

        public string ProfilePicture { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }

        public bool? Active { get; set; }

        public DateTime LastOnline { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime LastUpdated { get; set; }
        
       
    }
}