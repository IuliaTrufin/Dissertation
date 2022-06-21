namespace WebApplication2.DTOs
{
    public class InvoiceProductDTO
    {
        public int Id { get; set; }
        public int InvoiceId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
