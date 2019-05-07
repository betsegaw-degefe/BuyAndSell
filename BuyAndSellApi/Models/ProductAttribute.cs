using System;
using System.Collections.Generic;

namespace BuyAndSellApi.Models
{
    public partial class ProductAttribute
    {
        public ProductAttribute()
        {
            ProductAttributeValue = new HashSet<ProductAttributeValue>();
        }

        public int Id { get; set; }
        public int CId { get; set; }
        public string Name { get; set; }
        public string DataType { get; set; }
        public string Unit { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime LastUpdated { get; set; }
        public short CreatedBy { get; set; }
        public short LastUpdatedBy { get; set; }
        public bool? Active { get; set; }

        public virtual Category C { get; set; }
        public virtual ICollection<ProductAttributeValue> ProductAttributeValue { get; set; }
    }
}
