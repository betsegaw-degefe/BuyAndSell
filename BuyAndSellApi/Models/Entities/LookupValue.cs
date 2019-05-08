using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BuyAndSellApi.Models.Entities
{
    [Table("lookup_value")]
    public partial class LookupValue
    {
        public LookupValue()
        {
            Product = new HashSet<Product>();
        }

        [Key, Column("id")] public int Id { get; set; }
        [Column("lc_id")] public int LcId { get; set; }

        [Required]
        [Column("name")]
        [StringLength(50)]
        public string Name { get; set; }

        [Required]
        [Column("value")]
        [StringLength(50)]
        public string Value { get; set; }

        [Column("created_at")] public DateTime CreatedAt { get; set; }
        [Column("last_updated")] public DateTime LastUpdated { get; set; }
        [Column("created_by")] public short CreatedBy { get; set; }
        [Column("active"), DefaultValue("true")] public bool? Active { get; set; }

        [ForeignKey("lc_id")] public virtual LookupCategory Lc { get; set; }
        public virtual ICollection<Product> Product { get; set; }
    }
}