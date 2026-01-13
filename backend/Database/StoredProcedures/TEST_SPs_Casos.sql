-- =============================================
-- Script de Prueba: Stored Procedures de Casos
-- Descripción: Pruebas para sp_Caso_Crear, sp_Caso_AsignarTecnico, sp_Caso_CambiarEstado
-- Fecha: 12 Enero 2026
-- =============================================

-- IMPORTANTE: Ajusta estos IDs según tu base de datos
DECLARE @IdUsuarioReporta BIGINT = 1  -- ID de un usuario existente
DECLARE @IdTecnico BIGINT = 2         -- ID de un usuario con rol Técnico
DECLARE @IdUsuarioAdmin BIGINT = 3    -- ID de un usuario administrador
DECLARE @IdTipoCaso BIGINT = 1        -- ID de tipo de caso existente
DECLARE @IdPrioridad BIGINT = 1       -- ID de prioridad existente
DECLARE @IdCanalIngreso BIGINT = 1    -- ID de canal de ingreso existente
DECLARE @IdAreaTecnica BIGINT = 1     -- ID de área técnica existente (opcional)
DECLARE @IdActivo BIGINT = NULL       -- ID de activo (opcional)

PRINT '=========================================='
PRINT 'PRUEBA 1: Crear caso sin técnico asignado'
PRINT '=========================================='

DECLARE @IdCasoNuevo BIGINT
DECLARE @NumeroCaso NVARCHAR(50)

EXEC sp_Caso_Crear
    @Descripcion = 'Computador no enciende - Prueba',
    @IdUsuarioReporta = @IdUsuarioReporta,
    @TelefonoContacto = '3001234567',
    @CorreoContacto = 'usuario@test.com',
    @IdTipoCaso = @IdTipoCaso,
    @IdPrioridad = @IdPrioridad,
    @IdCanalIngreso = @IdCanalIngreso,
    @IdAreaTecnica = @IdAreaTecnica,
    @IdActivo = @IdActivo,
    @IdTecnicoAsignado = NULL,
    @IdUsuarioCreacion = @IdUsuarioReporta,
    @IdCasoNuevo = @IdCasoNuevo OUTPUT,
    @NumeroCaso = @NumeroCaso OUTPUT

PRINT 'Caso creado: ID = ' + CAST(@IdCasoNuevo AS NVARCHAR(10)) + ', Número = ' + @NumeroCaso
PRINT ''

-- Verificar trazabilidad
PRINT 'Trazabilidad del caso:'
SELECT 
    FechaEvento,
    TipoEvento,
    Comentario,
    IdEstadoCaso
FROM soporte.TrazabilidadCaso
WHERE IdCaso = @IdCasoNuevo
ORDER BY FechaEvento
PRINT ''

PRINT '=========================================='
PRINT 'PRUEBA 2: Asignar técnico al caso'
PRINT '=========================================='

EXEC sp_Caso_AsignarTecnico
    @IdCaso = @IdCasoNuevo,
    @IdTecnicoAsignado = @IdTecnico,
    @IdUsuarioAccion = @IdUsuarioAdmin,
    @Comentario = 'Asignación inicial de técnico'

PRINT 'Técnico asignado correctamente'
PRINT ''

-- Verificar trazabilidad actualizada
PRINT 'Trazabilidad actualizada:'
SELECT 
    FechaEvento,
    TipoEvento,
    Comentario,
    IdEstadoCaso,
    IdTecnicoAsignado
FROM soporte.TrazabilidadCaso
WHERE IdCaso = @IdCasoNuevo
ORDER BY FechaEvento
PRINT ''

PRINT '=========================================='
PRINT 'PRUEBA 3: Cambiar estado a "En Proceso"'
PRINT '=========================================='

DECLARE @IdEstadoEnProceso BIGINT
SELECT @IdEstadoEnProceso = IdEstadoCaso 
FROM catalogo.EstadoCaso 
WHERE NombreEstadoCaso = 'En Proceso'

EXEC sp_Caso_CambiarEstado
    @IdCaso = @IdCasoNuevo,
    @IdEstadoNuevo = @IdEstadoEnProceso,
    @IdUsuarioAccion = @IdTecnico,  -- Debe ser el técnico asignado
    @Comentario = 'Iniciando trabajo en el caso'

PRINT 'Estado cambiado a "En Proceso"'
PRINT ''

PRINT '=========================================='
PRINT 'PRUEBA 4: Cambiar estado a "Resuelto"'
PRINT '=========================================='

DECLARE @IdEstadoResuelto BIGINT
SELECT @IdEstadoResuelto = IdEstadoCaso 
FROM catalogo.EstadoCaso 
WHERE NombreEstadoCaso = 'Resuelto'

EXEC sp_Caso_CambiarEstado
    @IdCaso = @IdCasoNuevo,
    @IdEstadoNuevo = @IdEstadoResuelto,
    @IdUsuarioAccion = @IdTecnico,  -- Debe ser el técnico asignado
    @Comentario = 'Problema solucionado'

