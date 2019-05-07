using System;
using System.Collections.Generic;

namespace BuyAndSellApi.Models.Entities
{
    public partial class Product
    {
        public Product()
        {
            Order = new HashSet<Order>();
            ProductAttributeValue = new HashSet<ProductAttributeValue>();
        }

        public int Id { get; set; }
        public int StatusId { get; set; }
        public string Condition { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public bool? Negotiable { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime LastUpdated { get; set; }
        public short CreatedBy { get; set; }
        public bool? Active { get; set; }
        public string Description { get; set; }

        public virtual LookupValue Status { get; set; }
        public virtual ICollection<Order> Order { get; set; }
        public virtual ICollection<ProductAttributeValue> ProductAttributeValue { get; set; }
    }
}
