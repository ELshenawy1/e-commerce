using Core.Entities.OrderAggregate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IOrderService
    {
        Order CreateOrder(string buyerEmail, int deliveryMethod, string basketId, Address shippingAddress);
        IReadOnlyList<Order> GetOrdersForUser(string buyerEmail);
        Order GetOrderByID(int id, string buyerEmail);
        IReadOnlyList<DeliveryMethod> GetDeliveryMethods();
        Order GetLastOrder(string buyerEmail);
    }
}
