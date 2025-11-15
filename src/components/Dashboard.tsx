import { useState, useEffect } from 'react';
import { Upload, MessageSquare, Brain, TrendingUp, BookOpen, Clock, Target, Zap } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { supabase } from '../supabaseClient';

import { useUser } from '../context/userContext';
type ViewType = 'dashboard' | 'library' | 'chat' | 'quiz' | 'progress';
interface DashboardProps {
  onNavigate: (view: ViewType) => void;
}
 

export function Dashboard({ onNavigate }: DashboardProps) {
  const { user } = useUser();
  useEffect(() => {
    if (user?.id) {
      localStorage.setItem("userId", user.id); // save for persistence
    }
  }, [user]);
  const [recentDocuments, setRecentDocuments] = useState<any[]>([]);
  const [loadingDocs, setLoadingDocs] = useState(true);


   const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const diff = Date.now() - date.getTime();
    const hours = diff / (1000 * 60 * 60);

    if (hours < 1) return "just now";
    if (hours < 24) return `${Math.floor(hours)} hours ago`;
    return `${Math.floor(hours / 24)} days ago`;
  };
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function loadDocuments() {
      setLoadingDocs(true);

      const { data: user } = await supabase.auth.getUser();
      const userId = user?.user?.id;

      if (!userId) {
        setRecentDocuments([]);
        setLoadingDocs(false);
        return;
      }

      try {
        const res = await fetch(
          `${API_URL}/api/v1/dashboard/documents?user_id=${userId}`
        );
        const result = await res.json();
        setRecentDocuments(result.documents || []);
        
        
      } catch (err) {
        console.error("Failed to load documents:", err);
      }

      setLoadingDocs(false);
    }

    loadDocuments();
  }, []);

  //  const recentDocuments = [
  //    { id: 1, name: 'Data Structures - Chapter 5.pdf', pages: 24, uploadedAt: '2 hours ago' },
  //    { id: 2, name: 'Algorithm Analysis Notes.pdf', pages: 18, uploadedAt: '1 day ago' },
  //    { id: 3, name: 'Computer Networks Summary.pdf', pages: 32, uploadedAt: '3 days ago' },
  //  ];

    const recentQuizzes = [
      { id: 1, topic: 'Binary Trees', score: 85, total: 100, date: 'Today' },
      { id: 2, topic: 'Sorting Algorithms', score: 92, total: 100, date: 'Yesterday' },
      { id: 3, topic: 'Graph Theory', score: 78, total: 100, date: '2 days ago' },
    ];

    const studyStats = [ 
      { label: 'Documents', value: "12", icon: BookOpen, color: 'bg-blue-100 text-blue-600' },
    { label: 'Study Hours', value: '24', icon: Clock, color: 'bg-indigo-100 text-indigo-600' },
    { label: 'Quizzes Taken', value: '18', icon: Brain, color: 'bg-purple-100 text-purple-600' },
    { label: 'Avg Score', value: '85%', icon: Target, color: 'bg-pink-100 text-pink-600' },
  ];
  console.log("user is", user);

  return (
    <div className="min-h-screen p-6 md:p-10 bg-gradient-to-br from-blue-200 via-white to-purple-200
                 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950
                 bg-fixed">
      {/* Header */}
       <div className="max-w-7xl mx-auto space-y-8">
      <div className="p-6 rounded-3xl bg-white/40 dark:bg-gray-800/30 backdrop-blur-2xl border border-white/60 dark:border-gray-700/30 shadow-[0_4px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_40px_rgba(0,0,0,0.3)]">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">Welcome back! 👋</h1>
        
        <p className="text-gray-600 dark:text-gray-400">Ready to continue your learning journey?</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {studyStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-5 rounded-3xl border border-white/60 dark:border-gray-700/30 bg-white/30 dark:bg-gray-800/20
                           backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.3)]
                           hover:bg-white/40 dark:hover:bg-gray-800/30 transition-all">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

        {/* Stats Grid */}
        
