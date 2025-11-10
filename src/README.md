# StudyMate AI - Smart Study Partner

An AI-powered study companion for engineering students that transforms static notes and PDFs into dynamic, personalized learning experiences.

## 🎯 Project Overview

StudyMate AI is designed for engineering students who are overwhelmed with static notes and long PDFs but need dynamic and tailored exam revision. This application provides:

- **Document Management**: Upload and organize study materials (PDFs, notes, books)
- **AI Chat Interface**: Interactive conversations about your study materials
- **Smart Quiz Generation**: On-demand, personalized quizzes from your content
- **Progress Tracking**: Monitor learning journey and performance
- **Cross-Platform Design**: Responsive design works on both web and mobile

## 🚀 Features

### 1. Authentication System
- Beautiful landing page with gradient design
- Sign up and sign in functionality
- Feature showcase for new users
- Fully responsive auth screens

### 2. Dashboard
- Study statistics overview (documents, hours, quizzes, scores)
- Quick action buttons for common tasks
- Recent documents and quizzes display
- Learning streak tracking with visual indicators
- Responsive grid layout for mobile and desktop

### 3. Document Library
- Drag-and-drop file upload
- Support for PDF, DOC, DOCX, TXT files
- Document categorization and tagging
- Search and filter functionality
- Document preview, download, and delete options
- Visual file cards with metadata

### 4. AI Chat Interface
- Real-time conversation with AI about study materials
- Document context selection
- Message history with timestamps
- Suggested questions for quick start
- Copy, like, and dislike message actions
- Typing indicators and smooth scrolling
- Mobile-optimized chat bubbles

### 5. Quiz Module
- Topic-based quiz selection
- Custom quiz generation from uploaded materials
- Multiple-choice questions with explanations
- Real-time answer checking
- Progress tracking during quiz
- Detailed results with performance breakdown
- Question review with correct answers
- Retake functionality

### 6. Navigation
- Desktop sidebar navigation
- Mobile bottom tab bar
- Smooth transitions between views
- Active state indicators

## 📁 Project Structure

