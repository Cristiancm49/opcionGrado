# 📋 ESPECIFICACIÓN TÉCNICA - MÓDULO DE SOPORTE
## Sistema de Gestión de Casos con Stored Procedures + Dapper

---

## 🎯 OBJETIVO

Implementar el módulo de Soporte usando **Stored Procedures** en SQL Server consumidos con **Dapper** desde .NET, garantizando:

1. **Trazabilidad automática** - Registro histórico de todos los cambios
2. **Integridad de datos** - Lógica de negocio en la base de datos
3. **Rendimiento optimizado** - Consultas complejas eficientes
4. **Auditoría completa** - Historial inmutable de eventos

---

## 📊 ENTENDIMIENTO DEL FLUJO

### Concepto de Trazabilidad

**La tabla `TrazabilidadCaso` es el historial completo del caso:**

```
Ejemplo de trazabilidad de un caso:

18 Dic 2024 10:30 - CREACION - Caso creado por Juan Pérez
18 Dic 2024 11:15 - ASIGNACION_TECNICO - Asignado a técnico María López
21 Dic 2024 09:00 - CAMBIO_ESTADO - Estado cambiado a "En Proceso"
21 Dic 2024 14:30 - INTERVENCION_REGISTRADA - Se registró intervención técnica
24 Dic 2024 10:00 - CAMBIO_ESTADO - Estado cambiado a "Resuelto"
26 Dic 2024 08:00 - CAMBIO_ESTADO - Estado cambiado a "Cerrado"
```

**En el frontend:**
- Vista principal: Solo muestra el **estado actual** del caso
- Vista de detalle/seguimiento: Muestra **toda la trazabilidad** (historial completo)

---

## 🗂️ ESTRUCTURA DE DATOS

### Tabla: `soporte.TrazabilidadCaso`

```sql
CREATE TABLE soporte.TrazabilidadCaso (
    Id BIGINT IDENTITY(1,1) PRIMARY KEY,
    IdCaso BIGINT NOT NULL,
    FechaEvento DATETIME NOT NULL DEFAULT GETUTCDATE(),
    IdUsuarioAccion BIGINT NOT NULL,
    TipoEvento NVARCHAR(50) NOT NULL,
    Comentario NVARCHAR(500),
    IdEstadoCaso BIGINT,
    IdAreaTecnica BIGINT,
    IdTecnicoAsignado BIGINT,
    CONSTRAINT FK_Trazabilidad_Caso FOREIGN KEY (IdCaso) REFERENCES soporte.Caso(IdCaso),
    CONSTRAINT FK_Trazabilidad_Usuario FOREIGN KEY (IdUsuarioAccion) REFERENCES acceso.Usuario(IdUsuario)
)

-- Índices para rendimiento
CREATE INDEX IX_Trazabilidad_IdCaso ON soporte.TrazabilidadCaso(IdCaso, FechaEvento DESC)
CREATE INDEX IX_Trazabilidad_Fecha ON soporte.TrazabilidadCaso(FechaEvento DESC)
```

### Tipos de Evento (TipoEvento)

| Tipo | Descripción | Se registra cuando... |
|------|-------------|----------------------|
| `CREACION` | Caso creado | Se crea el caso |
| `ASIGNACION_TECNICO` | Técnico asignado/reasignado | Se asigna o cambia técnico |
| `CAMBIO_ESTADO` | Estado modificado | Cambia el estado del caso |
| `ASIGNACION_ACTIVO` | Activo asignado | Se asocia un activo al caso |
| `CAMBIO_AREA` | Área técnica cambiada | Se cambia el área técnica |
| `ESCALAMIENTO` | Caso escalado | Se escala a otra área/técnico |
| `INTERVENCION_REGISTRADA` | Intervención técnica creada | Técnico registra intervención |
| `REVISION_APROBADA` | Revisión administrativa aprobada | Admin aprueba intervención |
| `REVISION_RECHAZADA` | Revisión administrativa rechazada | Admin rechaza intervención |
| `ENCUESTA_COMPLETADA` | Encuesta de calidad completada | Usuario llena encuesta |
| `COMENTARIO` | Comentario agregado | Se agrega nota/comentario |

---

## 🔧 STORED PROCEDURES - ESPECIFICACIÓN COMPLETA

### 1. `sp_Caso_Crear`

**Propósito:** Crear un nuevo caso con trazabilidad inicial automática

