import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../features/home/HomePage';
import RegistrarIncidencia from '../features/registrar/RegistrarIncidencia';
import DisponibilidadSalas from '../features/inventory/DisponibilidadSalas';
import GestionInventario from '../features/inventory/GestionInventario';
import MisIncidencias from '../features/incidencias/MisIncidencias';
import GestionIncidencias from '../features/incidencias/GestionIncidencias';
import MisCasos from '../features/casos/MisCasos';
import ConfiguracionSistema from '../features/configuracion/ConfiguracionSistema';
import GestionUsuarios from '../features/configuracion/GestionUsuarios';
import GestionRoles from '../features/configuracion/GestionRoles';
import GestionCatalogos from '../features/configuracion/GestionCatalogos';
import DetalleCatalogo from '../features/configuracion/DetalleCatalogo';
import ReportesConfiguracion from '../features/reportes/ReportesConfiguracion';
import EncuestasCalidad from '../features/reportes/EncuestasCalidad';
import ReportesCasos from '../features/reportes/ReportesCasos';
import DashboardGeneral from '../features/reportes/DashboardGeneral';
import RevisionAdministrativa from '../features/revision/RevisionAdministrativa';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'registrar/incidencia',
        element: <RegistrarIncidencia />
      },
      {
        path: 'inventory/disponibilidad-salas',
        element: <DisponibilidadSalas />
      },
      {
        path: 'inventory/gestion-inventario',
        element: <GestionInventario />
      },
      {
        path: 'casos/mis-incidencias',
        element: <MisIncidencias />
      },
      {
        path: 'casos/mis-casos',
        element: <MisCasos />
      },
      {
        path: 'admin/gestion-incidencias',
        element: <GestionIncidencias />
      },
      {
        path: 'admin/configuracion-sistema',
        element: <ConfiguracionSistema />
      },
      {
        path: 'admin/gestion-usuarios',
        element: <GestionUsuarios />
      },
      {
        path: 'admin/gestion-roles',
        element: <GestionRoles />
      },
      {
        path: 'admin/gestion-catalogos',
        element: <GestionCatalogos />
      },
      {
        path: 'admin/catalogo/:tipo',
        element: <DetalleCatalogo />
      },
      {
        path: 'reportes/configuracion',
        element: <ReportesConfiguracion />
      },
      {
        path: 'reportes/encuestas-calidad',
        element: <EncuestasCalidad />
      },
      {
        path: 'reportes/casos',
        element: <ReportesCasos />
      },
      {
        path: 'reportes/dashboard',
        element: <DashboardGeneral />
      },
      {
        path: 'admin/revision-administrativa',
        element: <RevisionAdministrativa />
      },
    ]
  }
]);


export const menuRoutes = {
  'Registrar Incidencia': '/registrar/incidencia',
  'Gestión de Inventario': '/inventory/gestion-inventario',
  'Disponibilidad de Salas': '/inventory/disponibilidad-salas',
  'Mis Incidencias': '/casos/mis-incidencias',
  'Mis Casos': '/casos/mis-casos',
  'Gestión de Incidencias': '/admin/gestion-incidencias',
  'Configuración del Sistema': '/admin/configuracion-sistema',
  'Gestión de Usuarios': '/admin/gestion-usuarios',
  'Gestión de Roles': '/admin/gestion-roles',
  'Gestión de Catálogos': '/admin/gestion-catalogos',
  'Reportes de Configuración': '/reportes/configuracion',
  'Encuestas de Calidad': '/reportes/encuestas-calidad',
  'Reportes de Casos': '/reportes/casos',
  'Dashboard General': '/reportes/dashboard',
  'Revisión Administrativa': '/admin/revision-administrativa',
};
