using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Net.Mail;
using WebApplication2.Models;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddDbContext<InvoiceManagerContext>();
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors(options => {
        options.AllowAnyHeader();
        options.AllowAnyOrigin();
        options.AllowAnyMethod();
    });
}

app.UseAuthorization();

app.MapControllers();

app.Run();
