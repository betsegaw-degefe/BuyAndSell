using BuyAndSellApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace BuyAndSellApi.Controllers.user
{
    [Route("/user/[Controller]")]
    [ApiController]
    public class LoginController : Controller
    {
        private readonly buyandsellContext _context;

        public LoginController(buyandsellContext context)
        {
            _context = context;
        }

       
    }
}