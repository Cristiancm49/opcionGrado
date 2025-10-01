# 🚀 Guía Rápida - Sistema de Estilos CHAIRA

## 📌 ¿Qué Usar y Cuándo?

### 🎨 Para NUEVOS Desarrollos

```javascript
// ✅ RECOMENDADO: Usa el Design System
import { cn, getTextColor, getBadgeVariant } from '@/styles/design-system';

<div className={cn('px-4', 'py-2', getTextColor('primary'))}>
  Mi contenido
</div>
```

### 🔧 Para Código EXISTENTE

```javascript
// ✅ FUNCIONA: Sistema legacy (compatibilidad)
import { combineClasses, getTextColorClass } from '../../../styles/tailwind';

<div className={combineClasses('px-4', 'py-2', getTextColorClass('primary'))}>
  Mi contenido
</div>
```

---

## 🎯 Casos de Uso Comunes

### 1. Combinar Clases con Condicionales

```javascript
import { cn } from '@/styles/design-system';

<button className={cn(
  'px-4 py-2 rounded-lg',
  isActive && 'bg-blue-600 text-white',
  isDisabled && 'opacity-50 cursor-not-allowed'
)}>
  Guardar
</button>
```

### 2. Colores de Texto Dinámicos

```javascript
import { getTextColor } from '@/styles/design-system';

<p className={getTextColor(incidencia.estado === 'resuelto' ? 'success' : 'error')}>
  {incidencia.mensaje}
</p>
```

### 3. Badges con Variantes

```javascript
import { cn, getBadgeVariant } from '@/styles/design-system';

<span className={cn(
  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
  getBadgeVariant('success')
)}>
  Activo
</span>
```

### 4. Tablas Estilizadas

```javascript
import { cn, getTextColor } from '@/styles/design-system';

<table className="min-w-full divide-y divide-gray-200">
  <thead className="bg-gray-50">
    <tr>
      <th className={cn(
        'px-6 py-3 text-left text-xs font-medium uppercase tracking-wider',
        getTextColor('secondary')
      )}>
        Columna
      </th>
    </tr>
  </thead>
</table>
```

### 5. Cards Personalizadas

```javascript
import { getCardVariant } from '@/styles/design-system';

<div className={getCardVariant('elevated', 'lg')}>
  Contenido de la card
</div>
```

---

## 🧩 Componentes UI Completos

Para componentes visuales completos, usa `/components/ui/`:

```javascript
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

<Card padding="lg" shadow="xl">
  <Card.Title>Mi Card</Card.Title>
  <Card.Content>
    <Badge variant="success">Activo</Badge>
    <Button variant="primary" size="md">Guardar</Button>
  </Card.Content>
</Card>
```

---

## 📚 Referencia Rápida

### Funciones Disponibles

| Función | Uso | Ejemplo |
|---------|-----|---------|
| `cn()` | Combinar clases | `cn('px-4', 'py-2', isActive && 'bg-blue-600')` |
| `getTextColor()` | Color de texto | `getTextColor('success')` → `'text-green-600'` |
| `getBgColor()` | Color de fondo | `getBgColor('primary', '500')` → `'bg-blue-500'` |
| `getBadgeVariant()` | Badge | `getBadgeVariant('success')` → clases de badge verde |
| `getButtonVariant()` | Botón | `getButtonVariant('primary', 'md')` → clases completas |
| `getCardVariant()` | Card | `getCardVariant('elevated', 'lg')` → clases completas |
| `getGradient()` | Gradiente | `getGradient('primary')` → gradiente azul |

### Colores Disponibles

- `primary` → Azul
- `success` → Verde
- `warning` → Amarillo
- `error` → Rojo
- `info` → Celeste
- `secondary` / `muted` → Gris

### Tamaños Disponibles

- `sm` → Pequeño
- `md` → Mediano
- `lg` → Grande
- `xl` → Extra grande

---

## 🔄 Migración

### Paso 1: Cambiar Imports

```javascript
// Antes
import { combineClasses, getTextColorClass } from '../../../styles/tailwind';

// Después
import { cn, getTextColor } from '@/styles/design-system';
```

### Paso 2: Actualizar Funciones

```javascript
// Antes
combineClasses('px-4', getTextColorClass('primary'))

// Después
cn('px-4', getTextColor('primary'))
```

---

## ❓ FAQs

**P: ¿Puedo seguir usando el sistema antiguo?**
R: Sí, mantiene compatibilidad total. Pero para nuevos desarrollos usa el Design System.

**P: ¿Dónde está la documentación completa?**
R: En `/styles/design-system/README.md`

**P: ¿Qué pasa con mis componentes existentes?**
R: Siguen funcionando. El nuevo sistema es 100% compatible hacia atrás.

---

## 📁 Estructura del Proyecto

```
/src/
├── styles/
│   ├── design-system/     ✅ NUEVO - Usa esto
│   │   ├── index.js
│   │   ├── tokens.js
│   │   ├── utilities.js
│   │   └── README.md
│   └── tailwind/          ⚠️ LEGACY - Compatibilidad
│       └── index.js
│
└── components/
    └── ui/                ✅ Componentes visuales
        ├── Button.jsx
        ├── Card.jsx
        └── Badge.jsx
```

---

## 🎓 Ejemplos del Proyecto

### Basado en código existente:

```javascript
// De: /features/incidencias/components/EstadoSelector.jsx
import { cn, getTextColor, getCardVariant } from '@/styles/design-system';

<div className={getCardVariant('default', 'md')}>
  <h3 className={cn('font-semibold', getTextColor('primary'))}>
    Estado de las Incidencias
  </h3>
  <p className={cn('text-sm', getTextColor('secondary'))}>
    Filtra incidencias por estado
  </p>
</div>
```

```javascript
// De: /features/casos/components/CasosTable.jsx
import { cn, getTextColor } from '@/styles/design-system';

<th className={cn(
  'px-6 py-3 text-left text-xs font-medium uppercase tracking-wider',
  getTextColor('secondary')
)}>
  Caso
</th>
```

---

**Última actualización:** Octubre 2025
**Versión:** 1.0.0

