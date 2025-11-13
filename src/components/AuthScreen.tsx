import { useState, useEffect } from 'react';
import { Brain, BookOpen, Zap, Target, Eye, EyeOff, Mail, Lock, User, Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import LiquidEther from './LiquidEther';
import { useTheme } from '../context/themeContext';
import Aurora from './Aurora';

interface AuthScreenProps {
  onAuthSuccess: () => void;
}

export function AuthScreen({ onAuthSuccess }: AuthScreenProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [animateFeatures, setAnimateFeatures] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { isDark, toggleTheme } = useTheme();
  const [ripple, setRipple] = useState<{ x: number; y: number; key: number } | null>(null);


  // ⭐ NEW: Cursor reflection state
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setAnimateFeatures(true);
  }, []);

  // ⭐ NEW: Track cursor global position
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useEffect(() => {
    setEmail('');
    setPassword('');
    setName('');
    setErrors({});
    setShowPassword(false);
    setFocusedField(null);
  }, [isSignUp]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = 'Please enter a valid email';

    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';

    if (isSignUp && !name) newErrors.name = 'Name is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) onAuthSuccess();
  };
   useEffect(() => {
  // Trigger wave at center of screen when theme changes
  setRipple({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    key: Date.now(),
  });
}, [isDark]);

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        '--x': `${cursorPos.x}px`,
        '--y': `${cursorPos.y}px`,
      } as React.CSSProperties}
    >

      {/* ⭐ GLOBAL REFLECTION HIGHLIGHT */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] transition-opacity duration-300"
        style={{
          background: `
            radial-gradient(
              350px at var(--x) var(--y),
              rgba(255,255,255,.12),
              rgba(255,255,255,0) 40%
            )
          `,
        }}
      ></div>
      {ripple && (
  <div
    key={ripple.key}
    className="pointer-events-none absolute z-[3] w-0 h-0 rounded-full bg-white/20 dark:bg-white/10 animate-wave"
    style={{
      left: ripple.x,
      top: ripple.y,
      transform: "translate(-50%, -50%)",
    }}
    onAnimationEnd={() => setRipple(null)}
  />
)}


      {/* Theme Toggle Button */}
      <button
        onClick={(e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  setRipple({
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
    key: Date.now()
  });

  toggleTheme();

}}

        className="absolute top-6 right-6 z-50 p-2 rounded-lg bg-white/20 dark:bg-gray-800/40 
                   hover:bg-white/30 dark:hover:bg-gray-700/50 backdrop-blur-md border border-white/20
                   dark:border-gray-700/50 transition-all duration-300"
        aria-label="Toggle dark mode"
      >
        {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
      </button>

      <div className="absolute inset-0 -z-10 dark:bg-gray-950">
        <div className="absolute inset-0">
         <LiquidEther style={{zIndex: 1,  width: '100%', height: '100%' }} />
        </div>
      </div>
      

      <div className="relative container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[65%_35%] gap-12 items-center min-h-screen">

          {/* LEFT SIDE */}
          <div
            className="relative p-18 max-w-none rounded-3xl min-h-[700px] -ml-12 mb-10
            bg-white/10 dark:bg-gray-800/20 backdrop-blur-3xl border border-white/20 dark:border-gray-700/30
            shadow-[0_6px_25px_rgba(0,0,0,0.12)] dark:shadow-[0_6px_25px_rgba(0,0,0,0.4)]
            before:absolute before:inset-0 before:rounded-3xl
            before:bg-linear-to-br before:from-white/30 before:via-white/10 before:to-transparent
            dark:before:from-white/10 dark:before:via-transparent dark:before:to-transparent
            before:pointer-events-none
            after:absolute after:inset-px after:rounded-[inherit]
            after:border after:border-white/10 dark:after:border-gray-700/20
            after:pointer-events-none
            transition-all duration-500
            hover:bg-white/15 dark:hover:bg-gray-800/30 hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)]
            dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]
          ">
            {/* HEADER */}
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <span className="text-3xl tracking-tight">StudyMate AI</span>
              </div>

              <h1 className="text-5xl font-bold bg-clip-text text-transparent
                bg-linear-to-r from-[#6A8CFF] to-[#B38CFF]">
                Your Personal <span className="bg-clip-text text-transparent bg-linear-to-r from-[#3A4BFF] via-[#6A2CFF] to-[#8A3CFF]">AI Study</span> Companion
              </h1>

              <p className="text-lg text-black/80 dark:text-gray-300 mb-10">
                Transform your study materials into interactive learning experiences with AI-powered insights, personalized quizzes, and smart explanations.
              </p>
            </div>

            {/* FEATURES */}
            <div className="grid sm:grid-cols-2 gap-8 pt-4 place-items-start">
              {[
                {
                  iconBg: "bg-blue-100",
                  Icon: BookOpen,
                  title: "Upload Your Materials",
                  desc: "PDFs, notes, and textbooks",
                  color: "text-blue-600",
                  delay: "0ms",
                },
                {
                  iconBg: "bg-indigo-100",
                  Icon: Brain,
                  title: "AI-Powered Chat",
                  desc: "Ask questions, get explanations",
                  color: "text-indigo-600",
                  delay: "150ms",
                },
                {
                  iconBg: "bg-purple-100",
                  Icon: Zap,
                  title: "Smart Quizzes",
                  desc: "Auto-generated from your content",
                  color: "text-purple-600",
                  delay: "300ms",
                },
                {
                  iconBg: "bg-pink-100",
                  Icon: Target,
                  title: "Track Progress",
                  desc: "Monitor your learning journey",
                  color: "text-pink-600",
                  delay: "450ms",
                }
              ].map((item, i) => (
                <div
                  key={i}
                  className={`
                    relative flex gap-4 p-6 rounded-2xl w-full
                    bg-white/10 dark:bg-gray-800/20 backdrop-blur-xl border border-white/20 dark:border-gray-700/30
                    transition-all duration-300
                    hover:bg-white/20 dark:hover:bg-gray-800/40 hover:scale-[1.03]
                    ${animateFeatures ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
                  `}
                  style={{ transitionDelay: item.delay }}
                >
                  <div className={`w-12 h-12 ${item.iconBg} rounded-xl flex items-center justify-center`}>
                    <item.Icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black dark:text-white">{item.title}</h3>
                    <p className="text-sm text-black/70 dark:text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE — CARD */}
          <div className="flex justify-center lg:justify-end min-h-[500px]">
            <Card
              className="relative w-full max-w-xl p-12
              bg-white/10 dark:bg-gray-800/20 backdrop-blur-2xl
              border border-white/20 dark:border-gray-700/30 rounded-3xl
              shadow-[0_8px_32px_rgba(0,0,0,0.25)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)]
              transition-all duration-500
              hover:bg-white/20 dark:hover:bg-gray-800/40 hover:-translate-y-1"
            >
              <div className="space-y-8">
                <div className="text-center space-y-2">
                  <h2 className="text-4xl font-semibold text-black dark:text-white">
                    {isSignUp ? "Create Account" : "Welcome Back"}
                  </h2>
                  <p className="text-lg text-gray-700 dark:text-gray-400">
                    {isSignUp ? "Start your smart study journey today" : "Continue your learning journey"}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10">
                  {isSignUp && (
                    <div className="space-y-2">
                      <Label className="flex gap-2 text-gray-700 dark:text-gray-300 font-medium">
                        <User className="w-4 h-4" /> Full Name
                      </Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`h-12 text-lg transition-all ${
                          focusedField === "name" ? "ring-2 ring-blue-500 border-blue-500" : ""
                        }`}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label className="flex gap-2 text-gray-700 dark:text-gray-300 font-medium">
                      <Mail className="w-4 h-4" /> Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@university.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`h-12 text-lg transition-all ${
                        focusedField === "email" ? "ring-2 ring-blue-500 border-blue-500" : ""
                      }`}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex gap-2 text-gray-700 dark:text-gray-300 font-medium">
                      <Lock className="w-4 h-4" /> Password
                    </Label>

                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`h-12 text-lg pr-10 transition-all ${
                          focusedField === "password" ? "ring-2 ring-blue-500 border-blue-500" : ""
                        }`}
                        onFocus={() => setFocusedField("password")}
                        onBlur={() => setFocusedField(null)}
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-400"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="relative w-full mt-4 h-12 text-lg font-semibold rounded-xl
                      backdrop-blur-xl bg-linear-to-r from-blue-600/70 to-indigo-600/70
                      border border-white/20 dark:border-gray-700/30 text-white shadow-lg
                      hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(100,120,255,0.6)]
                      transition-all duration-300"
                  >
                    {isSignUp ? "Sign Up" : "Sign In"}
                  </Button>
                </form>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold"
                  >
                    {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
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
