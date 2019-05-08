using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace BuyAndSellApi.Models.Entities
{
    [Table("address")]
    public partial class Address
    {
        public Address()
        {
            InverseParent = new HashSet<Address>();
            User = new HashSet<User>();
        }

        [Key, Column("id")] public int Id { get; set; }

        [Required]
        [Column("name")]
        [StringLength(50)]
        public string Name { get; set; }

        [Column("parent_id")] public int ParentId { get; set; }

        [Column("level")] public int Level { get; set; }
        [Column("created_at")] public DateTime CreatedAt { get; set; }
        [Column("last_updated")] public DateTime LastUpdated { get; set; }
        [Column("created_by")] public short CreatedBy { get; set; }
        [Column("last_updated_by")] public short LastUpdatedBy { get; set; }
        [Column("active")] public bool? Active { get; set; }

        [ForeignKey("ParentId")] public virtual Address Parent { get; set; }
        public virtual ICollection<Address> InverseParent { get; set; }
        public virtual ICollection<User> User { get; set; }
    }
}