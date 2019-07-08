using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BuyAndSellApi.Models.Entities {
    [Table ("order_product", Schema = "transaction")]
    public partial class OrderProduct : BaseEntity {
        public int ProductId { get; set; }
        public int BuyerId { get; set; }
        public int SellerId { get; set; }
        public int OrderedQuantity { get; set; }

        [StringLength (20)] public string Contact { get; set; }

        [ForeignKey ("BuyerId")] public virtual User Buyer { get; set; }

        [ForeignKey ("ProductId")] public virtual Product Product { get; set; }

        [ForeignKey ("SellerId")] public virtual User Seller { get; set; }
    }
}