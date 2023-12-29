using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs
{
    public class CustomerBasketDTO
    {
        public string ID { get; set; }
        public List<BasketItemDTO> Items { get; set; }
        public int? DeliveryMethodID { get; set; }
        public string? ClientSecret { get; set; }
        public string? PaymentIntentID { get; set; }
        public float ShippingPrice { get; set; }

    }
}
