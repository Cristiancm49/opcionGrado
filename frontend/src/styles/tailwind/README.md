# Sistema de Estilos Tailwind CSS

## 📋 Descripción

Este directorio contiene la configuración centralizada de estilos para la aplicación usando Tailwind CSS. Todos los estilos están organizados en módulos específicos y bien documentados.

## 📁 Estructura de Archivos

```
src/styles/tailwind/
├── index.js          # Punto de entrada principal
├── colors.js         # Configuración de colores
├── spacing.js        # Configuración de espaciado
├── typography.js     # Configuración de tipografía
├── components.js     # Configuración de componentes
└── README.md         # Este archivo
```

## 🎨 Módulos de Estilos

### 1. Colores (`colors.js`)

**Propósito**: Define todos los colores utilizados en la aplicación.

**Contenido**:
- Colores primarios y secundarios
- Colores de estado (éxito, error, advertencia, info)
- Colores neutros (grises)
- Colores específicos de la aplicación
- Gradientes predefinidos
- Clases de colores para componentes

**Uso**:
```javascript
import { colors, gradients } from '@/styles/tailwind/colors';

// Usar colores específicos
const primaryColor = colors.primary[500]; // #3b82f6

// Usar gradientes
const gradientClass = gradients.primary; // 'from-blue-500 to-blue-600'
```

### 2. Espaciado (`spacing.js`)

**Propósito**: Define todos los espaciados utilizados en la aplicación.

**Contenido**:
- Espaciado base de Tailwind
- Espaciado personalizado
- Padding específico para componentes
- Margin específico para elementos
- Espaciado responsivo
- Clases de espaciado predefinidas

**Uso**:
```javascript
import { spacing, spacingClasses } from '@/styles/tailwind/spacing';

// Usar espaciado específico
const cardPadding = spacing.padding.card.lg; // 'p-6'

// Usar clases predefinidas
const buttonSpacing = spacingClasses.button.md; // 'px-4 py-2'
```

### 3. Tipografía (`typography.js`)

**Propósito**: Define todos los estilos tipográficos utilizados en la aplicación.

**Contenido**:
- Tamaños de fuente
- Pesos de fuente
- Alturas de línea
- Estilos tipográficos predefinidos
- Colores de texto
- Clases tipográficas predefinidas
- Utilidades tipográficas

**Uso**:
```javascript
import { typography, typographyUtils } from '@/styles/tailwind/typography';

// Usar estilos predefinidos
const titleClass = typography.styles.h1; // 'text-3xl font-bold leading-tight mb-2'

// Usar utilidades
const customTitle = typographyUtils.getTitleClass(2); // 'text-2xl font-bold text-gray-900 mb-2'
```

### 4. Componentes (`components.js`)

**Propósito**: Define todos los estilos de componentes utilizados en la aplicación.

**Contenido**:
- Estilos para botones
- Estilos para cards
- Estilos para inputs
- Estilos para badges
- Estilos para modales
- Estilos para tablas
- Estilos para filtros
- Utilidades de componentes

**Uso**:
```javascript
import { components, componentUtils } from '@/styles/tailwind/components';

// Usar estilos predefinidos
const buttonClass = components.button.classes.primary;

// Usar utilidades
const customButton = componentUtils.createButtonClass('primary', 'md', 'w-full');
```

## 🚀 Uso Principal

### Importación Completa

```javascript
import tailwindConfig from '@/styles/tailwind';

// Acceder a cualquier configuración
const primaryColor = tailwindConfig.colors.primary[500];
const buttonClass = tailwindConfig.components.button.classes.primary;
```

### Importación Específica

```javascript
import { colors, components, createComponentClass } from '@/styles/tailwind';

// Usar funciones de utilidad
const buttonClass = createComponentClass('button', 'primary', 'md', 'w-full');
```

## 🛠️ Utilidades Globales

