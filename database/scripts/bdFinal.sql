------------------------------------------------------------
--   CREACIÓN DE BASE DE DATOS Y SCHEMAS
------------------------------------------------------------
IF DB_ID('MesaServicios') IS NULL
BEGIN
    CREATE DATABASE MesaServicios;
END;
GO

USE MesaServicios;
GO

IF NOT EXISTS (SELECT 1 FROM sys.schemas WHERE name = 'acceso')
    EXEC('CREATE SCHEMA acceso');
GO

IF NOT EXISTS (SELECT 1 FROM sys.schemas WHERE name = 'catalogo')
    EXEC('CREATE SCHEMA catalogo');
GO

IF NOT EXISTS (SELECT 1 FROM sys.schemas WHERE name = 'inventario')
    EXEC('CREATE SCHEMA inventario');
GO

IF NOT EXISTS (SELECT 1 FROM sys.schemas WHERE name = 'soporte')
    EXEC('CREATE SCHEMA soporte');
GO



------------------------------------------------------------
--   ESTADO GENERAL
------------------------------------------------------------
CREATE TABLE catalogo.EstadoGeneral (
    IdEstadoGeneral BIGINT IDENTITY(1,1),
    NombreEstado VARCHAR(100) NOT NULL,   -- Activo / Inactivo
    Descripcion VARCHAR(MAX) NULL,
    FechaCreacion DATETIME2 NOT NULL DEFAULT GETDATE(),
    IdUsuarioCreacion BIGINT NOT NULL
);
GO



------------------------------------------------------------
--   MÓDULO ACCESO
------------------------------------------------------------
CREATE TABLE acceso.Rol (
    IdRol BIGINT IDENTITY(1,1),
    NombreRol VARCHAR(100) NOT NULL,
    Descripcion VARCHAR(MAX) NULL,
    FechaCreacion DATETIME2 NOT NULL DEFAULT GETDATE(),
    IdUsuarioCreacion BIGINT NOT NULL
);
GO

CREATE TABLE acceso.Usuario (
    IdUsuario BIGINT IDENTITY(1,1),
    NombreCompleto VARCHAR(150) NOT NULL,
    Email VARCHAR(150) NOT NULL,
    Telefono VARCHAR(20) NULL,
    IdRol BIGINT NOT NULL,
    FechaCreacion DATETIME2 NOT NULL DEFAULT GETDATE(),
    IdUsuarioCreacion BIGINT NOT NULL
);
GO



------------------------------------------------------------
--   MÓDULO CATÁLOGO (ACTUALIZADO CON EstadoGeneral)
------------------------------------------------------------
CREATE TABLE catalogo.AreaTecnica (
    IdAreaTecnica BIGINT IDENTITY(1,1),
    NombreAreaTecnica VARCHAR(100) NOT NULL,
    Descripcion VARCHAR(MAX) NULL,
    IdEncargado BIGINT NOT NULL,
    IdEstadoGeneral BIGINT NOT NULL,
    FechaCreacion DATETIME2 NOT NULL DEFAULT GETDATE(),
    IdUsuarioCreacion BIGINT NOT NULL
);
GO


CREATE TABLE catalogo.TipoTrabajo (
    IdTipoTrabajo BIGINT IDENTITY(1,1),
    NombreTipoTrabajo VARCHAR(100) NOT NULL,
    Descripcion VARCHAR(MAX) NULL,
    IdEstadoGeneral BIGINT NOT NULL,
    FechaCreacion DATETIME2 NOT NULL DEFAULT GETDATE(),
    IdUsuarioCreacion BIGINT NOT NULL
);
GO


CREATE TABLE catalogo.EstadoIntervencionTecnica (
    IdEstadoIntervencion BIGINT IDENTITY(1,1),
    NombreEstado VARCHAR(100) NOT NULL,
    Descripcion VARCHAR(MAX) NULL,
    Orden INT NOT NULL,
    FechaCreacion DATETIME2 NOT NULL DEFAULT GETDATE(),
    IdUsuarioCreacion BIGINT NOT NULL
);
GO


CREATE TABLE catalogo.EstadoCaso (
    IdEstadoCaso BIGINT IDENTITY(1,1),
    NombreEstadoCaso VARCHAR(100) NOT NULL,
    DescripcionEstadoCaso VARCHAR(MAX) NULL,
    Orden INT NOT NULL,
    FechaCreacion DATETIME2 NOT NULL DEFAULT GETDATE(),
    IdUsuarioCreacion BIGINT NOT NULL
);
GO


