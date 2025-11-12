type ViewType = 'dashboard' | 'library' | 'chat' | 'quiz' | 'progress';
interface MobileNavProps {
  navigation: Array<{
    id: ViewType;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }>;
  activeView: ViewType;
  onNavigate: (view: ViewType) => void;
}

export function MobileNav({ navigation, activeView, onNavigate }: MobileNavProps) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex items-center justify-around px-2 py-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as any)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all min-w-0 flex-1 ${
                isActive ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              <div className={`relative ${isActive ? 'scale-110' : ''} transition-transform`}>
                <Icon className="w-6 h-6" />
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                )}
              </div>
              <span className="text-xs truncate w-full text-center">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}