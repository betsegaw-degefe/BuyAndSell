using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BuyAndSellApi.Models.Entities
{
    [Table("role")]
    public partial class Role
    {
        public Role()
        {
            UserRole = new HashSet<UserRole>();
        }

        [Key, Column("id")] public int Id { get; set; }

        [Required]
        [Column("name")]
        [StringLength(50)]
        public string Name { get; set; }

        [Column("created_at")] public DateTime CreatedAt { get; set; }
        [Column("last_updated")] public DateTime LastUpdated { get; set; }
        [Column("created_by")] public short CreatedBy { get; set; }

        [Column("active"), DefaultValue("true")]
        public bool? Active { get; set; }

        public virtual ICollection<UserRole> UserRole { get; set; }
    }
}