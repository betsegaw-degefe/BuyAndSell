using System;
using System.Globalization;
using System.Linq;
using BuyAndSellApi.Models.Dtos;
using BuyAndSellApi.Models.Entities;
using BuyAndSellApi.Models.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NpgsqlTypes;

namespace BuyAndSellApi.Controllers {
    [Produces ("application/json")]
    [Route ("api/[Controller]")]
    [ApiController]
    public class OfferController : ControllerBase {
        private readonly IBuyAndSellRepository<Offer> _repository;
        private readonly BuyAndSellContext _context;

        public OfferController (IBuyAndSellRepository<Offer> repository, BuyAndSellContext context) {
            _repository = repository;
            _context = context;
        }

        /// <summary>
        /// Gets Offer by id.
        /// </summary>
        /// <param name="id">The id of the Offer you want to get</param>
        /// <returns>An ActionResult of Offer</returns>
        [HttpGet ("{id:int}")]
        [ProducesResponseType (StatusCodes.Status200OK)]
        [ProducesResponseType (StatusCodes.Status404NotFound)]
        [ProducesResponseType (StatusCodes.Status400BadRequest)]
        public IActionResult Get (int id) {
            try {
                var offer = _repository.Get (id);
                if (offer != null) return Ok (offer);
                return NotFound ();
            } catch (Exception ex) {
                // return error message if there was an exception
                return BadRequest (new { message = ex.Message });
            }
        }

        /// <summary>
        /// Get Offers by UserId/CreatedBy.
        /// </summary>
        /// <returns>A list of Offers</returns>
        [HttpPost ("myoffers")]
        [ProducesResponseType (StatusCodes.Status200OK)]
        [ProducesResponseType (StatusCodes.Status404NotFound)]
        [ProducesResponseType (StatusCodes.Status400BadRequest)]
        public IActionResult GetOffers ([FromBody] SearchByUserId searchByUserId) {
            try {
                var offers = from s in _repository.GetAll () select s;
                if (!String.IsNullOrEmpty (searchByUserId.UserId.ToString ())) {
                    offers = offers.Where (s => s.CreatedBy == (searchByUserId.UserId) && s.Active == true);
                }
                return Ok (offers);
            } catch (Exception ex) {
                // return error message if there was an exception
                return BadRequest (new { message = ex.Message });
            }
        }

        /// <summary>
        /// Gets offers by ProductId.
        /// </summary>
        /// <param name="searchByProductId">The product id of the offer you want to get</param>
        /// <returns>An ActionResult of offers</returns>
        [HttpPost ("searchbyproductid")]
        [ProducesResponseType (StatusCodes.Status200OK)]
        [ProducesResponseType (StatusCodes.Status404NotFound)]
        [ProducesResponseType (StatusCodes.Status400BadRequest)]
        public IActionResult GetOffersByProductId ([FromBody] SearchByProductId searchByProductId) {
            try {
                var offers = from s in _repository.GetAll () select s;
                if (!String.IsNullOrEmpty (searchByProductId.ProductId.ToString ())) {
                    offers = offers.Where (s => s.ProductId == (searchByProductId.ProductId) &&
                        s.Active == true);
                    DateTime date = new DateTime ();

                    offers = offers.OrderByDescending (s => s.OfferPrice); // order by offer price DESC.
                }

                return Ok (offers);
            } catch (Exception ex) {
                // return error message if there was an exception
                return BadRequest (new { message = ex.Message });
            }
        }

        /// <summary>
        /// Register Offer.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /register
        ///     {
        ///        "ProductId": 18,
        ///        "OfferPrice": 1000,
        ///        "Status": "Waiting for approval",
        ///        "Active":"true"
        ///     }
        /// </remarks>
        /// <returns>A newly created Offer.</returns>
        /// <response code="201">Returns the newly created Offer.</response>
        /// <response code="400">If the Offer is null</response>
        [HttpPost ("register")]
        [ProducesResponseType (StatusCodes.Status201Created)]
        [ProducesResponseType (StatusCodes.Status400BadRequest)]
        public IActionResult Register ([FromBody] Offer offer) {
            try {
                //offer.ProductId
                _repository.Insert (offer);
                if (_repository.SaveChanges ()) {
                    return Created ($"/api/offer/{offer.Id}", offer);
                }
            } catch (Exception ex) {
                // return error message if there was an exception
                return BadRequest (new { message = ex.Message });
            }

            return BadRequest ("Failed to save Product.");
        }

        /// <summary>
        /// Update Offers table.
        /// </summary>
        /// <returns>an updated offer</returns>
        [HttpPut ("updateoffer")]
        [ProducesResponseType (StatusCodes.Status201Created)]
        [ProducesResponseType (StatusCodes.Status400BadRequest)]
        public IActionResult UpdateStatus ([FromBody] Offer offer) {
            try {
                _repository.Update (offer);
                if (_repository.SaveChanges ()) {
                    return Ok (offer);
                }
            } catch (Exception ex) {
                // return error message if there was an exception
                return BadRequest (new { message = ex.Message });
            }

            return BadRequest ("Failed to save Product.");
        }
    }
}