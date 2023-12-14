using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Infrastructure;
using Infrastructure.Data;
using Core.Entities;
using Core.Interfaces;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository productRepository;



        public ProductController(IProductRepository _productRepository)
        {
            productRepository = _productRepository;
        }

        [HttpGet]
        public ActionResult<List<Product>> GetAll()
        {
            var products = productRepository.GetAll();
            return products;
        }
        [HttpGet("Types")]
        public ActionResult<List<ProductType>> GetProductTypes()
        {
            return productRepository.GetProductTypes();
        }
        [HttpGet("Brands")]
        public ActionResult<List<ProductBrand>> GetProductBrands()
        {
            return productRepository.GetProductBrands();
        }

        [HttpGet("{id}")]
        public ActionResult<Product> GetByID(int id)
        {
            var product = productRepository.GetByID(id);
            return product;
        }
    }
}
