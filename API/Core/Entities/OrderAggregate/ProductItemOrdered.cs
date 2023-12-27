using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.OrderAggregate
{
    public class ProductItemOrdered
    {
        public ProductItemOrdered()
        {
            
        }
        public ProductItemOrdered(int productItemId, string productName, string imgUrl)
        {
            ProductItemID = productItemId;
            ProductName = productName;
            ImgUrl = imgUrl;
        }
        public int ProductItemID { get; set; }
        public string ProductName { get; set; }
        public string ImgUrl { get; set; }
    }
}