```
├── App.tsx                      # Main application component with routing
├── components/
│   ├── AuthScreen.tsx          # Authentication UI
│   ├── Dashboard.tsx           # Main dashboard with stats
│   ├── DocumentLibrary.tsx     # Document upload and management
│   ├── ChatInterface.tsx       # AI chat interface
│   ├── QuizModule.tsx          # Quiz system with questions
│   ├── Sidebar.tsx             # Desktop navigation sidebar
│   ├── MobileNav.tsx           # Mobile bottom navigation
│   └── ui/                     # Shadcn UI components
├── styles/
│   └── globals.css             # Global styles and Tailwind config
└── supabase/                   # Backend configuration
    └── functions/
        └── server/
            ├── index.tsx       # Server routes
            └── kv_store.tsx    # Key-value storage utilities
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#2563eb) to Indigo (#4f46e5) gradients
- **Success**: Green (#22c55e)
- **Error**: Red (#ef4444)
- **Warning**: Orange (#f97316)
- **Info**: Purple (#a855f7)
- **Neutrals**: Gray scale from 50 to 900

### Typography
- Uses system font stack for optimal performance
- Responsive font sizes managed via Tailwind
- Clear hierarchy with h1, h2, h3 elements

### Components
- Cards with subtle shadows and hover effects
- Gradient buttons for CTAs
- Badge system for categories and tags
- Progress bars for tracking
- Smooth animations and transitions

## 💻 Technology Stack

### Frontend
- **React** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Shadcn/ui** - Component library
- **Lucide React** - Icons

### Backend (Ready for Integration)
- **Supabase** - Database and authentication
- **Edge Functions** - Serverless backend
- **Storage** - File storage for PDFs

## 🔧 Component Details

### AuthScreen Component
- Dual mode: Sign in / Sign up
- Feature highlights with icons
- Gradient background
- Form validation ready
- Responsive two-column layout

### Dashboard Component
- 4-stat card grid (documents, hours, quizzes, avg score)
- Quick action cards with gradients
- Recent documents list
- Recent quizzes with progress bars
- Learning streak card

### DocumentLibrary Component
- Drag-and-drop upload zone
- File type validation
- Search functionality
- Category filtering
- Document grid with preview cards
- Action buttons (view, download, delete)

### ChatInterface Component
- Message bubbles (user and AI)
- Document context selector
- Suggested questions
- Real-time input with keyboard shortcuts
- Message actions (copy, thumbs up/down)
- Auto-scroll to latest message

### QuizModule Component
Three modes:
1. **Select Mode**: Choose topic or generate custom quiz
2. **Active Mode**: Take quiz with instant feedback
3. **Results Mode**: View score and review answers

Features:
- Progress bar
- Timer display
- Answer explanations
- Question navigation
- Score calculation
- Performance breakdown

## 📱 Responsive Design

### Desktop (≥768px)
- Sidebar navigation on left
- Multi-column layouts
- Larger cards and spacing
- Hover effects enabled

### Mobile (<768px)
- Bottom tab navigation
- Single column layouts
- Touch-optimized buttons
- Compact spacing
- Swipe-friendly interfaces

## 🔐 Authentication Flow

1. User lands on AuthScreen
2. Can toggle between Sign Up and Sign In
3. Form validation (currently prototype mode)
4. On success, navigates to Dashboard
5. Sign out returns to AuthScreen

## 🎓 For Your Hackathon

### Quick Start Development Path

#### Phase 1: Core Functionality (Hours 1-8)
- ✅ UI/UX Design (DONE)
- [ ] Connect real AI API (OpenAI, Claude, or Google AI)
- [ ] Implement PDF text extraction
- [ ] Set up Supabase authentication
- [ ] Create database schema for documents and quizzes

#### Phase 2: AI Integration (Hours 9-16)
- [ ] Implement document chunking and embedding
- [ ] Create AI prompt templates for Q&A
- [ ] Build quiz generation logic
- [ ] Add document summarization
- [ ] Implement chat context management

#### Phase 3: Polish & Testing (Hours 17-24)
- [ ] Error handling and loading states
- [ ] Performance optimization
- [ ] User testing and feedback
- [ ] Demo preparation
- [ ] Deployment

### Recommended APIs to Integrate

1. **OpenAI API** - For chat and quiz generation
   - GPT-4 for complex reasoning
   - Embeddings for document search

2. **PDF Parsing**
   - pdf-parse (npm package)
   - or Supabase Edge Functions with pdf-lib

3. **Supabase Services**
   - Authentication
   - PostgreSQL database
   - Storage for PDF files
   - Edge Functions for AI processing

## 🚀 Deployment Options

### Web App
- Vercel (recommended)
- Netlify
- Cloudflare Pages

### Mobile App (Future)
- React Native conversion
- Expo framework
- Capacitor for hybrid app

## 📊 Data Models (Suggested)

### Users Table
```typescript
{
  id: string
  email: string
  name: string
  created_at: timestamp
}
```

### Documents Table
```typescript
{
  id: string
  user_id: string
  name: string
  file_path: string
  size: number
  pages: number
  category: string
  uploaded_at: timestamp
}
```

### Quizzes Table
```typescript
{
  id: string
  user_id: string
  document_id: string
  topic: string
  questions: json[]
  score: number
  completed_at: timestamp
}
```

### Chat History Table
```typescript
{
  id: string
  user_id: string
  document_id: string
  messages: json[]
  created_at: timestamp
}
```

## 🎯 Key Differentiators for Demo

1. **Personalization** - Uses YOUR materials, not generic content
2. **Interactive Learning** - Chat-based Q&A, not just reading
3. **Adaptive Quizzing** - Questions from actual study content
4. **Progress Tracking** - Visual feedback on learning journey
5. **Cross-Platform** - Same experience on web and mobile

## 🐛 Known Prototype Limitations

- AI responses are currently simulated
- File upload doesn't persist (needs backend)
- Authentication is placeholder (no real backend)
- Quiz questions are hardcoded examples
- No real PDF parsing yet

## 📝 Demo Script Suggestions

1. **Opening** (1 min)
   - Problem: Students overwhelmed with static PDFs
   - Solution: AI-powered interactive study companion

2. **Upload Demo** (2 min)
   - Show drag-and-drop document upload
   - Explain automatic categorization

3. **Chat Demo** (3 min)
   - Ask questions about uploaded material
   - Show AI explanations with context
   - Demonstrate suggested questions

4. **Quiz Demo** (3 min)
   - Generate quiz from uploaded content
   - Take quiz with instant feedback
   - Show results and explanations

5. **Closing** (1 min)
   - Show progress tracking
   - Highlight cross-platform design
   - Future vision

## 🏆 Pitch Points

- **Scalable**: Works for any subject, any level
- **Accessible**: Mobile-first, works anywhere
- **Effective**: Active learning beats passive reading
- **Personalized**: Your materials, your pace
- **Data-Driven**: Track progress, identify weak areas

## 📞 Next Steps

1. Copy all code from Figma Make interface
2. Set up local development environment
3. Install dependencies (React, Tailwind, Shadcn)
4. Connect to Supabase project
5. Integrate AI API of choice
6. Test with real study materials
7. Deploy for demo

## 🎨 Design Assets

All icons from Lucide React:
- Brain - Main logo and AI indicator
- BookOpen - Documents and library
- MessageSquare - Chat interface
- Target - Goals and progress
- Zap - Quick actions and streaks
- Trophy - Quiz results
- And many more...

## 📄 License

This project is created for LA-01 hackathon. Feel free to use and modify for your hackathon submission.

---

**Built for Engineering Students, by Students** 🎓

Good luck with your 24-hour hackathon! 🚀
