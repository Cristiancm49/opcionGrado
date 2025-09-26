import { 
  ClipboardList, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  TrendingUp,
  Users
} from 'lucide-react';
import { Card } from '../../../styles/components';
import { cn } from '../../../styles/utils';
import { textStyles, componentColors, THEME_CONSTANTS } from '../../../styles/theme';

const CasosStats = ({ estadisticas }) => {
  const stats = [
    {
      title: 'Total Casos',
      value: estadisticas.total,
      icon: ClipboardList,
      color: 'bg-primary-500',
      textColor: 'text-primary-600',
      bgColor: 'bg-primary-50'
    },
    {
      title: 'Asignados',
      value: estadisticas.asignados,
      icon: Users,
      color: 'bg-warning-500',
      textColor: 'text-warning-600',
      bgColor: 'bg-warning-50'
    },
    {
      title: 'En Proceso',
      value: estadisticas.enProceso,
      icon: Clock,
      color: 'bg-warning-500',
      textColor: 'text-warning-600',
      bgColor: 'bg-warning-50'
    },
    {
      title: 'Pendientes',
      value: estadisticas.pendientes,
      icon: AlertTriangle,
      color: 'bg-error-500',
      textColor: 'text-error-600',
      bgColor: 'bg-error-50'
    },
    {
      title: 'Resueltos',
      value: estadisticas.resueltos,
      icon: CheckCircle,
      color: 'bg-success-500',
      textColor: 'text-success-600',
      bgColor: 'bg-success-50'
    },
    {
      title: 'Vencidos',
      value: estadisticas.vencidos,
      icon: XCircle,
      color: 'bg-error-600',
      textColor: 'text-error-700',
      bgColor: 'bg-error-100'
    },
    {
      title: 'En Riesgo',
      value: estadisticas.enRiesgo,
      icon: TrendingUp,
      color: 'bg-warning-600',
      textColor: 'text-warning-700',
      bgColor: 'bg-warning-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4 mb-6">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Card
            key={index}
            variant="default"
            className={cn(
              stat.bgColor,
              'hover:shadow-md',
              THEME_CONSTANTS.TRANSITION
            )}
            padding="p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={cn(textStyles.caption, 'mb-1')}>
                  {stat.title}
                </p>
                <p className={cn('text-2xl font-bold', stat.textColor)}>
                  {stat.value}
                </p>
              </div>
              <div className={cn(stat.color, 'p-3 rounded-full')}>
                <IconComponent className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default CasosStats;
