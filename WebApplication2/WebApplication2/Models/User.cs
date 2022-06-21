using System;
using System.Collections.Generic;

namespace WebApplication2.Models
{
    public partial class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string? Cnp { get; set; }
        public string? Icnumber { get; set; }
        public int CompanyId { get; set; }
        public string Role { get; set; } = null!;
        public bool Active { get; set; }
        public string? Mail { get; set; }
        public string? ProfileImage { get; set; }

        public virtual Company Company { get; set; } = null!;
    }
}
