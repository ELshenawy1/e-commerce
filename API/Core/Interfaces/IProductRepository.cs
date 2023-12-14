using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IProductRepository
    {
        List<Product> GetAll();
        Product GetByID(int id);
        List<ProductBrand> GetProductBrands();
        List<ProductType> GetProductTypes();
    }
}
