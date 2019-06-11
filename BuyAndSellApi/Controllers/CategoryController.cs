using System;
using BuyAndSellApi.Models.Entities;
using BuyAndSellApi.Models.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BuyAndSellApi.Controllers {
    [Produces ("application/json")]
    [Route ("api/[Controller]")]
    [ApiController]
    public class CategoryController : ControllerBase {
        private readonly IBuyAndSellRepository<Category> _repository;

        public CategoryController (IBuyAndSellRepository<Category> repository) {
            _repository = repository;
        }

        /// <summary>
        /// Gets all Category.
        /// </summary>
        /// <returns>A list of Category</returns>
        [HttpGet]
        [ProducesResponseType (StatusCodes.Status200OK)]
        [ProducesResponseType (StatusCodes.Status404NotFound)]
        [ProducesResponseType (StatusCodes.Status400BadRequest)]
        public IActionResult GetAll () {
            try {
                var categories = _repository.GetAll ();
                if (categories != null) return Ok (categories);
                return NotFound ();
            } catch (Exception ex) {
                // return error message if there was an exception
                return BadRequest (new { message = ex.Message });
            }
        }

        /// <summary>
        /// Gets Category by id.
        /// </summary>
        /// <param name="id">The id of the Category you want to get</param>
        /// <returns>An ActionResult of Category</returns>
        [HttpGet ("{id:int}")]
        [ProducesResponseType (StatusCodes.Status200OK)]
        [ProducesResponseType (StatusCodes.Status404NotFound)]
        [ProducesResponseType (StatusCodes.Status400BadRequest)]
        public IActionResult Get (int id) {
            try {
                var category = _repository.Get (id);
                if (category != null) return Ok (category);
                return NotFound ();
            } catch (Exception ex) {
                // return error message if there was an exception
                return BadRequest (new { message = ex.Message });
            }
        }

        /// <summary>
        /// Creates Category.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /register
        ///     {
        ///        "Name":"Men's Clothing and Shoes",
        ///        "ParentId": null,
        ///        "Level": 1,
        ///        "Active":"true"
        ///     }
        /// </remarks>
        /// <returns>A newly created Category.</returns>
        /// <response code="201">Returns the newly created Category.</response>
        /// <response code="400">If the Category is null</response>
        [HttpPost ("register")]
        [ProducesResponseType (StatusCodes.Status201Created)]
        [ProducesResponseType (StatusCodes.Status400BadRequest)]
        public IActionResult Register ([FromBody] Category category) {
            try {
                _repository.Insert (category);
                if (_repository.SaveChanges ()) {
                    return Created ($"/api/category/{category.Id}", category);
                }
            } catch (Exception ex) {
                // return error message if there was an exception
                return BadRequest (new { message = ex.Message });
            }

            return BadRequest ("Failed to save Address.");
        }
    }
}