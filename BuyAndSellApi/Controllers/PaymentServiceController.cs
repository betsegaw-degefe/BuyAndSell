using System;
using System.Linq;
using AutoMapper;
using BuyAndSellApi.Models.Dtos;
using BuyAndSellApi.Models.Entities;
using BuyAndSellApi.Models.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BuyAndSellApi.Controllers {
    [Produces ("application/json")]
    [Route ("api/[Controller]")]
    [ApiController]

    public class PaymentServiceController : ControllerBase {
        private readonly IBuyAndSellRepository<PaymentService> _repository;
        private readonly BuyAndSellContext _context;
        private readonly IMapper _mapper;

        public PaymentServiceController (IBuyAndSellRepository<PaymentService> repository, BuyAndSellContext context,
            IMapper mapper) {
            _repository = repository;
            _context = context;
            _mapper = mapper;
        }

        /// <summary>
        /// Gets Payment service by id.
        /// </summary>
        /// <param name="id">The id of the Payment service you want to get</param>
        /// <returns>An ActionResult of Payment service</returns>
        [HttpGet ("{id:int}")]
        [ProducesResponseType (StatusCodes.Status200OK)]
        [ProducesResponseType (StatusCodes.Status404NotFound)]
        [ProducesResponseType (StatusCodes.Status400BadRequest)]
        public IActionResult Get (int id) {
            try {
                var paymentService = _repository.Get (id);
                if (paymentService != null) return Ok (paymentService);
                return NotFound ();
            } catch (Exception ex) {
                // return error message if there was an exception
                return BadRequest (new { message = ex.Message });
            }
        }

        /// <summary>
        /// Register Payment service.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /register
        ///     {
        ///        "PinCode": 18,
        ///        "Password":"password",
        ///        "Balance": 100000,
        ///        "Active":"true"
        ///     }
        /// </remarks>
        /// <returns>A newly created Payment service.</returns>
        /// <response code="201">Returns the newly created Payment service.</response>
        /// <response code="400">If the Payment service is null</response>
        [HttpPost ("register")]
        [ProducesResponseType (StatusCodes.Status201Created)]
        [ProducesResponseType (StatusCodes.Status400BadRequest)]
        public IActionResult Register ([FromBody] PaymentService paymentService) {
            try {
                _repository.Insert (paymentService);
                if (_repository.SaveChanges ()) {
                    return Created ($"/api/paymentservice/{paymentService.Id}", paymentService);
                }
            } catch (Exception ex) {
                // return error message if there was an exception
                return BadRequest (new { message = ex.Message });
            }

            return BadRequest ("Failed to save Product.");
        }

        /// <summary>
        /// Pay Payment.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /register
        ///     {
        ///        "PinCode": 18,
        ///        "Password":"password",
        ///        "Withdraw": 100,
        ///     }
        /// </remarks>
        /// <returns>an updated paymentservice</returns>
        [HttpPut ("payment")]
        [ProducesResponseType (StatusCodes.Status200OK)]
        [ProducesResponseType (StatusCodes.Status404NotFound)]
        [ProducesResponseType (StatusCodes.Status400BadRequest)]
        public IActionResult PayPayment ([FromBody] PaymentDto paymentDto) {
            try {
                //var user = _context..FirstOrDefaultAsync(x => x.UserName == username);

                var paymentService = _context.PaymentService.FirstOrDefault (x => x.PinCode == paymentDto.PinCode);

                if (paymentService == null)
                    return NotFound ();

                /*if (!VerifyPasswordHash(paymentDto.Password, paymentService.Password, paymentService.Salt))
                    return Unauthorized();*/
                if (paymentDto.Password != paymentService.Password)
                    return Unauthorized ();

                if (paymentService.Balance < paymentDto.Withdraw)
                    return Content ("message", "Balance Insufficient.");


                paymentService.Balance = paymentService.Balance - paymentDto.Withdraw;

                _repository.Update (paymentService);

                if (_repository.SaveChanges ()) {
                    return Ok (paymentService);
                }
            } catch (Exception ex) {
                // return error message if there was an exception
                return BadRequest (new { message = ex.Message });
            }

            return BadRequest ("Failed to process your payment.");
        }

        private bool VerifyPasswordHash (string password, byte[] passwordHash, byte[] salt) {
            using (var hmac = new System.Security.Cryptography.HMACSHA512 (salt)) {
                var computedHash = hmac.ComputeHash (System.Text.Encoding.UTF8.GetBytes (password));
                for (int i = 0; i < computedHash.Length; i++) {
                    if (computedHash[i] != passwordHash[i]) return false;
                }
            }

            return true;
        }
    }
}