**Parámetros de entrada:**
```sql
@Descripcion NVARCHAR(MAX),
@IdUsuarioReporta BIGINT,
@TelefonoContacto NVARCHAR(20) = NULL,
@CorreoContacto NVARCHAR(150) = NULL,
@IdTipoCaso BIGINT,
@IdPrioridad BIGINT,
@IdCanalIngreso BIGINT,
@IdAreaTecnica BIGINT = NULL,
@IdActivo BIGINT = NULL,
@IdTecnicoAsignado BIGINT = NULL,
@IdUsuarioCreacion BIGINT
```

**Parámetros de salida:**
```sql
@IdCasoNuevo BIGINT OUTPUT,
@NumeroCaso NVARCHAR(50) OUTPUT
```

**Lógica:**
```sql
BEGIN TRANSACTION

-- 1. Obtener estado inicial "Nuevo"
DECLARE @IdEstadoNuevo BIGINT
SELECT @IdEstadoNuevo = IdEstadoCaso 
FROM catalogo.EstadoCaso 
WHERE NombreEstadoCaso = 'Nuevo'

-- 2. Insertar caso
INSERT INTO soporte.Caso (
    Descripcion, IdUsuarioReporta, TelefonoContacto, CorreoContacto,
    IdEstadoCaso, FechaRegistro, IdTipoCaso, IdActivo, IdAreaTecnica,
    IdPrioridad, IdCanalIngreso, IdTecnicoAsignado, IdUsuarioCreacion
) VALUES (
    @Descripcion, @IdUsuarioReporta, @TelefonoContacto, @CorreoContacto,
    @IdEstadoNuevo, GETUTCDATE(), @IdTipoCaso, @IdActivo, @IdAreaTecnica,
    @IdPrioridad, @IdCanalIngreso, @IdTecnicoAsignado, @IdUsuarioCreacion
)

SET @IdCasoNuevo = SCOPE_IDENTITY()

-- 3. Generar número de caso (formato: CASO-2024-00001)
SET @NumeroCaso = 'CASO-' + CAST(YEAR(GETDATE()) AS NVARCHAR(4)) + '-' + 
                  RIGHT('00000' + CAST(@IdCasoNuevo AS NVARCHAR(10)), 5)

-- 4. TRAZABILIDAD AUTOMÁTICA - Creación
INSERT INTO soporte.TrazabilidadCaso (
    IdCaso, FechaEvento, IdUsuarioAccion, TipoEvento, 
    Comentario, IdEstadoCaso
) VALUES (
    @IdCasoNuevo, GETUTCDATE(), @IdUsuarioCreacion,
    'CREACION', 'Caso creado', @IdEstadoNuevo
)

-- 5. Si tiene técnico asignado desde el inicio, registrar asignación
IF @IdTecnicoAsignado IS NOT NULL
BEGIN
    DECLARE @NombreTecnico NVARCHAR(200)
    SELECT @NombreTecnico = NombreCompleto 
    FROM acceso.Usuario WHERE IdUsuario = @IdTecnicoAsignado
    
    INSERT INTO soporte.TrazabilidadCaso (
        IdCaso, FechaEvento, IdUsuarioAccion, TipoEvento, 
        Comentario, IdTecnicoAsignado
    ) VALUES (
        @IdCasoNuevo, GETUTCDATE(), @IdUsuarioCreacion,
        'ASIGNACION_TECNICO', 'Asignado a técnico: ' + @NombreTecnico,
        @IdTecnicoAsignado
    )
    
    -- Actualizar FechaAceptacion
    UPDATE soporte.Caso SET FechaAceptacion = GETUTCDATE()
    WHERE IdCaso = @IdCasoNuevo
END

-- 6. Si tiene activo, crear entrada en HojaDeVidaActivo
IF @IdActivo IS NOT NULL
BEGIN
    INSERT INTO inventario.HojaDeVidaActivo (
        IdActivo, FechaEvento, TipoEvento, Descripcion, 
        IdCaso, IdUsuarioAccion
    ) VALUES (
        @IdActivo, GETUTCDATE(), 'CASO_CREADO',
        'Caso reportado: ' + @Descripcion,
        @IdCasoNuevo, @IdUsuarioCreacion
    )
END

COMMIT TRANSACTION

-- Retornar datos del caso creado
SELECT 
    c.IdCaso,
    @NumeroCaso AS NumeroCaso,
    c.Descripcion,
    c.IdEstadoCaso,
    ec.NombreEstadoCaso,
    c.FechaRegistro
FROM soporte.Caso c
INNER JOIN catalogo.EstadoCaso ec ON c.IdEstadoCaso = ec.IdEstadoCaso
WHERE c.IdCaso = @IdCasoNuevo
```

