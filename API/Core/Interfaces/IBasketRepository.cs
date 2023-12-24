using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IBasketRepository
    {
        CustomerBasket GetBasket(string basketId);
        CustomerBasket UpdateBasket(CustomerBasket basket);
        bool DeleteBasket(string basketId);

    }
}
