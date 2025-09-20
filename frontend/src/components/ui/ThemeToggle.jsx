import { Sun, Moon } from 'lucide-react';

const ThemeToggle = ({ darkMode, toggleTheme, size = 'normal', themeClasses }) => {
  const sizeClasses = {
    small: 'w-3 h-3',
    normal: 'w-4 h-4'
  };

  

  return (
    <button
      onClick={toggleTheme}
      className={`rounded-lg transition-all duration-300 hover:scale-110 ${themeClasses?.themeButton || 'bg-gray-200'} ${
        size === 'small' ? 'p-1.5' : 'p-2'
      }`}
      title={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    >
      
      {darkMode ? (
        <Sun className={sizeClasses[size]} />
      ) : (
        <Moon className={sizeClasses[size]} />
      )}
    </button>
  );
};

export default ThemeToggle;