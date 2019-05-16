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
    public class UserRoleController : ControllerBase
    {
        private readonly IBuyAndSellRepository<UserRole> _repository;

        public UserRoleController(IBuyAndSellRepository<UserRole> repository)
        {
            _repository = repository;
        }


        /// <summary>
        /// Gets UserRole by id.
        /// </summary>
        /// <param name="id">The id of the UserRole you want to get</param>
        /// <returns>An ActionResult of UserRole</returns>
        [HttpGet("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Get(int id)
        {
            try
            {
                var role = _repository.Get(id);
                if (role != null) return Ok(role);
                else return NotFound();
            }
            catch (Exception ex)
            {
                // return error message if there was an exception
                return BadRequest(new {message = ex.Message});
            }
        }


        /// <summary>
        /// Creates UserRole.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /register
        ///     {
        ///        "UserId": 4,
        ///        "RoleId": 1,
        ///        "active":"true"
        ///     }
        /// </remarks>
        /// <returns>A newly created UserRole.</returns>
        /// <response code="201">Returns the newly created UserRole.</response>
        /// <response code="400">If the UserRole is null</response>
        [HttpPost("register")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Register([FromBody] UserRole userRole)
        {
            try
            {
                _repository.Insert(userRole);
                if (_repository.SaveChanges())
                {
                    return Created($"/api/userrole/{userRole.UserId}", userRole);
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