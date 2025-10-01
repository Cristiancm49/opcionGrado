// ===========================================
// DESIGN SYSTEM - PUNTO DE ENTRADA ÚNICO
// ===========================================
// Sistema de diseño unificado para todo el proyecto
// Combina tokens, utilidades y componentes en un solo lugar

// ===========================================
// TOKENS
// ===========================================
export { 
  colors, 
  spacing, 
  typography, 
  effects, 
  zIndex, 
  breakpoints,
  tokens 
} from './tokens';

// ===========================================
// UTILIDADES
// ===========================================
export {
  // Funciones principales
  cn,
  combineClasses,
  
  // Colores
  getTextColor,
  getTextColorClass,
  getBgColor,
  getBackgroundColorClass,
  
  // Variantes
  getBadgeVariant,
  getButtonVariant,
  getCardVariant,
  
  // Gradientes
  getGradient,
  getGradientClass,
  
  // Legacy
  createComponentClass,
  STYLE_CONSTANTS,
} from './utilities';

// ===========================================
// EXPORTACIÓN POR DEFECTO
// ===========================================
import tokens from './tokens';
import utilities from './utilities';

export default {
  ...tokens,
  ...utilities,
};

