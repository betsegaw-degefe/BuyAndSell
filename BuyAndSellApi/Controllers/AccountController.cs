using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BuyAndSellApi.Models.Dtos;
using BuyAndSellApi.Models.Entities;
using BuyAndSellApi.Models.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Internal;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace BuyAndSellApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[Controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IBuyAndSellRepository<User> _buyandsellrepository;
        private readonly IAuthRepository _authrepo;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;

        public AccountController(IBuyAndSellRepository<User> buyandsellrepository, IMapper mapper,
            IAuthRepository authrepo, IConfiguration config)
        {
            _buyandsellrepository = buyandsellrepository;
            _mapper = mapper;
            _authrepo = authrepo;
            _config = config;
        }

        /// <summary>
        /// Gets all Users.
        /// </summary>
        /// <returns>A list of Users</returns>
        [HttpGet("users")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult GetAll()
        {
            try
            {
                var users = _buyandsellrepository.GetAll();
                if (users != null) return Ok(users);
                else return NotFound();
            }
            catch (Exception ex)
            {
                // return error message if there was an exception
                return BadRequest(new {message = ex.Message});
            }
        }

        /// <summary>
        /// Gets user token for login.
        /// </summary>
        /// <param name="loginDto">The username and password to login user.</param>
        /// <returns>An ActionResult of User</returns>
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            var userFromRepo = await _authrepo.Login(loginDto.UserName, loginDto.Password);
            //Console.WriteLine ("User login object: " + userFromRepo);
            if (userFromRepo == null)
                return Unauthorized();

            // get role_id from user_role table.
            var userRole = await _authrepo.UserRoles(userFromRepo.Id);

            if (userRole == null)
                return NotFound();

            // get role entity using the above role_id
            var role = await _authrepo.roles(userRole.RoleId);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.UserName),
                new Claim(ClaimTypes.Actor, userFromRepo.FirstName + " " + userFromRepo.MiddleName),
                new Claim(ClaimTypes.Role, role.Name)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            //return Ok (new { token = tokenHandler.WriteToken (token), username = userFromRepo.UserName, fullname = userFromRepo.FirstName + " " + userFromRepo.LastName });
            return Ok(new {token = tokenHandler.WriteToken(token), user = userFromRepo, UserRole = userRole});
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
                var user = _buyandsellrepository.Get(id);
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
        public async Task<IActionResult> Register(UserDto userDto)
        {
            if (await _authrepo.UserExists(userDto.UserName))
                return BadRequest("Username already exists");

            var userToCreate = _mapper.Map<User>(userDto);
            //Console userToCreate.AddressId
            Console.WriteLine("Password " + userDto.Password);
            // System.Diagnostics.Debug.WriteLine(userDto.AddressId);
            var createdUser = await _authrepo.Register(userToCreate, userDto.Password);
            //return StatusCode (201, new { username = createdUser.UserName, fullname = createdUser.FirstName + " " + createdUser.LastName });
            return StatusCode(201, new {user = createdUser});
        }

        /// <summary>
        /// Update Cart table, Active column to false.
        /// </summary>
        /// <returns>an updated cart</returns>
        [HttpPut("updateprofile")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateCartStatus([FromBody] User user)
        {
            try
            {
                var updatedUser = await _authrepo.Update(user);
                if (updatedUser != null)
                {
                    return Ok(user);
                }
            }
            catch (Exception ex)
            {
                // return error message if there was an exception
                return BadRequest(new {message = ex.Message});
            }

            return BadRequest("Failed to update user.");
        }
    }
}