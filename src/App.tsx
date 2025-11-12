import { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { DocumentLibrary } from './components/DocumentLibrary';
import { ChatInterface } from './components/ChatInterface';
import { QuizModule } from './components/QuizModule';
import { ProgressTracker } from './components/ProgressTracker';
import { Sidebar } from './components/Sidebar';
import { MobileNav } from './components/MobileNav';
import { AuthScreen } from './components/AuthScreen';
import { Home, BookOpen, MessageSquare, Brain, BarChart3 } from 'lucide-react';
import { AuthContextProvider, UserAuth } from './context/authContext';
import { supabase } from './supabaseClient';
import { set } from 'react-hook-form';

export default function App() {
 return (
    <AuthContextProvider>
      <AppContent />
    </AuthContextProvider>
  );
}

function AppContent() {
  const { session,loading, setSession } = UserAuth(); // ✅ Supabase session from context
  const [activeView, setActiveView] = useState<'dashboard' | 'library' | 'chat' | 'quiz' | 'progress'>('dashboard');
  const [isLoading, setIsLoading] = useState(true);

  // 🧠 Track Supabase auth session
  useEffect(() => {
    const initSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session || null);
      setIsLoading(false);
    };
    initSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsLoading(false);
    });

    return () => {
      listener?.subscription?.unsubscribe?.();
    };
  }, [setSession]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading...
      </div>
    );
  }

  // 🟢 If user is not logged in → show AuthScreen
  if (!session) {
    return <AuthScreen onAuthSuccess={() => window.location.reload()} />;
  }

  // 🟢 If user is logged in → show dashboard
  const navigation: {
  id: 'dashboard' | 'library' | 'chat' | 'quiz' | 'progress';
  label: string;
  icon: any;
}[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'library', label: 'Library', icon: BookOpen },
  { id: 'chat', label: 'AI Chat', icon: MessageSquare },
  { id: 'quiz', label: 'Quiz', icon: Brain },
  { id: 'progress', label: 'Progress', icon: BarChart3 },
];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        navigation={navigation}
        activeView={activeView}
        onNavigate={setActiveView}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
          {activeView === 'dashboard' && <Dashboard onNavigate={setActiveView} />}
          {activeView === 'library' && <DocumentLibrary />}
          {activeView === 'chat' && <ChatInterface />}
          {activeView === 'quiz' && <QuizModule />}
          {activeView === 'progress' && <ProgressTracker />}
        </main>

        {/* Mobile Bottom Navigation */}
        <MobileNav
          navigation={navigation}
          activeView={activeView}
          onNavigate={setActiveView}
        />
      </div>
    </div>
  );
}