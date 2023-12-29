using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        private readonly IPaymentService paymentService;

        public PaymentsController(IPaymentService _paymentService)
        {
            paymentService = _paymentService;
        }


        [Authorize]
        [HttpPost("{basketId}")]
        public ActionResult<CustomerBasket> CreateOrUpdatedPaymentIntent(string basketId)
        {
            var basket = paymentService.CreateOrUpdatePaymentIntent(basketId);
            if (basket == null) return BadRequest();
            return Ok(basket);
        }
    }
}
