using Microsoft.AspNetCore.Mvc;
using MicroApi.Seguridad.Domain.DTOs.Catalogo;
using MicroApi.Seguridad.Domain.Interfaces.Services;

namespace MicroApi.Seguridad.Api.Controllers.Catalogo
{
    [ApiController]
    [Route("api/catalogo/areas-tecnicas")]
    [Produces("application/json")]
    [Tags("Catálogo")]
    public class AreaTecnicaController : ControllerBase
    {
        private readonly IAreaTecnicaService _service;
        private readonly ILogger<AreaTecnicaController> _logger;

        public AreaTecnicaController(IAreaTecnicaService service, ILogger<AreaTecnicaController> logger)
        {
            _service = service;
            _logger = logger;
            _logger.LogWarning($">>> AreaTecnicaController - Service type: {service.GetType().FullName} <<<");
        }

        [HttpGet]
        public async Task<IActionResult> ObtenerTodas()
        {
            var result = await _service.GetAllAsync();
            // DEBUG: Mostrar el tipo real del servicio
            return Ok(new { 
                serviceType = _service.GetType().FullName,
                result 
            });
        }

        [HttpGet("{id:long}")]
        public async Task<IActionResult> ObtenerPorId(long id)
        {
            var result = await _service.GetByIdAsync(id);
            return result.Success ? Ok(result) : NotFound(result);
        }

        [HttpGet("count")]
        public async Task<IActionResult> ContarTotal()
        {
            var result = await _service.CountAsync();
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Crear([FromBody] AreaTecnicaCreateDto dto)
        {
            var result = await _service.CreateAsync(dto);
            if (!result.Success) return BadRequest(result);
            return CreatedAtAction(nameof(ObtenerPorId), new { id = result.Data?.Id }, result);
        }

        [HttpPut("{id:long}")]
        public async Task<IActionResult> Actualizar(long id, [FromBody] AreaTecnicaUpdateDto dto)
        {
            var result = await _service.UpdateAsync(id, dto);
            return result.Success ? Ok(result) : NotFound(result);
        }
    }
}

