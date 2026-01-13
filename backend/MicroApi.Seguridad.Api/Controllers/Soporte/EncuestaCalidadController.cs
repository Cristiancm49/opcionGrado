using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MicroApi.Seguridad.Domain.DTOs.Common;
using MicroApi.Seguridad.Domain.DTOs.Soporte;
using MicroApi.Seguridad.Domain.Interfaces.Services;

namespace MicroApi.Seguridad.Api.Controllers.Soporte
{
    [ApiController]
    [Route("api/encuestas")]
    [Tags("EncuestaCalidad")]
    [Authorize]
    public class EncuestaCalidadController : ControllerBase
    {
        private readonly IEncuestaCalidadService _service;

        public EncuestaCalidadController(IEncuestaCalidadService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponseDto<IEnumerable<EncuestaCalidadDto>>>> GetAll()
        {
            var items = await _service.GetAllAsync();
            return Ok(ApiResponseDto<IEnumerable<EncuestaCalidadDto>>.SuccessResponse(items, "Encuestas obtenidas"));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponseDto<EncuestaCalidadDto>>> GetById(long id)
        {
            var item = await _service.GetByIdAsync(id);
            if (item == null)
                return NotFound(ApiResponseDto<EncuestaCalidadDto>.FailResponse("Encuesta no encontrada"));
            return Ok(ApiResponseDto<EncuestaCalidadDto>.SuccessResponse(item, "Encuesta obtenida"));
        }

        [HttpGet("count")]
        public async Task<ActionResult<ApiResponseDto<int>>> Count()
        {
            var count = await _service.CountAsync();
            return Ok(ApiResponseDto<int>.SuccessResponse(count, "Total de encuestas"));
        }

        [HttpGet("caso/{idCaso}")]
        public async Task<ActionResult<ApiResponseDto<IEnumerable<EncuestaCalidadDto>>>> GetByCaso(long idCaso)
        {
            var items = await _service.GetByCasoIdAsync(idCaso);
            return Ok(ApiResponseDto<IEnumerable<EncuestaCalidadDto>>.SuccessResponse(items, "Encuestas del caso obtenidas"));
        }

        [HttpPost]
        public async Task<ActionResult<ApiResponseDto<EncuestaCalidadDto>>> Create([FromBody] EncuestaCalidadCreateDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ApiResponseDto<EncuestaCalidadDto>.FailResponse("Datos inválidos"));

            var created = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id },
                ApiResponseDto<EncuestaCalidadDto>.SuccessResponse(created, "Encuesta creada"));
        }
    }
}