---

### 2. `sp_Caso_AsignarTecnico`

**Propósito:** Asignar o reasignar técnico a un caso con trazabilidad automática

**Parámetros:**
```sql
@IdCaso BIGINT,
@IdTecnicoAsignado BIGINT,
@IdUsuarioAccion BIGINT,
@Comentario NVARCHAR(500) = NULL
```

**Lógica:**
```sql
BEGIN TRANSACTION

-- 1. Validar que el caso existe
IF NOT EXISTS (SELECT 1 FROM soporte.Caso WHERE IdCaso = @IdCaso)
BEGIN
    THROW 50001, 'Caso no existe', 1
    RETURN
END

-- 2. Validar que el técnico existe y tiene rol adecuado
IF NOT EXISTS (
    SELECT 1 FROM acceso.Usuario u
    INNER JOIN acceso.Rol r ON u.IdRol = r.IdRol
    WHERE u.IdUsuario = @IdTecnicoAsignado 
    AND r.NombreRol IN ('Técnico', 'Administrador')
)
BEGIN
    THROW 50002, 'Usuario no es técnico', 1
    RETURN
END

-- 3. Obtener estado "Asignado"
DECLARE @IdEstadoAsignado BIGINT
SELECT @IdEstadoAsignado = IdEstadoCaso 
FROM catalogo.EstadoCaso 
WHERE NombreEstadoCaso = 'Asignado'

-- 4. Obtener nombre del técnico
DECLARE @NombreTecnico NVARCHAR(200)
SELECT @NombreTecnico = NombreCompleto 
FROM acceso.Usuario WHERE IdUsuario = @IdTecnicoAsignado

-- 5. Actualizar caso
UPDATE soporte.Caso SET
    IdTecnicoAsignado = @IdTecnicoAsignado,
    FechaAceptacion = CASE 
        WHEN FechaAceptacion IS NULL THEN GETUTCDATE() 
        ELSE FechaAceptacion 
    END,
    IdEstadoCaso = @IdEstadoAsignado,
    FechaActualizacion = GETUTCDATE()
WHERE IdCaso = @IdCaso

-- 6. TRAZABILIDAD AUTOMÁTICA
INSERT INTO soporte.TrazabilidadCaso (
    IdCaso, FechaEvento, IdUsuarioAccion, TipoEvento, 
    Comentario, IdEstadoCaso, IdTecnicoAsignado
) VALUES (
    @IdCaso, GETUTCDATE(), @IdUsuarioAccion,
    'ASIGNACION_TECNICO',
    COALESCE(@Comentario, 'Caso asignado a técnico: ' + @NombreTecnico),
    @IdEstadoAsignado, @IdTecnicoAsignado
)

COMMIT TRANSACTION

-- Retornar caso actualizado
SELECT 
    c.IdCaso,
    c.IdTecnicoAsignado,
    u.NombreCompleto AS NombreTecnicoAsignado,
    c.IdEstadoCaso,
    ec.NombreEstadoCaso,
    c.FechaAceptacion
FROM soporte.Caso c
INNER JOIN catalogo.EstadoCaso ec ON c.IdEstadoCaso = ec.IdEstadoCaso
LEFT JOIN acceso.Usuario u ON c.IdTecnicoAsignado = u.IdUsuario
WHERE c.IdCaso = @IdCaso
```

---

### 3. `sp_Caso_CambiarEstado`

**Propósito:** Cambiar estado del caso con validaciones y trazabilidad automática

**Parámetros:**
```sql
@IdCaso BIGINT,
@IdEstadoNuevo BIGINT,
@IdUsuarioAccion BIGINT,
@Comentario NVARCHAR(500) = NULL
```

