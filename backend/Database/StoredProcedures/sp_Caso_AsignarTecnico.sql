-- =============================================
-- Stored Procedure: sp_Caso_AsignarTecnico
-- Descripción: Asignar o reasignar técnico a un caso con trazabilidad automática
-- Autor: Sistema
-- Fecha: 12 Enero 2026
-- =============================================

CREATE OR ALTER PROCEDURE sp_Caso_AsignarTecnico
    @IdCaso BIGINT,
    @IdTecnicoAsignado BIGINT,
    @IdUsuarioAccion BIGINT,
    @Comentario NVARCHAR(500) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        BEGIN TRANSACTION
        
        DECLARE @IdEstadoAsignado BIGINT
        DECLARE @NombreTecnico NVARCHAR(200)
        DECLARE @TecnicoAnterior BIGINT
        DECLARE @EsReasignacion BIT = 0
        
        -- 1. Validar que el caso existe
        IF NOT EXISTS (SELECT 1 FROM soporte.Caso WHERE IdCaso = @IdCaso)
        BEGIN
            THROW 50001, 'Caso no existe', 1
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
        END
        
        -- 3. Obtener estado "Asignado"
        SELECT @IdEstadoAsignado = IdEstadoCaso 
        FROM catalogo.EstadoCaso 
        WHERE NombreEstadoCaso = 'Asignado'
        
        IF @IdEstadoAsignado IS NULL
        BEGIN
            THROW 50003, 'Estado "Asignado" no existe en catálogo', 1
        END
        
        -- 4. Obtener nombre del técnico
        SELECT @NombreTecnico = NombreCompleto 
        FROM acceso.Usuario 
        WHERE IdUsuario = @IdTecnicoAsignado
        
        -- 5. Verificar si ya tenía técnico asignado (reasignación)
        SELECT @TecnicoAnterior = IdTecnicoAsignado
        FROM soporte.Caso
        WHERE IdCaso = @IdCaso
        
        IF @TecnicoAnterior IS NOT NULL AND @TecnicoAnterior != @IdTecnicoAsignado
        BEGIN
            SET @EsReasignacion = 1
        END
        
        -- 6. Actualizar caso
        UPDATE soporte.Caso SET
            IdTecnicoAsignado = @IdTecnicoAsignado,
            FechaAceptacion = CASE 
                WHEN FechaAceptacion IS NULL THEN GETUTCDATE() 
                ELSE FechaAceptacion 
            END,
            IdEstadoCaso = @IdEstadoAsignado,
            FechaActualizacion = GETUTCDATE()
        WHERE IdCaso = @IdCaso
        
        -- 7. TRAZABILIDAD AUTOMÁTICA
        DECLARE @ComentarioFinal NVARCHAR(500)
        
        IF @EsReasignacion = 1
        BEGIN
            DECLARE @NombreTecnicoAnterior NVARCHAR(200)
            SELECT @NombreTecnicoAnterior = NombreCompleto 
            FROM acceso.Usuario 
            WHERE IdUsuario = @TecnicoAnterior
            
            SET @ComentarioFinal = COALESCE(@Comentario, 
                'Caso reasignado de ' + @NombreTecnicoAnterior + ' a ' + @NombreTecnico)
        END
        ELSE
        BEGIN
            SET @ComentarioFinal = COALESCE(@Comentario, 
                'Caso asignado a técnico: ' + @NombreTecnico)
        END
        
        INSERT INTO soporte.TrazabilidadCaso (
            IdCaso, 
            FechaEvento, 
            IdUsuarioAccion, 
            TipoEvento, 
            Comentario, 
            IdEstadoCaso, 
            IdTecnicoAsignado
        ) VALUES (
            @IdCaso, 
            GETUTCDATE(), 
            @IdUsuarioAccion,
            'ASIGNACION_TECNICO',
            @ComentarioFinal,
            @IdEstadoAsignado, 
            @IdTecnicoAsignado
        )
        
        COMMIT TRANSACTION
        
        -- Retornar caso actualizado
        SELECT 
            c.IdCaso,
            c.Descripcion,
            c.IdTecnicoAsignado,
            u.NombreCompleto AS NombreTecnicoAsignado,
            c.IdEstadoCaso,
            ec.NombreEstadoCaso,
            c.FechaAceptacion,
            c.FechaActualizacion
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
