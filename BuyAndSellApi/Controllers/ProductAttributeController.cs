using System;
using BuyAndSellApi.Models.Entities;
using BuyAndSellApi.Models.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BuyAndSellApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[Controller]")]
    [ApiController]
    public class ProductAttributeController : ControllerBase
    {
        private readonly IBuyAndSellRepository<ProductAttribute> _repository;

        public ProductAttributeController(IBuyAndSellRepository<ProductAttribute> repository)
        {
            _repository = repository;
        }


        /// <summary>
        /// Gets ProductAttribute by id.
        /// </summary>
        /// <param name="id">The id of the ProductAttribute you want to get</param>
        /// <returns>An ActionResult of ProductAttribute</returns>
        [HttpGet("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Get(int id)
        {
            try
            {
                var productAttribute = _repository.Get(id);
                if (productAttribute != null) return Ok(productAttribute);
                return NotFound();
            }
            catch (Exception ex)
            {
                // return error message if there was an exception
                return BadRequest(new {message = ex.Message});
            }
        }

        /// <summary>
        /// Creates ProductAttribute.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /register
        ///     {
        ///        "CategoryId": 2,
        ///        "Name": "Size",
        ///        "DataType": "Text",
        ///        "Unit": "none",
        ///        "Active":"true"
        ///     }
        /// </remarks>
        /// <returns>A newly created ProductAttribute.</returns>
        /// <response code="201">Returns the newly created ProductAttribute.</response>
        /// <response code="400">If the ProductAttribute is null</response>
        [HttpPost("register")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Register([FromBody] ProductAttribute productAttribute)
        {
            try
            {
                _repository.Insert(productAttribute);
                if (_repository.SaveChanges())
                {
                    return Created($"/api/productattribute/{productAttribute.Id}", productAttribute);
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