CREATE TABLE catalogo.Prioridad (
    IdPrioridad BIGINT IDENTITY(1,1),
    NombrePrioridad VARCHAR(100) NOT NULL,
    TiempoRespuestaDias INT NOT NULL,
    TiempoResolucionDias INT NOT NULL,
    IdEstadoGeneral BIGINT NOT NULL,
    FechaCreacion DATETIME2 NOT NULL DEFAULT GETDATE(),
    IdUsuarioCreacion BIGINT NOT NULL
);
GO


CREATE TABLE catalogo.TipoCaso (
    IdTipoCaso BIGINT IDENTITY(1,1),
    NombreTipoCaso VARCHAR(100) NOT NULL,
    Descripcion VARCHAR(MAX) NULL,
    IdEstadoGeneral BIGINT NOT NULL,
    FechaCreacion DATETIME2 NOT NULL DEFAULT GETDATE(),
    IdUsuarioCreacion BIGINT NOT NULL
);
GO


CREATE TABLE catalogo.CanalIngreso (
    IdCanalIngreso BIGINT IDENTITY(1,1),
    NombreCanal VARCHAR(100) NOT NULL,
    Descripcion VARCHAR(MAX) NULL,
    IdEstadoGeneral BIGINT NOT NULL,
    FechaCreacion DATETIME2 NOT NULL DEFAULT GETDATE(),
    IdUsuarioCreacion BIGINT NOT NULL
);
GO


CREATE TABLE catalogo.Pregunta (
    IdPregunta BIGINT IDENTITY(1,1),
    TextoPregunta VARCHAR(MAX) NOT NULL,
    IdEstadoGeneral BIGINT NOT NULL,
    FechaCreacion DATETIME2 NOT NULL DEFAULT GETDATE(),
    IdUsuarioCreacion BIGINT NOT NULL
);
GO


CREATE TABLE catalogo.Respuesta (
    IdRespuesta BIGINT IDENTITY(1,1),
    TextoRespuesta VARCHAR(MAX) NOT NULL,
    ValorNumerico INT NULL,
    IdEstadoGeneral BIGINT NOT NULL,
    FechaCreacion DATETIME2 NOT NULL DEFAULT GETDATE(),
    IdUsuarioCreacion BIGINT NOT NULL
);
GO



------------------------------------------------------------
--   INVENTARIO 
------------------------------------------------------------
CREATE TABLE inventario.Componente (
    IdComponente BIGINT IDENTITY(1,1),
    NombreComponente VARCHAR(200) NOT NULL,
    Marca VARCHAR(100) NULL,
    Modelo VARCHAR(100) NULL,
    StockActual INT NOT NULL DEFAULT 0,
    Descripcion VARCHAR(MAX) NULL,
    IdEstadoGeneral BIGINT NOT NULL,
    FechaCreacion DATETIME2 NOT NULL DEFAULT GETDATE(),
    IdUsuarioCreacion BIGINT NOT NULL
);
GO



------------------------------------------------------------
--   MÓDULO SOPORTE
------------------------------------------------------------
CREATE TABLE soporte.Caso (
    IdCaso BIGINT IDENTITY(1,1),
    Descripcion VARCHAR(MAX) NOT NULL,
    IdUsuarioReporta BIGINT NOT NULL,
    TelefonoContacto VARCHAR(20) NULL,
    CorreoContacto VARCHAR(150) NULL,
    IdEstadoCaso BIGINT NOT NULL,
    FechaRegistro DATETIME2 NOT NULL DEFAULT GETDATE(),
    FechaAceptacion DATETIME2 NULL,
    FechaResolucion DATETIME2 NULL,
    FechaCierre DATETIME2 NULL,
    IdTipoCaso BIGINT NOT NULL,
    IdActivo BIGINT NULL,
    IdAreaTecnica BIGINT NULL,
    IdPrioridad BIGINT NOT NULL,
    IdCanalIngreso BIGINT NOT NULL,
    IdTecnicoAsignado BIGINT NULL,
    FechaActualizacion DATETIME2 NULL,
    IdUsuarioCreacion BIGINT NOT NULL
);
GO


CREATE TABLE soporte.TrazabilidadCaso (
    IdTrazabilidadCaso BIGINT IDENTITY(1,1),
    IdCaso BIGINT NOT NULL,
    FechaEvento DATETIME2 NOT NULL DEFAULT GETDATE(),
    IdUsuarioAccion BIGINT NOT NULL,
    TipoEvento VARCHAR(100) NOT NULL,
    Comentario VARCHAR(MAX) NULL,
    IdEstadoCaso BIGINT NULL,
    IdAreaTecnica BIGINT NULL,
    IdTecnicoAsignado BIGINT NULL
);
GO

