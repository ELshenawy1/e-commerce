using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class ProductRepository : IProductRepository
    {
        private readonly StoreContext context;

        public ProductRepository(StoreContext _context)
        {
            context = _context;
        }
        public List<Product> GetAll()
        {
            return context.Products
                .Include(p => p.ProductBrand)
                .Include(p => p.ProductType)
                .ToList();
        }

        public Product GetByID(int id)
        {
            return context.Products
                .Include(p => p.ProductBrand)
                .Include(p => p.ProductType)
                .SingleOrDefault(p => p.ID == id);
        }

        public List<ProductBrand> GetProductBrands()
        {
            return context.ProductBrands.ToList();
        }

        public List<ProductType> GetProductTypes()
        {
            return context.ProductTypes.ToList();
        }
    }
}
