using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class ProductWithTypeAndBrandSpecification : BaseSpecification<Product>
    {
        public ProductWithTypeAndBrandSpecification()
        {
            AddIncludes(x => x.ProductType);
            AddIncludes(x => x.ProductBrand);
        }
        public ProductWithTypeAndBrandSpecification(int id) : base(x => x.ID == id)
        {
            AddIncludes(x => x.ProductType);
            AddIncludes(x => x.ProductBrand);

        }
    }
}
