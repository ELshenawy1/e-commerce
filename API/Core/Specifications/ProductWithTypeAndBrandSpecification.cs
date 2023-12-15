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
        public ProductWithTypeAndBrandSpecification(string sort,int? typeid , int? brandid)
            : base(p=> 
            (!typeid.HasValue || p.ProductTypeID == typeid) && 
            (!brandid.HasValue || p.ProductBrandID == brandid))
        {
            AddIncludes(x => x.ProductType);
            AddIncludes(x => x.ProductBrand);
            AddOrderBy(p => p.Name);

            if (!string.IsNullOrEmpty(sort))
            {
                switch (sort)
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
