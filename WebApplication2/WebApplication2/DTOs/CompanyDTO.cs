namespace WebApplication2.DTOs
{
    public class CompanyDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Cui { get; set; } = null!;
        public string RegNo { get; set; } = null!;
        public string? Address { get; set; }
        public string Phone { get; set; } = null!;
        public string Mail { get; set; } = null!;
        public string Iban { get; set; } = null!;
        public string? BankName { get; set; }
        public decimal? CapitalAmt { get; set; }
        public string? ProfileImage { get; set; }
    }
}