### `createComponentClass(component, variant, size, additionalClasses)`

Crea una clase CSS completa para un componente específico.

```javascript
import { createComponentClass } from '@/styles/tailwind';

const buttonClass = createComponentClass('button', 'primary', 'md', 'w-full');
// Resultado: 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 px-4 py-2 text-sm w-full'
```

### `getGradientClass(gradientName)`

Obtiene la clase CSS de un gradiente específico.

```javascript
import { getGradientClass } from '@/styles/tailwind';

const gradientClass = getGradientClass('primary');
// Resultado: 'bg-gradient-to-r from-blue-500 to-blue-600'
```

### `getTextColorClass(colorType)`

Obtiene la clase CSS de color de texto.

```javascript
import { getTextColorClass } from '@/styles/tailwind';

const textClass = getTextColorClass('success');
// Resultado: 'text-green-600'
```

### `combineClasses(...classes)`

Combina múltiples clases CSS.

```javascript
import { combineClasses } from '@/styles/tailwind';

const combinedClass = combineClasses('text-lg', 'font-bold', 'text-blue-600');
// Resultado: 'text-lg font-bold text-blue-600'
```

## 📊 Constantes Globales

### Breakpoints

```javascript
import { STYLE_CONSTANTS } from '@/styles/tailwind';

const breakpoints = STYLE_CONSTANTS.BREAKPOINTS;
// { sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px' }
```

### Z-Index

```javascript
const zIndex = STYLE_CONSTANTS.Z_INDEX;
// { dropdown: 1000, sticky: 1020, fixed: 1030, modal: 1040, popover: 1050, tooltip: 1060 }
```

### Transiciones

```javascript
const transitions = STYLE_CONSTANTS.TRANSITIONS;
// { fast: 'transition-all duration-150', normal: 'transition-all duration-200', slow: 'transition-all duration-300' }
```

## 🎯 Mejores Prácticas

### 1. Usar las Utilidades Predefinidas

```javascript
// ✅ Correcto
import { createComponentClass } from '@/styles/tailwind';
const buttonClass = createComponentClass('button', 'primary', 'md');

// ❌ Incorrecto
const buttonClass = 'bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg';
```

### 2. Combinar Clases de Manera Consistente

```javascript
// ✅ Correcto
import { combineClasses, getTextColorClass } from '@/styles/tailwind';
const textClass = combineClasses('text-lg', 'font-bold', getTextColorClass('primary'));

// ❌ Incorrecto
const textClass = 'text-lg font-bold text-gray-900';
```

### 3. Usar las Constantes Globales

```javascript
// ✅ Correcto
import { STYLE_CONSTANTS } from '@/styles/tailwind';
const shadowClass = STYLE_CONSTANTS.SHADOWS.lg;

// ❌ Incorrecto
const shadowClass = 'shadow-lg';
```

## 🔄 Migración de Estilos Existentes

Para migrar estilos existentes a este sistema:

1. **Identificar el componente**: Determinar qué tipo de componente es (button, card, input, etc.)
2. **Usar las utilidades**: Utilizar las funciones de utilidad para crear las clases
3. **Mantener consistencia**: Asegurar que todos los componentes similares usen el mismo estilo
4. **Documentar cambios**: Documentar cualquier personalización específica

## 📝 Notas de Desarrollo

- Todos los archivos están completamente comentados en español
- Cada función tiene documentación JSDoc
- Los estilos están basados en la auditoría realizada de todos los módulos
- El sistema es completamente compatible con Tailwind CSS
- Se mantiene la flexibilidad para personalizaciones específicas

## 🚨 Consideraciones Importantes

- **No modificar directamente**: Los archivos de configuración no deben modificarse directamente
- **Usar las utilidades**: Siempre usar las funciones de utilidad proporcionadas
- **Mantener consistencia**: Seguir las convenciones establecidas
- **Documentar cambios**: Documentar cualquier extensión del sistema
