#!/bin/bash

# ===========================================
# SCRIPT DE CONFIGURACIÓN DEL PROYECTO CHAIRA
# ===========================================

echo "🚀 Iniciando configuración del proyecto Chaira..."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para imprimir mensajes
print_message() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Verificar si Docker está instalado
if ! command -v docker &> /dev/null; then
    print_error "Docker no está instalado. Por favor instala Docker Desktop."
    exit 1
fi

# Verificar si Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose no está instalado. Por favor instala Docker Compose."
    exit 1
fi

# Verificar si .NET está instalado
if ! command -v dotnet &> /dev/null; then
    print_error ".NET no está instalado. Por favor instala .NET 8.0."
    exit 1
fi

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    print_error "Node.js no está instalado. Por favor instala Node.js."
    exit 1
fi

print_message "Todas las dependencias están instaladas"

# Crear archivos .env si no existen
print_info "Configurando archivos de entorno..."

# Backend .env
if [ ! -f "backend/.env" ]; then
    cat > backend/.env << EOF
# Configuración del Backend
ASPNETCORE_ENVIRONMENT=Development
SQL_SERVER_CONNECTION_STRING=Server=localhost,1433;Database=ChairaDB;User Id=sa;Password=YourStrong@Passw0rd;TrustServerCertificate=true;MultipleActiveResultSets=true;
MONGO_CONNECTION_STRING=mongodb://localhost:27017
MONGO_DATABASE_NAME=ChairaMongoDB
JWT_SECRET_KEY=YourSuperSecretKeyForJWTTokenGeneration2024!
API_BASE_URL=http://localhost:5000
FRONTEND_URL=http://localhost:5173
EOF
    print_message "Archivo backend/.env creado"
else
    print_warning "Archivo backend/.env ya existe"
fi

# Frontend .env
if [ ! -f "frontend/.env" ]; then
    cat > frontend/.env << EOF
# Configuración del Frontend
NODE_ENV=development
VITE_API_BASE_URL=http://localhost:5000
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Chaira
VITE_APP_VERSION=1.0.0
VITE_ENABLE_DEBUG=true
VITE_ENABLE_MOCK_DATA=true
EOF
    print_message "Archivo frontend/.env creado"
else
    print_warning "Archivo frontend/.env ya existe"
fi

# Iniciar contenedores Docker
print_info "Iniciando contenedores Docker..."
docker-compose up -d

# Esperar a que los contenedores estén listos
print_info "Esperando a que los contenedores estén listos..."
sleep 10

# Verificar que los contenedores estén ejecutándose
if docker ps | grep -q "chaira-sqlserver"; then
    print_message "SQL Server está ejecutándose"
else
    print_error "SQL Server no está ejecutándose"
fi

if docker ps | grep -q "chaira-mongodb"; then
    print_message "MongoDB está ejecutándose"
else
    print_error "MongoDB no está ejecutándose"
fi

# Instalar dependencias del frontend
print_info "Instalando dependencias del frontend..."
cd frontend
npm install
cd ..

# Compilar el backend
print_info "Compilando el backend..."
cd backend
dotnet build
cd ..

print_message "Configuración completada exitosamente!"
print_info "Para iniciar el proyecto:"
print_info "  Backend: cd backend && dotnet run --project MicroApi.Seguridad.Api"
print_info "  Frontend: cd frontend && npm run dev"
print_info "  Bases de datos: docker-compose up -d"
print_info ""
print_info "URLs del proyecto:"
print_info "  Frontend: http://localhost:5173"
print_info "  Backend API: http://localhost:5000"
print_info "  Swagger: http://localhost:5000/swagger"
print_info "  SQL Server: localhost:1433"
print_info "  MongoDB: localhost:27017"
