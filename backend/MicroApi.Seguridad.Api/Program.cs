using Microsoft.EntityFrameworkCore;
using MicroApi.Seguridad.Data;
using MicroApi.Seguridad.Data.Repositories;
using MicroApi.Seguridad.Domain.Interfaces;
using MicroApi.Seguridad.Domain.Models.Soporte;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "Chaira API",
        Version = "v1",
        Description = "API para el sistema de gestión de incidencias Chaira"
    });
});

// Configurar JSON para manejar referencias circulares
builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    options.SerializerOptions.WriteIndented = true;
});

// Configurar Entity Framework Core
var connectionString = builder.Configuration.GetConnectionString("SqlServerConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));

// Registrar Repositorios
builder.Services.AddScoped<ICasoRepository, CasoRepository>();

// Configurar CORS
var corsSettings = builder.Configuration.GetSection("CorsSettings");
var allowedOrigins = corsSettings.GetSection("AllowedOrigins").Get<string[]>() ?? Array.Empty<string>();

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

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Chaira API v1");
        c.RoutePrefix = string.Empty; // Swagger en la raíz
    });
}

app.UseHttpsRedirection();
app.UseCors("AllowFrontend");

// Endpoint simple para probar la conexión a la base de datos
app.MapGet("/api/health", async (ApplicationDbContext dbContext) =>
{
    try
    {
        // Probar conexión a la base de datos
        var canConnect = await dbContext.Database.CanConnectAsync();
        return Results.Ok(new
        {
            status = "healthy",
            database = canConnect ? "connected" : "disconnected",
            timestamp = DateTime.UtcNow
        });
    }
    catch (Exception ex)
    {
        return Results.Problem(
            detail: ex.Message,
            statusCode: 500
        );
    }
})
.WithName("HealthCheck")
.WithOpenApi()
.Produces(200)
.Produces(500);

// Endpoint simple para obtener todos los casos
app.MapGet("/api/casos", async (ICasoRepository casoRepository) =>
{
    try
    {
        var casos = await casoRepository.GetAllAsync();
        return Results.Ok(casos);
    }
    catch (Exception ex)
    {
        return Results.Problem(
            detail: ex.Message,
            statusCode: 500
        );
    }
})
.WithName("GetCasos")
.WithOpenApi()
.Produces<List<Caso>>(200)
.Produces(500);

// Endpoint para obtener un caso por ID
app.MapGet("/api/casos/{id}", async (long id, ICasoRepository casoRepository) =>
{
    try
    {
        var caso = await casoRepository.GetByIdAsync(id);
        
        if (caso == null)
        {
            return Results.NotFound(new { message = $"Caso con ID {id} no encontrado" });
        }
        
        return Results.Ok(caso);
    }
    catch (Exception ex)
    {
        return Results.Problem(
            detail: ex.Message,
            statusCode: 500
        );
    }
})
.WithName("GetCasoById")
.WithOpenApi()
.Produces<Caso>(200)
.Produces(404)
.Produces(500);

app.Run();
