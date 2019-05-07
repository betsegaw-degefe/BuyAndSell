using System;
using System.Collections.Generic;

namespace BuyAndSellApi.Models
{
    public partial class ProductAttributeValue
    {
        public int Id { get; set; }
        public int PaId { get; set; }
        public string Value { get; set; }
        public DateTime LastUpdated { get; set; }
        public bool? Active { get; set; }
        public int PId { get; set; }

        public virtual Product P { get; set; }
        public virtual ProductAttribute Pa { get; set; }
    }
}
