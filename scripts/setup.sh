#!/bin/bash

# ===========================================
# SCRIPT DE CONFIGURACIÓN - CHAIRA PROJECT
# ===========================================

echo "🚀 Iniciando configuración del proyecto Chaira..."

# Verificar si Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker no está instalado. Por favor instala Docker Desktop desde:"
    echo "   https://www.docker.com/products/docker-desktop/"
    exit 1
fi

# Verificar si .NET está instalado
if ! command -v dotnet &> /dev/null; then
    echo "❌ .NET SDK no está instalado. Por favor instala .NET desde:"
    echo "   https://dotnet.microsoft.com/download"
    exit 1
fi

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor instala Node.js desde:"
    echo "   https://nodejs.org/"
    exit 1
fi

echo "✅ Todas las herramientas necesarias están instaladas"

# Iniciar servicios de base de datos con Docker
echo "🐳 Iniciando servicios de base de datos..."
docker-compose up -d

# Esperar a que los servicios estén listos
echo "⏳ Esperando a que los servicios estén listos..."
sleep 30

# Verificar que los servicios estén funcionando
echo "🔍 Verificando servicios..."

# Verificar SQL Server
if docker exec chaira-sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P 3124553100Mm -Q "SELECT 1" &> /dev/null; then
    echo "✅ SQL Server está funcionando"
else
    echo "❌ SQL Server no está respondiendo"
fi

# Verificar MongoDB
if docker exec chaira-mongodb mongo --eval "db.runCommand('ping')" &> /dev/null; then
    echo "✅ MongoDB está funcionando"
else
    echo "❌ MongoDB no está respondiendo"
fi

# Verificar Redis
if docker exec chaira-redis redis-cli ping &> /dev/null; then
    echo "✅ Redis está funcionando"
else
    echo "❌ Redis no está respondiendo"
fi

# Instalar dependencias del frontend
echo "📦 Instalando dependencias del frontend..."
cd frontend
npm install
cd ..

# Restaurar paquetes del backend
echo "📦 Restaurando paquetes del backend..."
cd backend
dotnet restore
cd ..

echo "🎉 ¡Configuración completada!"
echo ""
echo "Para iniciar el proyecto:"
echo "1. Frontend: cd frontend && npm run dev"
echo "2. Backend: cd backend && dotnet run --project MicroApi.Seguridad.Api"
echo ""
echo "URLs del proyecto:"
echo "- Frontend: http://localhost:5173"
echo "- Backend API: http://localhost:5000"
echo "- Swagger: http://localhost:5000/swagger"