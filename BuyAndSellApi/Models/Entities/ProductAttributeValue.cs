using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BuyAndSellApi.Models.Entities
{
    [Table("product_attribute_value")]
    public partial class ProductAttributeValue
    {
        [Key, Column("id")] public int Id { get; set; }
        [Column("product_attribute_id")] public int ProductAttributeId { get; set; }

        [Required]
        [Column("value")]
        [StringLength(250)]
        public string Value { get; set; }

        [Column("last_updated")] public DateTime LastUpdated { get; set; }

        [Column("active"), DefaultValue("true")]
        public bool? Active { get; set; }

        [Column("product_id")] public int ProductId { get; set; }

        [ForeignKey("product_id")] public virtual Product Product { get; set; }
        [ForeignKey("product_attribute_id")] public virtual ProductAttribute ProductAttribute { get; set; }
    }
}