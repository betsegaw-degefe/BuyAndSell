using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BuyAndSellApi.Models.Entities
{
    [Table("lookup_category")]
    public partial class LookupCategory
    {
        public LookupCategory()
        {
            InverseParent = new HashSet<LookupCategory>();
            LookupValue = new HashSet<LookupValue>();
        }

        [Key, Column("id")] public int Id { get; set; }

        [Required]
        [Column("name")]
        [StringLength(50)]
        public string Name { get; set; }

        [Column("parent_id")] public int? ParentId { get; set; }
        [Column("level")] public int Level { get; set; }
        [Column("created_at")] public DateTime CreatedAt { get; set; }
        [Column("last_updated")] public DateTime LastUpdated { get; set; }
        [Column("created_by")] public short CreatedBy { get; set; }

        [Column("active"), DefaultValue("true")]
        public bool? Active { get; set; }

        [ForeignKey("parent_id")] public virtual LookupCategory Parent { get; set; }
        public virtual ICollection<LookupCategory> InverseParent { get; set; }
        public virtual ICollection<LookupValue> LookupValue { get; set; }
    }
}