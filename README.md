# 🏗️ Proyecto Chaira - Sistema de Gestión de Incidencias

## 📋 Descripción

Sistema completo de gestión de incidencias desarrollado con **React + Vite** (Frontend) y **.NET 8.0** (Backend) usando arquitectura cebolla.

## 🛠️ Tecnologías

### Frontend
- **React 18** con Vite
- **Tailwind CSS** para estilos
- **React Router** para navegación
- **Zustand** para estado global

### Backend
- **.NET 8.0** con ASP.NET Core Web API
- **Arquitectura Cebolla** (Onion Architecture)
- **Entity Framework Core** para SQL Server
- **MongoDB.Driver** para MongoDB
- **Swagger** para documentación

### Bases de Datos
- **SQL Server 2019** (Datos relacionales)
- **MongoDB 2.25** (Logs y auditoría)
- **Redis** (Cache - futuro)

## 🚀 Configuración Rápida

### Opción 1: Script Automático
```bash
# Ejecutar script de configuración
./scripts/setup.sh
```

### Opción 2: Configuración Manual

#### 1. Iniciar Bases de Datos
```bash
# Iniciar contenedores Docker
docker-compose up -d
```

#### 2. Configurar Backend
```bash
cd backend
dotnet restore
dotnet build
dotnet run --project MicroApi.Seguridad.Api
```

#### 3. Configurar Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📁 Estructura del Proyecto

```
proyecto/
├── frontend/                 # React + Vite
│   ├── src/
│   │   ├── components/       # Componentes reutilizables
│   │   ├── features/         # Módulos de funcionalidad
│   │   ├── layouts/          # Layouts de página
│   │   ├── router/           # Configuración de rutas
│   │   ├── store/            # Estado global
│   │   └── utils/            # Utilidades
│   └── package.json
├── backend/                  # .NET 8.0
│   ├── MicroApi.Seguridad.Domain/      # Entidades y lógica de negocio
│   ├── MicroApi.Seguridad.Application/ # Casos de uso y servicios
│   ├── MicroApi.Seguridad.Data/        # Repositorios y acceso a datos
│   ├── MicroApi.Seguridad.Api/         # Controladores y configuración
│   └── CHAIRA_API_MOVIL.sln
├── database/                 # Scripts de base de datos
├── scripts/                  # Scripts de automatización
├── docker-compose.yml        # Configuración de contenedores
└── README.md
```

## 🔧 Configuración de Variables de Entorno

### Backend (.NET)
Las configuraciones están en `appsettings.json` y `appsettings.Development.json`:

```json
{
  "ConnectionStrings": {
    "SqlServerConnection": "Server=localhost,1433;Database=ChairaDB;User Id=sa;Password=YourStrong@Passw0rd;TrustServerCertificate=true;",
    "MongoConnection": "mongodb://localhost:27017"
  },
  "JwtSettings": {
    "SecretKey": "YourSuperSecretKeyForJWTTokenGeneration2024!",
    "Issuer": "ChairaAPI",
    "Audience": "ChairaFrontend",
    "ExpiryMinutes": 60
  }
}
```

### Frontend (React)
Crear archivo `.env` en `frontend/`:

```env
VITE_API_BASE_URL=http://localhost:5000
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Chaira
VITE_ENABLE_DEBUG=true
VITE_ENABLE_MOCK_DATA=true
```

## 🐳 Docker

### Iniciar Contenedores
```bash
docker-compose up -d
```

### Verificar Contenedores
```bash
docker ps
```

### Detener Contenedores
```bash
docker-compose down
```

## 📊 URLs del Proyecto

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **Swagger:** http://localhost:5000/swagger
- **SQL Server:** localhost:1433
- **MongoDB:** localhost:27017

## 🔐 Credenciales por Defecto

### SQL Server
- **Usuario:** sa
- **Contraseña:** YourStrong@Passw0rd

### MongoDB
- **Usuario:** admin
- **Contraseña:** admin123
- **Base de datos:** ChairaMongoDB

## 🧪 Testing

### Backend
```bash
cd backend
dotnet test
```

### Frontend
```bash
cd frontend
npm test
```

## 📝 Comandos Útiles

### Backend
```bash
# Compilar
dotnet build

# Ejecutar
dotnet run --project MicroApi.Seguridad.Api

# Limpiar
dotnet clean

# Restaurar paquetes
dotnet restore
```

### Frontend
```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Preview de producción
npm run preview
```

## 🚨 Solución de Problemas

### Error de Conexión a Base de Datos
1. Verificar que Docker esté ejecutándose
2. Verificar que los contenedores estén activos: `docker ps`
3. Verificar las credenciales en `appsettings.json`

### Error de CORS
1. Verificar `CorsSettings` en `appsettings.json`
2. Asegurar que la URL del frontend esté en `AllowedOrigins`

### Error de Compilación
1. Ejecutar `dotnet clean` y `dotnet restore`
2. Verificar que .NET 8.0 esté instalado
3. Verificar que todas las referencias estén correctas

## 📚 Documentación Adicional

- [Documentación de .NET 8.0](https://docs.microsoft.com/en-us/dotnet/)
- [Documentación de React](https://reactjs.org/docs)
- [Documentación de Vite](https://vitejs.dev/guide/)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)

## 👥 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🆘 Soporte

Si tienes problemas o preguntas, por favor:
1. Revisa la sección de solución de problemas
2. Busca en los issues existentes
3. Crea un nuevo issue con detalles del problema

---

**¡Desarrollado con ❤️ por el equipo de Chaira!**
