using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BuyAndSellApi.Models.Entities
{
    [Table("product", Schema = "commodity")]
    public partial class Product : BaseEntity
    {
        public Product()
        {
            Order = new HashSet<OrderProduct>();
            ProductAttributeValue = new HashSet<ProductAttributeValue>();
        }

        public int StatusId { get; set; }

        [Required] [StringLength(10)] public string Condition { get; set; }

        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public bool? Negotiable { get; set; }

        [StringLength(300)] public string Description { get; set; }

        [StringLength(200)] public string ImageUrl { get; set; }

        [ForeignKey("StatusId")] public virtual LookupValue Status { get; set; }
        public virtual ICollection<OrderProduct> Order { get; set; }
        public virtual ICollection<Offer> Offer { get; set; }
        public virtual ICollection<Cart> Cart { get; set; }
        public virtual ICollection<ProductAttributeValue> ProductAttributeValue { get; set; }
    }
}