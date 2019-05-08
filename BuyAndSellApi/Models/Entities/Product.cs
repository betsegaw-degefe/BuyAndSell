using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BuyAndSellApi.Models.Entities
{
    [Table("product")]
    public partial class Product
    {
        public Product()
        {
            Order = new HashSet<Order>();
            ProductAttributeValue = new HashSet<ProductAttributeValue>();
        }

        [Key, Column("id")] public int Id { get; set; }
        [Column("status_id")] public int StatusId { get; set; }

        [Required]
        [Column("condition")]
        [StringLength(10)]
        public string Condition { get; set; }

        [Column("quantity")] public int Quantity { get; set; }
        [Column("price")] public decimal Price { get; set; }
        [Column("negotiable")] public bool? Negotiable { get; set; }
        [Column("created_at")] public DateTime CreatedAt { get; set; }
        [Column("last_updated")] public DateTime LastUpdated { get; set; }
        [Column("created_by")] public short CreatedBy { get; set; }
        [Column("active"), DefaultValue("true")] public bool? Active { get; set; }
        [Column("description"), StringLength(300)] public string Description { get; set; }

        [ForeignKey("status_id")] public virtual LookupValue Status { get; set; }
        public virtual ICollection<Order> Order { get; set; }
        public virtual ICollection<ProductAttributeValue> ProductAttributeValue { get; set; }
    }
}