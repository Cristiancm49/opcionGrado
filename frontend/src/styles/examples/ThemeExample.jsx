import React from 'react';
import { Button, Card, Badge } from '../components';
import { classNames, cn } from '../utils';
import { 
  colors, 
  textStyles, 
  componentColors, 
  gradients,
  THEME_CONSTANTS 
} from '../theme';

const ThemeExample = () => {
  return (
    <div className="p-8 space-y-8">
      {/* Ejemplo de Botones */}
      <Card variant="elevated" className="p-6">
        <h2 className={textStyles.h2}>Botones con Sistema de Temas</h2>
        <div className="flex flex-wrap gap-4 mt-4">
          <Button variant="primary" size="md">
            Botón Primario
          </Button>
          <Button variant="secondary" size="md">
            Botón Secundario
          </Button>
          <Button variant="success" size="md">
            Botón Éxito
          </Button>
          <Button variant="warning" size="md">
            Botón Advertencia
          </Button>
          <Button variant="error" size="md">
            Botón Error
          </Button>
          <Button variant="outline" size="md">
            Botón Outline
          </Button>
          <Button variant="ghost" size="md">
            Botón Ghost
          </Button>
        </div>
      </Card>

      {/* Ejemplo de Badges */}
      <Card variant="elevated" className="p-6">
        <h2 className={textStyles.h2}>Badges con Sistema de Temas</h2>
        <div className="flex flex-wrap gap-4 mt-4">
          <Badge variant="primary">Primario</Badge>
          <Badge variant="secondary">Secundario</Badge>
          <Badge variant="success">Éxito</Badge>
          <Badge variant="warning">Advertencia</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="info">Info</Badge>
        </div>
      </Card>

      {/* Ejemplo de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card variant="default" hover>
          <Card.Header>
            <Card.Title>Card Default</Card.Title>
            <Card.Subtitle>Con hover effect</Card.Subtitle>
          </Card.Header>
          <Card.Body>
            <p className={textStyles.body2}>
              Esta es una card con el sistema de temas aplicado.
            </p>
          </Card.Body>
        </Card>

        <Card variant="elevated">
          <Card.Header>
            <Card.Title>Card Elevated</Card.Title>
            <Card.Subtitle>Con sombra elevada</Card.Subtitle>
          </Card.Header>
          <Card.Body>
            <p className={textStyles.body2}>
              Esta card tiene una sombra más prominente.
            </p>
          </Card.Body>
        </Card>

        <Card variant="floating">
          <Card.Header>
            <Card.Title>Card Floating</Card.Title>
            <Card.Subtitle>Con sombra flotante</Card.Subtitle>
          </Card.Header>
          <Card.Body>
            <p className={textStyles.body2}>
              Esta card tiene una sombra flotante.
            </p>
          </Card.Body>
        </Card>
      </div>

      {/* Ejemplo de Gradientes */}
      <Card variant="elevated" className="p-6">
        <h2 className={textStyles.h2}>Gradientes del Sistema</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className={`h-20 rounded-lg bg-gradient-to-r ${gradients.primary} flex items-center justify-center text-white font-medium`}>
            Primario
          </div>
          <div className={`h-20 rounded-lg bg-gradient-to-r ${gradients.success} flex items-center justify-center text-white font-medium`}>
            Éxito
          </div>
          <div className={`h-20 rounded-lg bg-gradient-to-r ${gradients.warning} flex items-center justify-center text-white font-medium`}>
            Advertencia
          </div>
          <div className={`h-20 rounded-lg bg-gradient-to-r ${gradients.error} flex items-center justify-center text-white font-medium`}>
            Error
          </div>
        </div>
      </Card>

      {/* Ejemplo de Tipografía */}
      <Card variant="elevated" className="p-6">
        <h2 className={textStyles.h2}>Sistema de Tipografía</h2>
        <div className="space-y-4 mt-4">
          <h1 className={textStyles.h1}>Título H1</h1>
          <h2 className={textStyles.h2}>Título H2</h2>
          <h3 className={textStyles.h3}>Título H3</h3>
          <h4 className={textStyles.h4}>Título H4</h4>
          <h5 className={textStyles.h5}>Título H5</h5>
          <h6 className={textStyles.h6}>Título H6</h6>
          <p className={textStyles.body1}>Este es un párrafo de cuerpo principal.</p>
          <p className={textStyles.body2}>Este es un párrafo de cuerpo secundario.</p>
          <p className={textStyles.caption}>Este es un texto de caption.</p>
          <a href="#" className={textStyles.link}>Este es un enlace</a>
        </div>
      </Card>

      {/* Ejemplo de Colores de Estado */}
      <Card variant="elevated" className="p-6">
        <h2 className={textStyles.h2}>Colores de Estado</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="p-4 rounded-lg bg-success-50 border border-success-200">
            <h4 className="font-medium text-success-800">Éxito</h4>
            <p className="text-sm text-success-600">Operación exitosa</p>
          </div>
          <div className="p-4 rounded-lg bg-warning-50 border border-warning-200">
            <h4 className="font-medium text-warning-800">Advertencia</h4>
            <p className="text-sm text-warning-600">Atención requerida</p>
          </div>
          <div className="p-4 rounded-lg bg-error-50 border border-error-200">
            <h4 className="font-medium text-error-800">Error</h4>
            <p className="text-sm text-error-600">Error crítico</p>
          </div>
          <div className="p-4 rounded-lg bg-info-50 border border-info-200">
            <h4 className="font-medium text-info-800">Información</h4>
            <p className="text-sm text-info-600">Información útil</p>
          </div>
        </div>
      </Card>

      {/* Ejemplo de Utilidades */}
      <Card variant="elevated" className="p-6">
        <h2 className={textStyles.h2}>Utilidades de Clases</h2>
        <div className="mt-4 space-y-4">
          <div className={cn(
            'p-4 rounded-lg',
            'bg-primary-50 border border-primary-200',
            'hover:bg-primary-100 transition-colors duration-200'
          )}>
            <h4 className="font-medium text-primary-800">Usando cn() utility</h4>
            <p className="text-sm text-primary-600">
              Este div usa la función cn() para combinar clases.
            </p>
          </div>
          
          <div className={classNames(
            'p-4 rounded-lg',
            'bg-secondary-50 border border-secondary-200',
            'hover:bg-secondary-100 transition-colors duration-200'
          )}>
            <h4 className="font-medium text-secondary-800">Usando classNames() utility</h4>
            <p className="text-sm text-secondary-600">
              Este div usa la función classNames() para combinar clases.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ThemeExample;
