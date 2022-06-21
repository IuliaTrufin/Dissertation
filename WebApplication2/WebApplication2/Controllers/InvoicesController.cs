using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
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
    public class InvoicesController : ControllerBase
    {
        private readonly InvoiceManagerContext _context;

        public InvoicesController(InvoiceManagerContext context)
        {
            _context = context;
        }

        // GET: api/Invoices
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Invoice>>> GetInvoices()
        {
          if (_context.Invoices == null)
          {
              return NotFound();
          }
            return await _context.Invoices.ToListAsync();
        }

        // GET: api/Invoices/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Invoice>> GetInvoice(int id)
        {
          if (_context.Invoices == null)
          {
              return NotFound();
          }
            var invoice = await _context.Invoices.FindAsync(id);

            if (invoice == null)
            {
                return NotFound();
            }

            return invoice;
        }

        // PUT: api/Invoices/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult<Invoice>> PutInvoice(int id, InvoiceDTO invoiceDTO)
        {
            if (id != invoiceDTO.Id)
            {
                return BadRequest();
            }
            var invoice = await _context.Invoices.FindAsync(id);
            if (invoice == null)
            {
                return NotFound();
            }
            invoice.InvoiceNo = invoiceDTO.InvoiceNo;
            invoice.SerialNo = invoiceDTO.SerialNo;
            invoice.DueDate = invoiceDTO.DueDate;
            invoice.Issuer = invoiceDTO.Issuer;
            invoice.BilledTo = invoiceDTO.BilledTo;
            invoice.Paid = invoiceDTO.Paid;
            invoice.TotalAmount = invoiceDTO.TotalAmount;
            invoice.CreatedAt = invoiceDTO.CreatedAt;
            invoice.Type = invoiceDTO.Type;
            invoice.ProfileImage = invoiceDTO.ProfileImage;

            _context.Entry(invoice).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InvoiceExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return invoice;
        }

        // POST: api/Invoices
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<InvoiceIdDTO>> PostInvoice(InvoiceDTO invoiceDTO)
        {
          if (_context.Invoices == null)
          {
              return Problem("Entity set 'InvoiceManagerContext.Invoices'  is null.");
          }
            var invoice = new Invoice();
            invoice.InvoiceNo = invoiceDTO.InvoiceNo;
            invoice.SerialNo = invoiceDTO.SerialNo;
            invoice.DueDate = invoiceDTO.DueDate;
            invoice.Issuer = invoiceDTO.Issuer;
            invoice.BilledTo = invoiceDTO.BilledTo;
            invoice.Paid = invoiceDTO.Paid;
            invoice.TotalAmount = invoiceDTO.TotalAmount;
            invoice.CreatedAt = invoiceDTO.CreatedAt;
            invoice.Type = invoiceDTO.Type;
            invoice.ProfileImage = invoiceDTO.ProfileImage;

            _context.Invoices.Add(invoice);
            await _context.SaveChangesAsync();

            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential("trufin.iuliana.x9f@student.ucv.ro", "4OO0VV9CY"),
                EnableSsl = true,
            };

            var company = _context.Companies.First(x => x.Id == invoice.Issuer);

            var mailMessage = new MailMessage
            {
                From = new MailAddress("trufin.iuliana.x9f@student.ucv.ro"),
                Subject = $"Invoice Created",
                Body = $"A new invoice with number {invoice.InvoiceNo} was created at {invoice.CreatedAt} for company {company.Name}",
                IsBodyHtml = true,
            };

            var users = _context.Users.Where(user => user.Role == "SuperAdmin" || user.Role == "Admin" && user.CompanyId == invoice.Issuer).ToList();
            users.ForEach(user =>
            {
                if(user.Mail != null) mailMessage.To.Add(user.Mail);
            });

            smtpClient.Send(mailMessage);



            return new InvoiceIdDTO() { Id = invoice.Id };
        }

        // DELETE: api/Invoices/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInvoice(int id)
        {
            if (_context.Invoices == null)
            {
                return NotFound();
            }
            var invoice = await _context.Invoices.FindAsync(id);
            if (invoice == null)
            {
                return NotFound();
            }

            _context.Invoices.Remove(invoice);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InvoiceExists(int id)
        {
            return (_context.Invoices?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}