ALTER TABLE soporte.TrazabilidadCaso
ADD CONSTRAINT CK_Trazabilidad_TipoEvento CHECK (
    TipoEvento IN (
        'Creacion',
        'CambioEstado',
        'Asignacion',
        'Reasignacion',
        'Comentario',
        'Resolucion',
        'Cierre'
    )
);
GO


CREATE TABLE soporte.IntervencionTecnica (
    IdIntervencionTecnica BIGINT IDENTITY(1,1),
    IdTrazabilidadCaso BIGINT NOT NULL,
    IdTipoTrabajo BIGINT NOT NULL,
    IdEstadoIntervencion BIGINT NOT NULL,
    FechaInicio DATETIME2 NOT NULL,
    FechaFin DATETIME2 NULL,
    Diagnostico VARCHAR(MAX) NULL,
    SolucionAplicada VARCHAR(MAX) NULL,
    IdUsuarioAccion BIGINT NOT NULL
);
GO


CREATE TABLE soporte.DetalleCambioComponentes (
    IdCambioComponente BIGINT IDENTITY(1,1),
    IdIntervencionTecnica BIGINT NOT NULL,
    IdComponente BIGINT NOT NULL,
    Cantidad INT NOT NULL DEFAULT 1,
    TipoCambio VARCHAR(20) NOT NULL,   
    DescripcionCambio VARCHAR(MAX) NULL,
    FechaRegistro DATETIME2 NOT NULL DEFAULT GETDATE(),
    IdUsuarioCreacion BIGINT NOT NULL
);
GO

ALTER TABLE soporte.DetalleCambioComponentes
ADD CONSTRAINT CK_DetalleCambio_TipoCambio CHECK (
    TipoCambio IN ('INSTALACION', 'RETIRO', 'REEMPLAZO')
);
GO


CREATE TABLE soporte.RevisionAdmi (
    IdRevisionAdmi BIGINT IDENTITY(1,1),
    IdIntervencionTecnica BIGINT NOT NULL,
    Aprobado BIT NOT NULL DEFAULT 0,
    ObservacionRevision VARCHAR(MAX) NULL,
    FechaRegistro DATETIME2 NOT NULL DEFAULT GETDATE(),
    IdUsuarioCreacion BIGINT NOT NULL
);
GO


CREATE TABLE inventario.Ubicacion (
    IdUbicacion BIGINT IDENTITY(1,1),
    Sede VARCHAR(150) NOT NULL,    
    Bloque VARCHAR(100) NULL,      
    Piso VARCHAR(50) NULL,         
    Sala VARCHAR(150) NULL,        
    Descripcion VARCHAR(MAX) NULL,
    FechaCreacion DATETIME2 NOT NULL DEFAULT GETDATE(),
    IdUsuarioCreacion BIGINT NOT NULL
);
GO

CREATE TABLE catalogo.CategoriaActivo (
    IdCategoriaActivo BIGINT IDENTITY(1,1),
    NombreCategoria VARCHAR(100) NOT NULL,
    Descripcion VARCHAR(MAX) NULL,
    IdEstadoGeneral BIGINT NOT NULL,
    FechaCreacion DATETIME2 NOT NULL DEFAULT GETDATE(),
    IdUsuarioCreacion BIGINT NOT NULL
);
GO

CREATE TABLE catalogo.EstadoActivo (
    IdEstadoActivo BIGINT IDENTITY(1,1),
    NombreEstado VARCHAR(100) NOT NULL,
    Descripcion VARCHAR(MAX) NULL,
    FechaCreacion DATETIME2 NOT NULL DEFAULT GETDATE(),
    IdUsuarioCreacion BIGINT NOT NULL
);
GO

CREATE TABLE inventario.Inventario (
    IdInventario BIGINT IDENTITY(1,1),
    NombreInventario VARCHAR(200) NOT NULL,  
    Descripcion VARCHAR(MAX) NULL,           
    IdEstadoGeneral BIGINT NOT NULL, 
    IdResponsableInventario BIGINT NOT NULL,       
    FechaCreacion DATETIME2 NOT NULL DEFAULT GETDATE(),
    IdUsuarioCreacion BIGINT NOT NULL
);
GO

