import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../features/home/HomePage';
import RegistrarIncidencia from '../features/registrar/RegistrarIncidencia';
import DisponibilidadSalas from '../features/inventory/DisponibilidadSalas';
import MisIncidencias from '../features/casos/MisIncidencias';
import MisCasos from '../features/casos/MisCasos';
import ConfiguracionSistema from '../features/configuracion/ConfiguracionSistema';

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
      }
    ]
  }
]);


export const menuRoutes = {
  'Registrar Incidencia': '/registrar/incidencia',
  'Disponibilidad de Salas': '/inventory/disponibilidad-salas',
  'Mis Incidencias': '/casos/mis-incidencias',
  'Mis Casos': '/casos/mis-casos',
  'Configuración del Sistema': '/admin/configuracion-sistema'
};