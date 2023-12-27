using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs
{
    public class OrderDTO
    {
        public string BasketID { get; set; }
        public int DeliveryMethod { get; set; }
        public AddressDTO ShipToAddress { get; set; }

    }
}
