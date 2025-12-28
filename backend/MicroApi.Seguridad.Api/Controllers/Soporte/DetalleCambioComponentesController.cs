using Microsoft.AspNetCore.Mvc;
using MicroApi.Seguridad.Domain.DTOs.Common;
using MicroApi.Seguridad.Domain.DTOs.Soporte;
using MicroApi.Seguridad.Domain.Interfaces.Services;

namespace MicroApi.Seguridad.Api.Controllers.Soporte
{
    [ApiController]
    [Route("api/cambios-componentes")]
    [Tags("DetalleCambioComponentes")]
    public class DetalleCambioComponentesController : ControllerBase
    {
        private readonly IDetalleCambioComponentesService _service;

        public DetalleCambioComponentesController(IDetalleCambioComponentesService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponseDto<IEnumerable<DetalleCambioComponentesDto>>>> GetAll()
        {
            var items = await _service.GetAllAsync();
            return Ok(ApiResponseDto<IEnumerable<DetalleCambioComponentesDto>>.SuccessResponse(items, "Cambios de componentes obtenidos"));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponseDto<DetalleCambioComponentesDto>>> GetById(long id)
        {
            var item = await _service.GetByIdAsync(id);
            if (item == null)
                return NotFound(ApiResponseDto<DetalleCambioComponentesDto>.FailResponse("Cambio de componente no encontrado"));
            return Ok(ApiResponseDto<DetalleCambioComponentesDto>.SuccessResponse(item, "Cambio de componente obtenido"));
        }

        [HttpGet("count")]
        public async Task<ActionResult<ApiResponseDto<int>>> Count()
        {
            var count = await _service.CountAsync();
            return Ok(ApiResponseDto<int>.SuccessResponse(count, "Total de cambios de componentes"));
        }

        [HttpGet("intervencion/{idIntervencion}")]
        public async Task<ActionResult<ApiResponseDto<IEnumerable<DetalleCambioComponentesDto>>>> GetByIntervencion(long idIntervencion)
        {
            var items = await _service.GetByIntervencionIdAsync(idIntervencion);
            return Ok(ApiResponseDto<IEnumerable<DetalleCambioComponentesDto>>.SuccessResponse(items, "Cambios de componentes de la intervención obtenidos"));
        }

        [HttpPost]
        public async Task<ActionResult<ApiResponseDto<DetalleCambioComponentesDto>>> Create([FromBody] DetalleCambioComponentesCreateDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ApiResponseDto<DetalleCambioComponentesDto>.FailResponse("Datos inválidos"));

            var created = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id },
                ApiResponseDto<DetalleCambioComponentesDto>.SuccessResponse(created, "Cambio de componente registrado"));
        }
    }
}

