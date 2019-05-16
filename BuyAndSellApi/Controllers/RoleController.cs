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
        private readonly IBuyAndSellRepository<BaseEntity> _repository;

        public RoleController(IBuyAndSellRepository<BaseEntity> repository)
        {
            _repository = repository;
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
    }
}