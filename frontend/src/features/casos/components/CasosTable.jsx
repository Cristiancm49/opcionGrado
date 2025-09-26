import { 
  Eye, 
  FileText, 
  Settings, 
  BarChart3, 
  CheckCircle, 
  Clock 
} from 'lucide-react';
import { 
  getEstadoColor, 
  getPrioridadColor, 
  getSlaColor, 
  formatearFecha 
} from '../data/casosData';
import { Button, Card, Table } from '../../../styles/components';
import { cn } from '../../../styles/utils';
import { textStyles, componentColors, THEME_CONSTANTS } from '../../../styles/theme';

const CasosTable = ({ 
  casos, 
  loading, 
  onVerDetalle, 
  onGestionarDiagnostico, 
  onGestionarCaso, 
  onVerSeguimiento,
  onAceptarCaso,
  onMarcarResuelto 
}) => {
  if (loading) {
    return (
      <Table.Loading message="Cargando casos..." />
    );
  }

  if (casos.length === 0) {
    const emptyIcon = (
      <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    );
    
    return (
      <Table.Empty
        icon={emptyIcon}
        title="No hay casos disponibles"
        description="No se encontraron casos que coincidan con los filtros aplicados."
      />
    );
  }

  return (
    <Table>
      <Table.Header>
        <tr>
          <Table.Head>Caso</Table.Head>
          <Table.Head>Solicitante</Table.Head>
          <Table.Head>Descripción</Table.Head>
          <Table.Head>Prioridad</Table.Head>
          <Table.Head>Estado</Table.Head>
          <Table.Head>Fecha Límite</Table.Head>
          <Table.Head>SLA</Table.Head>
          <Table.Head>Acciones</Table.Head>
        </tr>
      </Table.Header>
      <Table.Body>
        {casos.map((caso) => (
          <Table.Row key={caso.id}>
            <Table.Cell>
              <div>
                <div className={cn(textStyles.tableCell, 'font-medium')}>
                  {caso.numeroCaso}
                </div>
                <div className={textStyles.tableCellSecondary}>
                  {caso.areaTecnica} • {caso.tipoTrabajo}
                </div>
              </div>
            </Table.Cell>
            <Table.Cell>
              <div>
                <div className={cn(textStyles.tableCell, 'font-medium')}>
                  {caso.solicitante}
                </div>
                <div className={textStyles.tableCellSecondary}>
                  {caso.dependencia}
                </div>
              </div>
            </Table.Cell>
            <Table.Cell className="max-w-xs truncate">
              {caso.descripcion}
            </Table.Cell>
            <Table.Cell>
              <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', getPrioridadColor(caso.prioridad))}>
                {caso.prioridad}
              </span>
            </Table.Cell>
            <Table.Cell>
              <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', getEstadoColor(caso.estado))}>
                {caso.estado}
              </span>
            </Table.Cell>
            <Table.Cell>
              {formatearFecha(caso.fechaLimite)}
            </Table.Cell>
            <Table.Cell>
              <div className="flex items-center">
                <span className={cn('inline-flex items-center px-2 py-1 text-xs font-medium rounded-full shadow-sm', getSlaColor(caso.slaStatus))}>
                  {caso.slaStatus === 'En Tiempo' ? '✅' :
                   caso.slaStatus === 'En Riesgo' ? '⚠️' :
                   caso.slaStatus === 'Vencido' ? '❌' : '🔵'}
                  <span className="ml-1">{caso.slaStatus}</span>
                </span>
              </div>
            </Table.Cell>
            <Table.Cell>
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onVerDetalle(caso)}
                  className="p-2 text-primary-600 hover:bg-primary-100 hover:scale-110"
                  title="Ver detalle completo"
                  icon={<Eye className="w-4 h-4" />}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onGestionarDiagnostico(caso)}
                  className="p-2 text-purple-600 hover:bg-purple-100 hover:scale-110"
                  title="Gestionar diagnóstico"
                  icon={<FileText className="w-4 h-4" />}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onGestionarCaso(caso)}
                  className="p-2 text-success-600 hover:bg-success-100 hover:scale-110"
                  title="Gestionar caso"
                  icon={<Settings className="w-4 h-4" />}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onVerSeguimiento(caso)}
                  className="p-2 text-warning-600 hover:bg-warning-100 hover:scale-110"
                  title="Ver seguimiento"
                  icon={<BarChart3 className="w-4 h-4" />}
                />
                {caso.estadoTecnico === 'ASIGNADO' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onAceptarCaso(caso)}
                    className="p-2 text-primary-700 hover:bg-primary-100 hover:scale-110"
                    title="Aceptar caso"
                    icon={<CheckCircle className="w-4 h-4" />}
                  />
                )}
                {(caso.estadoTecnico === 'EN_PROCESO' || caso.estadoTecnico === 'PENDIENTE') && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onMarcarResuelto(caso)}
                    className="p-2 text-success-700 hover:bg-success-100 hover:scale-110"
                    title="Marcar como resuelto"
                    icon={<Clock className="w-4 h-4" />}
                  />
                )}
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default CasosTable;
