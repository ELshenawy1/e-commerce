using AutoMapper;
using AutoMapper.Execution;
using Core.DTOs;
using Core.Entities;

namespace API.Helpers
{
    public class ProductUrlResolver : IValueResolver<Product, ProductToReturnDTO, string>
    {
        private readonly IConfiguration config;

        public ProductUrlResolver(IConfiguration _config)
        {
            config = _config;
        }
        public string Resolve(Product source, ProductToReturnDTO destination, string destMember, ResolutionContext context)
        {
            if(!string.IsNullOrEmpty(source.ImgUrl))
                return config["ApiUrl"]+ "images/" + source.ImgUrl;
            return null ;
        }
    }
}
