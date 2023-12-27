using AutoMapper;
using Core.DTOs;
using Core.Entities;
using Core.Entities.OrderAggregate;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, ProductToReturnDTO>()
                .ForMember(d => d.ProductBrand, o => o.MapFrom(s => s.ProductBrand.Name))
                .ForMember(d => d.ProductType, o => o.MapFrom(s => s.ProductType.Name))
                .ForMember(d => d.ImgUrl, o => o.MapFrom<ProductUrlResolver>());
            
            CreateMap<Core.Entities.Address, AddressDTO>().ReverseMap();
            
            CreateMap<BasketItem, BasketItemDTO>().ReverseMap();
            
            CreateMap<CustomerBasket, CustomerBasketDTO>().ReverseMap();
            
            CreateMap<AddressDTO, Core.Entities.OrderAggregate.Address>();
            
            CreateMap<Order, OrderToReturnDTO>()
                .ForMember(d=>d.DeliveryMethod,o=>o.MapFrom(s=>s.DeliveryMethod.ShortName))
                .ForMember(d=>d.ShippingPrice,o=>o.MapFrom(s=>s.DeliveryMethod.Price));
            
            CreateMap<OrderItem,OrderItemDTO>()
                .ForMember(d=>d.ProductID,o=>o.MapFrom(s=>s.ItemOrdered.ProductItemID))
                .ForMember(d=>d.ProductName,o=>o.MapFrom(s=>s.ItemOrdered.ProductName))
                .ForMember(d=>d.ImgUrl,o=>o.MapFrom(s=>s.ItemOrdered.ImgUrl))
                .ForMember(d=>d.ImgUrl, o=>o.MapFrom<OrderItemUrlResolver>())
                ;
        }
    }
}
