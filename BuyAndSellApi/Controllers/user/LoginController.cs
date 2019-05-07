using BuyAndSellApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace BuyAndSellApi.Controllers.user
{
    [Route("/user/login")]
    [ApiController]
    public class UserLoginController : ControllerBase
    {
        private readonly buyandsellContext _context;

        public UserLoginController(buyandsellContext context)
        {
            _context = context;
        }

       
    }
}