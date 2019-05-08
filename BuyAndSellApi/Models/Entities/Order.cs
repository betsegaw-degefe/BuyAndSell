using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BuyAndSellApi.Models.Entities
{
    [Table("order")]
    public partial class Order
    {
        [Key, Column("id")] public int Id { get; set; }
        [Column("product_id")] public int ProductId { get; set; }
        [Column("buyer_id")] public int BuyerId { get; set; }
        [Column("seller_id")] public int SellerId { get; set; }
        [Column("ordered_quantity")] public int OrderedQuantity { get; set; }
        [Column("created_at")] public DateTime CreatedAt { get; set; }
        [Column("last_updated")] public DateTime LastUpdated { get; set; }
        [Column("created_by")] public short CreatedBy { get; set; }
        [Column("active"), DefaultValue("true")] public bool? Active { get; set; }

        [ForeignKey("buyer_id")] public virtual User Buyer { get; set; }
        [ForeignKey("product_id")] public virtual Product Product { get; set; }
        [ForeignKey("seller_id")] public virtual User Seller { get; set; }
    }
}