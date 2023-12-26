using System.ComponentModel.DataAnnotations;

namespace Core.DTOs
{
    public class BasketItemDTO
    {
        [Required]
        public int ID { get; set; }
        [Required]
        public string ProductName { get; set; }
        [Required]
        [Range(0.1,float.MaxValue,ErrorMessage = "Price must be greater than zero")]
        public float Price { get; set; }
        [Required]
        [Range(1,int.MaxValue,ErrorMessage = "Quantity must be greater than 1")]
        public int Quantity { get; set; }
        [Required]
        public string ImgUrl { get; set; }
        [Required]
        public string Brand { get; set; }
        [Required]
        public string Type { get; set; }

    }
}