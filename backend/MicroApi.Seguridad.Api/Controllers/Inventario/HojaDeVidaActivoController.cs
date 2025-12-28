using Microsoft.AspNetCore.Mvc;
using MicroApi.Seguridad.Domain.DTOs.Inventario;
using MicroApi.Seguridad.Domain.Interfaces.Services;

namespace MicroApi.Seguridad.Api.Controllers.Inventario
{
    [ApiController]
    [Route("api/inventario/hojas-vida")]
    [Produces("application/json")]
    [Tags("HojaDeVidaActivo")]
    public class HojaDeVidaActivoController : ControllerBase
    {
        private readonly IHojaDeVidaActivoService _service;

        public HojaDeVidaActivoController(IHojaDeVidaActivoService service)
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

        [HttpGet("activo/{idActivo:long}")]
        public async Task<IActionResult> ObtenerPorActivo(long idActivo)
        {
            var result = await _service.GetByActivoIdAsync(idActivo);
            return Ok(result);
        }

        [HttpGet("count")]
        public async Task<IActionResult> ContarTotal()
        {
            var result = await _service.CountAsync();
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Crear([FromBody] HojaDeVidaActivoCreateDto dto)
        {
            var result = await _service.CreateAsync(dto);
            if (!result.Success) return BadRequest(result);
            return CreatedAtAction(nameof(ObtenerPorId), new { id = result.Data?.Id }, result);
        }
    }
}


