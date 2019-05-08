using System;
using System.Collections.Generic;

namespace BuyAndSellApi.Models.Entities
{
    public partial class ProductAttributeValue
    {
        public int Id { get; set; }
        public int ProductAttributeId { get; set; }
        public string Value { get; set; }
        public DateTime LastUpdated { get; set; }
        public bool? Active { get; set; }
        public int ProductId { get; set; }

        public virtual Product Product { get; set; }
        public virtual ProductAttribute ProductAttribute { get; set; }
    }
}
