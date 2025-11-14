import { TrendingUp, Calendar, Award, Target, Book, Brain, Clock, Zap } from 'lucide-react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { useTheme } from '../context/themeContext';

export function ProgressTracker() {
  const weeklyActivity = [
    { day: 'Mon', hours: 3.5, quizzes: 2 },
    { day: 'Tue', hours: 4.2, quizzes: 3 },
    { day: 'Wed', hours: 2.8, quizzes: 1 },
    { day: 'Thu', hours: 5.1, quizzes: 4 },
    { day: 'Fri', hours: 3.9, quizzes: 2 },
    { day: 'Sat', hours: 6.3, quizzes: 5 },
    { day: 'Sun', hours: 4.7, quizzes: 3 },
  ];

  const achievements = [
    { id: 1, title: '7-Day Streak', description: 'Study for 7 consecutive days', icon: Zap, earned: true, color: 'bg-yellow-200/60 text-yellow-800' },
    { id: 2, title: 'Quiz Master', description: 'Complete 50 quizzes', icon: Brain, earned: true, color: 'bg-purple-200/60 text-purple-800' },
    { id: 3, title: 'Book Worm', description: 'Upload 20 documents', icon: Book, earned: false, color: 'bg-blue-200/60 text-blue-800' },
    { id: 4, title: 'Top Performer', description: 'Score 90%+ on 10 quizzes', icon: Award, earned: false, color: 'bg-green-200/60 text-green-800' },
  ];

  const subjects = [
    { name: 'Data Structures', progress: 85, quizzes: 12, hours: 24 },
    { name: 'Algorithms', progress: 72, quizzes: 9, hours: 18 },
    { name: 'Computer Networks', progress: 91, quizzes: 15, hours: 32 },
    { name: 'Operating Systems', progress: 64, quizzes: 7, hours: 15 },
  ];

  const maxHours = Math.max(...weeklyActivity.map((d) => d.hours));

  return (
    <div className="min-h-screen p-6 md:p-10 bg-linear-to-br from-blue-200 via-white to-purple-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 bg-fixed">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="p-6 rounded-3xl bg-white/40 dark:bg-gray-800/30 border border-white/60 dark:border-gray-700/50 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">Progress Tracker</h1>
          <p className="text-gray-600 dark:text-gray-400">Monitor your learning journey and achievements</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Hours', value: '124', sub: '+12% this week', icon: Clock, color: 'from-blue-500 to-indigo-500', textColor: 'text-blue-600 dark:text-blue-400' },
            { label: 'Avg Score', value: '87%', sub: '+3% this week', icon: Target, color: 'from-green-500 to-emerald-500', textColor: 'text-green-600 dark:text-green-400' },
            { label: 'Current Streak', value: '7 days', sub: "Don't break it!", icon: Zap, color: 'from-orange-500 to-yellow-500', textColor: 'text-orange-600 dark:text-orange-400' },
            { label: 'Achievements', value: '12', sub: '2 more unlocked!', icon: Award, color: 'from-purple-500 to-pink-500', textColor: 'text-purple-600 dark:text-purple-400' },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <Card
                key={i}
                className="p-5 rounded-3xl bg-white/40 dark:bg-gray-800/20 border border-white/60 dark:border-gray-700/50 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_50px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_12px_50px_rgba(0,0,0,0.4)] transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
                    <p className={`text-xs ${stat.textColor}`}>{stat.sub}</p>
                  </div>
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center bg-linear-to-br ${stat.color} text-white shadow-md`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Weekly Activity */}
          <Card className="p-6 rounded-3xl bg-white/40 dark:bg-gray-800/20 border border-white/60 dark:border-gray-700/50 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-800 dark:text-white">Weekly Activity</h2>
                <Badge className="bg-linear-to-r from-blue-500 to-indigo-500 text-white gap-2 shadow-md">
                  <TrendingUp className="w-3 h-3" />
                  +12%
                </Badge>
              </div>

              <div className="space-y-3">
                {weeklyActivity.map((day) => (
                  <div key={day.day} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">{day.day}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-gray-800 dark:text-gray-200">{day.hours}h</span>
                        <span className="text-gray-600 dark:text-gray-400">{day.quizzes} quizzes</span>
                      </div>
                    </div>
                    <div className="h-2 w-full bg-white/50 dark:bg-gray-700/40 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-linear-to-r from-blue-400 to-indigo-500"
                        style={{ width: `${(day.hours / maxHours) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Achievements */}
          <Card className="p-6 rounded-3xl bg-white/40 dark:bg-gray-800/20 border border-white/60 dark:border-gray-700/50 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-gray-800 dark:text-white">Achievements</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {achievements.map((a) => {
                  const Icon = a.icon;
                  return (
                    <div
                      key={a.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        a.earned
                          ? 'border-white/60 dark:border-gray-700/50 bg-white/60 dark:bg-gray-700/20 shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]'
                          : 'border-dashed border-gray-300 dark:border-gray-700/50 opacity-60'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${a.color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800 dark:text-white">{a.title}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{a.description}</p>
                        </div>
                        {a.earned && (
                          <Badge className="bg-linear-to-r from-blue-500 to-indigo-500 text-white shadow-sm">
                            Earned
                          </Badge>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>

        {/* Subject Progress */}
        <Card className="p-6 rounded-3xl bg-white/40 dark:bg-gray-800/20 border border-white/60 dark:border-gray-700/50 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
          <h2 className="text-lg mb-4 font-medium text-gray-800 dark:text-white">Subject Progress</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {subjects.map((s) => (
              <div key={s.name} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">{s.name}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {s.quizzes} quizzes · {s.hours}h
                    </p>
                  </div>
                  <span className="text-sm font-medium text-gray-800 dark:text-white">{s.progress}%</span>
                </div>
                <div className="relative w-full h-2 bg-white/40 dark:bg-gray-700/40 rounded-full overflow-hidden shadow-inner dark:shadow-inner">
  <div
    className="absolute left-0 top-0 h-full rounded-full 
              bg-linear-to-r from-[#3A7BD5] to-[#00D2FF]
               shadow-[0_0_10px_rgba(147,197,253,0.25)] 
               transition-all duration-500"
    style={{ width: `${s.progress}%` }}
  />
</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Study Calendar */}
        <Card className="p-6 rounded-3xl bg-linear-to-br from-blue-500/90 dark:from-blue-600/40 to-indigo-500/90 dark:to-indigo-600/40 text-white shadow-[0_8px_50px_rgba(59,130,246,0.3)] dark:shadow-[0_8px_50px_rgba(59,130,246,0.1)] backdrop-blur-2xl dark:border dark:border-blue-500/20">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 dark:bg-white/10 rounded-2xl flex items-center justify-center">
              <Calendar className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl mb-1 font-semibold">Monthly Goal: 100 Hours</h2>
              <div className="flex items-center gap-4">
                <div className="relative flex-1 h-2 bg-white/30 dark:bg-white/15 rounded-full overflow-hidden shadow-inner dark:shadow-inner">
  <div
    className="absolute left-0 top-0 h-full rounded-full 
               bg-linear-to-r from-[#4FACFE] to-[#00F2FE]

               shadow-[0_0_12px_rgba(99,102,241,0.2)] 
               transition-all duration-500"
    style={{ width: `78%` }}
  />
</div>
                <span className="text-sm">78/100h</span>
              </div>
              <p className="text-blue-100 dark:text-blue-200/80 text-sm mt-2">You're ahead of schedule! Keep it up! 🎉</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
