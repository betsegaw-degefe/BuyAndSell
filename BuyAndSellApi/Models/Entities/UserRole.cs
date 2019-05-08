using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BuyAndSellApi.Models.Entities
{
    [Table("user_role")]
    public partial class UserRole
    {
        [Key, Column("user_id")] public int UserId { get; set; }
        [Column("role_id")] public int RoleId { get; set; }
        [Column("created_at")] public DateTime CreatedAt { get; set; }
        [Column("last_updated")] public DateTime LastUpdated { get; set; }
        [Column("created_by")] public short CreatedBy { get; set; }

        [Column("active"), DefaultValue("true")]
        public bool? Active { get; set; }

        [ForeignKey("role_id")] public virtual Role Role { get; set; }
        [ForeignKey("user_id")] public virtual User User { get; set; }
    }
}