**Lógica:**
```sql
BEGIN TRANSACTION

DECLARE @EstadoActual BIGINT
DECLARE @NombreEstadoActual NVARCHAR(100)
DECLARE @NombreEstadoNuevo NVARCHAR(100)
DECLARE @IdTecnicoAsignado BIGINT
DECLARE @IdUsuarioReporta BIGINT

-- 1. Obtener información del caso
SELECT 
    @EstadoActual = c.IdEstadoCaso,
    @NombreEstadoActual = ec.NombreEstadoCaso,
    @IdTecnicoAsignado = c.IdTecnicoAsignado,
    @IdUsuarioReporta = c.IdUsuarioReporta
FROM soporte.Caso c
INNER JOIN catalogo.EstadoCaso ec ON c.IdEstadoCaso = ec.IdEstadoCaso
WHERE c.IdCaso = @IdCaso

IF @EstadoActual IS NULL
BEGIN
    THROW 50001, 'Caso no existe', 1
    RETURN
END

-- 2. Obtener nombre del estado nuevo
SELECT @NombreEstadoNuevo = NombreEstadoCaso 
FROM catalogo.EstadoCaso 
WHERE IdEstadoCaso = @IdEstadoNuevo

-- VALIDACIONES DE TRANSICIÓN

-- No se puede cambiar a Cerrado si no está Resuelto
IF @NombreEstadoNuevo = 'Cerrado' AND @NombreEstadoActual != 'Resuelto'
BEGIN
    THROW 50002, 'Solo se puede cerrar un caso resuelto', 1
    RETURN
END

-- Solo el usuario que reportó puede cerrar el caso
IF @NombreEstadoNuevo = 'Cerrado' AND @IdUsuarioAccion != @IdUsuarioReporta
BEGIN
    THROW 50003, 'Solo el usuario que reportó puede cerrar el caso', 1
    RETURN
END

-- Solo el técnico asignado puede cambiar a En Proceso o Resuelto
IF @NombreEstadoNuevo IN ('En Proceso', 'Resuelto') 
   AND @IdUsuarioAccion != @IdTecnicoAsignado
BEGIN
    THROW 50004, 'Solo el técnico asignado puede cambiar a este estado', 1
    RETURN
END

-- No se puede modificar un caso cerrado
IF @NombreEstadoActual = 'Cerrado'
BEGIN
    THROW 50005, 'No se puede modificar un caso cerrado', 1
    RETURN
END

-- 3. ACTUALIZAR CASO con fechas automáticas
UPDATE soporte.Caso SET
    IdEstadoCaso = @IdEstadoNuevo,
    FechaResolucion = CASE 
        WHEN @NombreEstadoNuevo = 'Resuelto' AND FechaResolucion IS NULL 
        THEN GETUTCDATE() 
        ELSE FechaResolucion 
    END,
    FechaCierre = CASE 
        WHEN @NombreEstadoNuevo = 'Cerrado' AND FechaCierre IS NULL 
        THEN GETUTCDATE() 
        ELSE FechaCierre 
    END,
    FechaActualizacion = GETUTCDATE()
WHERE IdCaso = @IdCaso

-- 4. TRAZABILIDAD AUTOMÁTICA
INSERT INTO soporte.TrazabilidadCaso (
    IdCaso, FechaEvento, IdUsuarioAccion, TipoEvento, 
    Comentario, IdEstadoCaso
) VALUES (
    @IdCaso, GETUTCDATE(), @IdUsuarioAccion,
    'CAMBIO_ESTADO',
    COALESCE(@Comentario, 'Estado cambiado de ' + @NombreEstadoActual + ' a ' + @NombreEstadoNuevo),
    @IdEstadoNuevo
)

COMMIT TRANSACTION

-- Retornar caso actualizado
SELECT 
    c.IdCaso,
    c.IdEstadoCaso,
    ec.NombreEstadoCaso,
    c.FechaResolucion,
    c.FechaCierre,
    c.FechaActualizacion
FROM soporte.Caso c
INNER JOIN catalogo.EstadoCaso ec ON c.IdEstadoCaso = ec.IdEstadoCaso
WHERE c.IdCaso = @IdCaso
```

---

### 4. `sp_IntervencionTecnica_Crear`

**Propósito:** Crear intervención técnica con componentes, consumibles y trazabilidad

**Parámetros:**
```sql
@IdTrazabilidadCaso BIGINT,
@IdTipoTrabajo BIGINT,
@IdEstadoIntervencion BIGINT,
@FechaInicio DATETIME,
@FechaFin DATETIME = NULL,
@Diagnostico NVARCHAR(MAX),
@SolucionAplicada NVARCHAR(MAX) = NULL,
@ObservacionesTecnicas NVARCHAR(MAX) = NULL,
@IdUsuarioAccion BIGINT,
@ComponentesJSON NVARCHAR(MAX) = NULL,  -- JSON con componentes usados
@ConsumiblesJSON NVARCHAR(MAX) = NULL   -- JSON con consumibles usados
```

