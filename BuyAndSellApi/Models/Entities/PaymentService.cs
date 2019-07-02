using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BuyAndSellApi.Models.Entities
{
    [Table("payment_service", Schema = "finance")]
    public partial class PaymentService : BaseEntity
    {

        public PaymentService()
        {
            UserPinCode = new User();
        }
        
        [Required] public int PinCode { get; set; }
        [Required, StringLength(100)] public string Password { get; set; }
        [Required] public decimal Balance { get; set; }
        
        public virtual User UserPinCode { get; set; }
    }
}