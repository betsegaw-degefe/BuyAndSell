using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BuyAndSellApi.Models.Entities
{
    [Table("product_attribute_value", Schema = "commodity")]
    public partial class ProductAttributeValue : BaseEntity
    {
        public int ProductAttributeId { get; set; }

        [Required] [StringLength(250)] public string Value { get; set; }

        public int ProductId { get; set; }

        [ForeignKey("ProductId")] public virtual Product Product { get; set; }
        [ForeignKey("ProductAttributeId")] public virtual ProductAttribute ProductAttribute { get; set; }
    }
}