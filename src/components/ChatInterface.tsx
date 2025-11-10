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
      <div className="p-4 md:p-6 border-b border-gray-200 bg-white shadow-sm">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl">AI Study Chat</h1>
              <p className="text-sm text-gray-600">Ask questions about your study materials</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
              <Bot className="w-7 h-7 text-white" />
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
                  className={`cursor-pointer whitespace-nowrap transition-all ${
                    selectedDocument === doc 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700' 
                      : 'hover:bg-gray-100'
                  }`}
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