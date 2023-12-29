using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Microsoft.Extensions.Configuration;
using Stripe;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IBasketRepository basketRepository;
        private readonly IConfiguration configuration;

        public PaymentService(IUnitOfWork _unitOfWork,
                              IBasketRepository _basketRepository, 
                              IConfiguration _configuration)
        {
            unitOfWork = _unitOfWork;
            basketRepository = _basketRepository;
            configuration = _configuration;
        }


        public CustomerBasket CreateOrUpdatePaymentIntent(string basketId)
        {
            StripeConfiguration.ApiKey = configuration["StripeSettings:Secretkey"];

            var basket = basketRepository.GetBasket(basketId);
            var shippingPrice = 0f;

            if (basket.DeliveryMethodID.HasValue)
            {
                var deliveryMethod = unitOfWork.Repository<DeliveryMethod>().GetByID((int)basket.DeliveryMethodID);
                shippingPrice = deliveryMethod.Price;
            }

            foreach (var item in basket.Items)
            {
                var productItem = unitOfWork.Repository<Core.Entities.Product>().GetByID(item.ID);
                if (item.Price != productItem.Price)
                {
                    item.Price = productItem.Price;
                }
            }


            var service = new PaymentIntentService();
            PaymentIntent intent;
            if (string.IsNullOrEmpty(basket.PaymentIntentID))
            {
                var options = new PaymentIntentCreateOptions
                {
                    Amount = (long)basket.Items.Sum(i => i.Quantity * (i.Price * 100)) + (long)(shippingPrice * 100),
                    Currency = "usd",
                    PaymentMethodTypes = new List<string> { "card" }
                };
                intent = service.Create(options);
                basket.PaymentIntentID = intent.Id;
                basket.ClientSecret = intent.ClientSecret;
            }
            else
            {
                var options = new PaymentIntentUpdateOptions
                {
                    Amount = (long)basket.Items.Sum(i => i.Quantity * (i.Price * 100)) + (long)(shippingPrice * 100),
                };
                service.Update(basket.PaymentIntentID, options);
            }
            basketRepository.UpdateBasket(basket);
            return basket;
        }
    }
}
