import { TrendingUp, Calendar, Award, Target, Book, Brain, Clock, Zap } from 'lucide-react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

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
    { id: 1, title: '7-Day Streak', description: 'Study for 7 consecutive days', icon: Zap, earned: true, color: 'bg-yellow-100 text-yellow-700' },
    { id: 2, title: 'Quiz Master', description: 'Complete 50 quizzes', icon: Brain, earned: true, color: 'bg-purple-100 text-purple-700' },
    { id: 3, title: 'Book Worm', description: 'Upload 20 documents', icon: Book, earned: false, color: 'bg-blue-100 text-blue-700' },
    { id: 4, title: 'Top Performer', description: 'Score 90%+ on 10 quizzes', icon: Award, earned: false, color: 'bg-green-100 text-green-700' },
  ];

  const subjects = [
    { name: 'Data Structures', progress: 85, quizzes: 12, hours: 24 },
    { name: 'Algorithms', progress: 72, quizzes: 9, hours: 18 },
    { name: 'Computer Networks', progress: 91, quizzes: 15, hours: 32 },
    { name: 'Operating Systems', progress: 64, quizzes: 7, hours: 15 },
  ];

  const maxHours = Math.max(...weeklyActivity.map(d => d.hours));

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl">Progress Tracker</h1>
        <p className="text-gray-600">Monitor your learning journey and achievements</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Total Hours</p>
              <p className="text-2xl">124</p>
              <p className="text-xs text-green-600">+12% this week</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Avg Score</p>
              <p className="text-2xl">87%</p>
              <p className="text-xs text-green-600">+3% this week</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Current Streak</p>
              <p className="text-2xl">7 days</p>
              <p className="text-xs text-orange-600">Don't break it!</p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Achievements</p>
              <p className="text-2xl">12</p>
              <p className="text-xs text-purple-600">2 more unlocked!</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly Activity */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg">Weekly Activity</h2>
              <Badge variant="outline" className="gap-2">
                <TrendingUp className="w-3 h-3" />
                +12%
              </Badge>
            </div>
            
            <div className="space-y-3">
              {weeklyActivity.map((day) => (
                <div key={day.day} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{day.day}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-900">{day.hours}h</span>
                      <span className="text-gray-600">{day.quizzes} quizzes</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
                        style={{ width: `${(day.hours / maxHours) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Achievements */}
        <Card className="p-6">
          <div className="space-y-4">
            <h2 className="text-lg">Achievements</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {achievements.map((achievement) => {
                const Icon = achievement.icon;
                return (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      achievement.earned
                        ? 'border-transparent bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-md'
                        : 'border-dashed border-gray-300 opacity-50'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${achievement.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm">{achievement.title}</p>
                        <p className="text-xs text-gray-600">{achievement.description}</p>
                      </div>
                      {achievement.earned && (
                        <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
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
      <Card className="p-6">
        <div className="space-y-4">
          <h2 className="text-lg">Subject Progress</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {subjects.map((subject) => (
              <div key={subject.name} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">{subject.name}</p>
                    <p className="text-xs text-gray-600">{subject.quizzes} quizzes · {subject.hours}h</p>
                  </div>
                  <span className="text-sm">{subject.progress}%</span>
                </div>
                <Progress value={subject.progress} className="h-2" />
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Study Calendar */}
      <Card className="p-6 bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <Calendar className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl mb-1">Monthly Goal: 100 Hours</h2>
            <div className="flex items-center gap-4">
              <Progress value={78} className="flex-1 h-2 bg-white/20" />
              <span className="text-sm">78/100h</span>
            </div>
            <p className="text-blue-100 text-sm mt-2">You're ahead of schedule! Keep it up! 🎉</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
