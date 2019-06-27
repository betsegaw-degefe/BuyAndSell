using System.ComponentModel.DataAnnotations.Schema;

namespace BuyAndSellApi.Models.Entities
{
    [Table("cart", Schema = "transaction")]
    public class Cart : BaseEntity
    {
        public int ProductId { get; set; }

        [ForeignKey("ProductId")] public virtual Product Product { get; set; }
    }
}