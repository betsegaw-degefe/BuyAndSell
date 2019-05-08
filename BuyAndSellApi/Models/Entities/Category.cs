using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BuyAndSellApi.Models.Entities
{
    [Table("category")]
    public partial class Category
    {
        public Category()
        {
            InverseParent = new HashSet<Category>();
            ProductAttribute = new HashSet<ProductAttribute>();
        }

        [Key, Column("id")] public int Id { get; set; }

        [Required]
        [Column("name")]
        [StringLength(75)]
        public string Name { get; set; }

        [Column("parent_id")] public int? ParentId { get; set; }
        [Column("level")] public int Level { get; set; }
        [Column("created_at")] public DateTime CreatedAt { get; set; }
        [Column("last_updated_by")] public DateTime LastUpdated { get; set; }
        [Column("created_by")] public short CreatedBy { get; set; }
        [Column("updated_by")] public short UpdatedBy { get; set; }
        [Column("active"), DefaultValue("true")] public bool? Active { get; set; }

        [ForeignKey("parent_id")] public virtual Category Parent { get; set; }
        public virtual ICollection<Category> InverseParent { get; set; }
        public virtual ICollection<ProductAttribute> ProductAttribute { get; set; }
    }
}