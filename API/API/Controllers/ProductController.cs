using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Infrastructure;
using Infrastructure.Data;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Core.DTOs;
using AutoMapper;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IGenericRepository<Product> productRepository;
        private readonly IGenericRepository<ProductBrand> productBrandRepository;
        private readonly IGenericRepository<ProductType> productTypeRepository;
        private readonly IMapper mapper;

        public ProductController(IGenericRepository<Product> _productRepository,
                                 IGenericRepository<ProductBrand> _productBrandRepository,
                                 IGenericRepository<ProductType> _productTypeRepository,
                                 IMapper _mapper)
        {
            productRepository = _productRepository;
            productBrandRepository = _productBrandRepository;
            productTypeRepository = _productTypeRepository;
            mapper = _mapper;
        }


        [HttpGet("Types")]
        public ActionResult<List<ProductType>> GetProductTypes()
        {
            return productTypeRepository.GetAll();
        }
        [HttpGet("Brands")]
        public ActionResult<List<ProductBrand>> GetProductBrands()
        {
            return productBrandRepository.GetAll();
        }
        [HttpGet]

        public ActionResult<List<ProductToReturnDTO>> GetAllProduct()
        {
            var spec = new ProductWithTypeAndBrandSpecification();
            var products = productRepository.List(spec);
            return mapper.Map<List<Product>,List< ProductToReturnDTO >>(products);
        }

        [HttpGet("{id}")]
        public ActionResult<ProductToReturnDTO> GetProductByID(int id)
        {
            var spec = new ProductWithTypeAndBrandSpecification(id);
            var product = productRepository.GetEntityWithSpecification(spec);
            return mapper.Map<Product, ProductToReturnDTO>(product);
        }
    }
}
