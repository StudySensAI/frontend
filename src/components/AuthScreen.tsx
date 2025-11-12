import { useState, useEffect } from 'react';
import { Brain, BookOpen, Zap, Target, Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import LiquidEther from './LiquidEther';

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

  useEffect(() => {
    setAnimateFeatures(true);
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

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <LiquidEther />
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[65%_35%] gap-12 items-center min-h-screen">

          {/* ✅ LEFT SIDE */}
          <div
            className="relative p-18 max-w-none rounded-3xl min-h-[700px] -ml-12 mb-10
            bg-white/10 backdrop-blur-3xl border border-white/20
            shadow-[0_6px_25px_rgba(0,0,0,0.12)]
            before:absolute before:inset-0 before:rounded-3xl
            before:bg-gradient-to-br before:from-white/30 before:via-white/10 before:to-transparent
            before:pointer-events-none
            after:absolute after:inset-[1px] after:rounded-[inherit]
            after:border after:border-white/10
            after:pointer-events-none
            transition-all duration-500
            hover:bg-white/15 hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)]
            
          ">
            
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <span className="text-3xl tracking-tight">StudyMate AI</span>
              </div>

              <h1 className="text-5xl font-bold bg-clip-text text-transparent
                bg-gradient-to-r from-[#6A8CFF] to-[#B38CFF]
                drop-shadow-[0_4px_12px_rgba(255,255,255,0.55)]">
                Your Personal <span className="bg-clip-text text-transparent
                bg-gradient-to-r from-[#3A4BFF] via-[#6A2CFF] to-[#8A3CFF]
                drop-shadow-[0_2px_4px_rgba(80,60,200,0.35)]">AI Study</span> Companion
              </h1>

              <p className="text-lg text-black/80 mb-10">
                Transform your study materials into interactive learning experiences with AI-powered insights, personalized quizzes, and smart explanations.
              </p>
            </div>


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
                    bg-white/10 backdrop-blur-xl border border-white/20
                    shadow-[0_4px_20px_rgba(0,0,0,0.12)]
                    transition-all duration-300
                    before:absolute before:inset-0 before:rounded-2xl
                    before:bg-gradient-to-br before:from-white/30 before:to-transparent
                    before:opacity-40 before:pointer-events-none
                    hover:bg-white/15 hover:shadow-[0_6px_28px_rgba(0,0,0,0.2)]
                    hover:scale-[1.03]
                    ${animateFeatures ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
                  `}
                  style={{ transitionDelay: item.delay }}
                >
                  <div className={`w-12 h-12 ${item.iconBg} rounded-xl flex items-center justify-center`}>
                    <item.Icon className={`w-6 h-6 ${item.color}`} />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-black">
                      {item.title}
                    </h3>
                    <p className="text-sm text-black/70">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}

            </div>
          </div>

         
          <div className="flex justify-center lg:justify-end min-h-[500px]">
            <Card
              className="relative w-full max-w-xl p-12
              bg-white/10 backdrop-blur-2xl
              border border-white/20 rounded-3xl
              shadow-[0_8px_32px_rgba(0,0,0,0.25)]
              before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br
              before:from-white/40 before:to-white/5 before:pointer-events-none
              after:absolute after:inset-[1px] after:rounded-[inherit]
              after:bg-gradient-to-br after:from-white/30 after:to-transparent
              after:opacity-60 after:pointer-events-none
              transition-all duration-500
              hover:bg-white/20 hover:shadow-[0_12px_48px_rgba(0,0,0,0.35)]
              hover:-translate-y-1"
            >
              <div className="space-y-8">
                <div className="text-center space-y-2">
                  <h2 className="text-4xl font-semibold">
                    {isSignUp ? "Create Account" : "Welcome Back"}
                  </h2>
                  <p className="text-lg text-gray-700">
                    {isSignUp ? "Start your smart study journey today" : "Continue your learning journey"}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10">

                  {isSignUp && (
                    <div className="space-y-2">
                      <Label className="flex gap-2 text-gray-700 font-medium">
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
                    <Label className="flex gap-2 text-gray-700 font-medium">
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
                    <Label className="flex gap-2 text-gray-700 font-medium">
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
                          focusedField === "password"
                            ? "ring-2 ring-blue-500 border-blue-500"
                            : ""
                        }`}
                        onFocus={() => setFocusedField("password")}
                        onBlur={() => setFocusedField(null)}
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="elative w-full mt-4 h-12 text-lg font-semibold rounded-xl
                                backdrop-blur-xl bg-gradient-to-r from-blue-600/70 to-indigo-600/70
  border border-white/20 text-white shadow-[0_4px_24px_rgba(0,0,0,0.3)]
  before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r
  before:from-white/20 before:to-transparent before:opacity-30
  hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(100,120,255,0.6)]
  transition-all duration-300 ease-out"
                  >
                    {isSignUp ? "Sign Up" : "Sign In"}
                  </Button>
                </form>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSignUp(!isSignUp);
                      
                    }}
                    className="text-blue-600 hover:text-blue-700 font-semibold"
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
