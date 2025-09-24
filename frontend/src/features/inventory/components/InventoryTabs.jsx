import React from 'react';
import { Package, Zap } from 'lucide-react';

const InventoryTabs = ({ activeTab, onTabChange, estadisticas }) => {
  const tabs = [
    {
      id: 'activos',
      label: 'Activos Fijos',
      icon: Package,
      count: estadisticas.totalActivos,
      color: 'blue'
    },
    {
      id: 'consumibles',
      label: 'Consumibles',
      icon: Zap,
      count: estadisticas.totalConsumibles,
      color: 'green'
    }
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                isActive
                  ? `border-${tab.color}-500 text-${tab.color}-600`
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Icon 
                className={`mr-2 h-5 w-5 ${
                  isActive ? `text-${tab.color}-500` : 'text-gray-400 group-hover:text-gray-500'
                }`} 
              />
              {tab.label}
              <span className={`ml-2 py-0.5 px-2 rounded-full text-xs font-medium ${
                isActive
                  ? `bg-${tab.color}-100 text-${tab.color}-600`
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default InventoryTabs;
