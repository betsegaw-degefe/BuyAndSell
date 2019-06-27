using System;
using System.Linq;
using BuyAndSellApi.Models.Dtos;
using BuyAndSellApi.Models.Entities;
using BuyAndSellApi.Models.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BuyAndSellApi.Controllers {
    [Produces ("application/json")]
    [Route ("api/[Controller]")]
    [ApiController]
    public class CartController : ControllerBase {
        private readonly IBuyAndSellRepository<Cart> _repository;
        private readonly BuyAndSellContext _context;

        public CartController (IBuyAndSellRepository<Cart> repository, BuyAndSellContext context) {
            _repository = repository;
            _context = context;
        }

        /// <summary>
        /// Gets Cart by id.
        /// </summary>
        /// <param name="id">The id of the Cart you want to get</param>
        /// <returns>An ActionResult of Cart</returns>
        [HttpGet ("{id:int}")]
        [ProducesResponseType (StatusCodes.Status200OK)]
        [ProducesResponseType (StatusCodes.Status404NotFound)]
        [ProducesResponseType (StatusCodes.Status400BadRequest)]
        public IActionResult Get (int id) {
            try {
                var cart = _repository.Get (id);
                if (cart != null) return Ok (cart);
                return NotFound ();
            } catch (Exception ex) {
                // return error message if there was an exception
                return BadRequest (new { message = ex.Message });
            }
        }

        /// <summary>
        /// Register cart.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /register
        ///     {
        ///        "ProductId": 18,
        ///        "Active":"true"
        ///     }
        /// </remarks>
        /// <returns>A newly created cart.</returns>
        /// <response code="201">Returns the newly created cart.</response>
        /// <response code="400">If the cart is null</response>
        [HttpPost ("register")]
        [ProducesResponseType (StatusCodes.Status201Created)]
        [ProducesResponseType (StatusCodes.Status400BadRequest)]
        public IActionResult Register ([FromBody] Cart cart) {
            try {
                _repository.Insert (cart);
                if (_repository.SaveChanges ()) {
                    return Created ($"/api/order/{cart.Id}", cart);
                }
            } catch (Exception ex) {
                // return error message if there was an exception
                return BadRequest (new { message = ex.Message });
            }

            return BadRequest ("Failed to save Product.");
        }

        /// <summary>
        /// Get Carts by UserId/CreatedBy.
        /// </summary>
        /// <returns>A list of Carts</returns>
        [HttpPost ("mycarts")]
        [ProducesResponseType (StatusCodes.Status200OK)]
        [ProducesResponseType (StatusCodes.Status404NotFound)]
        [ProducesResponseType (StatusCodes.Status400BadRequest)]
        public IActionResult GetCarts ([FromBody] SearchByUserId searchByUserId) {
            try {
                var carts = from s in _repository.GetAll () select s;
                if (!String.IsNullOrEmpty (searchByUserId.UserId.ToString ())) {
                    carts = carts.Where (s => s.CreatedBy == (searchByUserId.UserId) && s.Active == true);
                }

                return Ok (carts);
            } catch (Exception ex) {
                // return error message if there was an exception
                return BadRequest (new { message = ex.Message });
            }
        }

        /// <summary>
        /// Update Cart table, Active column to false.
        /// </summary>
        /// <returns>an updated cart</returns>
        [HttpPut ("deletecart")]
        [ProducesResponseType (StatusCodes.Status201Created)]
        [ProducesResponseType (StatusCodes.Status400BadRequest)]
        public IActionResult UpdateStatus ([FromBody] Cart cart) {
            try {
                _repository.Update (cart);
                if (_repository.SaveChanges ()) {
                    return Ok (cart);
                }
            } catch (Exception ex) {
                // return error message if there was an exception
                return BadRequest (new { message = ex.Message });
            }

            return BadRequest ("Failed to save Product.");
        }
    }
}