ß
        {/* Quick Actions */}
        <Card className="p-6 rounded-3xl border border-white/60 dark:border-gray-700/30 bg-white/35 dark:bg-gray-800/20 backdrop-blur-2xl shadow-xl dark:shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
          <h2 className="text-lg mb-4 text-gray-800 dark:text-white font-medium">Quick Actions</h2>
          <div className="grid sm:grid-cols-3 gap-3">
            <Button
              onClick={() => onNavigate('library')}
              className="h-auto py-4 flex-col gap-2 bg-gradient-to-br from-blue-400/80 to-indigo-400/80 
                         hover:from-blue-500 hover:to-indigo-500 text-white font-medium 
                         shadow-lg hover:shadow-xl transition-all backdrop-blur-md"
            >
              <Upload className="w-6 h-6" />
              <span className="text-sm">Upload Material</span>
            </Button>
            <Button
              onClick={() => onNavigate('chat')}
              className="h-auto py-4 flex-col gap-2 bg-gradient-to-br from-indigo-400/80 to-purple-400/80 
                         hover:from-indigo-500 hover:to-purple-500 text-white font-medium 
                         shadow-lg hover:shadow-xl transition-all backdrop-blur-md"
            >
              <MessageSquare className="w-6 h-6" />
              <span className="text-sm">Ask AI</span>
            </Button>
            <Button
              onClick={() => onNavigate('quiz')}
              className="h-auto py-4 flex-col gap-2 bg-gradient-to-br from-purple-400/80 to-pink-400/80 
                         hover:from-purple-500 hover:to-pink-500 text-white font-medium 
                         shadow-lg hover:shadow-xl transition-all backdrop-blur-md"
            >
              <Brain className="w-6 h-6" />
              <span className="text-sm">Take Quiz</span>
            </Button></div></Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Documents */}
          <Card className="p-6 rounded-3xl border border-white/60 dark:border-gray-700/30 bg-white/30 dark:bg-gray-800/20 backdrop-blur-2xl shadow-lg dark:shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-800 dark:text-white">Recent Materials</h2>
              <Button variant="ghost" size="sm" className="text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50" onClick={() => onNavigate('library')}>
                View all
              </Button>
            </div>
            <div className="space-y-3">
            {loadingDocs ? (
              <p className="text-sm text-gray-500">Loading materials...</p>
            ) : recentDocuments.length === 0 ? (
              <p className="text-sm text-gray-500">No materials uploaded yet.</p>
            ) : (
          <div className="space-y-3">
            {recentDocuments.map((doc) => (
              <div key={doc.id} onClick={() => {window.open(doc.file_url, "_blank")}} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer group">
                <div className="w-10 bg-red-100 dark:bg-red-900/40 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-red-200 dark:group-hover:bg-red-800/60 transition-colors">
                  <BookOpen className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate text-gray-900 dark:text-gray-100">{doc.title}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400"> {doc.pages || 0} pages · {formatTimeAgo(doc.uploaded_at)}</p>
                </div>
              </div>
            ))}
          </div>)}
             
            </div>
          </Card>

          {/* Recent Quizzes */}
          <Card className="p-6 rounded-3xl border border-white/60 dark:border-gray-700/30 bg-white/30 dark:bg-gray-800/20 backdrop-blur-2xl shadow-lg dark:shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-800 dark:text-white">Recent Quizzes</h2>
              <Button variant="ghost" size="sm" className="text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50" onClick={() => onNavigate('quiz')}>
                View all
              </Button>
            </div>
            <div className="space-y-4">
              {recentQuizzes.map((quiz) => (
                <div key={quiz.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-800 dark:text-gray-200">{quiz.topic}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{quiz.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-800 dark:text-gray-200">{quiz.score}/{quiz.total}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {Math.round((quiz.score / quiz.total) * 100)}%
                      </p>
                    </div>
                  </div>
                  <Progress
  value={(quiz.score / quiz.total) * 100}
  className="h-2 bg-white/40 dark:bg-gray-700/40 backdrop-blur-sm overflow-hidden
             [&>div]:bg-linear-to-r [&>div]:from-blue-500 [&>div]:to-indigo-500
             [&>div]:shadow-[0_0_10px_rgba(79,70,229,0.4)]"
/>

                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Learning Streak */}
        <Card className="p-6 rounded-3xl bg-linear-to-br from-blue-400/90 to-indigo-400/90 dark:from-blue-900/60 dark:to-indigo-900/60
                         text-white shadow-2xl backdrop-blur-2xl border border-white/50 dark:border-indigo-700/30">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/30 dark:bg-white/10 rounded-2xl flex items-center justify-center">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl mb-1 font-semibold">7 Day Streak! 🔥</h2>
              <p className="text-indigo-100 dark:text-indigo-200 text-sm">You're on fire! Keep up the great work.</p>
            </div>
            <Button
              variant="secondary"
              className="bg-white/40 dark:bg-white/10 text-white hover:bg-white/60 dark:hover:bg-white/20 border border-white/30 dark:border-white/10"
            >
              Details
            </Button>
          </div>
        </Card>
      </div>
      </div>
    
  );
}
