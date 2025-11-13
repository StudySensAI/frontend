import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, BookOpen, Sparkles, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { useTheme } from '../context/themeContext';

export function ChatInterface() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content:
        "Hi! I'm your AI study companion. I can help you understand your study materials, answer questions, and explain concepts. What would you like to learn about today?",
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
        content:
          "That's a great question! Based on your study materials, let me explain...\n\nBinary search trees (BST) are a fundamental data structure where each node has at most two children. The key property is that for any node, all values in its left subtree are smaller, and all values in its right subtree are larger.\n\nThis ordering property makes BSTs efficient for searching, with O(log n) average time complexity for balanced trees.",
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
    <div
      className="h-full flex flex-col min-h-screen 
                 bg-linear-to-br from-blue-200 via-white to-purple-200 
                 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950
                 backdrop-blur-2xl"
    >
      {/* Header */}
      <div
        className="p-4 md:p-6 border-b border-white/50 dark:border-gray-700/50
                   bg-white/40 dark:bg-gray-800/30 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.3)]"
      >
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">AI Study Chat</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Ask questions about your study materials
              </p>
            </div>
            <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Bot className="w-7 h-7 text-white" />
            </div>
          </div>

          {/* Document Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <BookOpen className="w-4 h-4 text-gray-400 dark:text-gray-500 shrink-0" />
            <div className="flex gap-2">
              {documents.map((doc) => (
                <Badge
                  key={doc}
                  variant={selectedDocument === doc ? 'default' : 'outline'}
                  className={`cursor-pointer whitespace-nowrap backdrop-blur-md transition-all 
                    ${
                      selectedDocument === doc
                        ? 'bg-linear-to-r from-blue-500 to-indigo-500 text-white shadow-md'
                        : 'bg-white/40 dark:bg-gray-800/40 border-white/60 dark:border-gray-700/50 hover:bg-white/60 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300'
                    }`}
                  onClick={() =>
                    setSelectedDocument(selectedDocument === doc ? null : doc)
                  }
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
              className={`flex gap-3 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shrink-0 shadow-md">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              )}

              <div
                className={`flex-1 max-w-2xl ${
                  message.role === 'user' ? 'flex justify-end' : ''
                }`}
              >
                <Card
                  className={`p-4 rounded-2xl backdrop-blur-xl transition-all shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] ${
                    message.role === 'user'
                      ? 'bg-linear-to-br from-blue-500/90 to-indigo-500/90 text-white shadow-[0_6px_25px_rgba(59,130,246,0.3)]'
                      : 'bg-white/50 dark:bg-gray-800/50 border border-white/60 dark:border-gray-700/50 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  <div className="space-y-2">
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">
                      {message.content}
                    </p>
                    {message.role === 'assistant' && (
                      <div className="flex items-center gap-2 pt-2 border-t border-white/60 dark:border-gray-700/50">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/40 dark:hover:bg-gray-700/50"
                        >
                          <Copy className="w-3 h-3" />
                          <span className="text-xs">Copy</span>
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-white/40 dark:hover:bg-gray-700/50"
                        >
                          <ThumbsUp className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-white/40 dark:hover:bg-gray-700/50"
                        >
                          <ThumbsDown className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              </div>

              {message.role === 'user' && (
                <div className="w-8 h-8 bg-white/60 backdrop-blur-md rounded-full flex items-center justify-center shrink-0 shadow-sm">
                  <User className="w-5 h-5 text-gray-700" />
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div
        className="p-4 md:p-6 border-t border-white/50 dark:border-gray-700/50 bg-white/40 dark:bg-gray-800/30 backdrop-blur-xl 
                   shadow-[0_-4px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_-4px_30px_rgba(0,0,0,0.3)]"
      >
        <div className="max-w-4xl mx-auto space-y-3">
          {/* Suggested Questions */}
          {messages.length === 1 && (
            <div className="space-y-2">
              <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-indigo-500" />
                Suggested questions:
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question) => (
                  <Badge
                    key={question}
                    variant="outline"
                    className="cursor-pointer bg-white/50 dark:bg-gray-800/50 border-white/60 dark:border-gray-700/50 hover:bg-white/70 dark:hover:bg-gray-700/50 backdrop-blur-md text-gray-700 dark:text-gray-300"
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
              className="min-h-[60px] max-h-32 resize-none bg-white/60 dark:bg-gray-800/60 border-white/60 dark:border-gray-700/50 backdrop-blur-md text-gray-800 dark:text-gray-200 placeholder:text-gray-500 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-blue-400/40"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim()}
              className="bg-linear-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all shrink-0"
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
