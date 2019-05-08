using System.Collections;
using System.Collections.Generic;
using BuyAndSellApi.Models.Entities;
using BuyAndSellApi.Models.Repository;
using Microsoft.AspNetCore.Mvc;

namespace BuyAndSellApi.Controllers.user
{
    [Route("user/[Controller]")]
    [ApiController]
    [Produces("application/json")]
    public class LoginController : ControllerBase
    {
        private readonly IBuyAndSellRepository _repository;

        public LoginController(IBuyAndSellRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public IActionResult Get()
        {
            try
            {
                return Ok(_repository.GetUser("betsegaw", "betsegaw"));
            }
            catch
            {
                return BadRequest("Failed to get products");
            }
        }
    }
}