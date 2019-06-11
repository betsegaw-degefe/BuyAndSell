using System;
using BuyAndSellApi.Models.Entities;
using BuyAndSellApi.Models.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BuyAndSellApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[Controller]")]
    [ApiController]
    public class AddressController : ControllerBase
    {
        private readonly IBuyAndSellRepository<Address> _repository;

        public AddressController(IBuyAndSellRepository<Address> repository)
        {
            _repository = repository;
        }

        /// <summary>
        /// Gets all Address.
        /// </summary>
        /// <returns>A list of Address</returns>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult GetAll()
        {
            try
            {
                var addresses = _repository.GetAll();
                if (addresses != null) return Ok(addresses);
                else return NotFound();
            }
            catch (Exception ex)
            {
                // return error message if there was an exception
                return BadRequest(new {message = ex.Message});
            }
        }



        /// <summary>
        /// Gets Address by id.
        /// </summary>
        /// <param name="id">The id of the Address you want to get</param>
        /// <returns>An ActionResult of Address</returns>
        [HttpGet("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Get(int id)
        {
            try
            {
                var address = _repository.Get(id);
                if (address != null) return Ok(address);
                return NotFound();
            }
            catch (Exception ex)
            {
                // return error message if there was an exception
                return BadRequest(new {message = ex.Message});
            }
        }

        // register address and return address detail.
        /// <summary>
        /// Creates Address.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /register
        ///     {
        ///        "Name":"Yeka",
        ///        "ParentId":3,
        ///        "level": 3,
        ///        "active":"true"
        ///     }
        /// </remarks>
        /// <returns>A newly created Address</returns>
        /// <response code="201">Returns the newly created Address</response>
        /// <response code="400">If the Address is null</response>
        [HttpPost("register")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Register([FromBody] Address address)
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

            return BadRequest("Failed to save Address.");
        }
    }
}