PRINT 'Estado cambiado a "Resuelto"'
PRINT ''

PRINT '=========================================='
PRINT 'PRUEBA 5: Cambiar estado a "Cerrado"'
PRINT '=========================================='

DECLARE @IdEstadoCerrado BIGINT
SELECT @IdEstadoCerrado = IdEstadoCaso 
FROM catalogo.EstadoCaso 
WHERE NombreEstadoCaso = 'Cerrado'

EXEC sp_Caso_CambiarEstado
    @IdCaso = @IdCasoNuevo,
    @IdEstadoNuevo = @IdEstadoCerrado,
    @IdUsuarioAccion = @IdUsuarioReporta,  -- Debe ser el usuario que reportó
    @Comentario = 'Confirmado, problema resuelto'

PRINT 'Estado cambiado a "Cerrado"'
PRINT ''

-- Verificar trazabilidad completa
PRINT '=========================================='
PRINT 'TRAZABILIDAD COMPLETA DEL CASO'
PRINT '=========================================='

SELECT 
    t.Id,
    t.FechaEvento,
    t.TipoEvento,
    t.Comentario,
    ec.NombreEstadoCaso,
    u.NombreCompleto AS UsuarioAccion
FROM soporte.TrazabilidadCaso t
LEFT JOIN catalogo.EstadoCaso ec ON t.IdEstadoCaso = ec.IdEstadoCaso
LEFT JOIN acceso.Usuario u ON t.IdUsuarioAccion = u.IdUsuario
WHERE t.IdCaso = @IdCasoNuevo
ORDER BY t.FechaEvento

PRINT ''
PRINT '=========================================='
PRINT 'ESTADO FINAL DEL CASO'
PRINT '=========================================='

SELECT 
    c.IdCaso,
    c.Descripcion,
    ec.NombreEstadoCaso,
    ur.NombreCompleto AS UsuarioReporta,
    ta.NombreCompleto AS TecnicoAsignado,
    c.FechaRegistro,
    c.FechaAceptacion,
    c.FechaResolucion,
    c.FechaCierre
FROM soporte.Caso c
INNER JOIN catalogo.EstadoCaso ec ON c.IdEstadoCaso = ec.IdEstadoCaso
INNER JOIN acceso.Usuario ur ON c.IdUsuarioReporta = ur.IdUsuario
LEFT JOIN acceso.Usuario ta ON c.IdTecnicoAsignado = ta.IdUsuario
WHERE c.IdCaso = @IdCasoNuevo

PRINT ''
PRINT '=========================================='
PRINT 'PRUEBAS DE VALIDACIÓN (deben fallar)'
PRINT '=========================================='

PRINT 'Intentando cerrar caso sin estar resuelto (debe fallar)...'
BEGIN TRY
    -- Crear un caso nuevo para esta prueba
    DECLARE @IdCasoPrueba BIGINT
    DECLARE @NumCasoPrueba NVARCHAR(50)
    
    EXEC sp_Caso_Crear
        @Descripcion = 'Caso de prueba validación',
        @IdUsuarioReporta = @IdUsuarioReporta,
        @IdTipoCaso = @IdTipoCaso,
        @IdPrioridad = @IdPrioridad,
        @IdCanalIngreso = @IdCanalIngreso,
        @IdUsuarioCreacion = @IdUsuarioReporta,
        @IdCasoNuevo = @IdCasoPrueba OUTPUT,
        @NumeroCaso = @NumCasoPrueba OUTPUT
    
    -- Intentar cerrar directamente (debe fallar)
    EXEC sp_Caso_CambiarEstado
        @IdCaso = @IdCasoPrueba,
        @IdEstadoNuevo = @IdEstadoCerrado,
        @IdUsuarioAccion = @IdUsuarioReporta
        
    PRINT '❌ ERROR: No debería permitir cerrar sin estar resuelto'
END TRY
BEGIN CATCH
    PRINT '✅ CORRECTO: ' + ERROR_MESSAGE()
END CATCH

PRINT ''
PRINT 'Intentando que usuario no técnico cambie a "En Proceso" (debe fallar)...'
BEGIN TRY
    EXEC sp_Caso_CambiarEstado
        @IdCaso = @IdCasoNuevo,
        @IdEstadoNuevo = @IdEstadoEnProceso,
        @IdUsuarioAccion = @IdUsuarioReporta  -- Usuario que reportó, no técnico
        
    PRINT '❌ ERROR: No debería permitir que no-técnico cambie estado'
END TRY
BEGIN CATCH
    PRINT '✅ CORRECTO: ' + ERROR_MESSAGE()
END CATCH

PRINT ''
PRINT '=========================================='
PRINT 'PRUEBAS COMPLETADAS'
PRINT '=========================================='
