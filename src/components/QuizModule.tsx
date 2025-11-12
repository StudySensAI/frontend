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
    { id: 1, name: 'Data Structures', questions: 10, difficulty: 'Medium', color: 'bg-blue-200/50 text-blue-700' },
    { id: 2, name: 'Algorithms', questions: 15, difficulty: 'Hard', color: 'bg-purple-200/50 text-purple-700' },
    { id: 3, name: 'Computer Networks', questions: 12, difficulty: 'Easy', color: 'bg-green-200/50 text-green-700' },
    { id: 4, name: 'Operating Systems', questions: 10, difficulty: 'Medium', color: 'bg-orange-200/50 text-orange-700' },
  ];

  const quizQuestions = [
    {
      id: 1,
      question: 'What is the average time complexity of searching in a balanced Binary Search Tree?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
      correctAnswer: 1,
      explanation:
        'In a balanced BST, the height is log n, and searching involves traversing from root to a leaf, which takes O(log n) time.',
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
      explanation:
        'Quick Sort has O(n²) worst-case complexity when the pivot selection consistently results in unbalanced partitions.',
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
      if (selectedAnswers[index] === q.correctAnswer) correct++;
    });
    return {
      correct,
      total: quizQuestions.length,
      percentage: Math.round((correct / quizQuestions.length) * 100),
    };
  };

  // --- SELECT MODE ---
  if (quizMode === 'select') {
    return (
      <div className="min-h-screen p-6 md:p-10 bg-gradient-to-br from-blue-200 via-white to-purple-200 bg-fixed">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="p-6 rounded-3xl bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
            <h1 className="text-3xl font-semibold text-gray-800">Practice Quizzes</h1>
            <p className="text-gray-600">Test your knowledge with AI-generated quizzes</p>
          </div>

          {/* Custom Quiz Card */}
          <Card className="p-6 bg-gradient-to-br from-blue-600/80  to-indigo-200/80  text-white shadow-[0_8px_40px_rgba(59,130,246,0.3)] backdrop-blur-xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <h2 className="text-xl mb-1">Generate Custom Quiz</h2>
                  <p className="text-blue-100 text-sm">
                    Create a personalized quiz from your uploaded study materials.
                  </p>
                </div>
                <Button className="bg-purple-50 text-blue-600 hover:bg-purple-100 font-medium shadow-lg hover:shadow-xl">
                  Create Quiz
                </Button>
              </div>
            </div>
          </Card>

          {/* Topics */}
          <div>
            <h2 className="text-lg mb-4 text-gray-800">Practice by Topic</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {availableTopics.map((topic) => (
                <Card
                  key={topic.id}
                  className="p-6 rounded-3xl bg-white/40 border border-white/60 backdrop-blur-2xl hover:bg-white/60 hover:shadow-[0_8px_40px_rgba(0,0,0,0.1)] transition-all cursor-pointer"
                  onClick={startQuiz}
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg mb-2 text-gray-800">{topic.name}</h3>
                        <p className="text-sm text-gray-600">{topic.questions} questions</p>
                      </div>
                      <Badge className={`${topic.color} backdrop-blur-sm px-3 py-1 rounded-full`}>
                        {topic.difficulty}
                      </Badge>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-blue-400/80 to-indigo-400/80 hover:from-blue-400 hover:to-indigo-600 text-white shadow-lg hover:shadow-xl">
                      Start Quiz
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Attempts */}
          <Card className="p-6 rounded-3xl bg-white/40 border border-white/60 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
            <h2 className="text-lg mb-4 text-gray-800">Recent Attempts</h2>
            <div className="space-y-3">
              {[
                { topic: 'Binary Trees', score: 85, date: 'Today', total: 100 },
                { topic: 'Sorting Algorithms', score: 92, date: 'Yesterday', total: 100 },
                { topic: 'Graph Theory', score: 78, date: '2 days ago', total: 100 },
              ].map((attempt, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-white/60 transition-all"
                >
                  <div>
                    <p className="text-sm text-gray-800">{attempt.topic}</p>
                    <p className="text-xs text-gray-600">{attempt.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-800">{attempt.score}%</p>
                    <p className="text-xs text-gray-600">
                      {attempt.score}/{attempt.total}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // --- ACTIVE QUIZ MODE ---
  if (quizMode === 'active') {
    const question = quizQuestions[currentQuestion];
    const hasAnswered = selectedAnswers[currentQuestion] !== undefined;
    const isCorrect =
      hasAnswered && selectedAnswers[currentQuestion] === question.correctAnswer;

    return (
      <div className="min-h-screen p-6 md:p-10 bg-gradient-to-br from-blue-50 via-white to-purple-50 bg-fixed">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Progress */}
          <div className="p-4 rounded-2xl bg-white/40 border border-white/60 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </span>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">12:34</span>
              </div>
            </div>
            <Progress
              value={((currentQuestion + 1) / quizQuestions.length) * 100}
              className="h-2 bg-white/60"
            />
          </div>

          {/* Question */}
          <Card className="p-8 rounded-3xl bg-white/40 border border-white/60 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] space-y-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-200/60 rounded-full flex items-center justify-center text-blue-700 font-medium">
                {currentQuestion + 1}
              </div>
              <h2 className="text-xl font-medium text-gray-800 flex-1">{question.question}</h2>
            </div>

            {/* Options */}
            <RadioGroup
              value={selectedAnswers[currentQuestion]?.toString()}
              onValueChange={(v) => handleAnswerSelect(parseInt(v))}
            >
              <div className="space-y-3">
                {question.options.map((option, index) => {
                  const isSelected = selectedAnswers[currentQuestion] === index;
                  const isCorrectAnswer = index === question.correctAnswer;

                  let optionClass =
                    'border-2 p-4 rounded-xl transition-all cursor-pointer backdrop-blur-sm';
                  if (showExplanation) {
                    if (isCorrectAnswer) optionClass += ' border-green-500 bg-green-50/80';
                    else if (isSelected && !isCorrectAnswer)
                      optionClass += ' border-red-500 bg-red-50/80';
                  } else if (isSelected) optionClass += ' border-blue-500 bg-blue-50/80';
                  else optionClass += ' border-white/60 bg-white/30 hover:bg-white/60';

                  return (
                    <div key={index} className={optionClass}>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem
                          value={index.toString()}
                          id={`option-${index}`}
                          disabled={showExplanation}
                        />
                        <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-gray-800">
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
              <Card
                className={`p-4 rounded-2xl border backdrop-blur-md ${
                  isCorrect
                    ? 'bg-green-100/50 border-green-300'
                    : 'bg-blue-100/50 border-blue-300'
                }`}
              >
                <div className="flex gap-3">
                  <Brain
                    className={`w-5 h-5 shrink-0 ${
                      isCorrect ? 'text-green-600' : 'text-blue-600'
                    }`}
                  />
                  <div className="space-y-1">
                    <p
                      className={`text-sm font-medium ${
                        isCorrect ? 'text-green-900' : 'text-blue-900'
                      }`}
                    >
                      {isCorrect ? 'Correct!' : 'Incorrect.'}
                    </p>
                    <p className="text-sm text-gray-700">{question.explanation}</p>
                  </div>
                </div>
              </Card>
            )}
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="bg-white/40 border-white/60 backdrop-blur-xl hover:bg-white/60"
            >
              Previous
            </Button>
            <div className="flex gap-2">
              {!showExplanation && hasAnswered && (
                <Button
                  onClick={checkAnswer}
                  variant="outline"
                  className="gap-2 bg-white/40 border-white/60 backdrop-blur-xl hover:bg-white/60"
                >
                  Check
                </Button>
              )}
              <Button
                onClick={handleNext}
                disabled={!hasAnswered}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg hover:shadow-xl gap-2"
              >
                {currentQuestion === quizQuestions.length - 1 ? 'Finish' : 'Next'}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- RESULTS MODE ---
  const score = calculateScore();

  return (
    <div className="min-h-screen p-6 md:p-10 bg-gradient-to-br from-blue-50 via-white to-purple-50 bg-fixed">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card className="p-8 text-center bg-gradient-to-br from-blue-500/90 to-indigo-500/90 text-white shadow-[0_8px_40px_rgba(59,130,246,0.3)] backdrop-blur-2xl rounded-3xl">
          <div className="space-y-4">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto">
              <Trophy className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-3xl mb-2">Quiz Complete!</h1>
              <p className="text-blue-100">Excellent work on completing the quiz</p>
            </div>
            <div className="text-6xl my-4 font-bold">{score.percentage}%</div>
            <p className="text-xl">
              You got {score.correct} out of {score.total} questions correct
            </p>
          </div>
        </Card>

        <Card className="p-6 rounded-3xl bg-white/40 border border-white/60 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
          <h2 className="text-lg mb-4 text-gray-800">Question Review</h2>
          <div className="space-y-3">
            {quizQuestions.map((q, index) => {
              const isCorrect = selectedAnswers[index] === q.correctAnswer;
              return (
                <div
                  key={q.id}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white/50 hover:bg-white/60 transition-all"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      isCorrect ? 'bg-green-100' : 'bg-red-100'
                    }`}
                  >
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800 mb-1">{q.question}</p>
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

        <div className="flex gap-3">
          <Button
            onClick={() => setQuizMode('select')}
            variant="outline"
            className="flex-1 gap-2 bg-white/40 border-white/60 backdrop-blur-xl hover:bg-white/60"
          >
           <RotateCcw className="w-4 h-4" />
            Try Another Quiz
          </Button>

          <Button
            onClick={startQuiz}
            className="flex-1 gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg hover:shadow-xl"
          >
            <RotateCcw className="w-4 h-4" />
            Retake Quiz
          </Button>
        </div>
      </div>
    </div>
  );
}
