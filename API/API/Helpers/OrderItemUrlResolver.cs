using AutoMapper;
using Core.DTOs;
using Core.Entities;
using Core.Entities.OrderAggregate;

namespace API.Helpers
{
    public class OrderItemUrlResolver : IValueResolver<OrderItem, OrderItemDTO, string>
    {
        private readonly IConfiguration config;

        public OrderItemUrlResolver(IConfiguration _config)
        {
            config = _config;
        }
        public string Resolve(OrderItem source, OrderItemDTO destination, string destMember, ResolutionContext context)
        {
            if (!string.IsNullOrEmpty(source.ItemOrdered.ImgUrl))
                return config["ApiUrl"] + "images/" + source.ItemOrdered.ImgUrl;
            return null;
        }
    }
}
