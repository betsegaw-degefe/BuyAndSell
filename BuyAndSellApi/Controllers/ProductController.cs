using System;
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
                var products = from s in _repository.GetAll () select s;
                if (products != null) {
                    products = products.Where (s => s.Active == true); // Only active data (not deleted.)
                    products = products.OrderByDescending (s => s.LastUpdated); // order by last modified DESC.
                    return Ok (products);
                }

                return NotFound ();
            } catch (Exception ex) {
                // return error message if there was an exception
                return BadRequest (new { message = ex.Message });
            }
        }

        /// <summary>
        /// Get Products by UserId/CreatedBy.
        /// </summary>
        /// <returns>A list of Products</returns>
        [HttpPost ("myproducts")]
        [ProducesResponseType (StatusCodes.Status200OK)]
        [ProducesResponseType (StatusCodes.Status404NotFound)]
        [ProducesResponseType (StatusCodes.Status400BadRequest)]
        public IActionResult GetMyProducts ([FromBody] SearchByUserId searchByUserId) {
            try {
                var products = from s in _repository.GetAll () select s;
                if (!String.IsNullOrEmpty (searchByUserId.UserId.ToString ())) {
                    products = products.Where (s => s.CreatedBy == (searchByUserId.UserId) && s.Active == true);
                }

                return Ok (products);
            } catch (Exception ex) {
                // return error message if there was an exception
                return BadRequest (new { message = ex.Message });
            }
        }

        /// <summary>
        /// Search Products by search key and category
        /// </summary>
        /// <returns>A list of Products</returns>
        [HttpPost ("searchproductbykey")]
        [ProducesResponseType (StatusCodes.Status200OK)]
        [ProducesResponseType (StatusCodes.Status404NotFound)]
        [ProducesResponseType (StatusCodes.Status400BadRequest)]
        public IActionResult SearchProductByKey (SearchProduct searchProduct) {
            try {
                var products = from s in _repository.GetAll () select s;
                if (products != null && searchProduct.MainCategoryId == 0) {
                    products = products.Where (s =>
                        s.Active == true &&
                        EF.Functions.Like (s.Description.ToLower (), "%" + searchProduct.SearchKey.ToLower () + "%")
                    );
                    products = products.OrderByDescending (s => s.LastUpdated); // order by last modified DESC.
                    return Ok (products);
                } else if (products != null) {
                    products = products.Where (s =>
                        s.Active == true &&
                        EF.Functions.Like (s.Description.ToLower (), "%" + searchProduct.SearchKey.ToLower () + "%") &&
                        s.MainCategoryId == searchProduct.MainCategoryId
                    );
                    products = products.OrderByDescending (s => s.LastUpdated); // order by last modified DESC.
                    return Ok (products);
                }

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

        /// <summary>
        /// Update Product table, Active column to false.
        /// </summary>
        /// <returns>an updated product</returns>
        [HttpPut ("deleteproduct")]
        [ProducesResponseType (StatusCodes.Status201Created)]
        [ProducesResponseType (StatusCodes.Status400BadRequest)]
        public IActionResult UpdateStatus ([FromBody] Product product) {
            try {
                _repository.Update (product);
                if (_repository.SaveChanges ()) {
                    return Ok (product);
                }
            } catch (Exception ex) {
                // return error message if there was an exception
                return BadRequest (new { message = ex.Message });
            }

            return BadRequest ("Failed to delete Product.");
        }
    }
}