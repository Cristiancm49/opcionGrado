using Microsoft.AspNetCore.Mvc;
using MicroApi.Seguridad.Domain.DTOs.Common;
using MicroApi.Seguridad.Domain.DTOs.Soporte;
using MicroApi.Seguridad.Domain.Interfaces.Services;

namespace MicroApi.Seguridad.Api.Controllers.Soporte
{
    [ApiController]
    [Route("api/intervenciones")]
    [Tags("IntervencionTecnica")]
    public class IntervencionTecnicaController : ControllerBase
    {
        private readonly IIntervencionTecnicaService _service;

        public IntervencionTecnicaController(IIntervencionTecnicaService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponseDto<IEnumerable<IntervencionTecnicaDto>>>> GetAll()
        {
            var items = await _service.GetAllAsync();
            return Ok(ApiResponseDto<IEnumerable<IntervencionTecnicaDto>>.SuccessResponse(items, "Intervenciones obtenidas"));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponseDto<IntervencionTecnicaDto>>> GetById(long id)
        {
            var item = await _service.GetByIdAsync(id);
            if (item == null)
                return NotFound(ApiResponseDto<IntervencionTecnicaDto>.FailResponse("Intervención no encontrada"));
            return Ok(ApiResponseDto<IntervencionTecnicaDto>.SuccessResponse(item, "Intervención obtenida"));
        }

        [HttpGet("count")]
        public async Task<ActionResult<ApiResponseDto<int>>> Count()
        {
            var count = await _service.CountAsync();
            return Ok(ApiResponseDto<int>.SuccessResponse(count, "Total de intervenciones"));
        }

        [HttpGet("trazabilidad/{idTrazabilidad}")]
        public async Task<ActionResult<ApiResponseDto<IEnumerable<IntervencionTecnicaDto>>>> GetByTrazabilidad(long idTrazabilidad)
        {
            var items = await _service.GetByTrazabilidadIdAsync(idTrazabilidad);
            return Ok(ApiResponseDto<IEnumerable<IntervencionTecnicaDto>>.SuccessResponse(items, "Intervenciones de la trazabilidad obtenidas"));
        }

        [HttpPost]
        public async Task<ActionResult<ApiResponseDto<IntervencionTecnicaDto>>> Create([FromBody] IntervencionTecnicaCreateDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ApiResponseDto<IntervencionTecnicaDto>.FailResponse("Datos inválidos"));

            var created = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id },
                ApiResponseDto<IntervencionTecnicaDto>.SuccessResponse(created, "Intervención creada"));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponseDto<IntervencionTecnicaDto>>> Update(long id, [FromBody] IntervencionTecnicaUpdateDto dto)
        {
            if (id != dto.Id)
                return BadRequest(ApiResponseDto<IntervencionTecnicaDto>.FailResponse("ID no coincide"));

            var updated = await _service.UpdateAsync(dto);
            if (updated == null)
                return NotFound(ApiResponseDto<IntervencionTecnicaDto>.FailResponse("Intervención no encontrada"));

            return Ok(ApiResponseDto<IntervencionTecnicaDto>.SuccessResponse(updated, "Intervención actualizada"));
        }
    }
}

