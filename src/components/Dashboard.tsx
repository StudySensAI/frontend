import { useState, useEffect } from 'react';
import { Upload, MessageSquare, Brain, TrendingUp, BookOpen, Clock, Target, Zap } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { supabase } from '../supabaseClient';

type ViewType = 'dashboard' | 'library' | 'chat' | 'quiz' | 'progress';
interface DashboardProps {
  onNavigate: (view: ViewType) => void;
}
 

export function Dashboard({ onNavigate }: DashboardProps) {
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
          `http://localhost:8000/api/v1/dashboard/documents?user_id=${userId}`
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

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl">Welcome back! 👋</h1>
        
        <p className="text-gray-600">Ready to continue your learning journey?</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {studyStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl">{stat.value}</p>
                </div>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card className="p-6 bg-linear-to-br from-gray-50 to-blue-50 border-blue-100">
        <h2 className="text-lg mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          <Button
            onClick={() => onNavigate('library')}
            className="h-auto py-4 flex-col gap-2 bg-linear-to-br from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all"
          >
            <Upload className="w-6 h-6" />
            <span className="text-sm">Upload Material</span>
          </Button>
          <Button
            onClick={() => onNavigate('chat')}
            className="h-auto py-4 flex-col gap-2 bg-linear-to-br from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
          >
            <MessageSquare className="w-6 h-6" />
            <span className="text-sm">Ask AI</span>
          </Button>
          <Button
            onClick={() => onNavigate('quiz')}
            className="h-auto py-4 flex-col gap-2 bg-linear-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all"
          >
            <Brain className="w-6 h-6" />
            <span className="text-sm">Take Quiz</span>
          </Button>
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Documents */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg">Recent Materials</h2>
            <Button variant="ghost" size="sm" onClick={() => onNavigate('library')}>
              View all
            </Button>
          </div>
          {loadingDocs ? (
            <p className="text-sm text-gray-500">Loading materials...</p>
          ) : recentDocuments.length === 0 ? (
            <p className="text-sm text-gray-500">No materials uploaded yet.</p>
          ) : (
          <div className="space-y-3">
            {recentDocuments.map((doc) => (
              <div key={doc.id} onClick={() => {window.open(doc.file_url, "_blank")}} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-red-200 transition-colors">
                  <BookOpen className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{doc.title}</p>
                  <p className="text-xs text-gray-600"> {doc.pages || 0} pages · {formatTimeAgo(doc.uploaded_at)}</p>
                </div>
              </div>
            ))}
          </div>)}
        </Card>

        {/* Recent Quizzes */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg">Recent Quizzes</h2>
            <Button variant="ghost" size="sm" onClick={() => onNavigate('quiz')}>
              View all
            </Button>
          </div>
          <div className="space-y-4">
            {recentQuizzes.map((quiz) => (
              <div key={quiz.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">{quiz.topic}</p>
                    <p className="text-xs text-gray-600">{quiz.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{quiz.score}/{quiz.total}</p>
                    <p className="text-xs text-gray-600">{Math.round((quiz.score / quiz.total) * 100)}%</p>
                  </div>
                </div>
                <Progress value={(quiz.score / quiz.total) * 100} className="h-2" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Learning Streak */}
      <Card className="p-6 bg-linear-to-br from-blue-600 to-indigo-600 text-white shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <Zap className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl mb-1">7 Day Streak! 🔥</h2>
            <p className="text-blue-100 text-sm">You're on fire! Keep up the great work.</p>
          </div>
          <Button variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
            Details
          </Button>
        </div>
      </Card>
    </div>
  );
}