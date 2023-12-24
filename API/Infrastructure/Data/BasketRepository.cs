using Core.Entities;
using Core.Interfaces;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class BasketRepository : IBasketRepository
    {
        private readonly IDatabase database;

        public BasketRepository(IConnectionMultiplexer connectionMultiplexer)
        {
            database = connectionMultiplexer.GetDatabase();
        }

        public bool DeleteBasket(string basketId)
        {
            return database.KeyDelete(basketId);
        }

        public CustomerBasket GetBasket(string basketId)
        {
            var data = database.StringGet(basketId);
            return data.IsNullOrEmpty ? null : JsonSerializer.Deserialize<CustomerBasket>(data);
        }

        public CustomerBasket UpdateBasket(CustomerBasket basket)
        {
            var created = database.StringSet(basket.ID, JsonSerializer.Serialize(basket),TimeSpan.FromDays(30));
            return (created ? GetBasket(basket.ID) : null);
        }
    }
}
