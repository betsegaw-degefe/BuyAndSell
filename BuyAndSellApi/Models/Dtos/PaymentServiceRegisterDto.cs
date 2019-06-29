namespace BuyAndSellApi.Models.Dtos
{
    public class PaymentServiceRegisterDto
    {
        public int PinCode { get; set; }

        public string Password { get; set; }
        public decimal Balance { get; set; }
        public string Active { get; set; }
    }
}