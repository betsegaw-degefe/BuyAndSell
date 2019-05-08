using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BuyAndSellApi.Models.Entities
{
    [Table("product_attribute")]
    public partial class ProductAttribute
    {
        public ProductAttribute()
        {
            ProductAttributeValue = new HashSet<ProductAttributeValue>();
        }

        [Key, Column("id")] public int Id { get; set; }
        [Column("category_id")] public int CategoryId { get; set; }

        [Required]
        [Column("name")]
        [StringLength(50)]
        public string Name { get; set; }

        [Required]
        [Column("data_type")]
        [StringLength(50)]
        public string DataType { get; set; }

        [Column("unit"), StringLength(25)] public string Unit { get; set; }
        [Column("created_at")] public DateTime CreatedAt { get; set; }
        [Column("last_updated")] public DateTime LastUpdated { get; set; }
        [Column("created_by")] public short CreatedBy { get; set; }
        [Column("last_updated_by")] public short LastUpdatedBy { get; set; }
        [Column("active"), DefaultValue("true")] public bool? Active { get; set; }

        [ForeignKey("category_id")] public virtual Category Category { get; set; }
        public virtual ICollection<ProductAttributeValue> ProductAttributeValue { get; set; }
    }
}