import { ChevronLeft, ChevronRight } from 'lucide-react';

const CollapseButton = ({ 
  sidebarOpen, 
  onToggle, 
  themeClasses 
}) => {
  return (
    <div className={`p-4 ${themeClasses.border} border-t`}>
      <button
        onClick={onToggle}
        className={`w-full p-3 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] ${themeClasses.collapseButton}`}
      >
        <div className="transition-transform duration-300">
          {sidebarOpen ? (
            <ChevronLeft className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </div>
      </button>
    </div>
  );
};

export default CollapseButton;