using API.Extensions;
using AutoMapper;
using Core.DTOs;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService orderService;
        private readonly IMapper mapper;

        public OrdersController(IOrderService _orderService, IMapper _mapper)
        {
            orderService = _orderService;
            mapper = _mapper;
        }

        [HttpPost]
        public ActionResult<Order> CreateOrder(OrderDTO orderDto)
        {
            var email = User.RetrieveEmailFromPrincipal();
            var address = mapper.Map<AddressDTO, Address>(orderDto.ShipToAddress);
            var order = orderService.CreateOrder(email,orderDto.DeliveryMethod,orderDto.BasketID,address);

            return (order == null) ? BadRequest() : Ok(order);
        }

        [HttpGet]
        public ActionResult<IReadOnlyList<OrderToReturnDTO>> GetOrdersForUser()
        {
            var email = User.RetrieveEmailFromPrincipal();
            var orders = orderService.GetOrdersForUser(email);
            return Ok(mapper.Map<IReadOnlyList<Order>, IReadOnlyList<OrderToReturnDTO>>(orders));
        }
        [HttpGet("Last")]
        public ActionResult<OrderToReturnDTO> GetLastOrder()
        {
            var email = User.RetrieveEmailFromPrincipal();
            var order = orderService.GetLastOrder(email);
            return Ok(mapper.Map<Order, OrderToReturnDTO>(order));
        }
        [HttpGet("{id}")]
        public ActionResult<OrderToReturnDTO> GetOrderByIDForUser(int id)
        {
            var email = User.RetrieveEmailFromPrincipal();
            var order = orderService.GetOrderByID(id, email);
            return (order == null) ? NotFound() : Ok(mapper.Map<Order,OrderToReturnDTO>(order));
        }
        [HttpGet("DeliveryMethod")]
        public ActionResult<IReadOnlyList<DeliveryMethod>> GetDeliveryMethods()
        {
            return Ok(orderService.GetDeliveryMethods());
        }
    }
}