**Formato JSON de componentes:**
```json
[
  {
    "IdComponente": 5,
    "Cantidad": 2,
    "TipoCambio": "INSTALACION",
    "Descripcion": "Memoria RAM DDR4 8GB"
  },
  {
    "IdComponente": 12,
    "Cantidad": 1,
    "TipoCambio": "REEMPLAZO",
    "Descripcion": "Disco duro SSD 500GB"
  }
]
```

**Lógica:**
```sql
BEGIN TRANSACTION

DECLARE @IdCaso BIGINT
DECLARE @IdActivo BIGINT
DECLARE @IdIntervencion BIGINT

-- 1. Obtener caso asociado a la trazabilidad
SELECT @IdCaso = t.IdCaso
FROM soporte.TrazabilidadCaso t
WHERE t.Id = @IdTrazabilidadCaso

-- 2. Obtener activo del caso (si tiene)
SELECT @IdActivo = IdActivo FROM soporte.Caso WHERE IdCaso = @IdCaso

-- 3. Validar que solo el técnico asignado puede crear intervención
IF NOT EXISTS (
    SELECT 1 FROM soporte.Caso 
    WHERE IdCaso = @IdCaso 
    AND IdTecnicoAsignado = @IdUsuarioAccion
)
BEGIN
    THROW 50006, 'Solo el técnico asignado puede crear intervención', 1
    RETURN
END

-- 4. Insertar intervención técnica
INSERT INTO soporte.IntervencionTecnica (
    IdTrazabilidadCaso, IdTipoTrabajo, IdEstadoIntervencion,
    FechaInicio, FechaFin, Diagnostico, SolucionAplicada,
    ObservacionesTecnicas, IdUsuarioAccion
) VALUES (
    @IdTrazabilidadCaso, @IdTipoTrabajo, @IdEstadoIntervencion,
    @FechaInicio, @FechaFin, @Diagnostico, @SolucionAplicada,
    @ObservacionesTecnicas, @IdUsuarioAccion
)

SET @IdIntervencion = SCOPE_IDENTITY()

-- 5. Procesar componentes usados (si hay)
IF @ComponentesJSON IS NOT NULL
BEGIN
    -- Insertar detalles de componentes
    INSERT INTO soporte.DetalleCambioComponentes (
        IdIntervencionTecnica, IdComponente, Cantidad, TipoCambio, 
        Descripcion, IdUsuarioCreacion
    )
    SELECT 
        @IdIntervencion,
        IdComponente,
        Cantidad,
        TipoCambio,
        Descripcion,
        @IdUsuarioAccion
    FROM OPENJSON(@ComponentesJSON) WITH (
        IdComponente BIGINT '$.IdComponente',
        Cantidad INT '$.Cantidad',
        TipoCambio NVARCHAR(20) '$.TipoCambio',
        Descripcion NVARCHAR(500) '$.Descripcion'
    )
    
    -- Validar y descontar stock automáticamente
    DECLARE @ComponenteId BIGINT, @CantidadUsar INT, @TipoCambio NVARCHAR(20)
    DECLARE @StockActual INT
    
    DECLARE componentes_cursor CURSOR FOR
    SELECT IdComponente, Cantidad, TipoCambio
    FROM OPENJSON(@ComponentesJSON) WITH (
        IdComponente BIGINT, Cantidad INT, TipoCambio NVARCHAR(20)
    )
    
    OPEN componentes_cursor
    FETCH NEXT FROM componentes_cursor INTO @ComponenteId, @CantidadUsar, @TipoCambio
    
    WHILE @@FETCH_STATUS = 0
    BEGIN
        -- Validar stock disponible
        SELECT @StockActual = StockActual 
        FROM inventario.Componente 
        WHERE Id = @ComponenteId
        
        IF @TipoCambio IN ('INSTALACION', 'REEMPLAZO') AND @StockActual < @CantidadUsar
        BEGIN
            CLOSE componentes_cursor
            DEALLOCATE componentes_cursor
            THROW 50007, 'Stock insuficiente de componente', 1
            RETURN
        END
        
        -- Actualizar stock
        IF @TipoCambio = 'INSTALACION' OR @TipoCambio = 'REEMPLAZO'
            UPDATE inventario.Componente 
            SET StockActual = StockActual - @CantidadUsar
            WHERE Id = @ComponenteId
        ELSE IF @TipoCambio = 'RETIRO'
            UPDATE inventario.Componente 
            SET StockActual = StockActual + @CantidadUsar
            WHERE Id = @ComponenteId
        
        FETCH NEXT FROM componentes_cursor INTO @ComponenteId, @CantidadUsar, @TipoCambio
    END
    
    CLOSE componentes_cursor
    DEALLOCATE componentes_cursor
END

-- 6. Procesar consumibles (si hay)
IF @ConsumiblesJSON IS NOT NULL
BEGIN
    -- Similar a componentes
    INSERT INTO soporte.DetalleConsumible (
        IdIntervencionTecnica, IdConsumible, Cantidad, 
        DescripcionUso, IdUsuarioCreacion
    )
    SELECT 
        @IdIntervencion,
        IdConsumible,
        Cantidad,
        DescripcionUso,
        @IdUsuarioAccion
    FROM OPENJSON(@ConsumiblesJSON) WITH (
        IdConsumible BIGINT, Cantidad INT, DescripcionUso NVARCHAR(500)
    )
    
    -- Descontar stock de consumibles
    UPDATE inventario.Consumible SET
        StockActual = StockActual - d.Cantidad
    FROM inventario.Consumible c
    INNER JOIN (
        SELECT IdConsumible, Cantidad
        FROM OPENJSON(@ConsumiblesJSON) WITH (IdConsumible BIGINT, Cantidad INT)
    ) d ON c.Id = d.IdConsumible
END

-- 7. Crear entrada en HojaDeVidaActivo (si hay activo)
IF @IdActivo IS NOT NULL
BEGIN
    INSERT INTO inventario.HojaDeVidaActivo (
        IdActivo, FechaEvento, TipoEvento, Descripcion, 
        IdIntervencionTecnica, IdUsuarioAccion
    ) VALUES (
        @IdActivo, GETUTCDATE(), 'INTERVENCION_TECNICA',
        'Diagnóstico: ' + @Diagnostico + CHAR(13) + CHAR(10) + 
        'Solución: ' + COALESCE(@SolucionAplicada, 'En proceso'),
        @IdIntervencion, @IdUsuarioAccion
    )
END

-- 8. TRAZABILIDAD AUTOMÁTICA
INSERT INTO soporte.TrazabilidadCaso (
    IdCaso, FechaEvento, IdUsuarioAccion, TipoEvento, Comentario
) VALUES (
    @IdCaso, GETUTCDATE(), @IdUsuarioAccion,
    'INTERVENCION_REGISTRADA', 'Intervención técnica registrada'
)

COMMIT TRANSACTION

-- Retornar intervención creada
SELECT 
    i.Id,
    i.IdTrazabilidadCaso,
    i.Diagnostico,
    i.SolucionAplicada,
    i.FechaInicio,
    i.FechaFin,
    tt.NombreTipoTrabajo,
    ei.NombreEstadoIntervencion
FROM soporte.IntervencionTecnica i
INNER JOIN catalogo.TipoTrabajo tt ON i.IdTipoTrabajo = tt.IdTipoTrabajo
INNER JOIN catalogo.EstadoIntervencionTecnica ei ON i.IdEstadoIntervencion = ei.IdEstadoIntervencion
WHERE i.Id = @IdIntervencion
```

