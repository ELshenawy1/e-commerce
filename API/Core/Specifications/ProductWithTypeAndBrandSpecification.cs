using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class ProductWithTypeAndBrandSpecification : BaseSpecification<Product>
    {
        public ProductWithTypeAndBrandSpecification(ProductSpecParams  prodcutParams)
            : base(p=> 
            (string.IsNullOrEmpty(prodcutParams.Search) || p.Name.ToLower().Contains(prodcutParams.Search) )&& 
            (!prodcutParams.TypeID.HasValue || p.ProductTypeID == prodcutParams.TypeID) && 
            (!prodcutParams.BrandID.HasValue || p.ProductBrandID == prodcutParams.BrandID))
        {
            AddIncludes(x => x.ProductType);
            AddIncludes(x => x.ProductBrand);
            AddOrderBy(p => p.Name);
            ApplyPaging(prodcutParams.PageSize , prodcutParams.PageSize * (prodcutParams.PageIndex - 1));

            if (!string.IsNullOrEmpty(prodcutParams.Sort))
            {
                switch (prodcutParams.Sort)
                {
                    case "PriceAsc":
                        AddOrderBy(x=> x.Price); 
                        break;
                    case "PriceDesc":
                        AddOrderByDescending(x=> x.Price); 
                        break;
                    default:
                        AddOrderBy(p => p.Name);
                        break;
                            
                }
            }
        }
        public ProductWithTypeAndBrandSpecification(int id) : base(x => x.ID == id)
        {
            AddIncludes(x => x.ProductType);
            AddIncludes(x => x.ProductBrand);

        }
    }
}
