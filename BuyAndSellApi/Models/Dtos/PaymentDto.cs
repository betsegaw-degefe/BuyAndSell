namespace BuyAndSellApi.Models.Dtos
{
    public class PaymentDto
    {
        public int PinCode { get; set; }
        public string Password { get; set; }
        public decimal Withdraw { get; set; }
    }
}