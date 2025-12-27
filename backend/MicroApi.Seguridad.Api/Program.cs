using Microsoft.EntityFrameworkCore;
using MicroApi.Seguridad.Api.Extensions;
using MicroApi.Seguridad.Data;
using MicroApi.Seguridad.Data.Repositories;
using MicroApi.Seguridad.Domain.DTOs.Common;
using MicroApi.Seguridad.Domain.Interfaces;
using MicroApi.Seguridad.Domain.Models.Soporte;

var builder = WebApplication.CreateBuilder(args);

// Controllers
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.WriteIndented = true;
    });

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "Chaira API",
        Version = "v1",
        Description = "API Mesa de Servicios"
    });
    
    c.OrderActionsBy(api => api.GroupName);
    c.TagActionsBy(api => new[] { api.GroupName ?? api.ActionDescriptor.RouteValues["controller"] });
});

// Entity Framework
var connectionString = builder.Configuration.GetConnectionString("SqlServerConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(connectionString));

// Repositorios y Servicios
builder.Services.AddRepositories();
builder.Services.AddApplicationServices();
builder.Services.AddScoped<ICasoRepository, CasoRepository>();

// CORS
var allowedOrigins = builder.Configuration.GetSection("CorsSettings:AllowedOrigins").Get<string[]>() ?? Array.Empty<string>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Chaira API v1");
        c.RoutePrefix = string.Empty;
    });
}

app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.MapControllers();

// Health Check
app.MapGet("/api/health", async (ApplicationDbContext db) =>
{
    var canConnect = await db.Database.CanConnectAsync();
    return Results.Ok(new { status = "healthy", database = canConnect ? "connected" : "disconnected", timestamp = DateTime.UtcNow });
}).WithTags("Sistema").WithOpenApi();

// Casos (temporal - migrar a Controller)
var casos = app.MapGroup("/api/soporte/casos").WithTags("Soporte (temporal)");

casos.MapGet("/", async (ICasoRepository repo) =>
{
    var data = await repo.GetAllAsync();
    return Results.Ok(new ApiResponseDto<IEnumerable<Caso>> { Success = true, Message = "OK", Data = data });
});

casos.MapGet("/{id:long}", async (long id, ICasoRepository repo) =>
{
    var caso = await repo.GetByIdAsync(id);
    return caso == null 
        ? Results.NotFound(new { message = $"Caso {id} no encontrado" }) 
        : Results.Ok(new ApiResponseDto<Caso> { Success = true, Message = "OK", Data = caso });
});

app.Run();