CREATE TABLE inventario.Activo (
    IdActivo BIGINT IDENTITY(1,1),
    CodigoPatrimonial VARCHAR(100) NULL,   
    NombreActivo VARCHAR(200) NOT NULL,
    DescripcionTecnica VARCHAR(MAX) NULL,
    Marca VARCHAR(100) NULL,
    Modelo VARCHAR(100) NULL,
    Serie VARCHAR(100) NULL,
    IdCategoriaActivo BIGINT NOT NULL,
    IdEstadoActivo BIGINT NOT NULL,
    IdInventario BIGINT NOT NULL,          
    IdUbicacion BIGINT NOT NULL,                      
    FechaIngreso DATETIME2 NULL,
    IdResponsableActivo BIGINT NULL, 
    FechaCreacion DATETIME2 NOT NULL DEFAULT GETDATE(),
    FechaActualizacion DATETIME2 NULL,
    IdUsuarioCreacion BIGINT NOT NULL
);
GO


CREATE TABLE inventario.HojaDeVidaActivo (
    IdHojaActivo BIGINT IDENTITY(1,1),
    IdActivo BIGINT NOT NULL,
    FechaRegistro DATETIME2 NOT NULL DEFAULT GETDATE(),
    DetalleRegistro VARCHAR(MAX) NOT NULL,   
    TipoEvento VARCHAR(100) NULL,            
    IdCaso BIGINT NULL,                      
    IdUsuarioCreacion BIGINT NOT NULL
);
GO

CREATE TABLE catalogo.TipoConsumible (
    IdTipoConsumible BIGINT IDENTITY(1,1),
    NombreTipo VARCHAR(100) NOT NULL,
    Descripcion VARCHAR(MAX) NULL,
    IdEstadoGeneral BIGINT NOT NULL,
    FechaCreacion DATETIME2 NOT NULL DEFAULT GETDATE(),
    IdUsuarioCreacion BIGINT NOT NULL
);
GO


CREATE TABLE catalogo.EstadoConsumible (
    IdEstadoConsumible BIGINT IDENTITY(1,1),
    NombreEstado VARCHAR(100) NOT NULL,
    Descripcion VARCHAR(MAX) NULL,
    FechaCreacion DATETIME2 NOT NULL DEFAULT GETDATE(),
    IdUsuarioCreacion BIGINT NOT NULL
);
GO


CREATE TABLE inventario.Consumible (
    IdConsumible BIGINT IDENTITY(1,1),
    NombreConsumible VARCHAR(200) NOT NULL,
    Marca VARCHAR(100) NULL,
    Modelo VARCHAR(100) NULL,
    StockActual INT NOT NULL DEFAULT 0,
    StockMinimo INT NOT NULL DEFAULT 1,
    DescripcionTecnica VARCHAR(MAX) NULL,
    IdInventario BIGINT NOT NULL,
    IdTipoConsumible BIGINT NOT NULL,
    IdEstadoConsumible BIGINT NOT NULL,
    FechaCreacion DATETIME2 NOT NULL DEFAULT GETDATE(),
    FechaActualizacion DATETIME2 NULL,
    IdUsuarioCreacion BIGINT NOT NULL
);
GO

CREATE TABLE soporte.EncuestaCalidad (
    IdEncuesta BIGINT IDENTITY(1,1),
    IdCaso BIGINT NOT NULL,
    FechaEncuesta DATETIME2 NOT NULL DEFAULT GETDATE(),
    Observaciones VARCHAR(MAX) NULL,
    IdUsuarioCreacion BIGINT NOT NULL
);
GO

CREATE TABLE soporte.DetalleEncuesta (
    IdDetalleEncuesta BIGINT IDENTITY(1,1),
    IdEncuesta BIGINT NOT NULL,
    IdPregunta BIGINT NOT NULL,
    IdRespuesta BIGINT NOT NULL,
    FechaRegistro DATETIME2 NOT NULL DEFAULT GETDATE(),
    IdUsuarioCreacion BIGINT NOT NULL
);
GO

CREATE TABLE soporte.DetalleConsumible (
    IdDetalleConsumible BIGINT IDENTITY(1,1),
    IdIntervencionTecnica BIGINT NOT NULL,
    IdConsumible BIGINT NOT NULL,
    Cantidad INT NOT NULL CHECK (Cantidad > 0),
    DescripcionUso VARCHAR(MAX) NULL,
    FechaRegistro DATETIME2 NOT NULL DEFAULT GETDATE(),
    IdUsuarioCreacion BIGINT NOT NULL
);
GO
