// using System;
// using System.IdentityModel.Tokens.Jwt;
// using System.Security.Claims;
// using System.Text;
// using System.Threading.Tasks;
// using AutoMapper;
// using BuyAndSellApi.Models.Dtos;
// using BuyAndSellApi.Models.Entities;
// using BuyAndSellApi.Models.Repository;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.Extensions.Configuration;
// using Microsoft.IdentityModel.Tokens;

// namespace BuyAndSellApi.Controllers
// {
//     [Produces("application/json")]
//     [Route("api/[Controller]")]
//     [ApiController]
//     public class AuthController : ControllerBase
//     {
//         private readonly IAuthRepository _repo;
//         private readonly IConfiguration _config;
//         private readonly IMapper _mapper;

//         public AuthController(IAuthRepository repo, IConfiguration config, IMapper mapper)
//         {
//             _repo = repo;
//             _config = config;
//             _mapper = mapper;
//         }
        
//         [HttpPost("register")]
//         public async Task<IActionResult> Register(UserDto userDto)
//         {
//             if (await _repo.UserExists(userDto.UserName))
//                 return BadRequest("Username already exists");

//             var userToCreate = _mapper.Map<User>(userDto);
//             var createdUser = await _repo.Register(userToCreate, userDto.Password);
//             return StatusCode(201, new { username = createdUser.UserName, fullname = createdUser.FirstName + " " + createdUser.LastName });
//         }

        
//         [HttpPost("login")]
//         public async Task<IActionResult> Login(LoginDto loginDto)
//         {
//             var userFromRepo = await _repo.Login(loginDto.UserName, loginDto.Password);
//             if (userFromRepo == null)
//                 return Unauthorized();

//             var claims = new[]
//             {
//                 new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
//                 new Claim(ClaimTypes.Name, userFromRepo.UserName)
//             };

//             var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));
//             var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
//             var tokenDescriptor = new SecurityTokenDescriptor
//             {
//                 Subject = new ClaimsIdentity(claims),
//                 Expires = DateTime.Now.AddDays(1),
//                 SigningCredentials = creds
//             };

//             var tokenHandler = new JwtSecurityTokenHandler();
//             var token = tokenHandler.CreateToken(tokenDescriptor);

//             return Ok(new {token = tokenHandler.WriteToken(token), username = userFromRepo.UserName, fullname = userFromRepo.FirstName + " " + userFromRepo.LastName });
//         }
//     }
// }