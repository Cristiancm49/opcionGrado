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


CREATE TABLE acceso.Rol (
    IdRol              BIGINT IDENTITY(1,1),
    NombreRol          VARCHAR(100) NOT NULL,
    DescripcionRol     VARCHAR(500) NULL,
    FechaCreacion      DATETIME2 NOT NULL DEFAULT GETDATE(),
    IdUsuarioCreacion  BIGINT NOT NULL
);
GO


CREATE TABLE acceso.Usuario (
    IdUsuario         BIGINT IDENTITY(1,1),
    NombreCompleto    VARCHAR(150) NOT NULL,
    Email             VARCHAR(150) NOT NULL,
    Telefono          VARCHAR(20) NULL,
    IdRol             BIGINT NOT NULL,
    IdEstadoUsuario   BIGINT NOT NULL,
    FechaCreacion     DATETIME2 NOT NULL DEFAULT GETDATE(),
    IdUsuarioCreacion BIGINT NOT NULL
);
GO


CREATE TABLE catalogo.EstadoUsuario (
    IdEstadoUsuario    BIGINT IDENTITY(1,1),
    NombreEstado       VARCHAR(100) NOT NULL,
    Descripcion        VARCHAR(MAX) NULL,
    FechaCreacion      DATETIME2 NOT NULL DEFAULT GETDATE(),
    IdUsuarioCreacion  BIGINT NOT NULL
);
GO


CREATE TABLE catalogo.AreaTecnica (
    IdAreaTecnica     BIGINT IDENTITY(1,1),
    NombreAreaTecnica VARCHAR(100) NOT NULL,
    Descripcion       VARCHAR(MAX) NULL,
    IdEncargado       BIGINT NOT NULL, 
    FechaCreacion     DATETIME2 NOT NULL DEFAULT GETDATE(),
    IdUsuarioCreacion BIGINT NOT NULL
);
GO


CREATE TABLE catalogo.TipoTrabajo (
    IdTipoTrabajo     BIGINT IDENTITY(1,1),
    IdAreaTecnica     BIGINT NOT NULL,
    NombreTipoTrabajo VARCHAR(100) NOT NULL,
    Descripcion       VARCHAR(MAX) NULL,
    FechaCreacion     DATETIME2 NOT NULL DEFAULT GETDATE(),
    IdUsuarioCreacion BIGINT NOT NULL
);
GO


CREATE TABLE catalogo.EstadoCaso (
    IdEstadoCaso      BIGINT IDENTITY(1,1),
    NombreEstado      VARCHAR(100) NOT NULL,
    Descripcion       VARCHAR(MAX) NULL,
    Orden             INT NOT NULL,
    EsFinal           BIT NOT NULL DEFAULT 0,
    FechaCreacion     DATETIME2 NOT NULL DEFAULT GETDATE(),
    IdUsuarioCreacion BIGINT NOT NULL
);
GO


CREATE TABLE catalogo.EstadoDetalleHistorial (
    IdEstadoDetalleHistorial BIGINT IDENTITY(1,1),
    NombreEstado             VARCHAR(100) NOT NULL,
    Descripcion              VARCHAR(MAX) NULL,
    Orden                    INT NOT NULL,
    FechaCreacion            DATETIME2 NOT NULL DEFAULT GETDATE(),
    IdUsuarioCreacion        BIGINT NOT NULL
);
GO


CREATE TABLE catalogo.Prioridad (
    IdPrioridad        BIGINT IDENTITY(1,1),
    NombrePrioridad    VARCHAR(100) NOT NULL,
    Descripcion        VARCHAR(MAX) NULL,
    TiempoRespuestaDias INT NOT NULL,
    TiempoResolucionDias INT NOT NULL,
    FechaCreacion      DATETIME2 NOT NULL DEFAULT GETDATE(),
    IdUsuarioCreacion  BIGINT NOT NULL
);
GO

