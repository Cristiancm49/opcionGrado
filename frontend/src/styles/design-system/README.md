# 🎨 Sistema de Diseño CHAIRA

Sistema de diseño centralizado para el proyecto CHAIRA. Proporciona tokens, utilidades y componentes consistentes en toda la aplicación.

## 📋 Tabla de Contenidos

- [Instalación](#instalación)
- [Tokens](#tokens)
- [Utilidades](#utilidades)
- [Componentes UI](#componentes-ui)
- [Migración](#migración)

---

## 🚀 Instalación

### Import Completo
```javascript
import { cn, getTextColor, colors, spacing } from '@/styles/design-system';
```

### Import Selectivo
```javascript
// Solo utilidades
import { cn, getBadgeVariant } from '@/styles/design-system';

// Solo tokens
import { colors, spacing } from '@/styles/design-system';

// Legacy (compatibilidad con código antiguo)
import { combineClasses, createComponentClass } from '@/styles/design-system';
```

---

## 🎨 Tokens

### Colores

```javascript
import { colors } from '@/styles/design-system';

// Uso en JavaScript
const primaryColor = colors.primary[500];  // #3b82f6

// Uso en Tailwind (recomendado)
className="bg-blue-500 text-blue-900"
```

**Paleta Disponible:**
- `primary` (blue) - Acciones principales
- `success` (green) - Estados exitosos
- `warning` (yellow) - Advertencias
- `error` (red) - Errores
- `info` (sky) - Información
- `gray` - Neutros

### Espaciado

```javascript
import { spacing } from '@/styles/design-system';

// Valores disponibles
spacing.xs   // 0.5rem (8px)
spacing.sm   // 0.75rem (12px)
spacing.md   // 1rem (16px)
spacing.lg   // 1.5rem (24px)
spacing.xl   // 2rem (32px)
spacing['2xl'] // 3rem (48px)
```

### Tipografía

```javascript
import { typography } from '@/styles/design-system';

// Tamaños
typography.fontSize.xs    // 0.75rem (12px)
typography.fontSize.base  // 1rem (16px)
typography.fontSize.xl    // 1.25rem (20px)

// Pesos
typography.fontWeight.normal    // 400
typography.fontWeight.semibold  // 600
typography.fontWeight.bold      // 700
```

---

## 🛠️ Utilidades

### 1. Combinar Clases

```javascript
import { cn } from '@/styles/design-system';

// Uso básico
<div className={cn('px-4', 'py-2', 'bg-blue-600')}>
  // → "px-4 py-2 bg-blue-600"
</div>

// Con condicionales
<div className={cn(
  'px-4 py-2',
  isActive && 'bg-blue-600',
  isDisabled && 'opacity-50'
)}>
  // → "px-4 py-2 bg-blue-600" (si isActive es true)
</div>

// Filtrado automático de falsy values
<div className={cn('px-4', null, undefined, false, 'py-2')}>
  // → "px-4 py-2"
</div>
```

### 2. Colores de Texto

```javascript
import { getTextColor } from '@/styles/design-system';

<p className={getTextColor('primary')}>Texto principal</p>
// → text-gray-900

<p className={getTextColor('success')}>Operación exitosa</p>
// → text-green-600

<p className={getTextColor('error')}>Error encontrado</p>
// → text-red-600
```

**Tipos disponibles:**
- `primary` → text-gray-900
- `secondary` → text-gray-600
- `muted` → text-gray-500
- `success` → text-green-600
- `warning` → text-yellow-600
- `error` → text-red-600
- `info` → text-blue-600

### 3. Variantes de Badges

```javascript
import { getBadgeVariant, cn } from '@/styles/design-system';

<span className={cn(
  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
  getBadgeVariant('success')
)}>
  Activo
</span>
```

**Variantes:**
- `primary` → Azul
- `success` → Verde
- `warning` → Amarillo
- `error` → Rojo
- `info` → Celeste
- `secondary` → Gris

### 4. Variantes de Botones

```javascript
import { getButtonVariant } from '@/styles/design-system';

<button className={getButtonVariant('primary', 'md')}>
  Guardar
</button>
```

**Variantes:** `primary`, `secondary`, `success`, `warning`, `danger`, `outline`, `ghost`

**Tamaños:** `sm`, `md`, `lg`, `xl`

### 5. Variantes de Cards

```javascript
import { getCardVariant } from '@/styles/design-system';

<div className={getCardVariant('elevated', 'lg')}>
  Contenido de la card
</div>
```

**Variantes:** `default`, `elevated`, `primary`, `success`, `warning`, `error`

**Padding:** `none`, `sm`, `md`, `lg`, `xl`

### 6. Gradientes

```javascript
import { getGradient } from '@/styles/design-system';

<div className={getGradient('primary')}>
  // → bg-gradient-to-r from-blue-500 to-blue-600
</div>
```

---

## 🧩 Componentes UI

Para componentes visuales completos, usa los de `/components/ui/`:

```javascript
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

<Card padding="lg" shadow="xl">
  <Card.Title>Mi Título</Card.Title>
  <Badge variant="success">Activo</Badge>
  <Button variant="primary" size="md">Guardar</Button>
</Card>
```

---

## 🔄 Migración desde `/styles/tailwind/`

### Antes (Sistema Antiguo)
```javascript
import { 
  combineClasses, 
  getTextColorClass, 
  createComponentClass 
} from '../../../styles/tailwind';

<div className={combineClasses('px-4', getTextColorClass('primary'))}>
  Texto
</div>
```

### Después (Design System)
```javascript
import { cn, getTextColor } from '@/styles/design-system';

<div className={cn('px-4', getTextColor('primary'))}>
  Texto
</div>
```

**Nota:** El sistema mantiene compatibilidad con las funciones antiguas (`combineClasses`, `getTextColorClass`, `createComponentClass`) para facilitar la migración.

---

## 📖 Cuándo Usar Qué

### Usa Design System (`/styles/design-system/`) para:
- ✅ Tablas personalizadas
- ✅ Layouts complejos
- ✅ Casos dinámicos con lógica condicional
- ✅ Combinar clases de Tailwind
- ✅ Obtener colores/estilos programáticamente

### Usa Componentes UI (`/components/ui/`) para:
- ✅ Botones estándar
- ✅ Cards reutilizables
- ✅ Badges de estado
- ✅ Inputs de formulario
- ✅ Componentes visuales completos

---

## 🎯 Ejemplos Prácticos

### Ejemplo 1: Tabla con Estilos Dinámicos

```javascript
import { cn, getTextColor, getBadgeVariant } from '@/styles/design-system';

const IncidenciasTable = ({ incidencias }) => (
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <th className={cn(
          'px-6 py-3 text-left text-xs font-medium uppercase',
          getTextColor('secondary')
        )}>
          Estado
        </th>
      </tr>
    </thead>
    <tbody>
      {incidencias.map(inc => (
        <tr key={inc.id}>
          <td>
            <span className={cn(
              'px-2.5 py-0.5 rounded-full text-xs font-medium',
              getBadgeVariant(inc.estado === 'resuelto' ? 'success' : 'warning')
            )}>
              {inc.estado}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
```

### Ejemplo 2: Card con Estados

```javascript
import { cn, getCardVariant, getTextColor } from '@/styles/design-system';

const AlertCard = ({ type = 'info', title, children }) => (
  <div className={getCardVariant(type, 'lg')}>
    <h3 className={cn('font-semibold mb-2', getTextColor('primary'))}>
      {title}
    </h3>
    <p className={getTextColor('secondary')}>
      {children}
    </p>
  </div>
);
```

### Ejemplo 3: Botón Personalizado

```javascript
import { cn, getButtonVariant } from '@/styles/design-system';

const CustomButton = ({ variant, size, loading, children }) => (
  <button 
    className={cn(
      getButtonVariant(variant, size),
      loading && 'opacity-50 cursor-wait'
    )}
    disabled={loading}
  >
    {loading && <Spinner />}
    {children}
  </button>
);
```

---

## 🔗 Recursos

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Design Tokens Specification](https://designtokens.org/)

---

## 📝 Notas de Versión

### v1.0.0 (Actual)
- ✅ Sistema de tokens centralizado
- ✅ Utilidades de clases mejoradas
- ✅ Compatibilidad con código legacy
- ✅ Documentación completa

