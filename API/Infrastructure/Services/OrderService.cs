using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class OrderService : IOrderService
    {
        private readonly IBasketRepository basketRepository;
        private readonly IUnitOfWork unitOfWork;

        public OrderService(IBasketRepository _basketRepository, IUnitOfWork _unitOfWork)
        {
            basketRepository = _basketRepository;
            unitOfWork = _unitOfWork;
        }


        public Order CreateOrder(string buyerEmail, 
                                 int deliveryMethodId, 
                                 string basketId, 
                                 Core.Entities.OrderAggregate.Address shippingAddress)
        {
            //Get the basket from basket repository
            var basket = basketRepository.GetBasket(basketId);
            //Get the items from items repository
            var items = new List<OrderItem>();
            foreach (var item in basket.Items)
            {
                var productItem = unitOfWork.Repository<Product>().GetByID(item.ID);
                var itemOrdered = new ProductItemOrdered(productItem.ID, productItem.Name, productItem.ImgUrl);
                var orderItem = new OrderItem(itemOrdered, productItem.Price,item.Quantity);
                items.Add(orderItem);
            }
            //get delivery method from the repo
            var deliveryMethod = unitOfWork.Repository<DeliveryMethod>().GetByID(deliveryMethodId);
            //calc subtotal
            var subtotal = items.Sum(item => item.Price * item.Quantity);
            //create the order 
            var order = new Order(items, buyerEmail, shippingAddress, deliveryMethod, subtotal);
            unitOfWork.Repository<Order>().Add(order);
            //save to DB
            var result = unitOfWork.Complete();
            //delete Basket
            basketRepository.DeleteBasket(basketId);
            //return order
            if (result <= 0) return null;
            return order;
        }

        public IReadOnlyList<DeliveryMethod> GetDeliveryMethods()
        {
            return unitOfWork.Repository<DeliveryMethod>().GetAll();
        }

        public Order GetOrderByID(int id, string buyerEmail) 
        {
            var spec = new OrderWithItemsAndOrderingSpecification(id,buyerEmail);
            return unitOfWork.Repository<Order>().GetEntityWithSpecification(spec);

        }

        public IReadOnlyList<Order> GetOrdersForUser(string buyerEmail)
        {
            var spec = new OrderWithItemsAndOrderingSpecification(buyerEmail);
            return unitOfWork.Repository<Order>().List(spec);
        }
    }
}
