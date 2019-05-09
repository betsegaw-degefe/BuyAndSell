using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BuyAndSellApi.Models.Entities
{
    [Table("user_role", Schema = "account")]
    public partial class UserRole
    {
        public int UserId { get; set; }
        public int RoleId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime LastUpdated { get; set; }
        public short CreatedBy { get; set; }

        [Required, DefaultValue("true")] public bool? Active { get; set; }

        [ForeignKey("RoleId")] public virtual Role Role { get; set; }
        [ForeignKey("UserId")] public virtual User User { get; set; }
    }
}