using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BuyAndSellApi.Models.Entities
{
    [Table("payment_service", Schema = "finance")]
    public class PaymentService : BaseEntity
    {
        [Required] public int PinCode { get; set; }
        [Required, StringLength(100)] public string Password { get; set; }
        [Required] public decimal Balance { get; set; }
    }
}