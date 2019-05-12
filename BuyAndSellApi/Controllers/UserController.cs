using System;
using AutoMapper;
using BuyAndSellApi.Models.Entities;
using BuyAndSellApi.Models.Repository;
using Microsoft.AspNetCore.Mvc;

namespace BuyAndSellApi.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    [Produces("application/json")]
    public class UserController : ControllerBase
    {
        private readonly IBuyAndSellRepository _repository;

        private readonly IMapper _mapper;

        public UserController(IBuyAndSellRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        // Get user by id
        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
            try
            {
                var user = _repository.GetUser(id);
                if (user != null) return Ok(user);
                else return NotFound();
            }
            catch (Exception ex)
            {
                // return error message if there was an exception
                return BadRequest(new {message = ex.Message});
            }
        }

        // register user and return user detail.
        [HttpPost("register")]
        public IActionResult Register([FromBody] User user)
        {
            try
            {
                // save user to db.
                _repository.AddEntity(user);
                if (_repository.SaveAll())
                {
                    return Created($"/api/user/{user.Id}", user);
                }
            }
            catch (Exception ex)
            {
                // return error message if there was an exception
                return BadRequest(new {message = ex.Message});
            }

            return BadRequest("Failed to save orders.");
        }
    }
}