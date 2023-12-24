namespace Core.Entities
{
    public class BasketItem
    {
        public int ID { get; set; }
        public string ProductName { get; set; }
        public float Price { get; set; }
        public int Quantity { get; set; }
        public string ImgUrl { get; set; }
        public string Brand { get; set; }
        public string Type { get; set; }
    }
}