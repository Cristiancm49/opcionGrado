-- =============================================
-- Stored Procedure: sp_Caso_Crear
-- Descripción: Crear un nuevo caso con trazabilidad automática
-- Autor: Sistema
-- Fecha: 12 Enero 2026
-- =============================================

CREATE OR ALTER PROCEDURE sp_Caso_Crear
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
    @IdUsuarioCreacion BIGINT,
    @IdCasoNuevo BIGINT OUTPUT,
    @NumeroCaso NVARCHAR(50) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        BEGIN TRANSACTION
        
        DECLARE @IdEstadoNuevo BIGINT
        DECLARE @NombreTecnico NVARCHAR(200)
        DECLARE @IdEstadoAsignado BIGINT
        
        -- 1. Obtener estado inicial "Nuevo"
        SELECT @IdEstadoNuevo = IdEstadoCaso 
        FROM catalogo.EstadoCaso 
        WHERE NombreEstadoCaso = 'Nuevo'
        
        IF @IdEstadoNuevo IS NULL
        BEGIN
            THROW 50001, 'Estado "Nuevo" no existe en catálogo', 1
        END
        
        -- Si tiene técnico asignado, obtener estado "Asignado"
        IF @IdTecnicoAsignado IS NOT NULL
        BEGIN
            SELECT @IdEstadoAsignado = IdEstadoCaso 
            FROM catalogo.EstadoCaso 
            WHERE NombreEstadoCaso = 'Asignado'
        END
        
        -- 2. Insertar caso
        INSERT INTO soporte.Caso (
            Descripcion, 
            IdUsuarioReporta, 
            TelefonoContacto, 
            CorreoContacto,
            IdEstadoCaso, 
            FechaRegistro, 
            IdTipoCaso, 
            IdActivo, 
            IdAreaTecnica,
            IdPrioridad, 
            IdCanalIngreso, 
            IdTecnicoAsignado, 
            IdUsuarioCreacion,
            FechaAceptacion
        ) VALUES (
            @Descripcion, 
            @IdUsuarioReporta, 
            @TelefonoContacto, 
            @CorreoContacto,
            COALESCE(@IdEstadoAsignado, @IdEstadoNuevo), 
            GETUTCDATE(), 
            @IdTipoCaso, 
            @IdActivo, 
            @IdAreaTecnica,
            @IdPrioridad, 
            @IdCanalIngreso, 
            @IdTecnicoAsignado, 
            @IdUsuarioCreacion,
            CASE WHEN @IdTecnicoAsignado IS NOT NULL THEN GETUTCDATE() ELSE NULL END
        )
        
        SET @IdCasoNuevo = SCOPE_IDENTITY()
        
        -- 3. Generar número de caso (formato: CASO-2024-00001)
        SET @NumeroCaso = 'CASO-' + 
                          CAST(YEAR(GETDATE()) AS NVARCHAR(4)) + '-' + 
                          RIGHT('00000' + CAST(@IdCasoNuevo AS NVARCHAR(10)), 5)
        
        -- 4. TRAZABILIDAD AUTOMÁTICA - Creación
        INSERT INTO soporte.TrazabilidadCaso (
            IdCaso, 
            FechaEvento, 
            IdUsuarioAccion, 
            TipoEvento, 
            Comentario, 
            IdEstadoCaso
        ) VALUES (
            @IdCasoNuevo, 
            GETUTCDATE(), 
            @IdUsuarioCreacion,
            'CREACION', 
            'Caso creado', 
            COALESCE(@IdEstadoAsignado, @IdEstadoNuevo)
        )
        
        -- 5. Si tiene técnico asignado desde el inicio, registrar asignación
        IF @IdTecnicoAsignado IS NOT NULL
        BEGIN
            SELECT @NombreTecnico = NombreCompleto 
            FROM acceso.Usuario 
            WHERE IdUsuario = @IdTecnicoAsignado
            
            INSERT INTO soporte.TrazabilidadCaso (
                IdCaso, 
                FechaEvento, 
                IdUsuarioAccion, 
                TipoEvento, 
                Comentario, 
                IdTecnicoAsignado,
                IdEstadoCaso
            ) VALUES (
                @IdCasoNuevo, 
                GETUTCDATE(), 
                @IdUsuarioCreacion,
                'ASIGNACION_TECNICO', 
                'Asignado a técnico: ' + @NombreTecnico,
                @IdTecnicoAsignado,
                @IdEstadoAsignado
            )
        END
        
        -- 6. Si tiene activo, crear entrada en HojaDeVidaActivo
        IF @IdActivo IS NOT NULL
        BEGIN
            INSERT INTO inventario.HojaDeVidaActivo (
                IdActivo, 
                FechaEvento, 
                TipoEvento, 
                Descripcion, 
                IdCaso, 
                IdUsuarioAccion
            ) VALUES (
                @IdActivo, 
                GETUTCDATE(), 
                'CASO_CREADO',
                'Caso reportado: ' + LEFT(@Descripcion, 200),
                @IdCasoNuevo, 
                @IdUsuarioCreacion
            )
        END
        
        COMMIT TRANSACTION
        
        -- Retornar datos del caso creado
        SELECT 
            c.IdCaso,
            @NumeroCaso AS NumeroCaso,
            c.Descripcion,
            c.IdUsuarioReporta,
            ur.NombreCompleto AS NombreUsuarioReporta,
            c.IdEstadoCaso,
            ec.NombreEstadoCaso,
            c.IdTecnicoAsignado,
            ta.NombreCompleto AS NombreTecnicoAsignado,
            c.IdPrioridad,
            p.NombrePrioridad,
            c.IdTipoCaso,
            tc.NombreTipoCaso,
            c.FechaRegistro,
            c.FechaAceptacion
        FROM soporte.Caso c
        INNER JOIN acceso.Usuario ur ON c.IdUsuarioReporta = ur.IdUsuario
        INNER JOIN catalogo.EstadoCaso ec ON c.IdEstadoCaso = ec.IdEstadoCaso
        INNER JOIN catalogo.Prioridad p ON c.IdPrioridad = p.IdPrioridad
        INNER JOIN catalogo.TipoCaso tc ON c.IdTipoCaso = tc.IdTipoCaso
        LEFT JOIN acceso.Usuario ta ON c.IdTecnicoAsignado = ta.IdUsuario
        WHERE c.IdCaso = @IdCasoNuevo
        
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
