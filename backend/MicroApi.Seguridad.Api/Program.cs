using Microsoft.EntityFrameworkCore;
using MicroApi.Seguridad.Api.Extensions;
using MicroApi.Seguridad.Data;

var builder = WebApplication.CreateBuilder(args);

// Controllers
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.WriteIndented = true;
    });

// Swagger + Redoc
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "Chaira API",
        Version = "v1",
        Description = "API Mesa de Servicios - Sistema de Gestión de Soporte Técnico"
    });
});

// Entity Framework
var connectionString = builder.Configuration.GetConnectionString("SqlServerConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(connectionString));

// Repositorios y Servicios
builder.Services.AddRepositories();
builder.Services.AddApplicationServices();

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
    app.UseSwagger(c =>
    {
        c.PreSerializeFilters.Add((swagger, httpReq) =>
        {
            // Agregar x-tagGroups para Redoc
            swagger.Extensions["x-tagGroups"] = new Microsoft.OpenApi.Any.OpenApiArray
            {
                new Microsoft.OpenApi.Any.OpenApiObject
                {
                    ["name"] = new Microsoft.OpenApi.Any.OpenApiString("🔧 Sistema"),
                    ["tags"] = new Microsoft.OpenApi.Any.OpenApiArray
                    {
                        new Microsoft.OpenApi.Any.OpenApiString("Sistema")
                    }
                },
                new Microsoft.OpenApi.Any.OpenApiObject
                {
                    ["name"] = new Microsoft.OpenApi.Any.OpenApiString("👤 Acceso"),
                    ["tags"] = new Microsoft.OpenApi.Any.OpenApiArray
                    {
                        new Microsoft.OpenApi.Any.OpenApiString("Rol"),
                        new Microsoft.OpenApi.Any.OpenApiString("Usuario")
                    }
                },
                new Microsoft.OpenApi.Any.OpenApiObject
                {
                    ["name"] = new Microsoft.OpenApi.Any.OpenApiString("📋 Catálogo"),
                    ["tags"] = new Microsoft.OpenApi.Any.OpenApiArray
                    {
                        new Microsoft.OpenApi.Any.OpenApiString("AreaTecnica"),
                        new Microsoft.OpenApi.Any.OpenApiString("CanalIngreso"),
                        new Microsoft.OpenApi.Any.OpenApiString("CategoriaActivo"),
                        new Microsoft.OpenApi.Any.OpenApiString("EstadoGeneral"),
                        new Microsoft.OpenApi.Any.OpenApiString("EstadoCaso"),
                        new Microsoft.OpenApi.Any.OpenApiString("EstadoActivo"),
                        new Microsoft.OpenApi.Any.OpenApiString("EstadoConsumible"),
                        new Microsoft.OpenApi.Any.OpenApiString("EstadoIntervencion"),
                        new Microsoft.OpenApi.Any.OpenApiString("Prioridad"),
                        new Microsoft.OpenApi.Any.OpenApiString("TipoCaso"),
                        new Microsoft.OpenApi.Any.OpenApiString("TipoConsumible"),
                        new Microsoft.OpenApi.Any.OpenApiString("TipoTrabajo")
                    }
                },
                new Microsoft.OpenApi.Any.OpenApiObject
                {
                    ["name"] = new Microsoft.OpenApi.Any.OpenApiString("📦 Inventario"),
                    ["tags"] = new Microsoft.OpenApi.Any.OpenApiArray
                    {
                        new Microsoft.OpenApi.Any.OpenApiString("Ubicacion"),
                        new Microsoft.OpenApi.Any.OpenApiString("Inventario"),
                        new Microsoft.OpenApi.Any.OpenApiString("Componente"),
                        new Microsoft.OpenApi.Any.OpenApiString("Consumible"),
                        new Microsoft.OpenApi.Any.OpenApiString("Activo"),
                        new Microsoft.OpenApi.Any.OpenApiString("HojaDeVidaActivo")
                    }
                },
                new Microsoft.OpenApi.Any.OpenApiObject
                {
                    ["name"] = new Microsoft.OpenApi.Any.OpenApiString("🎫 Soporte"),
                    ["tags"] = new Microsoft.OpenApi.Any.OpenApiArray
                    {
                        new Microsoft.OpenApi.Any.OpenApiString("Caso"),
                        new Microsoft.OpenApi.Any.OpenApiString("TrazabilidadCaso"),
                        new Microsoft.OpenApi.Any.OpenApiString("IntervencionTecnica"),
                        new Microsoft.OpenApi.Any.OpenApiString("DetalleCambioComponentes"),
                        new Microsoft.OpenApi.Any.OpenApiString("DetalleConsumible"),
                        new Microsoft.OpenApi.Any.OpenApiString("RevisionAdmi"),
                        new Microsoft.OpenApi.Any.OpenApiString("EncuestaCalidad"),
                        new Microsoft.OpenApi.Any.OpenApiString("DetalleEncuesta")
                    }
                }
            };
        });
    });
    
    // Swagger UI en la raíz
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Chaira API v1");
        c.RoutePrefix = string.Empty;
    });
    
    // Redoc en /docs (con grupos jerárquicos)
    app.UseReDoc(c =>
    {
        c.SpecUrl = "/swagger/v1/swagger.json";
        c.RoutePrefix = "docs";
        c.DocumentTitle = "Chaira API - Documentación";
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

app.Run();
