-- =============================================
-- Stored Procedure: sp_Caso_CambiarEstado
-- Descripción: Cambiar estado del caso con validaciones y trazabilidad automática
-- Autor: Sistema
-- Fecha: 12 Enero 2026
-- =============================================

CREATE OR ALTER PROCEDURE sp_Caso_CambiarEstado
    @IdCaso BIGINT,
    @IdEstadoNuevo BIGINT,
    @IdUsuarioAccion BIGINT,
    @Comentario NVARCHAR(500) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
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
        END
        
        -- 2. Obtener nombre del estado nuevo
        SELECT @NombreEstadoNuevo = NombreEstadoCaso 
        FROM catalogo.EstadoCaso 
        WHERE IdEstadoCaso = @IdEstadoNuevo
        
        IF @NombreEstadoNuevo IS NULL
        BEGIN
            THROW 50002, 'Estado destino no existe', 1
        END
        
        -- VALIDACIONES DE TRANSICIÓN
        
        -- No se puede cambiar a Cerrado si no está Resuelto
        IF @NombreEstadoNuevo = 'Cerrado' AND @NombreEstadoActual != 'Resuelto'
        BEGIN
            THROW 50003, 'Solo se puede cerrar un caso resuelto', 1
        END
        
        -- Solo el usuario que reportó puede cerrar el caso
        IF @NombreEstadoNuevo = 'Cerrado' AND @IdUsuarioAccion != @IdUsuarioReporta
        BEGIN
            THROW 50004, 'Solo el usuario que reportó puede cerrar el caso', 1
        END
        
        -- Solo el técnico asignado puede cambiar a En Proceso o Resuelto
        IF @NombreEstadoNuevo IN ('En Proceso', 'Resuelto') 
           AND (@IdTecnicoAsignado IS NULL OR @IdUsuarioAccion != @IdTecnicoAsignado)
        BEGIN
            THROW 50005, 'Solo el técnico asignado puede cambiar a este estado', 1
        END
        
        -- No se puede modificar un caso cerrado
        IF @NombreEstadoActual = 'Cerrado'
        BEGIN
            THROW 50006, 'No se puede modificar un caso cerrado', 1
        END
        
        -- No cambiar al mismo estado
        IF @EstadoActual = @IdEstadoNuevo
        BEGIN
            THROW 50007, 'El caso ya está en ese estado', 1
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
        DECLARE @ComentarioFinal NVARCHAR(500)
        SET @ComentarioFinal = COALESCE(@Comentario, 
            'Estado cambiado de ' + @NombreEstadoActual + ' a ' + @NombreEstadoNuevo)
        
        INSERT INTO soporte.TrazabilidadCaso (
            IdCaso, 
            FechaEvento, 
            IdUsuarioAccion, 
            TipoEvento, 
            Comentario, 
            IdEstadoCaso
        ) VALUES (
            @IdCaso, 
            GETUTCDATE(), 
            @IdUsuarioAccion,
            'CAMBIO_ESTADO',
            @ComentarioFinal,
            @IdEstadoNuevo
        )
        
        COMMIT TRANSACTION
        
        -- Retornar caso actualizado
        SELECT 
            c.IdCaso,
            c.Descripcion,
            c.IdEstadoCaso,
            ec.NombreEstadoCaso,
            c.FechaResolucion,
            c.FechaCierre,
            c.FechaActualizacion,
            c.IdTecnicoAsignado,
            u.NombreCompleto AS NombreTecnicoAsignado
        FROM soporte.Caso c
        INNER JOIN catalogo.EstadoCaso ec ON c.IdEstadoCaso = ec.IdEstadoCaso
        LEFT JOIN acceso.Usuario u ON c.IdTecnicoAsignado = u.IdUsuario
        WHERE c.IdCaso = @IdCaso
        
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION
            
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE()
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY()
        DECLARE @ErrorState INT = ERROR_STATE()
        
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState)
    END CATCH
END
GO