CREATE TABLE catalogo.TipoCaso (
    IdTipoCaso        BIGINT IDENTITY(1,1),
    NombreTipoCaso    VARCHAR(100) NOT NULL,
    Descripcion       VARCHAR(MAX) NULL,
    FechaCreacion     DATETIME2 NOT NULL DEFAULT GETDATE(),
    IdUsuarioCreacion BIGINT NOT NULL
);
GO


CREATE TABLE catalogo.EstadoActivo (
    IdEstadoActivo    BIGINT IDENTITY(1,1),
    NombreEstado      VARCHAR(100) NOT NULL,
    Descripcion       VARCHAR(MAX) NULL,
    FechaCreacion     DATETIME2 NOT NULL DEFAULT GETDATE(),
    IdUsuarioCreacion BIGINT NOT NULL
);
GO

CREATE TABLE catalogo.CategoriaActivo (
    IdCategoriaActivo BIGINT IDENTITY(1,1),
    NombreCategoria   VARCHAR(100) NOT NULL,
    Descripcion       VARCHAR(MAX) NULL,
    FechaCreacion     DATETIME2 NOT NULL DEFAULT GETDATE(),
    IdUsuarioCreacion BIGINT NOT NULL
);
GO


CREATE TABLE catalogo.EstadoConsumible (
    IdEstadoConsumible BIGINT IDENTITY(1,1),
    NombreEstado        VARCHAR(100) NOT NULL,
    Descripcion         VARCHAR(MAX) NULL,
    FechaCreacion       DATETIME2 NOT NULL DEFAULT GETDATE(),
    IdUsuarioCreacion   BIGINT NOT NULL
);
GO

CREATE TABLE catalogo.TipoConsumible (
    IdTipoConsumible   BIGINT IDENTITY(1,1),
    NombreTipo         VARCHAR(100) NOT NULL,
    Descripcion        VARCHAR(MAX) NULL,
    FechaCreacion      DATETIME2 NOT NULL DEFAULT GETDATE(),
    IdUsuarioCreacion  BIGINT NOT NULL
);
GO

CREATE TABLE catalogo.Pregunta (
    IdPregunta        BIGINT IDENTITY(1,1),
    TextoPregunta     VARCHAR(MAX) NOT NULL,
    FechaCreacion     DATETIME2 NOT NULL DEFAULT GETDATE(),
    IdUsuarioCreacion BIGINT NOT NULL
);
GO


CREATE TABLE catalogo.Respuesta (
    IdRespuesta       BIGINT IDENTITY(1,1),
    TextoRespuesta    VARCHAR(MAX) NOT NULL,
    ValorNumerico     INT NULL,
    FechaCreacion     DATETIME2 NOT NULL DEFAULT GETDATE(),
    IdUsuarioCreacion BIGINT NOT NULL
);
GO

CREATE TABLE inventario.Ubicacion (
    IdUbicacion        BIGINT IDENTITY(1,1),
    Sede               VARCHAR(150) NOT NULL,
    Bloque             VARCHAR(100) NULL,
    Piso               VARCHAR(50) NULL,
    Sala               VARCHAR(150) NULL,
    Descripcion        VARCHAR(MAX) NULL,
    FechaCreacion      DATETIME2 NOT NULL DEFAULT GETDATE(),
    IdUsuarioCreacion  BIGINT NOT NULL
);
GO

CREATE TABLE catalogo.CanalIngreso (
    IdCanalIngreso    BIGINT IDENTITY(1,1),
    NombreCanal       VARCHAR(100) NOT NULL,
    Descripcion       VARCHAR(MAX) NULL,
    FechaCreacion     DATETIME2 NOT NULL DEFAULT GETDATE(),
    IdUsuarioCreacion BIGINT NOT NULL
);
GO


