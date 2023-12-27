using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.OrderAggregate
{
    public class OrderItem
    {
        public OrderItem()
        {
            
        }
        public OrderItem(ProductItemOrdered itemOrdered, float price, int quantity)
        {
            ItemOrdered = itemOrdered; 
            Price = price;
            Quantity = quantity;
        }
        public int ID { get; set; }
        public ProductItemOrdered ItemOrdered { get; set; }
        public float Price { get; set; }
        public int Quantity { get; set; }

    }
}
