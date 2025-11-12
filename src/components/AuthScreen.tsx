import { useState , FormEvent} from 'react';
import { Brain, BookOpen, Zap, Target } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import {UserAuth} from "../context/authContext"
import { useNavigate } from "react-router-dom";


interface AuthScreenProps {
  onAuthSuccess: () => void;
}

export function AuthScreen({ onAuthSuccess }: AuthScreenProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
const { signInUser } = UserAuth();
  const { signUpNewUser } = UserAuth();
  
   const navigate = useNavigate();

   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(isSignUp ? "Creating your account..." : "Signing you in...");

    try {
      if (isSignUp) {
        
        const { success, error } = await signUpNewUser(email, password, name);

        if (!success) throw new Error(error.message);
        setMessage(" Account created successfully! Please check your email for verification.");
      } else {
        const { success, error } = await signInUser(email, password);

        if (!success) throw new Error(error);
        setMessage(" Logged in successfully!");
        onAuthSuccess(); // redirect or trigger dashboard view
        navigate("dashboard");
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      setMessage(` ${err.message || "Something went wrong."}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Side - Branding */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Brain className="w-8 h-8 text-white" />
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
              <div className="flex gap-3 p-4 bg-white/50 backdrop-blur-sm rounded-xl hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm">Upload Your Materials</h3>
                  <p className="text-sm text-gray-600">PDFs, notes, and textbooks</p>
                </div>
              </div>
              <div className="flex gap-3 p-4 bg-white/50 backdrop-blur-sm rounded-xl hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0">
                  <Brain className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-sm">AI-Powered Chat</h3>
                  <p className="text-sm text-gray-600">Ask questions, get explanations</p>
                </div>
              </div>
              <div className="flex gap-3 p-4 bg-white/50 backdrop-blur-sm rounded-xl hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-sm">Smart Quizzes</h3>
                  <p className="text-sm text-gray-600">Auto-generated from your content</p>
                </div>
              </div>
              <div className="flex gap-3 p-4 bg-white/50 backdrop-blur-sm rounded-xl hover:shadow-md transition-shadow">
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
          <div className="flex justify-center lg:justify-end ">
            <Card className="w-full max-w-md p-8 shadow-2xl bg-white/80 backdrop-blur-sm">
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

                  <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
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