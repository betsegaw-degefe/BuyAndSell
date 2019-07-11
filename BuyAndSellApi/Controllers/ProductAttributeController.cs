using System;
using System.Collections.Generic;
using System.Linq;
using BuyAndSellApi.Models.Dtos;
using BuyAndSellApi.Models.Entities;
using BuyAndSellApi.Models.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BuyAndSellApi.Controllers {
    [Produces ("application/json")]
    [Route ("api/[Controller]")]
    [ApiController]
    public class ProductAttributeController : ControllerBase {
        private readonly IBuyAndSellRepository<ProductAttribute> _repository;
        private readonly BuyAndSellContext _context;

        public ProductAttributeController (IBuyAndSellRepository<ProductAttribute> repository, BuyAndSellContext context) {
            _repository = repository;
            context = _context;
        }

        /// <summary>
        /// Gets ProductAttribute by name.
        /// </summary>
        /// <param name="searchByName">The Name of the ProductAttribute you want to get</param>
        /// <returns>An ActionResult of ProductAttribute</returns>
        [HttpPost ("searchByName")]
        [ProducesResponseType (StatusCodes.Status200OK)]
        [ProducesResponseType (StatusCodes.Status404NotFound)]
        [ProducesResponseType (StatusCodes.Status400BadRequest)]
        public IActionResult GetProductAttribute ([FromBody] SearchByNameDto searchByName) {
            try {
                var productAttribute = from s in _repository.GetAll () select s;
                if (!String.IsNullOrEmpty (searchByName.Name)) {
                    productAttribute =
                        productAttribute.Where (s => s.Name.ToUpper ().Contains (searchByName.Name.ToUpper ()));
                }

                return Ok (productAttribute);
            } catch (Exception ex) {
                // return error message if there was an exception
                return BadRequest (new { message = ex.Message });
            }
        }

        /// <summary>
        /// Gets unapproved ProductAttribute by CategoryId.
        /// </summary>
        /// <param name="categoryId">The CategoryId of the unapproved ProductAttribute you want to get</param>
        /// <returns>An ActionResult of unapproved ProductAttribute</returns>
        [HttpGet ("searchunapprovedbycategoryid/{categoryId:int}")]
        [ProducesResponseType (StatusCodes.Status200OK)]
        [ProducesResponseType (StatusCodes.Status404NotFound)]
        [ProducesResponseType (StatusCodes.Status400BadRequest)]
        [Authorize]
        public IActionResult GetUnapprovedByCategoryId (int categoryId) {
            try {
                var productAttribute = from s in _repository.GetAll () select s;
                if (!String.IsNullOrEmpty (categoryId.ToString ())) {
                    productAttribute = productAttribute.Where (s => s.CategoryId.Equals (categoryId) &&
                        s.Approved.Equals (false) &&
                        s.Active == true);
                }

                return Ok (productAttribute);
            } catch (Exception ex) {
                // return error message if there was an exception
                return BadRequest (new { message = ex.Message });
            }
        }

        /// <summary>
        /// Gets ProductAttribute by CategoryId.
        /// </summary>
        /// <param name="categoryId">The CategoryId of the ProductAttribute you want to get</param>
        /// <returns>An ActionResult of ProductAttribute</returns>
        [HttpGet ("searchByCategoryId/{categoryId:int}")]
        [ProducesResponseType (StatusCodes.Status200OK)]
        [ProducesResponseType (StatusCodes.Status404NotFound)]
        [ProducesResponseType (StatusCodes.Status400BadRequest)]
        [Authorize]
        public IActionResult GetByCategoryId (int categoryId) {
            try {
                var productAttribute = from s in _repository.GetAll () select s;
                if (!String.IsNullOrEmpty (categoryId.ToString ())) {
                    productAttribute = productAttribute.Where (s => s.CategoryId.Equals (categoryId) &&
                        s.Approved.Equals (true) &&
                        s.Active == true);
                }

                return Ok (productAttribute);
            } catch (Exception ex) {
                // return error message if there was an exception
                return BadRequest (new { message = ex.Message });
            }
        }

        /// <summary>
        /// Gets ProductAttribute by id.
        /// </summary>
        /// <param name="id">The id of the ProductAttribute you want to get</param>
        /// <returns>An ActionResult of ProductAttribute</returns>
        [HttpGet ("{id:int}")]
        [ProducesResponseType (StatusCodes.Status200OK)]
        [ProducesResponseType (StatusCodes.Status404NotFound)]
        [ProducesResponseType (StatusCodes.Status400BadRequest)]
        public IActionResult Get (int id) {
            try {
                var productAttribute = _repository.Get (id);
                if (productAttribute != null) return Ok (productAttribute);
                return NotFound ();
            } catch (Exception ex) {
                // return error message if there was an exception
                return BadRequest (new { message = ex.Message });
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
        [HttpPost ("register")]
        [ProducesResponseType (StatusCodes.Status201Created)]
        [ProducesResponseType (StatusCodes.Status400BadRequest)]
        [Authorize]
        public IActionResult Register ([FromBody] ProductAttribute productAttribute) {
            try {
                _repository.Insert (productAttribute);
                if (_repository.SaveChanges ()) {
                    return Created ($"/api/productattribute/{productAttribute.Id}", productAttribute);
                }
            } catch (Exception ex) {
                // return error message if there was an exception
                return BadRequest (new { message = ex.Message });
            }

            return BadRequest ("Failed to save Address.");
        }

        /// <summary>
        /// Update Product attribute table.
        /// </summary>
        /// <returns>an updated product attribute</returns>
        [HttpPut ("updateproductattribute")]
        [ProducesResponseType (StatusCodes.Status201Created)]
        [ProducesResponseType (StatusCodes.Status400BadRequest)]
        public IActionResult UpdateStatus ([FromBody] ProductAttribute productAttribute) {
            try {
                _repository.Update (productAttribute);
                if (_repository.SaveChanges ()) {
                    return Ok (productAttribute);
                }
            } catch (Exception ex) {
                // return error message if there was an exception
                return BadRequest (new { message = ex.Message });
            }

            return BadRequest ("Failed to update Product attribute.");
        }
    }
}