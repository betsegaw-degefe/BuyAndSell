using Microsoft.AspNetCore.Mvc;

namespace BuyAndSellApi.Controllers
{
    public class ProductAttributeController : Controller
    {
        // GET
        public IActionResult Index()
        {
            return
            View();
        }
    }
}