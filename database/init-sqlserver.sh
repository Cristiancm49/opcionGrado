#!/bin/bash
# Script de inicialización para SQL Server
# Espera a que SQL Server esté listo y luego ejecuta el script de creación de BD

echo "⏳ Esperando a que SQL Server esté listo..."
sleep 30

echo "🔄 Ejecutando script de creación de base de datos..."
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P 3124553100Mm -i /docker-entrypoint-initdb.d/bsd.sql

if [ $? -eq 0 ]; then
    echo "✅ Base de datos mesaServicios creada exitosamente!"
else
    echo "❌ Error al crear la base de datos"
    exit 1
fi

echo "📊 Base de datos lista para usar"



