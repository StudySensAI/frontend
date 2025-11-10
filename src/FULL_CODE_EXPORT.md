# StudyMate AI - Complete Code Export

This file contains ALL the code needed to build and run the StudyMate AI application.

---

## 📋 TABLE OF CONTENTS

1. [Setup Instructions](#setup-instructions)
2. [Package Configuration](#package-configuration)
3. [Main Application Files](#main-application-files)
4. [Custom Components](#custom-components)
5. [Styles](#styles)
6. [Configuration Files](#configuration-files)

---

## 🚀 SETUP INSTRUCTIONS

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Quick Start
```bash
# 1. Create new React + TypeScript project
npm create vite@latest studymate-ai -- --template react-ts
cd studymate-ai

# 2. Install dependencies
npm install

# 3. Install required packages
npm install lucide-react class-variance-authority clsx tailwind-merge

# 4. Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 5. Install Radix UI components (for Shadcn)
npm install @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-aspect-ratio @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-context-menu @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-hover-card @radix-ui/react-label @radix-ui/react-menubar @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-toggle @radix-ui/react-toggle-group @radix-ui/react-tooltip

# 6. Install additional dependencies
npm install sonner vaul cmdk date-fns react-day-picker input-otp embla-carousel-react recharts react-resizable-panels

# 7. Copy all code files from this document to your project

# 8. Run the development server
npm run dev
```

---

## 📦 PACKAGE CONFIGURATION

### package.json
```json
{
  "name": "studymate-ai",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.294.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.1.0",
    "@radix-ui/react-accordion": "^1.1.2",
    "@radix-ui/react-alert-dialog": "^1.0.5",
    "@radix-ui/react-aspect-ratio": "^1.0.3",
    "@radix-ui/react-avatar": "^1.0.4",
    "@radix-ui/react-checkbox": "^1.0.4",
    "@radix-ui/react-collapsible": "^1.0.3",
    "@radix-ui/react-context-menu": "^2.1.5",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-hover-card": "^1.0.7",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-menubar": "^1.0.4",
    "@radix-ui/react-navigation-menu": "^1.1.4",
    "@radix-ui/react-popover": "^1.0.7",
    "@radix-ui/react-progress": "^1.0.3",
    "@radix-ui/react-radio-group": "^1.1.3",
    "@radix-ui/react-scroll-area": "^1.0.5",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-separator": "^1.0.3",
    "@radix-ui/react-slider": "^1.1.2",
    "@radix-ui/react-switch": "^1.0.3",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-toast": "^1.1.5",
    "@radix-ui/react-toggle": "^1.0.3",
    "@radix-ui/react-toggle-group": "^1.0.4",
    "@radix-ui/react-tooltip": "^1.0.7",
    "sonner": "^1.2.0",
    "vaul": "^0.9.0",
    "cmdk": "^0.2.0",
    "date-fns": "^2.30.0",
    "react-day-picker": "^8.10.0",
    "input-otp": "^1.2.2",
    "embla-carousel-react": "^8.0.0",
    "recharts": "^2.10.3",
    "react-resizable-panels": "^1.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@typescript-eslint/eslint-plugin": "^6.14.0",
    "@typescript-eslint/parser": "^6.14.0",
    "@vitejs/plugin-react": "^4.2.1",
    "typescript": "^5.2.2",
    "vite": "^5.0.8",
    "tailwindcss": "^4.0.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "eslint": "^8.55.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5"
  }
}
```

### tailwind.config.js
```js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './index.html',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### vite.config.ts
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

---

## 📱 MAIN APPLICATION FILES

### src/App.tsx
```tsx
import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { DocumentLibrary } from './components/DocumentLibrary';
import { ChatInterface } from './components/ChatInterface';
import { QuizModule } from './components/QuizModule';
import { Sidebar } from './components/Sidebar';
import { MobileNav } from './components/MobileNav';
import { AuthScreen } from './components/AuthScreen';
import { Home, BookOpen, MessageSquare, Brain } from 'lucide-react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeView, setActiveView] = useState<'dashboard' | 'library' | 'chat' | 'quiz'>('dashboard');

  if (!isAuthenticated) {
    return <AuthScreen onAuthSuccess={() => setIsAuthenticated(true)} />;
  }

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'library', label: 'Library', icon: BookOpen },
    { id: 'chat', label: 'AI Chat', icon: MessageSquare },
    { id: 'quiz', label: 'Quiz', icon: Brain },
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
```

### src/main.tsx
```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### index.html
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>StudyMate AI - Smart Study Partner</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

## 🎨 CUSTOM COMPONENTS

### src/components/AuthScreen.tsx
```tsx
import { useState } from 'react';
import { Brain, BookOpen, Zap, Target } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';

interface AuthScreenProps {
  onAuthSuccess: () => void;
}

export function AuthScreen({ onAuthSuccess }: AuthScreenProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For prototype: automatically authenticate
    onAuthSuccess();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Side - Branding */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <span className="text-3xl tracking-tight">StudyMate AI</span>
              </div>
              <h1 className="text-5xl lg:text-6xl tracking-tight">
                Your Personal <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">AI Study</span> Companion
              </h1>
              <p className="text-xl text-gray-600">
                Transform your study materials into interactive learning experiences with AI-powered insights, personalized quizzes, and smart explanations.
              </p>
            </div>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-4 pt-8">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm">Upload Your Materials</h3>
                  <p className="text-sm text-gray-600">PDFs, notes, and textbooks</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0">
                  <Brain className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-sm">AI-Powered Chat</h3>
                  <p className="text-sm text-gray-600">Ask questions, get explanations</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-sm">Smart Quizzes</h3>
                  <p className="text-sm text-gray-600">Auto-generated from your content</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center shrink-0">
                  <Target className="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <h3 className="text-sm">Track Progress</h3>
                  <p className="text-sm text-gray-600">Monitor your learning journey</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Form */}
          <div className="flex justify-center lg:justify-end">
            <Card className="w-full max-w-md p-8 shadow-xl">
              <div className="space-y-6">
                <div className="space-y-2 text-center">
                  <h2 className="text-2xl">{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
                  <p className="text-sm text-gray-600">
                    {isSignUp ? 'Start your smart study journey today' : 'Continue your learning journey'}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {isSignUp && (
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required={isSignUp}
                      />
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@university.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                  </Button>
                </form>

                <div className="text-center text-sm">
                  <button
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-blue-600 hover:underline"
                  >
                    {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                  </button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### src/components/Sidebar.tsx
```tsx
import { Brain, LogOut } from 'lucide-react';
import { Button } from './ui/button';

interface SidebarProps {
  navigation: Array<{ id: string; label: string; icon: any }>;
  activeView: string;
  onNavigate: (view: any) => void;
}

export function Sidebar({ navigation, activeView, onNavigate }: SidebarProps) {
  return (
    <div className="hidden md:flex md:w-64 md:flex-col bg-white border-r border-gray-200">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center gap-2 px-6 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl">StudyMate AI</span>
        </div>
        
        <nav className="flex-1 px-3 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="px-3 pt-4 border-t border-gray-200">
          <Button variant="ghost" className="w-full justify-start gap-3 text-gray-700">
            <LogOut className="w-5 h-5" />
            <span className="text-sm">Sign Out</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
```

### src/components/MobileNav.tsx
```tsx
interface MobileNavProps {
  navigation: Array<{ id: string; label: string; icon: any }>;
  activeView: string;
  onNavigate: (view: any) => void;
}

export function MobileNav({ navigation, activeView, onNavigate }: MobileNavProps) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 safe-area-inset-bottom">
      <div className="flex justify-around items-center">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                isActive ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
```

### src/components/Dashboard.tsx
```tsx
import { Upload, MessageSquare, Brain, TrendingUp, BookOpen, Clock, Target, Zap } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

interface DashboardProps {
  onNavigate: (view: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const recentDocuments = [
    { id: 1, name: 'Data Structures - Chapter 5.pdf', pages: 24, uploadedAt: '2 hours ago' },
    { id: 2, name: 'Algorithm Analysis Notes.pdf', pages: 18, uploadedAt: '1 day ago' },
    { id: 3, name: 'Computer Networks Summary.pdf', pages: 32, uploadedAt: '3 days ago' },
  ];

  const recentQuizzes = [
    { id: 1, topic: 'Binary Trees', score: 85, total: 100, date: 'Today' },
    { id: 2, topic: 'Sorting Algorithms', score: 92, total: 100, date: 'Yesterday' },
    { id: 3, topic: 'Graph Theory', score: 78, total: 100, date: '2 days ago' },
  ];

  const studyStats = [
    { label: 'Documents', value: '12', icon: BookOpen, color: 'bg-blue-100 text-blue-600' },
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
            <Card key={stat.label} className="p-4">
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
      <Card className="p-6">
        <h2 className="text-lg mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          <Button
            onClick={() => onNavigate('library')}
            className="h-auto py-4 flex-col gap-2 bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            <Upload className="w-6 h-6" />
            <span className="text-sm">Upload Material</span>
          </Button>
          <Button
            onClick={() => onNavigate('chat')}
            className="h-auto py-4 flex-col gap-2 bg-gradient-to-br from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
          >
            <MessageSquare className="w-6 h-6" />
            <span className="text-sm">Ask AI</span>
          </Button>
          <Button
            onClick={() => onNavigate('quiz')}
            className="h-auto py-4 flex-col gap-2 bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
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
          <div className="space-y-3">
            {recentDocuments.map((doc) => (
              <div key={doc.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{doc.name}</p>
                  <p className="text-xs text-gray-600">{doc.pages} pages · {doc.uploadedAt}</p>
                </div>
              </div>
            ))}
          </div>
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
      <Card className="p-6 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
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
```

### src/components/DocumentLibrary.tsx
```tsx
import { useState } from 'react';
import { Upload, File, FileText, Trash2, Eye, Download, Search, Filter } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

export function DocumentLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const documents = [
    { 
      id: 1, 
      name: 'Data Structures - Chapter 5.pdf', 
      size: '2.4 MB', 
      pages: 24, 
      uploadedAt: '2024-03-15',
      category: 'Computer Science',
      color: 'bg-blue-100 text-blue-700'
    },
    { 
      id: 2, 
      name: 'Algorithm Analysis Notes.pdf', 
      size: '1.8 MB', 
      pages: 18, 
      uploadedAt: '2024-03-14',
      category: 'Computer Science',
      color: 'bg-blue-100 text-blue-700'
    },
    { 
      id: 3, 
      name: 'Computer Networks Summary.pdf', 
      size: '3.2 MB', 
      pages: 32, 
      uploadedAt: '2024-03-12',
      category: 'Networking',
      color: 'bg-purple-100 text-purple-700'
    },
    { 
      id: 4, 
      name: 'Database Management Systems.pdf', 
      size: '4.1 MB', 
      pages: 45, 
      uploadedAt: '2024-03-10',
      category: 'Databases',
      color: 'bg-green-100 text-green-700'
    },
    { 
      id: 5, 
      name: 'Operating Systems Concepts.pdf', 
      size: '3.7 MB', 
      pages: 38, 
      uploadedAt: '2024-03-08',
      category: 'Computer Science',
      color: 'bg-blue-100 text-blue-700'
    },
    { 
      id: 6, 
      name: 'Software Engineering Notes.pdf', 
      size: '2.9 MB', 
      pages: 28, 
      uploadedAt: '2024-03-05',
      category: 'Software Engineering',
      color: 'bg-orange-100 text-orange-700'
    },
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file drop
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle file input
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl">Study Materials</h1>
          <p className="text-gray-600">Upload and manage your study documents</p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Upload Area */}
      <Card
        className={`p-8 border-2 border-dashed transition-colors ${
          dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <Upload className="w-8 h-8 text-blue-600" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg">Upload Study Materials</h3>
            <p className="text-sm text-gray-600">
              Drag and drop your PDFs, notes, or documents here
            </p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <label htmlFor="file-upload" className="cursor-pointer">
                Choose Files
              </label>
            </Button>
            <input
              id="file-upload"
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileInput}
              className="hidden"
            />
          </div>
          <p className="text-xs text-gray-500">
            Supports: PDF, DOC, DOCX, TXT (Max 25MB)
          </p>
        </div>
      </Card>

      {/* Documents Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg">Your Documents ({documents.length})</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((doc) => (
            <Card key={doc.id} className="p-4 hover:shadow-lg transition-shadow">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{doc.name}</p>
                    <p className="text-xs text-gray-600">{doc.size} · {doc.pages} pages</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className={doc.color}>
                    {doc.category}
                  </Badge>
                  <span className="text-xs text-gray-500">{doc.uploadedAt}</span>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                  <Button size="sm" variant="ghost" className="flex-1 gap-2">
                    <Eye className="w-4 h-4" />
                    View
                  </Button>
                  <Button size="sm" variant="ghost" className="gap-2">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
```

### src/components/ChatInterface.tsx
```tsx
import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, BookOpen, Sparkles, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';

export function ChatInterface() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: "Hi! I'm your AI study companion. I can help you understand your study materials, answer questions, and explain concepts. What would you like to learn about today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const documents = [
    'Data Structures - Chapter 5.pdf',
    'Algorithm Analysis Notes.pdf',
    'Computer Networks Summary.pdf',
  ];

  const suggestedQuestions = [
    'Explain binary search trees',
    'What is time complexity?',
    'Compare TCP vs UDP',
    'Summarize this chapter',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      role: 'user' as const,
      content: input,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: messages.length + 2,
        role: 'assistant' as const,
        content: "That's a great question! Based on your study materials, let me explain...\n\nBinary search trees (BST) are a fundamental data structure where each node has at most two children. The key property is that for any node, all values in its left subtree are smaller, and all values in its right subtree are larger.\n\nThis ordering property makes BSTs efficient for searching, with O(log n) average time complexity for balanced trees.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl">AI Study Chat</h1>
              <p className="text-sm text-gray-600">Ask questions about your study materials</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Document Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <BookOpen className="w-4 h-4 text-gray-400 shrink-0" />
            <div className="flex gap-2">
              {documents.map((doc) => (
                <Badge
                  key={doc}
                  variant={selectedDocument === doc ? 'default' : 'outline'}
                  className="cursor-pointer whitespace-nowrap"
                  onClick={() => setSelectedDocument(selectedDocument === doc ? null : doc)}
                >
                  {doc}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              )}
              
              <div className={`flex-1 max-w-2xl ${message.role === 'user' ? 'flex justify-end' : ''}`}>
                <Card className={`p-4 ${message.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white'}`}>
                  <div className="space-y-2">
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    {message.role === 'assistant' && (
                      <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                        <Button size="sm" variant="ghost" className="h-8 gap-2">
                          <Copy className="w-3 h-3" />
                          <span className="text-xs">Copy</span>
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8">
                          <ThumbsUp className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8">
                          <ThumbsDown className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              </div>

              {message.role === 'user' && (
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 md:p-6 border-t border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto space-y-3">
          {/* Suggested Questions */}
          {messages.length === 1 && (
            <div className="space-y-2">
              <p className="text-xs text-gray-600 flex items-center gap-2">
                <Sparkles className="w-3 h-3" />
                Suggested questions:
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question) => (
                  <Badge
                    key={question}
                    variant="outline"
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => setInput(question)}
                  >
                    {question}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="flex gap-2">
            <Textarea
              placeholder="Ask a question about your study materials..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="min-h-[60px] max-h-32 resize-none"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim()}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shrink-0"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 text-center">
            AI can make mistakes. Verify important information.
          </p>
        </div>
      </div>
    </div>
  );
}
```

### src/components/QuizModule.tsx
```tsx
import { useState } from 'react';
import { Brain, Clock, CheckCircle, XCircle, RotateCcw, Sparkles, Trophy, ArrowRight } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';

export function QuizModule() {
  const [quizMode, setQuizMode] = useState<'select' | 'active' | 'results'>('select');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);

  const availableTopics = [
    { id: 1, name: 'Data Structures', questions: 10, difficulty: 'Medium', color: 'bg-blue-100 text-blue-700' },
    { id: 2, name: 'Algorithms', questions: 15, difficulty: 'Hard', color: 'bg-purple-100 text-purple-700' },
    { id: 3, name: 'Computer Networks', questions: 12, difficulty: 'Easy', color: 'bg-green-100 text-green-700' },
    { id: 4, name: 'Operating Systems', questions: 10, difficulty: 'Medium', color: 'bg-orange-100 text-orange-700' },
  ];

  const quizQuestions = [
    {
      id: 1,
      question: 'What is the average time complexity of searching in a balanced Binary Search Tree?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
      correctAnswer: 1,
      explanation: 'In a balanced BST, the height is log n, and searching involves traversing from root to a leaf, which takes O(log n) time.',
    },
    {
      id: 2,
      question: 'Which traversal of a Binary Search Tree gives elements in sorted order?',
      options: ['Pre-order', 'In-order', 'Post-order', 'Level-order'],
      correctAnswer: 1,
      explanation: 'In-order traversal (Left-Root-Right) of a BST visits nodes in ascending order.',
    },
    {
      id: 3,
      question: 'What is the worst-case time complexity of Quick Sort?',
      options: ['O(n log n)', 'O(n²)', 'O(n)', 'O(log n)'],
      correctAnswer: 1,
      explanation: 'Quick Sort has O(n²) worst-case complexity when the pivot selection consistently results in unbalanced partitions.',
    },
  ];

  const startQuiz = () => {
    setQuizMode('active');
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowExplanation(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQuestion]: answerIndex });
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      setQuizMode('results');
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowExplanation(false);
    }
  };

  const checkAnswer = () => {
    setShowExplanation(true);
  };

  const calculateScore = () => {
    let correct = 0;
    quizQuestions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        correct++;
      }
    });
    return { correct, total: quizQuestions.length, percentage: Math.round((correct / quizQuestions.length) * 100) };
  };

  // Select Mode - Topic Selection
  if (quizMode === 'select') {
    return (
      <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl">Practice Quizzes</h1>
          <p className="text-gray-600">Test your knowledge with AI-generated quizzes</p>
        </div>

        {/* Generate Custom Quiz */}
        <Card className="p-6 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <h2 className="text-xl mb-1">Generate Custom Quiz</h2>
                <p className="text-blue-100 text-sm">
                  Create a personalized quiz from your uploaded study materials
                </p>
              </div>
              <Button variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                Create Quiz
              </Button>
            </div>
          </div>
        </Card>

        {/* Available Topics */}
        <div>
          <h2 className="text-lg mb-4">Practice by Topic</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {availableTopics.map((topic) => (
              <Card key={topic.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={startQuiz}>
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg mb-2">{topic.name}</h3>
                      <p className="text-sm text-gray-600">{topic.questions} questions</p>
                    </div>
                    <Badge className={topic.color}>{topic.difficulty}</Badge>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                    Start Quiz
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Attempts */}
        <Card className="p-6">
          <h2 className="text-lg mb-4">Recent Attempts</h2>
          <div className="space-y-3">
            {[
              { topic: 'Binary Trees', score: 85, date: 'Today', total: 100 },
              { topic: 'Sorting Algorithms', score: 92, date: 'Yesterday', total: 100 },
              { topic: 'Graph Theory', score: 78, date: '2 days ago', total: 100 },
            ].map((attempt, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                <div>
                  <p className="text-sm">{attempt.topic}</p>
                  <p className="text-xs text-gray-600">{attempt.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">{attempt.score}%</p>
                  <p className="text-xs text-gray-600">{attempt.score}/{attempt.total}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  // Active Mode - Taking Quiz
  if (quizMode === 'active') {
    const question = quizQuestions[currentQuestion];
    const hasAnswered = selectedAnswers[currentQuestion] !== undefined;
    const isCorrect = hasAnswered && selectedAnswers[currentQuestion] === question.correctAnswer;

    return (
      <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Question {currentQuestion + 1} of {quizQuestions.length}</span>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">12:34</span>
            </div>
          </div>
          <Progress value={((currentQuestion + 1) / quizQuestions.length) * 100} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="p-6 md:p-8">
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                <span className="text-sm text-blue-600">{currentQuestion + 1}</span>
              </div>
              <h2 className="text-xl flex-1">{question.question}</h2>
            </div>

            {/* Options */}
            <RadioGroup
              value={selectedAnswers[currentQuestion]?.toString()}
              onValueChange={(value) => handleAnswerSelect(parseInt(value))}
            >
              <div className="space-y-3">
                {question.options.map((option, index) => {
                  const isSelected = selectedAnswers[currentQuestion] === index;
                  const isCorrectAnswer = index === question.correctAnswer;
                  
                  let optionClass = 'border-2 p-4 rounded-lg transition-all cursor-pointer hover:border-blue-300';
                  if (showExplanation) {
                    if (isCorrectAnswer) {
                      optionClass += ' border-green-500 bg-green-50';
                    } else if (isSelected && !isCorrectAnswer) {
                      optionClass += ' border-red-500 bg-red-50';
                    }
                  } else if (isSelected) {
                    optionClass += ' border-blue-500 bg-blue-50';
                  } else {
                    optionClass += ' border-gray-200';
                  }

                  return (
                    <div key={index} className={optionClass}>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value={index.toString()} id={`option-${index}`} disabled={showExplanation} />
                        <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                          {option}
                        </Label>
                        {showExplanation && isCorrectAnswer && (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        )}
                        {showExplanation && isSelected && !isCorrectAnswer && (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </RadioGroup>

            {/* Explanation */}
            {showExplanation && (
              <Card className={`p-4 ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'}`}>
                <div className="flex gap-3">
                  <Brain className={`w-5 h-5 shrink-0 ${isCorrect ? 'text-green-600' : 'text-blue-600'}`} />
                  <div className="space-y-1">
                    <p className={`text-sm ${isCorrect ? 'text-green-900' : 'text-blue-900'}`}>
                      {isCorrect ? 'Correct! ' : 'Incorrect. '}
                    </p>
                    <p className="text-sm text-gray-700">{question.explanation}</p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          
          <div className="flex gap-2">
            {!showExplanation && hasAnswered && (
              <Button onClick={checkAnswer} variant="outline" className="gap-2">
                Check Answer
              </Button>
            )}
            
            <Button
              onClick={handleNext}
              disabled={!hasAnswered}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 gap-2"
            >
              {currentQuestion === quizQuestions.length - 1 ? 'Finish' : 'Next'}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Results Mode
  const score = calculateScore();
  
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      {/* Results Card */}
      <Card className="p-8 text-center bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
        <div className="space-y-4">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto">
            <Trophy className="w-10 h-10" />
          </div>
          <div>
            <h1 className="text-3xl mb-2">Quiz Complete!</h1>
            <p className="text-blue-100">Great job on completing the quiz</p>
          </div>
          <div className="text-6xl my-4">{score.percentage}%</div>
          <p className="text-xl">
            You got {score.correct} out of {score.total} questions correct
          </p>
        </div>
      </Card>

      {/* Performance Breakdown */}
      <Card className="p-6">
        <h2 className="text-lg mb-4">Question Review</h2>
        <div className="space-y-3">
          {quizQuestions.map((q, index) => {
            const isCorrect = selectedAnswers[index] === q.correctAnswer;
            return (
              <div key={q.id} className="flex items-start gap-3 p-4 rounded-lg bg-gray-50">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  isCorrect ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm mb-1">{q.question}</p>
                  {!isCorrect && (
                    <p className="text-xs text-gray-600">
                      Correct answer: {q.options[q.correctAnswer]}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          onClick={() => setQuizMode('select')}
          variant="outline"
          className="flex-1 gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Try Another Quiz
        </Button>
        <Button
          onClick={startQuiz}
          className="flex-1 gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        >
          <RotateCcw className="w-4 h-4" />
          Retake Quiz
        </Button>
      </div>
    </div>
  );
}
```

---

## 🎨 STYLES

### src/styles/globals.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 48%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

---

## 🔧 CONFIGURATION FILES

### .gitignore
```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Environment variables
.env
.env.local
.env.production
```

### .eslintrc.cjs
```js
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
```

---

## 📝 NOTES FOR DEVELOPERS

### Folder Structure to Create
```
studymate-ai/
├── public/
├── src/
│   ├── components/
│   │   ├── ui/         (Shadcn components - copy from Figma Make)
│   │   ├── AuthScreen.tsx
│   │   ├── Dashboard.tsx
│   │   ├── DocumentLibrary.tsx
│   │   ├── ChatInterface.tsx
│   │   ├── QuizModule.tsx
│   │   ├── Sidebar.tsx
│   │   └── MobileNav.tsx
│   ├── styles/
│   │   └── globals.css
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

### Missing Shadcn UI Components
You need to copy these files from the Figma Make interface `/components/ui/`:
- button.tsx
- card.tsx
- input.tsx
- label.tsx
- badge.tsx
- progress.tsx
- textarea.tsx
- radio-group.tsx

These are standard Shadcn components. You can also generate them using the Shadcn CLI:
```bash
npx shadcn-ui@latest add button card input label badge progress textarea radio-group
```

### API Integration Points

**For AI Features:**
- OpenAI API for chat and quiz generation
- PDF parsing library (pdf-parse or similar)
- Vector database for document embeddings (Pinecone, Weaviate)

**For Backend:**
- Supabase for authentication, database, and storage
- Edge functions for serverless API routes

### Environment Variables (.env)
```
VITE_OPENAI_API_KEY=your_openai_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 🚀 DEPLOYMENT

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod
```

---

## ✅ CHECKLIST FOR DEVELOPERS

- [ ] Set up React + TypeScript project
- [ ] Install all dependencies
- [ ] Copy all component files
- [ ] Copy UI components from Shadcn
- [ ] Configure Tailwind CSS
- [ ] Test the application locally
- [ ] Add AI API integration
- [ ] Implement file upload functionality
- [ ] Connect to Supabase backend
- [ ] Add authentication
- [ ] Test responsive design
- [ ] Deploy to production

---

**🎉 You now have the complete codebase for StudyMate AI!**

Copy each section into the appropriate files in your project, install dependencies, and you're ready to go!

For questions or issues, refer to:
- React docs: https://react.dev
- Tailwind CSS: https://tailwindcss.com
- Shadcn UI: https://ui.shadcn.com
- Vite: https://vitejs.dev

Good luck with your hackathon! 🚀
