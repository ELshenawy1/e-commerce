using AutoMapper;
using Core.DTOs;
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
        private readonly IMapper mapper;

        public BasketController(IBasketRepository basketRepository,IMapper _mapper)
        {
            this.basketRepository = basketRepository;
            mapper = _mapper;
        }

        [HttpGet]
        public ActionResult<CustomerBasket> GetBasketByID(string id)
        {
            var basket = basketRepository.GetBasket(id);
            return Ok(basket ?? new CustomerBasket(id));
        }

        [HttpPost]
        public ActionResult<CustomerBasket> UpdateBasket(CustomerBasketDTO basket)
        {
            var updatedBasket = basketRepository.UpdateBasket(mapper.Map<CustomerBasketDTO,CustomerBasket>( basket));
            return Ok(updatedBasket);
        }
        [HttpDelete]
        public void DeleteBasket(string id)
        {
            basketRepository.DeleteBasket(id);  
        }
    }
}
