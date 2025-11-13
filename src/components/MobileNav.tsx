interface MobileNavProps {
  navigation: Array<{
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }>;
  activeView: string;
  onNavigate: (view: string) => void;
}

import { useTheme } from '../context/themeContext';

export function MobileNav({ navigation, activeView, onNavigate }: MobileNavProps) {
  const { isDark } = useTheme();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg dark:shadow-[0_-4px_20px_rgba(0,0,0,0.3)] z-50">
      <div className="flex items-center justify-around px-2 py-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as any)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all min-w-0 flex-1 ${
                isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <div className={`relative ${isActive ? 'scale-110' : ''} transition-transform`}>
                <Icon className="w-6 h-6" />
                {isActive && (
                  <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full ${isDark ? 'bg-blue-400' : 'bg-blue-600'}`}></div>
                )}
              </div>
              <span className="text-xs truncate w-full text-center text-gray-600 dark:text-gray-400">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}