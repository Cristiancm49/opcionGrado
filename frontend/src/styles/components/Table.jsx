import React from 'react';
import { Card } from './';
import { cn } from '../utils';
import { textStyles, THEME_CONSTANTS } from '../theme';

const Table = ({ 
  children,
  className = '',
  ...props 
}) => {
  return (
    <Card variant="default" className={cn('overflow-hidden', className)} {...props}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          {children}
        </table>
      </div>
    </Card>
  );
};

// Subcomponentes del Table
const TableHeader = ({ children, className = '', ...props }) => (
  <thead className={cn('bg-gray-50', className)} {...props}>
    {children}
  </thead>
);

const TableBody = ({ children, className = '', ...props }) => (
  <tbody className={cn('bg-white divide-y divide-gray-200', className)} {...props}>
    {children}
  </tbody>
);

const TableRow = ({ children, className = '', hover = true, ...props }) => (
  <tr 
    className={cn(
      hover && 'hover:bg-gray-50',
      THEME_CONSTANTS.TRANSITION,
      className
    )} 
    {...props}
  >
    {children}
  </tr>
);

const TableHead = ({ children, className = '', ...props }) => (
  <th 
    className={cn(
      textStyles.tableHeader,
      'px-6 py-3 text-left',
      className
    )} 
    {...props}
  >
    {children}
  </th>
);

const TableCell = ({ children, className = '', ...props }) => (
  <td 
    className={cn(
      textStyles.tableCell,
      'px-6 py-4 whitespace-nowrap',
      className
    )} 
    {...props}
  >
    {children}
  </td>
);

const TableCellSecondary = ({ children, className = '', ...props }) => (
  <td 
    className={cn(
      textStyles.tableCellSecondary,
      'px-6 py-4 whitespace-nowrap',
      className
    )} 
    {...props}
  >
    {children}
  </td>
);

// Componente para tabla vacía
const TableEmpty = ({ 
  icon,
  title = 'No hay datos disponibles',
  description = 'No se encontraron registros que coincidan con los filtros aplicados.',
  className = '',
  ...props 
}) => (
  <Card variant="default" className={cn('', className)} {...props}>
    <div className="p-8 text-center">
      {icon && (
        <div className="text-gray-400 mb-4">
          {icon}
        </div>
      )}
      <h3 className={cn(textStyles.h5, 'mb-2')}>
        {title}
      </h3>
      <p className={textStyles.body2}>
        {description}
      </p>
    </div>
  </Card>
);

// Componente para tabla cargando
const TableLoading = ({ 
  message = 'Cargando...',
  className = '',
  ...props 
}) => (
  <Card variant="default" className={cn('', className)} {...props}>
    <div className="p-8 text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
      <p className={textStyles.body2}>
        {message}
      </p>
    </div>
  </Card>
);

// Asignar subcomponentes
Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Head = TableHead;
Table.Cell = TableCell;
Table.CellSecondary = TableCellSecondary;
Table.Empty = TableEmpty;
Table.Loading = TableLoading;

export default Table;
