using System;
using BuyAndSellApi.Models.Entities;
using BuyAndSellApi.Models.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BuyAndSellApi.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    [Produces("application/json")]
    public class AddressController : ControllerBase
    {
        private readonly IBuyAndSellRepository<BaseEntity> _repository;

        public AddressController(IBuyAndSellRepository<BaseEntity> repository)
        {
            _repository = repository;
        }

        // search address by id and return if found.
        [Authorize]
        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
            try
            {
                var address = _repository.Get(id);
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
        [Authorize]
        [HttpPost("register")]
        public IActionResult Register([FromBody] Models.Entities.Address address)
        {
            try
            {
                // save user to db.
                _repository.Insert(address);
                if (_repository.SaveChanges())
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