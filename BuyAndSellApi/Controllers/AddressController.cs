using System;
using BuyAndSellApi.Models.Entities;
using BuyAndSellApi.Models.Repository;
using Microsoft.AspNetCore.Mvc;

namespace BuyAndSellApi.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    [Produces("application/json")]
    public class AddressController : ControllerBase
    {
        private readonly IBuyAndSellRepository _repository;

        public AddressController(IBuyAndSellRepository repository)
        {
            _repository = repository;
        }

        // search address by id and return if found.
        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
            try
            {
                var address = _repository.GetAddressById(id);
                if (address != null) return Ok(address);
                else return NotFound();
            }
            catch (Exception ex)
            {
                // return error message if there was an exception
                return BadRequest(new {message = ex.Message});
            }
        }

        // register address and return address detail.
        [HttpPost("register")]
        public IActionResult Register([FromBody] Models.Entities.Address address)
        {
            try
            {
                // save user to db.
                _repository.AddEntity(address);
                if (_repository.SaveAll())
                {
                    return Created($"/api/address/{address.Id}", address);
                }
            }
            catch (Exception ex)
            {
                // return error message if there was an exception
                return BadRequest(new {message = ex.Message});
            }

            return BadRequest("Failed to save orders.");
        }
    }
}