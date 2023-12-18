using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class ProductWithFiltersForCountSpecification : BaseSpecification<Product>
    {
        public ProductWithFiltersForCountSpecification(ProductSpecParams prodcutParams)
            :base(p=>
            (string.IsNullOrEmpty(prodcutParams.Search) || p.Name.ToLower().Contains(prodcutParams.Search)) &&
            (!prodcutParams.BrandID.HasValue || p.ProductBrandID == prodcutParams.BrandID) &&
            (!prodcutParams.TypeID.HasValue || p.ProductTypeID == prodcutParams.TypeID))

        {
        }
    }
}