---

### 5. `sp_Caso_ObtenerHistorialCompleto`

**Propósito:** Obtener caso con toda su trazabilidad e intervenciones

**Parámetros:**
```sql
@IdCaso BIGINT
```

**Retorna múltiples result sets:**

**Result Set 1: Información del caso**
```sql
SELECT 
    c.IdCaso,
    c.Descripcion,
    c.IdUsuarioReporta,
    ur.NombreCompleto AS NombreUsuarioReporta,
    c.IdTecnicoAsignado,
    ta.NombreCompleto AS NombreTecnicoAsignado,
    c.IdEstadoCaso,
    ec.NombreEstadoCaso,
    c.IdPrioridad,
    p.NombrePrioridad,
    c.IdTipoCaso,
    tc.NombreTipoCaso,
    c.IdActivo,
    a.NombreActivo,
    c.FechaRegistro,
    c.FechaAceptacion,
    c.FechaResolucion,
    c.FechaCierre
FROM soporte.Caso c
INNER JOIN acceso.Usuario ur ON c.IdUsuarioReporta = ur.IdUsuario
LEFT JOIN acceso.Usuario ta ON c.IdTecnicoAsignado = ta.IdUsuario
INNER JOIN catalogo.EstadoCaso ec ON c.IdEstadoCaso = ec.IdEstadoCaso
INNER JOIN catalogo.Prioridad p ON c.IdPrioridad = p.IdPrioridad
INNER JOIN catalogo.TipoCaso tc ON c.IdTipoCaso = tc.IdTipoCaso
LEFT JOIN inventario.Activo a ON c.IdActivo = a.IdActivo
WHERE c.IdCaso = @IdCaso
```

