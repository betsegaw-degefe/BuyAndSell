using System;
using System.Linq;
using BuyAndSellApi.Models.Dtos;
using BuyAndSellApi.Models.Entities;
using BuyAndSellApi.Models.Repository;
using Microsoft.AspNetCore.Authorization;
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
        [Authorize]
        public IActionResult Get (int id) {
            try {
                var orders = from s in _repository.GetAll () select s;
                var order = orders.Where (s => s.Id == id &&
                    s.Active == true);
                if (order != null) return Ok (order);
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
        [Authorize]
        public IActionResult GetOrders ([FromBody] SearchByUserId searchByUserId) {
            try {
                var orders = from s in _repository.GetAll () select s;
                if (!String.IsNullOrEmpty (searchByUserId.UserId.ToString ())) {
                    orders = orders.Where (s => s.BuyerId == (searchByUserId.UserId) &&
                        s.Active == true);
                }
                return Ok (orders);
            } catch (Exception ex) {
                // return error message if there was an exception
                return BadRequest (new { message = ex.Message });
            }
        }

        /// <summary>
        /// Get Orders by UserId/SellerID.
        /// </summary>
        /// <returns>A list of Orders</returns>
        [HttpPost ("myproductorder")]
        [ProducesResponseType (StatusCodes.Status200OK)]
        [ProducesResponseType (StatusCodes.Status404NotFound)]
        [ProducesResponseType (StatusCodes.Status400BadRequest)]
        [Authorize]
        public IActionResult GetProductOrders ([FromBody] SearchByUserId searchByUserId) {
            try {
                var orders = from s in _repository.GetAll () select s;
                if (!String.IsNullOrEmpty (searchByUserId.UserId.ToString ())) {
                    orders = orders.Where (s => s.SellerId == (searchByUserId.UserId) &&
                        s.Active == true);
                }
                return Ok (orders);
            } catch (Exception ex) {
                // return error message if there was an exception
                return BadRequest (new { message = ex.Message });
            }
        }

        /// <summary>
        /// Get Orders by ProductID.
        /// </summary>
        /// <returns>A list of Orders</returns>
        [HttpPost ("byproductid")]
        [ProducesResponseType (StatusCodes.Status200OK)]
        [ProducesResponseType (StatusCodes.Status404NotFound)]
        [ProducesResponseType (StatusCodes.Status400BadRequest)]
        [Authorize]
        public IActionResult GetOrderByProductId ([FromBody] SearchByProductId searchByProductId) {
            try {
                var orders = from s in _repository.GetAll () select s;
                if (!String.IsNullOrEmpty (searchByProductId.ProductId.ToString ())) {
                    orders = orders.Where (s => s.ProductId == (searchByProductId.ProductId) &&
                        s.Active == true);
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
        [Authorize]
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

            return BadRequest ("Failed to save Order.");
        }

        /// <summary>
        /// Update Orders table, Active column to false.
        /// </summary>
        /// <returns>an updated order</returns>
        [HttpPut ("deleteorder")]
        [ProducesResponseType (StatusCodes.Status201Created)]
        [ProducesResponseType (StatusCodes.Status400BadRequest)]
        [Authorize]
        public IActionResult UpdateStatus ([FromBody] OrderProduct orderProduct) {
            try {

                _repository.Update (orderProduct);
                if (_repository.SaveChanges ()) {
                    return Ok (orderProduct);
                }
            } catch (Exception ex) {
                // return error message if there was an exception
                return BadRequest (new { message = ex.Message });
            }

            return BadRequest ("Failed to delete Order.");
        }
    }
}