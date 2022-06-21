using System;
using System.Collections.Generic;

namespace WebApplication2.Models
{
    public partial class Company
    {
        public Company()
        {
            Invoices = new HashSet<Invoice>();
            Users = new HashSet<User>();
        }

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

        public virtual ICollection<Invoice> Invoices { get; set; }
        public virtual ICollection<User> Users { get; set; }
    }
}