**Result Set 2: Trazabilidad completa (historial)**
```sql
SELECT 
    t.Id,
    t.FechaEvento,
    t.TipoEvento,
    t.Comentario,
    u.NombreCompleto AS NombreUsuarioAccion,
    ec.NombreEstadoCaso,
    at.NombreAreaTecnica,
    tec.NombreCompleto AS NombreTecnicoAsignado
FROM soporte.TrazabilidadCaso t
INNER JOIN acceso.Usuario u ON t.IdUsuarioAccion = u.IdUsuario
LEFT JOIN catalogo.EstadoCaso ec ON t.IdEstadoCaso = ec.IdEstadoCaso
LEFT JOIN catalogo.AreaTecnica at ON t.IdAreaTecnica = at.IdAreaTecnica
LEFT JOIN acceso.Usuario tec ON t.IdTecnicoAsignado = tec.IdUsuario
WHERE t.IdCaso = @IdCaso
ORDER BY t.FechaEvento DESC
```

**Result Set 3: Intervenciones técnicas**
```sql
SELECT 
    i.Id,
    i.IdTrazabilidadCaso,
    i.Diagnostico,
    i.SolucionAplicada,
    i.FechaInicio,
    i.FechaFin,
    tt.NombreTipoTrabajo,
    ei.NombreEstadoIntervencion,
    u.NombreCompleto AS NombreTecnico
FROM soporte.IntervencionTecnica i
INNER JOIN soporte.TrazabilidadCaso t ON i.IdTrazabilidadCaso = t.Id
INNER JOIN catalogo.TipoTrabajo tt ON i.IdTipoTrabajo = tt.IdTipoTrabajo
INNER JOIN catalogo.EstadoIntervencionTecnica ei ON i.IdEstadoIntervencion = ei.IdEstadoIntervencion
INNER JOIN acceso.Usuario u ON i.IdUsuarioAccion = u.IdUsuario
WHERE t.IdCaso = @IdCaso
ORDER BY i.FechaInicio DESC
```

---

## 🔧 IMPLEMENTACIÓN EN .NET CON DAPPER

### Estructura de carpetas

```
MicroApi.Seguridad.Data/
├── Repositories/
│   └── Dapper/
│       ├── CasoDapperRepository.cs
│       ├── IntervencionTecnicaDapperRepository.cs
│       └── Interfaces/
│           ├── ICasoDapperRepository.cs
│           └── IIntervencionTecnicaDapperRepository.cs
```

### Ejemplo: CasoDapperRepository.cs

