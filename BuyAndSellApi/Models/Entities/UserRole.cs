using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BuyAndSellApi.Models.Entities
{
    [Table("user_role", Schema = "account")]
    public partial class UserRole : BaseEntity
    {
        [Key] public int UserId { get; set; }
        [Key] public int RoleId { get; set; }


        [ForeignKey("RoleId")] public virtual Role Role { get; set; }
        [ForeignKey("UserId")] public virtual User User { get; set; }
    }
}