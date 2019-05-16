using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using BuyAndSellApi.Models.Entities;
using BuyAndSellApi.Models.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BuyAndSellApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[Controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IBuyAndSellRepository<User> _repository;
        private readonly IMapper _mapper;

        public UserController(IBuyAndSellRepository<User> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        /// <summary>
        /// Gets User by id.
        /// </summary>
        /// <param name="id">The id of the user you want to get</param>
        /// <returns>An ActionResult of User</returns>
        [HttpGet("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Get(int id)
        {
            try
            {
                var user = _repository.Get(id);
                if (user != null) return Ok(user);
                else return NotFound();
            }
            catch (Exception ex)
            {
                // return error message if there was an exception
                return BadRequest(new {message = ex.Message});
            }
        }

        /// <summary>
        /// Creates User.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /register
        ///     {
        ///        "FirstName":"Betsegaw",,
        ///        "MiddleName":"Degefe",
        ///        "LastName": "Agaze",
        ///        "ProfilePicture":"/default",
        ///        "AddressId":3,
        ///        "UserName":"betsegaw.degefe",
        ///        "Password":"betsegaw",
        ///        "Active":"true"
        ///     }
        /// </remarks>
        /// <returns>A newly created User</returns>
        /// <response code="201">Returns the newly created User</response>
        /// <response code="400">If the User is null</response>
        [HttpPost("register")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Register([FromBody] User user)
        {
            try
            {
                _repository.Insert(user);
                if (_repository.SaveChanges())
                {
                    return Created($"/api/user/{user.Id}", user);
                }
            }
            catch (Exception ex)
            {
                // return error message if there was an exception
                return BadRequest(new {message = ex.Message});
            }

            return BadRequest("Failed to save users.");
        }
    }
}