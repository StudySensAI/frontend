import { GraduationCap, LogOut } from 'lucide-react';
import { Button } from './ui/button';

interface SidebarProps {
  navigation: Array<{
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }>;
  activeView: string;
  onNavigate: (view: string) => void;
}

export function Sidebar({ navigation, activeView, onNavigate }: SidebarProps) {
  return (
    <div
      className="hidden md:flex md:w-64 md:flex-col 
                 bg-gradient-to-br from-blue-100/60 via-white/40 to-purple-100/60
                 backdrop-blur-3xl border-r border-white/70
                 shadow-[0_12px_60px_rgba(0,0,0,0.08)] relative"
    >
      <div className="flex-1 flex flex-col pt-6 pb-4 overflow-y-auto">
        {/* Logo Section */}
        <div className="flex items-center gap-3 px-6 mb-10">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-[0_4px_20px_rgba(59,130,246,0.4)]">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-semibold text-gray-800 drop-shadow-sm">StudyMate AI</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                  ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-400/90 to-indigo-400/80 text-white shadow-[0_4px_25px_rgba(59,130,246,0.4)] scale-[1.02]'
                      : 'text-gray-700 hover:bg-white/50 hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)]'
                  }`}
              >
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'
                  }`}
                />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Profile Section */}
        <div className="px-4 pt-5 mt-auto border-t border-white/60">
          <div
            className="flex items-center gap-3 px-3 py-3 rounded-2xl 
                       bg-white/40 backdrop-blur-2xl 
                       hover:bg-white/60 transition-all cursor-pointer
                       shadow-[0_4px_25px_rgba(0,0,0,0.08)]"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-medium shadow-[0_4px_25px_rgba(236,72,153,0.3)]">
              JS
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">John Student</p>
              <p className="text-xs text-gray-600">Premium Plan</p>
            </div>
          </div>

          <Button
            variant="ghost"
            className="w-full mt-3 gap-2 text-gray-600 hover:text-red-600 
                       hover:bg-white/50 backdrop-blur-md transition-all
                       shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}
