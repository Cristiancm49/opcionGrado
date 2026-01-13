using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MicroApi.Seguridad.Domain.DTOs.Common;
using MicroApi.Seguridad.Domain.DTOs.Soporte;
using MicroApi.Seguridad.Domain.Interfaces.Services;

namespace MicroApi.Seguridad.Api.Controllers.Soporte
{
    [ApiController]
    [Route("api/revisiones-admi")]
    [Tags("RevisionAdmi")]
    [Authorize]
    public class RevisionAdmiController : ControllerBase
    {
        private readonly IRevisionAdmiService _service;

        public RevisionAdmiController(IRevisionAdmiService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponseDto<IEnumerable<RevisionAdmiDto>>>> GetAll()
        {
            var items = await _service.GetAllAsync();
            return Ok(ApiResponseDto<IEnumerable<RevisionAdmiDto>>.SuccessResponse(items, "Revisiones administrativas obtenidas"));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponseDto<RevisionAdmiDto>>> GetById(long id)
        {
            var item = await _service.GetByIdAsync(id);
            if (item == null)
                return NotFound(ApiResponseDto<RevisionAdmiDto>.FailResponse("Revisión administrativa no encontrada"));
            return Ok(ApiResponseDto<RevisionAdmiDto>.SuccessResponse(item, "Revisión administrativa obtenida"));
        }

        [HttpGet("count")]
        public async Task<ActionResult<ApiResponseDto<int>>> Count()
        {
            var count = await _service.CountAsync();
            return Ok(ApiResponseDto<int>.SuccessResponse(count, "Total de revisiones administrativas"));
        }

        [HttpGet("intervencion/{idIntervencion}")]
        public async Task<ActionResult<ApiResponseDto<RevisionAdmiDto>>> GetByIntervencion(long idIntervencion)
        {
            var item = await _service.GetByIntervencionIdAsync(idIntervencion);
            if (item == null)
                return NotFound(ApiResponseDto<RevisionAdmiDto>.FailResponse("No hay revisión para esta intervención"));
            return Ok(ApiResponseDto<RevisionAdmiDto>.SuccessResponse(item, "Revisión de la intervención obtenida"));
        }

        [HttpPost]
        public async Task<ActionResult<ApiResponseDto<RevisionAdmiDto>>> Create([FromBody] RevisionAdmiCreateDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ApiResponseDto<RevisionAdmiDto>.FailResponse("Datos inválidos"));

            var created = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id },
                ApiResponseDto<RevisionAdmiDto>.SuccessResponse(created, "Revisión administrativa creada"));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponseDto<RevisionAdmiDto>>> Update(long id, [FromBody] RevisionAdmiUpdateDto dto)
        {
            if (id != dto.Id)
                return BadRequest(ApiResponseDto<RevisionAdmiDto>.FailResponse("ID no coincide"));

            var updated = await _service.UpdateAsync(dto);
            if (updated == null)
                return NotFound(ApiResponseDto<RevisionAdmiDto>.FailResponse("Revisión administrativa no encontrada"));

            return Ok(ApiResponseDto<RevisionAdmiDto>.SuccessResponse(updated, "Revisión administrativa actualizada"));
        }
    }
}

