using Microsoft.AspNetCore.Mvc;
using MicroApi.Seguridad.Domain.DTOs.Acceso;
using MicroApi.Seguridad.Domain.Interfaces.Services;

namespace MicroApi.Seguridad.Api.Controllers.Acceso
{
    [ApiController]
    [Route("api/acceso/roles")]
    [Produces("application/json")]
    [Tags("Rol")]
    public class RolController : ControllerBase
    {
        private readonly IRolService _service;

        public RolController(IRolService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> ObtenerTodos()
        {
            var result = await _service.GetAllAsync();
            return Ok(result);
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
        public async Task<IActionResult> Crear([FromBody] RolCreateDto dto)
        {
            var result = await _service.CreateAsync(dto);
            if (!result.Success) return BadRequest(result);
            return CreatedAtAction(nameof(ObtenerPorId), new { id = result.Data?.Id }, result);
        }

        [HttpPut("{id:long}")]
        public async Task<IActionResult> Actualizar(long id, [FromBody] RolUpdateDto dto)
        {
            var result = await _service.UpdateAsync(id, dto);
            return result.Success ? Ok(result) : NotFound(result);
        }
    }
}

