using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BuyAndSellApi.Models.Entities
{
    [Table("offer", Schema = "transaction")]
    public class Offer : BaseEntity
    {
        public int ProductId { get; set; }
        public decimal OfferPrice { get; set; }
        public int OrderedQuantity { get; set; }


        [StringLength(50)] public string Status { get; set; }

        [ForeignKey("ProductId")] public virtual Product Product { get; set; }
    }
}