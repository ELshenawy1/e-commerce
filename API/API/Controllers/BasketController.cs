using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BasketController : ControllerBase
    {
        private readonly IBasketRepository basketRepository;

        public BasketController(IBasketRepository basketRepository)
        {
            this.basketRepository = basketRepository;
        }

        [HttpGet]
        public ActionResult<CustomerBasket> GetBasketByID(string id)
        {
            var basket = basketRepository.GetBasket(id);
            return Ok(basket ?? new CustomerBasket(id));
        }

        [HttpPost]
        public ActionResult<CustomerBasket> UpdateBasket(CustomerBasket basket)
        {
            var updatedBasket = basketRepository.UpdateBasket(basket);
            return Ok(updatedBasket);
        }
        [HttpDelete]
        public void DeleteBasket(string id)
        {
            basketRepository.DeleteBasket(id);  
        }
    }
}
