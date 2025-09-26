import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../features/home/HomePage';
import RegistrarIncidencia from '../features/registrar/RegistrarIncidencia';
import DisponibilidadSalas from '../features/inventory/DisponibilidadSalas';
import GestionInventario from '../features/inventory/GestionInventario';
import MisIncidencias from '../features/casos/MisIncidencias';
import MisCasos from '../features/casos/MisCasos';
import ConfiguracionSistema from '../features/configuracion/ConfiguracionSistema';
import ReportesConfiguracion from '../features/reportes/ReportesConfiguracion';
import EncuestasCalidad from '../features/reportes/EncuestasCalidad';
import ReportesCasos from '../features/reportes/ReportesCasos';
import DashboardGeneral from '../features/reportes/DashboardGeneral';
import RevisionAdministrativa from '../features/revision/RevisionAdministrativa';
import GestionIncidencias from '../features/incidencias/GestionIncidencias';

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
        path: 'admin/configuracion-sistema',
        element: <ConfiguracionSistema />
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
      {
        path: 'admin/gestion-incidencias',
        element: <GestionIncidencias />
      }
    ]
  }
]);


export const menuRoutes = {
  'Registrar Incidencia': '/registrar/incidencia',
  'Gestión de Inventario': '/inventory/gestion-inventario',
  'Disponibilidad de Salas': '/inventory/disponibilidad-salas',
  'Mis Incidencias': '/casos/mis-incidencias',
  'Mis Casos': '/casos/mis-casos',
  'Configuración del Sistema': '/admin/configuracion-sistema',
  'Reportes de Configuración': '/reportes/configuracion',
  'Encuestas de Calidad': '/reportes/encuestas-calidad',
  'Reportes de Casos': '/reportes/casos',
  'Dashboard General': '/reportes/dashboard',
  'Revisión Administrativa': '/admin/revision-administrativa',
  'Gestión de Incidencias': '/admin/gestion-incidencias'
};