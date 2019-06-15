using System;
using BuyAndSellApi.Models.Entities;
using BuyAndSellApi.Models.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BuyAndSellApi.Controllers
{
    [Produces ("application/json")]
    [Route ("api/[Controller]")]
    [ApiController]
    public class ProductAttributeValueController: ControllerBase
    {
        private readonly IBuyAndSellRepository<ProductAttributeValue> _repository;
        private readonly BuyAndSellContext _context;

        public ProductAttributeValueController(IBuyAndSellRepository<ProductAttributeValue> repository, BuyAndSellContext context)
        {
            _repository = repository;
            _context = context;
        }
        
        /// <summary>
        /// Gets ProductAttributeValue by id.
        /// </summary>
        /// <param name="id">The id of the ProductAttributeValue you want to get</param>
        /// <returns>An ActionResult of ProductAttributeValue</returns>
        [HttpGet ("{id:int}")]
        [ProducesResponseType (StatusCodes.Status200OK)]
        [ProducesResponseType (StatusCodes.Status404NotFound)]
        [ProducesResponseType (StatusCodes.Status400BadRequest)]
        public IActionResult Get (int id) {
            try {
                var productAttributeValue = _repository.Get (id);
                if (productAttributeValue != null) return Ok (productAttributeValue);
                return NotFound ();
            } catch (Exception ex) {
                // return error message if there was an exception
                return BadRequest (new { message = ex.Message });
            }
        }
        
        /// <summary>
        /// Creates ProductAttributeValue.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /register
        ///     {
        ///        "ProductAttributeId": 5,
        ///        "Value": "Sony Xperia XA1 Ultra",
        ///        "ProductId": 1,
        ///        "Active":"true"
        ///     }
        /// </remarks>
        /// <returns>A newly created ProductAttributeValue.</returns>
        /// <response code="201">Returns the newly created ProductAttributeValue.</response>
        /// <response code="400">If the ProductAttributeValue is null</response>
        [HttpPost ("register")]
        [ProducesResponseType (StatusCodes.Status201Created)]
        [ProducesResponseType (StatusCodes.Status400BadRequest)]
        public IActionResult Register ([FromBody] ProductAttributeValue productAttributeValue) {
            try {
                _repository.Insert (productAttributeValue);
                if (_repository.SaveChanges ()) {
                    return Created ($"/api/productattributevalue/{productAttributeValue.Id}", productAttributeValue);
                }
            } catch (Exception ex) {
                // return error message if there was an exception
                return BadRequest (new { message = ex.Message });
            }

            return BadRequest ("Failed to save Product Attribute Value.");
        }
    }
}