using System;
using System.Collections.Generic;

namespace WebApplication2.Models
{
    public partial class Invoice
    {
        public Invoice()
        {
            InvoiceProducts = new HashSet<InvoiceProduct>();
        }

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


        public virtual Company IssuerNavigation { get; set; } = null!;
        public virtual ICollection<InvoiceProduct> InvoiceProducts { get; set; }
    }
}
