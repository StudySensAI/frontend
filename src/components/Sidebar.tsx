import { GraduationCap, LogOut, Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { UserAuth } from '../context/authContext';
import { useTheme } from '../context/themeContext';

interface SidebarProps {
  navigation: {
    id: 'dashboard' | 'library' | 'chat' | 'quiz' | 'progress';
    label: string;
    icon: React.ElementType;
  }[];
  activeView: 'dashboard' | 'library' | 'chat' | 'quiz' | 'progress';
  onNavigate: React.Dispatch<
    React.SetStateAction<'dashboard' | 'library' | 'chat' | 'quiz' | 'progress'>
  >; // ✅ <-- match useState type exactly
}


export function Sidebar({ navigation, activeView, onNavigate }: SidebarProps) {
  const { signOut,setSession } = UserAuth();
  const handleSignOut = async () => {
    try {
      await signOut();
      onNavigate('dashboard'); // optional: reset view
      setSession(null); // ✅ ensures session reset visually
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };
  const { isDark, toggleTheme } = useTheme();
  
  return (
    <div
      className="hidden md:flex md:w-64 md:flex-col 
                 bg-linear-to-br from-blue-100/60 via-white/40 to-purple-100/60
                 dark:from-gray-900/80 dark:via-gray-950/60 dark:to-gray-950/80
                 backdrop-blur-3xl border-r border-white/70 dark:border-gray-700/50
                 shadow-[0_12px_60px_rgba(0,0,0,0.08)] dark:shadow-[0_12px_60px_rgba(0,0,0,0.3)] relative"
    >
      <div className="flex-1 flex flex-col pt-6 pb-4 overflow-y-auto">
        {/* Logo Section */}
        <div className="flex items-center gap-3 px-6 mb-10">
          <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-[0_4px_20px_rgba(59,130,246,0.4)]">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-semibold text-gray-800 dark:text-white drop-shadow-sm">StudyMate AI</span>
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
                      ? 'bg-linear-to-r from-blue-400/90 to-indigo-400/80 text-white shadow-[0_4px_25px_rgba(59,130,246,0.4)] scale-[1.02]'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50 hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)]'
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
        <div className="px-4 pt-5 mt-auto border-t border-white/60 dark:border-gray-700/50">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-3
                       bg-white/40 dark:bg-gray-800/30 backdrop-blur-2xl 
                       hover:bg-white/60 dark:hover:bg-gray-700/50 transition-all
                       shadow-[0_4px_25px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_25px_rgba(0,0,0,0.2)]
                       text-gray-700 dark:text-gray-300"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
            <span className="text-sm font-medium">{isDark ? 'Light' : 'Dark'} Mode</span>
          </button>

          <div
            className="flex items-center gap-3 px-3 py-3 rounded-2xl 
                       bg-white/40 dark:bg-gray-800/30 backdrop-blur-2xl 
                       hover:bg-white/60 dark:hover:bg-gray-700/50 transition-all cursor-pointer
                       shadow-[0_4px_25px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_25px_rgba(0,0,0,0.2)]"
          >
            <div className="w-10 h-10 bg-linear-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-medium shadow-[0_4px_25px_rgba(236,72,153,0.3)]">
              JS
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">John Student</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Premium Plan</p>
            </div>
          </div>
          <Button variant="ghost" onClick={handleSignOut} className="w-full mt-3 gap-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400
                       hover:bg-white/50 dark:hover:bg-red-900/20 backdrop-blur-md transition-all
                       shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}
