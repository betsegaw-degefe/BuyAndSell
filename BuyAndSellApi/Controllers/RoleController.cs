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
    public class RoleController : ControllerBase
    {
        private readonly IBuyAndSellRepository<Role> _repository;

        public RoleController(IBuyAndSellRepository<Role> repository)
        {
            _repository = repository;
        }


        /// <summary>
        /// Gets all Roles.
        /// </summary>
        /// <returns>A list of Roles</returns>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult GetAll()
        {
            try
            {
                var roles = _repository.GetAll();
                if (roles != null) return Ok(roles);
                else return NotFound();
            }
            catch (Exception ex)
            {
                // return error message if there was an exception
                return BadRequest(new {message = ex.Message});
            }
        }

        /// <summary>
        /// Gets Role by id.
        /// </summary>
        /// <param name="id">The id of the Role you want to get</param>
        /// <returns>An ActionResult of Role</returns>
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
        /// Creates Role.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /register
        ///     {
        ///        "Name":"Admin",
        ///        "active":"true"
        ///     }
        /// </remarks>
        /// <returns>A newly created Role.</returns>
        /// <response code="201">Returns the newly created Role.</response>
        /// <response code="400">If the Role is null</response>
        [HttpPost("register")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Register([FromBody] Role role)
        {
            try
            {
                _repository.Insert(role);
                if (_repository.SaveChanges())
                {
                    return Created($"/api/role/{role.Id}", role);
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