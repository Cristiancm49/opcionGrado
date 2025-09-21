import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../features/home/HomePage';
import RegistrarIncidencia from '../features/registrar/RegistrarIncidencia';
import DisponibilidadSalas from '../features/inventory/DisponibilidadSalas';
import MisCasos from '../features/casos/MisIncidencias';

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
        element: <MisCasos />
      }
    ]
  }
]);


export const menuRoutes = {
  'Registrar Incidencia': '/registrar/incidencia',
  'Disponibilidad de Salas': '/inventory/disponibilidad-salas',
  'Mis Incidencias': '/casos/mis-incidencias'
};