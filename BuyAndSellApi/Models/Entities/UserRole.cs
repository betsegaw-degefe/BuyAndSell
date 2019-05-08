using System;
using System.Collections.Generic;

namespace BuyAndSellApi.Models.Entities
{
    public partial class UserRole
    {
        public int UserId { get; set; }
        public int RoleId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime LastUpdated { get; set; }
        public short CreatedBy { get; set; }
        public bool? Active { get; set; }

        public virtual Role Role { get; set; }
        public virtual User User { get; set; }
    }
}
