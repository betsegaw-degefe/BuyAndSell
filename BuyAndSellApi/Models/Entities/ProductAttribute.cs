using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BuyAndSellApi.Models.Entities
{
    [Table("product_attribute", Schema = "commodity")]
    public partial class ProductAttribute : BaseEntity
    {
        public ProductAttribute()
        {
            ProductAttributeValue = new HashSet<ProductAttributeValue>();
        }

        public int CategoryId { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [Required]
        [StringLength(50)]
        public string DataType { get; set; }

        [StringLength(25)] public string Unit { get; set; }
        public short LastUpdatedBy { get; set; }


        [ForeignKey("CategoryId")] public virtual Category Category { get; set; }
        public virtual ICollection<ProductAttributeValue> ProductAttributeValue { get; set; }
    }
}