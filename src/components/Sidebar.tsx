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
    <div className="hidden md:flex md:w-64 md:flex-col bg-white border-r border-gray-200">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl">StudyMate AI</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id as any)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Profile Section */}
        <div className="px-3 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white">JS</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm truncate">John Student</p>
              <p className="text-xs text-gray-500">Premium Plan</p>
            </div>
          </div>
          <Button variant="ghost" className="w-full mt-2 gap-2 text-gray-600 hover:text-red-600">
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}