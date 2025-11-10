import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { DocumentLibrary } from './components/DocumentLibrary';
import { ChatInterface } from './components/ChatInterface';
import { QuizModule } from './components/QuizModule';
import { ProgressTracker } from './components/ProgressTracker';
import { Sidebar } from './components/Sidebar';
import { MobileNav } from './components/MobileNav';
import { AuthScreen } from './components/AuthScreen';
import { Home, BookOpen, MessageSquare, Brain, BarChart3 } from 'lucide-react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeView, setActiveView] = useState<'dashboard' | 'library' | 'chat' | 'quiz' | 'progress'>('dashboard');

  if (!isAuthenticated) {
    return <AuthScreen onAuthSuccess={() => setIsAuthenticated(true)} />;
  }

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'library', label: 'Library', icon: BookOpen },
    { id: 'chat', label: 'AI Chat', icon: MessageSquare },
    { id: 'quiz', label: 'Quiz', icon: Brain },
    { id: 'progress', label: 'Progress', icon: BarChart3 },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <Sidebar 
        navigation={navigation} 
        activeView={activeView} 
        onNavigate={setActiveView}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Main Content Area */}
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