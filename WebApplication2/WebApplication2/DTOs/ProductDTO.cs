namespace WebApplication2.DTOs
{
    public class ProductDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public int Stock { get; set; }
        public decimal Price { get; set; }
        public decimal Vat { get; set; }
        public string? ProfileImage { get; set; }
    }
}