CREATE TABLE inventario.Inventario (
    IdInventario        BIGINT IDENTITY(1,1),
    NombreInventario    VARCHAR(200) NOT NULL,
    IdCategoriaActivo   BIGINT NOT NULL,
    Descripcion         VARCHAR(MAX) NULL,
    IdUbicacion         BIGINT NOT NULL,
    IdResponsable       BIGINT NULL,
    FechaCreacion       DATETIME2 NOT NULL DEFAULT GETDATE(),
    FechaActualizacion  DATETIME2 NULL,
    IdUsuarioCreacion   BIGINT NOT NULL
);
GO

CREATE TABLE inventario.Activo (
    IdActivo           BIGINT IDENTITY(1,1),
    CodigoPatrimonial  VARCHAR(100) NULL,
    NombreActivo       VARCHAR(200) NOT NULL,
    DescripcionTecnica VARCHAR(MAX) NULL,
    Marca              VARCHAR(100) NULL,
    Modelo             VARCHAR(100) NULL,
    Serie              VARCHAR(100) NULL,
    Placa              VARCHAR(100) NULL,
    IdInventario       BIGINT NOT NULL,
    IdEstadoActivo     BIGINT NOT NULL,
    FechaIngreso       DATETIME2 NULL,
    FechaCreacion      DATETIME2 NOT NULL DEFAULT GETDATE(),
    FechaActualizacion DATETIME2 NULL,
    IdUsuarioCreacion  BIGINT NOT NULL
);
GO

CREATE TABLE inventario.Consumible (
    IdConsumible        BIGINT IDENTITY(1,1),
    NombreConsumible    VARCHAR(200) NOT NULL,
    Marca               VARCHAR(100) NULL,
    Modelo              VARCHAR(100) NULL,
    StockActual         INT NOT NULL DEFAULT 0,
    StockMinimo         INT NOT NULL DEFAULT 1,
    DescripcionTecnica  VARCHAR(MAX) NULL,
    IdInventario        BIGINT NOT NULL,
    IdTipoConsumible    BIGINT NOT NULL,
    IdEstadoConsumible  BIGINT NOT NULL,
    FechaCreacion       DATETIME2 NOT NULL DEFAULT GETDATE(),
    FechaActualizacion  DATETIME2 NULL,
    IdUsuarioCreacion   BIGINT NOT NULL
);
GO


CREATE TABLE inventario.HojaDeVidaActivo (
    IdHojaActivo       BIGINT IDENTITY(1,1),
    IdActivo           BIGINT NOT NULL,
    FechaRegistro      DATETIME2 NOT NULL DEFAULT GETDATE(),
    DetalleRegistro    VARCHAR(MAX) NOT NULL,
    TipoEvento         VARCHAR(100) NULL,
    IdCaso             BIGINT NULL,
    IdUsuarioCreacion  BIGINT NOT NULL
);
GO

CREATE TABLE soporte.Caso (
    IdCaso              BIGINT IDENTITY(1,1),
    Descripcion         VARCHAR(MAX) NOT NULL,
    IdUsuarioReporta    BIGINT NOT NULL,
    TelefonoContacto    VARCHAR(20) NULL,
    CorreoContacto      VARCHAR(150) NULL,
    IdEstadoCaso        BIGINT NOT NULL,
    FechaRegistro       DATETIME2 NOT NULL DEFAULT GETDATE(),
    FechaAceptacion     DATETIME2 NULL,
    FechaResolucion     DATETIME2 NULL,
    FechaCierre         DATETIME2 NULL,
    IdTipoCaso          BIGINT NOT NULL,
    IdActivo            BIGINT NULL,
    IdAreaTecnica       BIGINT NULL,
    IdPrioridad         BIGINT NOT NULL,
    IdCanalIngreso      BIGINT NOT NULL,
    IdTecnicoAsignado   BIGINT NULL,
    FechaActualizacion  DATETIME2 NULL,
    IdUsuarioCreacion   BIGINT NOT NULL
);
GO





