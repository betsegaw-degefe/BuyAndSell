using System;
using BuyAndSellApi.Models.Entities;
using BuyAndSellApi.Models.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BuyAndSellApi.Controllers {
    [Produces ("application/json")]
    [Route ("api/[Controller]")]
    [ApiController]
    public class ProductController : ControllerBase {
        private readonly IBuyAndSellRepository<Product> _repository;
        private readonly BuyAndSellContext _context;

        public ProductController (IBuyAndSellRepository<Product> repository, BuyAndSellContext context) {
            _repository = repository;
            _context = context;
        }

        /// <summary>
        /// Gets Product by id.
        /// </summary>
        /// <param name="id">The id of the Product you want to get</param>
        /// <returns>An ActionResult of Product</returns>
        [HttpGet ("{id:int}")]
        [ProducesResponseType (StatusCodes.Status200OK)]
        [ProducesResponseType (StatusCodes.Status404NotFound)]
        [ProducesResponseType (StatusCodes.Status400BadRequest)]
        public IActionResult Get (int id) {
            try {
                var product = _repository.Get (id);
                if (product != null) return Ok (product);
                return NotFound ();
            } catch (Exception ex) {
                // return error message if there was an exception
                return BadRequest (new { message = ex.Message });
            }
        }

        /// <summary>
        /// Gets all Products.
        /// </summary>
        /// <returns>A list of Products</returns>
        [HttpGet]
        [ProducesResponseType (StatusCodes.Status200OK)]
        [ProducesResponseType (StatusCodes.Status404NotFound)]
        [ProducesResponseType (StatusCodes.Status400BadRequest)]
        public IActionResult GetAll () {
            try {
                var products = _repository.GetAll ();
                if (products != null) return Ok (products);
                return NotFound ();
            } catch (Exception ex) {
                // return error message if there was an exception
                return BadRequest (new { message = ex.Message });
            }
        }

        /// <summary>
        /// Creates Product.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /register
        ///     {
        ///        "StatusId": 1,
        ///        "Condition": "New",
        ///        "Quantity": 1,
        ///        "Price": 7500,
        ///        "Negotiable": false,
        ///        "Description":"A brand new Sony xperia XA1 Ultra mobile with full accessories, Imported from dubai"
        ///        "Active":"true"
        ///     }
        /// </remarks>
        /// <returns>A newly created Product.</returns>
        /// <response code="201">Returns the newly created Product.</response>
        /// <response code="400">If the Product is null</response>
        [HttpPost ("register")]
        [ProducesResponseType (StatusCodes.Status201Created)]
        [ProducesResponseType (StatusCodes.Status400BadRequest)]
        public IActionResult Register ([FromBody] Product product) {
            try {
                _repository.Insert (product);
                if (_repository.SaveChanges ()) {
                    return Created ($"/api/product/{product.Id}", product);
                }
            } catch (Exception ex) {
                // return error message if there was an exception
                return BadRequest (new { message = ex.Message });
            }

            return BadRequest ("Failed to save Product.");
        }
    }
}