```csharp
using Dapper;
using System.Data;
using Microsoft.Data.SqlClient;
using MicroApi.Seguridad.Domain.DTOs.Soporte;

namespace MicroApi.Seguridad.Data.Repositories.Dapper
{
    public class CasoDapperRepository : ICasoDapperRepository
    {
        private readonly string _connectionString;
        
        public CasoDapperRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("SqlServerConnection");
        }
        
        public async Task<CasoCrearResultDto> CrearCasoAsync(CasoCreateDto dto, long idUsuarioCreacion)
        {
            using var connection = new SqlConnection(_connectionString);
            
            var parameters = new DynamicParameters();
            parameters.Add("@Descripcion", dto.Descripcion);
            parameters.Add("@IdUsuarioReporta", dto.IdUsuarioReporta);
            parameters.Add("@TelefonoContacto", dto.TelefonoContacto);
            parameters.Add("@CorreoContacto", dto.CorreoContacto);
            parameters.Add("@IdTipoCaso", dto.IdTipoCaso);
            parameters.Add("@IdPrioridad", dto.IdPrioridad);
            parameters.Add("@IdCanalIngreso", dto.IdCanalIngreso);
            parameters.Add("@IdAreaTecnica", dto.IdAreaTecnica);
            parameters.Add("@IdActivo", dto.IdActivo);
            parameters.Add("@IdTecnicoAsignado", dto.IdTecnicoAsignado);
            parameters.Add("@IdUsuarioCreacion", idUsuarioCreacion);
            parameters.Add("@IdCasoNuevo", dbType: DbType.Int64, direction: ParameterDirection.Output);
            parameters.Add("@NumeroCaso", dbType: DbType.String, size: 50, direction: ParameterDirection.Output);
            
            var result = await connection.QueryFirstOrDefaultAsync<CasoCrearResultDto>(
                "sp_Caso_Crear",
                parameters,
                commandType: CommandType.StoredProcedure
            );
            
            result.IdCaso = parameters.Get<long>("@IdCasoNuevo");
            result.NumeroCaso = parameters.Get<string>("@NumeroCaso");
            
            return result;
        }
        
        public async Task<CasoDto> AsignarTecnicoAsync(long idCaso, long idTecnico, long idUsuarioAccion, string comentario = null)
        {
            using var connection = new SqlConnection(_connectionString);
            
            var parameters = new DynamicParameters();
            parameters.Add("@IdCaso", idCaso);
            parameters.Add("@IdTecnicoAsignado", idTecnico);
            parameters.Add("@IdUsuarioAccion", idUsuarioAccion);
            parameters.Add("@Comentario", comentario);
            
            return await connection.QueryFirstOrDefaultAsync<CasoDto>(
                "sp_Caso_AsignarTecnico",
                parameters,
                commandType: CommandType.StoredProcedure
            );
        }
        
        public async Task<CasoDto> CambiarEstadoAsync(long idCaso, long idEstadoNuevo, long idUsuarioAccion, string comentario = null)
        {
            using var connection = new SqlConnection(_connectionString);
            
            var parameters = new DynamicParameters();
            parameters.Add("@IdCaso", idCaso);
            parameters.Add("@IdEstadoNuevo", idEstadoNuevo);
            parameters.Add("@IdUsuarioAccion", idUsuarioAccion);
            parameters.Add("@Comentario", comentario);
            
            return await connection.QueryFirstOrDefaultAsync<CasoDto>(
                "sp_Caso_CambiarEstado",
                parameters,
                commandType: CommandType.StoredProcedure
            );
        }
        
        public async Task<CasoHistorialCompletoDto> ObtenerHistorialCompletoAsync(long idCaso)
        {
            using var connection = new SqlConnection(_connectionString);
            
            using var multi = await connection.QueryMultipleAsync(
                "sp_Caso_ObtenerHistorialCompleto",
                new { IdCaso = idCaso },
                commandType: CommandType.StoredProcedure
            );
            
            var caso = await multi.ReadFirstOrDefaultAsync<CasoDetalleDto>();
            var trazabilidad = (await multi.ReadAsync<TrazabilidadCasoDto>()).ToList();
            var intervenciones = (await multi.ReadAsync<IntervencionTecnicaDto>()).ToList();
            
            return new CasoHistorialCompletoDto
            {
                Caso = caso,
                Trazabilidad = trazabilidad,
                Intervenciones = intervenciones
            };
        }
    }
}
```

---

## 📊 RESUMEN DE PROCEDIMIENTOS

| # | Procedimiento | Prioridad | Complejidad |
|---|---------------|-----------|-------------|
| 1 | `sp_Caso_Crear` | 🔴 Alta | Alta |
| 2 | `sp_Caso_AsignarTecnico` | 🔴 Alta | Media |
| 3 | `sp_Caso_CambiarEstado` | 🔴 Alta | Alta |
| 4 | `sp_IntervencionTecnica_Crear` | 🔴 Alta | Muy Alta |
| 5 | `sp_Caso_ObtenerHistorialCompleto` | 🟠 Media | Media |
| 6 | `sp_RevisionAdmi_Procesar` | 🟠 Media | Alta |
| 7 | `sp_EncuestaCalidad_Crear` | 🟢 Baja | Media |
| 8 | `sp_Caso_ObtenerPorFiltros` | 🟢 Baja | Media |

---

## ✅ BENEFICIOS DE ESTA ARQUITECTURA

1. **Trazabilidad Inmutable** - El usuario no puede manipular el historial
2. **Auditoría Completa** - Cada acción queda registrada automáticamente
3. **Integridad Garantizada** - Validaciones en BD, no bypasseables
4. **Rendimiento** - Consultas optimizadas en SQL
5. **Mantenibilidad** - Lógica centralizada en SPs
6. **Transaccionalidad** - Todo o nada, sin estados inconsistentes

---

## 🚀 ORDEN DE IMPLEMENTACIÓN

1. ✅ Crear SPs básicos (Crear, Asignar, Cambiar Estado)
2. ✅ Implementar repositorio Dapper
3. ✅ Crear SP de Intervención Técnica
4. ✅ Implementar SP de Historial Completo
5. ✅ Crear SPs de consultas y reportes
6. ✅ Probar flujo completo end-to-end

---

**Fecha:** 9 de Enero, 2026  
**Versión:** 1.0  
**Estado:** Especificación Completa
