using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication2.DTOs;
using WebApplication2.Models;

namespace WebApplication2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompaniesController : ControllerBase
    {
        private readonly InvoiceManagerContext _context;

        public CompaniesController(InvoiceManagerContext context)
        {
            _context = context;
        }

        // GET: api/Companies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Company>>> GetCompanies()
        {
          if (_context.Companies == null)
          {
              return NotFound();
          }
            return await _context.Companies.ToListAsync();
        }

        // GET: api/Companies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Company>> GetCompany(int id)
        {
          if (_context.Companies == null)
          {
              return NotFound();
          }
            var company = await _context.Companies.FindAsync(id);

            if (company == null)
            {
                return NotFound();
            }

            return company;
        }

        // PUT: api/Companies/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult<Company>> PutCompany(int id, CompanyDTO companyDTO)
        {
            if (id != companyDTO.Id)
            {
                return BadRequest();
            }
            var company = await _context.Companies.FindAsync(id);
            if (company == null)
            {
                return NotFound();
            }
            company.Name = companyDTO.Name;
            company.Cui = companyDTO.Cui;
            company.RegNo = companyDTO.RegNo;
            company.Address = companyDTO.Address;
            company.Phone = companyDTO.Phone;
            company.Mail = companyDTO.Mail;
            company.Iban = companyDTO.Iban;
            company.BankName = companyDTO.BankName;
            company.CapitalAmt = companyDTO.CapitalAmt;
            company.ProfileImage = companyDTO.ProfileImage;

            _context.Entry(company).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompanyExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return company;
        }

        // POST: api/Companies
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Company>> PostCompany(CompanyDTO companyDTO)
        {
          if (_context.Companies == null)
          {
              return Problem("Entity set 'InvoiceManagerContext.Companies'  is null.");
          }
            var company = new Company()
            {
                Name = companyDTO.Name,
                Cui = companyDTO.Cui,
                RegNo = companyDTO.RegNo,
                Address = companyDTO.Address,
                Phone = companyDTO.Phone,
                Mail = companyDTO.Mail,
                Iban = companyDTO.Iban,
                BankName = companyDTO.BankName,
                CapitalAmt = companyDTO.CapitalAmt,
                ProfileImage = companyDTO.ProfileImage
        };
            _context.Companies.Add(company);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCompany", new { id = company.Id }, company);
        }

        // DELETE: api/Companies/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompany(int id)
        {
            if (_context.Companies == null)
            {
                return NotFound();
            }
            var company = await _context.Companies.FindAsync(id);
            if (company == null)
            {
                return NotFound();
            }

            _context.Companies.Remove(company);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CompanyExists(int id)
        {
            return (_context.Companies?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
