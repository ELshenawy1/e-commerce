namespace Core.DTOs
{
    public class OrderItemDTO
    {
        public int ProductID { get; set; }
        public string ProductName { get; set; }
        public string ImgUrl { get; set; }
        public float Price { get; set; }
        public int Quantity { get; set; }

    }
}