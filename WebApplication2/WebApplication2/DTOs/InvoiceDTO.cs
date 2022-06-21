namespace WebApplication2.DTOs
{
    public class InvoiceDTO
    {
        public int Id { get; set; }
        public bool Imported { get; set; }
        public string InvoiceNo { get; set; } = null!;
        public string SerialNo { get; set; } = null!;
        public DateTime DueDate { get; set; }
        public int Issuer { get; set; }
        public string BilledTo { get; set; } = null!;
        public bool Paid { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal TotalVat { get; set; }
        public bool Printed { get; set; }
        public string Type { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
        public string? ProfileImage { get; set; }



    }
    public class InvoiceIdDTO
    {
        public int Id { get; set; }

    }


}
