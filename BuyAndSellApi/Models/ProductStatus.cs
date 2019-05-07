using System;
using System.Collections.Generic;

namespace BuyAndSellApi.Models
{
    public partial class ProductStatus
    {
        public ProductStatus()
        {
            Product = new HashSet<Product>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime LastUpdated { get; set; }
        public short CreatedBy { get; set; }
        public bool? Active { get; set; }

        public virtual ICollection<Product> Product { get; set; }
    }
}
