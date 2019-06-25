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
    public class OrderController : ControllerBase {
        private readonly IBuyAndSellRepository<OrderProduct> _repository;
        private readonly BuyAndSellContext _context;

        public OrderController (IBuyAndSellRepository<OrderProduct> repository, BuyAndSellContext context) {
            _repository = repository;
            _context = context;
        }

        /// <summary>
        /// Gets Order by id.
        /// </summary>
        /// <param name="id">The id of the Order you want to get</param>
        /// <returns>An ActionResult of Order</returns>
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
        /// Get Orders by UserId/BuyerID.
        /// </summary>
        /// <returns>A list of Orders</returns>
        [HttpPost ("myorder")]
        [ProducesResponseType (StatusCodes.Status200OK)]
        [ProducesResponseType (StatusCodes.Status404NotFound)]
        [ProducesResponseType (StatusCodes.Status400BadRequest)]
        public IActionResult GetOrders ([FromBody] SearchOrderByUserId searchOrderByUserId) {
            try {
                var orders = from s in _repository.GetAll () select s;
                if (!String.IsNullOrEmpty (searchOrderByUserId.UserId.ToString ())) {
                    orders = orders.Where (s => s.BuyerId == (searchOrderByUserId.UserId));
                }
                return Ok (orders);
            } catch (Exception ex) {
                // return error message if there was an exception
                return BadRequest (new { message = ex.Message });
            }
        }

        /// <summary>
        /// Creates Order.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /register
        ///     {
        ///        "ProductId": 18,
        ///        "BuyerId": 10,
        ///        "SellerId": 1,
        ///        "OrderQuantity": 1,
        ///        "Active":"true"
        ///     }
        /// </remarks>
        /// <returns>A newly created Order.</returns>
        /// <response code="201">Returns the newly created Order.</response>
        /// <response code="400">If the Order is null</response>
        [HttpPost ("register")]
        [ProducesResponseType (StatusCodes.Status201Created)]
        [ProducesResponseType (StatusCodes.Status400BadRequest)]
        public IActionResult Register ([FromBody] OrderProduct order) {
            try {
                _repository.Insert (order);
                if (_repository.SaveChanges ()) {
                    return Created ($"/api/order/{order.Id}", order);
                }
            } catch (Exception ex) {
                // return error message if there was an exception
                return BadRequest (new { message = ex.Message });
            }

            return BadRequest ("Failed to save Product.");
        }
    }
}