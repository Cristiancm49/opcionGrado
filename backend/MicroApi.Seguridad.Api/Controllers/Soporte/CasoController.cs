using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MicroApi.Seguridad.Domain.DTOs.Common;
using MicroApi.Seguridad.Domain.DTOs.Soporte;
using MicroApi.Seguridad.Domain.Interfaces.Services;

namespace MicroApi.Seguridad.Api.Controllers.Soporte
{
    [ApiController]
    [Route("api/casos")]
    [Tags("Caso")]
    [Authorize]
    public class CasoController : ControllerBase
    {
        private readonly ICasoService _service;

        public CasoController(ICasoService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponseDto<IEnumerable<CasoDto>>>> GetAll()
        {
            var items = await _service.GetAllAsync();
            return Ok(ApiResponseDto<IEnumerable<CasoDto>>.SuccessResponse(items, "Casos obtenidos"));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponseDto<CasoDetalleDto>>> GetById(long id)
        {
            var item = await _service.GetDetalleByIdAsync(id);
            if (item == null)
                return NotFound(ApiResponseDto<CasoDetalleDto>.FailResponse("Caso no encontrado"));
            return Ok(ApiResponseDto<CasoDetalleDto>.SuccessResponse(item, "Caso obtenido"));
        }

        [HttpGet("count")]
        public async Task<ActionResult<ApiResponseDto<int>>> Count()
        {
            var count = await _service.CountAsync();
            return Ok(ApiResponseDto<int>.SuccessResponse(count, "Total de casos"));
        }

        [HttpGet("tecnico/{idTecnico}")]
        public async Task<ActionResult<ApiResponseDto<IEnumerable<CasoDto>>>> GetByTecnico(long idTecnico)
        {
            var items = await _service.GetByTecnicoAsync(idTecnico);
            return Ok(ApiResponseDto<IEnumerable<CasoDto>>.SuccessResponse(items, "Casos del técnico obtenidos"));
        }

        [HttpGet("estado/{idEstado}")]
        public async Task<ActionResult<ApiResponseDto<IEnumerable<CasoDto>>>> GetByEstado(long idEstado)
        {
            var items = await _service.GetByEstadoAsync(idEstado);
            return Ok(ApiResponseDto<IEnumerable<CasoDto>>.SuccessResponse(items, "Casos por estado obtenidos"));
        }

        [HttpPost("filtros")]
        public async Task<ActionResult<ApiResponseDto<IEnumerable<CasoDto>>>> GetByFiltros([FromBody] CasoFiltrosDto filtros)
        {
            var items = await _service.GetByFiltrosAsync(filtros);
            return Ok(ApiResponseDto<IEnumerable<CasoDto>>.SuccessResponse(items, "Casos filtrados obtenidos"));
        }

        [HttpPost]
        public async Task<ActionResult<ApiResponseDto<CasoDto>>> Create([FromBody] CasoCreateDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ApiResponseDto<CasoDto>.FailResponse("Datos inválidos"));

            var created = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id },
                ApiResponseDto<CasoDto>.SuccessResponse(created, "Caso creado"));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponseDto<CasoDto>>> Update(long id, [FromBody] CasoUpdateDto dto)
        {
            if (id != dto.Id)
                return BadRequest(ApiResponseDto<CasoDto>.FailResponse("ID no coincide"));

            var updated = await _service.UpdateAsync(dto);
            if (updated == null)
                return NotFound(ApiResponseDto<CasoDto>.FailResponse("Caso no encontrado"));

            return Ok(ApiResponseDto<CasoDto>.SuccessResponse(updated, "Caso actualizado"));
        }

    }
}

