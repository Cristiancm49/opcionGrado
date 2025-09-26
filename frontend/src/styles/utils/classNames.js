// ===========================================
// UTILIDADES PARA CLASES CSS
// ===========================================

/**
 * Combina múltiples clases CSS de manera inteligente
 * @param {...(string|object|array)} classes - Clases a combinar
 * @returns {string} - Clases combinadas
 */
export const classNames = (...classes) => {
  return classes
    .filter(Boolean)
    .map(cls => {
      if (typeof cls === 'string') return cls;
      if (typeof cls === 'object' && cls !== null) {
        return Object.entries(cls)
          .filter(([, value]) => value)
          .map(([key]) => key)
          .join(' ');
      }
      if (Array.isArray(cls)) {
        return cls.filter(Boolean).join(' ');
      }
      return '';
    })
    .join(' ');
};

/**
 * Alias para classNames
 */
export const cn = classNames;

/**
 * Combina clases condicionalmente
 * @param {object} conditions - Objeto con condiciones y clases
 * @returns {string} - Clases combinadas
 */
export const conditionalClasses = (conditions) => {
  return Object.entries(conditions)
    .filter(([, condition]) => condition)
    .map(([className]) => className)
    .join(' ');
};

/**
 * Combina clases de tema con clases personalizadas
 * @param {string} themeClasses - Clases del tema
 * @param {string} customClasses - Clases personalizadas
 * @returns {string} - Clases combinadas
 */
export const combineThemeClasses = (themeClasses, customClasses) => {
  return classNames(themeClasses, customClasses);
};

/**
 * Crea clases responsivas
 * @param {object} breakpoints - Objeto con breakpoints y clases
 * @returns {string} - Clases responsivas
 */
export const responsiveClasses = (breakpoints) => {
  return Object.entries(breakpoints)
    .map(([breakpoint, classes]) => {
      if (breakpoint === 'base') return classes;
      return `${breakpoint}:${classes}`;
    })
    .join(' ');
};

/**
 * Crea clases de estado (hover, focus, active, etc.)
 * @param {object} states - Objeto con estados y clases
 * @returns {string} - Clases de estado
 */
export const stateClasses = (states) => {
  return Object.entries(states)
    .map(([state, classes]) => {
      if (state === 'base') return classes;
      return `${state}:${classes}`;
    })
    .join(' ');
};

/**
 * Combina clases de tema, responsivas y de estado
 * @param {object} config - Configuración de clases
 * @returns {string} - Clases combinadas
 */
export const createClasses = (config) => {
  const { base, responsive, states, custom } = config;
  
  return classNames(
    base,
    responsive && responsiveClasses(responsive),
    states && stateClasses(states),
    custom
  );
};
