using System;

namespace BuyAndSellApi.Models.Entities
{
    public partial class Order
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int BuyerId { get; set; }
        public int SellerId { get; set; }
        public int OrderedQuantity { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime LastUpdated { get; set; }
        public short CreatedBy { get; set; }
        public bool? Active { get; set; }

        public virtual User Buyer { get; set; }
        public virtual Product Product { get; set; }
        public virtual User Seller { get; set; }
    }
}
