using Microsoft.EntityFrameworkCore;
using MicroApi.Seguridad.Api.Extensions;
using MicroApi.Seguridad.Data;
using MicroApi.Seguridad.Data.Repositories;
using MicroApi.Seguridad.Domain.DTOs.Catalogo;
using MicroApi.Seguridad.Domain.DTOs.Common;
using MicroApi.Seguridad.Domain.Interfaces;
using MicroApi.Seguridad.Domain.Interfaces.Services;
using MicroApi.Seguridad.Domain.Models.Soporte;

var builder = WebApplication.CreateBuilder(args);

// ==================== CONFIGURACIÓN DE SERVICIOS ====================

// Swagger (documentación de la API)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "Chaira API - Mesa de Servicios",
        Version = "v1",
        Description = "API para el sistema de gestión de casos y soporte técnico"
    });
});

// Configurar JSON para manejar referencias circulares
builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    options.SerializerOptions.WriteIndented = true;
});

// Entity Framework Core (conexión a BD)
var connectionString = builder.Configuration.GetConnectionString("SqlServerConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));

// Registrar Repositorios y Servicios (usando nuestras extensiones)
builder.Services.AddRepositories();
builder.Services.AddApplicationServices();

// Mantener el repositorio de casos existente
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

// ==================== CONFIGURACIÓN DEL PIPELINE ====================

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

// ==================== ENDPOINTS ====================

// ----- Health Check -----
app.MapGet("/api/health", async (ApplicationDbContext dbContext) =>
{
    try
    {
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
        return Results.Problem(detail: ex.Message, statusCode: 500);
    }
})
.WithName("HealthCheck")
.WithTags("Sistema")
.WithOpenApi();

// ==================== ENDPOINTS: ESTADO GENERAL ====================
// Grupo de endpoints para la tabla catalogo.EstadoGeneral (Activo/Inactivo)

var estadoGeneralGroup = app.MapGroup("/api/catalogo/estados-generales")
    .WithTags("Catálogo - Estados Generales");

// GET: Obtener todos los estados
estadoGeneralGroup.MapGet("/", async (IEstadoGeneralService service) =>
{
    var result = await service.GetAllAsync();
    return result.Success ? Results.Ok(result) : Results.BadRequest(result);
})
.WithName("GetEstadosGenerales")
.WithOpenApi()
.Produces<ApiResponseDto<IEnumerable<EstadoGeneralDto>>>(200);

// GET: Obtener estado por ID
estadoGeneralGroup.MapGet("/{id:long}", async (long id, IEstadoGeneralService service) =>
{
    var result = await service.GetByIdAsync(id);
    
    if (!result.Success)
        return Results.NotFound(result);
    
    return Results.Ok(result);
})
.WithName("GetEstadoGeneralById")
.WithOpenApi()
.Produces<ApiResponseDto<EstadoGeneralDto>>(200)
.Produces(404);

// POST: Crear nuevo estado
estadoGeneralGroup.MapPost("/", async (EstadoGeneralCreateDto createDto, IEstadoGeneralService service) =>
{
    var result = await service.CreateAsync(createDto);
    
    if (!result.Success)
        return Results.BadRequest(result);
    
    return Results.Created($"/api/catalogo/estados-generales/{result.Data?.Id}", result);
})
.WithName("CreateEstadoGeneral")
.WithOpenApi()
.Produces<ApiResponseDto<EstadoGeneralDto>>(201)
.Produces(400);

// PUT: Actualizar estado existente
estadoGeneralGroup.MapPut("/{id:long}", async (long id, EstadoGeneralUpdateDto updateDto, IEstadoGeneralService service) =>
{
    var result = await service.UpdateAsync(id, updateDto);
    
    if (!result.Success)
        return Results.NotFound(result);
    
    return Results.Ok(result);
})
.WithName("UpdateEstadoGeneral")
.WithOpenApi()
.Produces<ApiResponseDto<EstadoGeneralDto>>(200)
.Produces(404);

// GET: Contar total de estados
estadoGeneralGroup.MapGet("/count", async (IEstadoGeneralService service) =>
{
    var result = await service.CountAsync();
    return Results.Ok(result);
})
.WithName("CountEstadosGenerales")
.WithOpenApi();


// ==================== ENDPOINTS: CASOS (existentes) ====================

var casosGroup = app.MapGroup("/api/soporte/casos")
    .WithTags("Soporte - Casos");

casosGroup.MapGet("/", async (ICasoRepository casoRepository) =>
{
    try
    {
        var casos = await casoRepository.GetAllAsync();
        return Results.Ok(new ApiResponseDto<IEnumerable<Caso>>
        {
            Success = true,
            Message = "Casos obtenidos",
            Data = casos
        });
    }
    catch (Exception ex)
    {
        return Results.Problem(detail: ex.Message, statusCode: 500);
    }
})
.WithName("GetCasos")
.WithOpenApi();

casosGroup.MapGet("/{id:long}", async (long id, ICasoRepository casoRepository) =>
{
    try
    {
        var caso = await casoRepository.GetByIdAsync(id);
        
        if (caso == null)
            return Results.NotFound(new { message = $"Caso con ID {id} no encontrado" });
        
        return Results.Ok(new ApiResponseDto<Caso>
        {
            Success = true,
            Message = "Caso obtenido",
            Data = caso
        });
    }
    catch (Exception ex)
    {
        return Results.Problem(detail: ex.Message, statusCode: 500);
    }
})
.WithName("GetCasoById")
.WithOpenApi();

app.Run();
