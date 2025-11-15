import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, BookOpen, Sparkles, Copy, ThumbsUp, ThumbsDown, Plus } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { useUser } from '../context/userContext';
import NotionSuccess from '../notion/success';
import { supabase } from '../supabaseClient';
import { useTheme } from '../context/themeContext';
interface ChatInterfaceProps {
  showDocPanel: boolean;
  setShowDocPanel: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ChatInterface() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { user } = useUser();
  const id = localStorage.getItem("userId")
  interface NotionPage {
    page_id: string;
    page_name: string;
  }
  interface DocumentType {
    id: string;          // uuid
    title: string;
    file_url: string;
    pages: number | null;
    uploaded_at: string;
    user_id: string;
  }
  const [notionPages, setNotionPages] = useState<NotionPage[]>([]);
const [selectedNotionPage, setSelectedNotionPage] = useState<string | null>(null);
const [notionConnected, setNotionConnected] = useState(false);
useEffect(() => {
  async function loadDocs() {
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData?.user?.id;

    const res = await fetch(
      `${API_URL}/api/v1/dashboard/documents?user_id=${userId}`
    );
    const data = await res.json();

    setAllDocs(data.documents || []);
  }

  loadDocs();
}, []);
const handleClickPage = async (pageId: string): Promise<void> => {
  if (!id) {
    console.error("No user ID found.");
    return;
  }
  setSelectedNotionPage(pageId)
  setSelectedDoc(null)
  try {
    const res = await fetch(`${API_URL}/notion/store`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: id,
        pageId,
      }),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      console.error("Failed to store page:", error);
    }
  } catch (err) {
    console.error("Network error while storing page:", err);
  }
};
const [allDocs, setAllDocs] = useState<DocumentType[]>([]);
const [selectedDoc, setSelectedDoc] = useState<string | null>(null);

const [showDocPanel, setShowDocPanel] = useState(false);
async function loadNotionPages() {
  if (!id) return;

  try {
    const res = await fetch(`${API_URL}/notion/pages?userId=${id}`);
    const data = await res.json();

    if (Array.isArray(data.pages)) {
      setNotionPages(data.pages as NotionPage[]);
    }
    console.log("datapages", data.pages)
    console.log('setnotionpages', notionPages)
  } catch (err) {
    console.error("Failed to load Notion pages:", err);
  }
}




useEffect(() => {
  async function init() {
    const isConnected = localStorage.getItem("notionConnected") === "true";
    console.log("isConnected:", isConnected);

    if (isConnected && id) {
      setNotionConnected(true);
      await loadNotionPages();   // ✅ NOW it properly awaits
    }
  }

  init();
}, [id]);

  // runs again once userId is available
  console.log('notion sucess',NotionSuccess)
  console.log('notion connected',notionConnected)
  console.log("notion pages",notionPages)
  
  

  const handleConnectToNotion = async () => {
    if (!id) return alert("User not logged in");
  
    const resp = await fetch(`${API_URL}/oauth/start`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: id }),
    });
  
    const { auth_url } = await resp.json();
    window.open(auth_url, "_blank", "noopener,noreferrer");
  };
  


  const [messages, setMessages] = useState<
  { id: number; role: "user" | "assistant"; content: string; timestamp: Date }[]
>([
  {
    id: 1,
    role: "assistant",
    content:
      "Hi! I'm your AI study companion. Ask me anything about your Notion pages.",
    timestamp: new Date(),
  },
]);

const [input, setInput] = useState("");
const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
const messagesEndRef = useRef<HTMLDivElement>(null);

const scrollToBottom = () => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
};

useEffect(() => {
  scrollToBottom();
}, [messages]);
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
  async function handleClickPdf(docId:string) {
    setSelectedDoc(docId)
    setSelectedNotionPage(null)
    
  
    await fetch(`${API_URL}/api/v1/rag/store-chunks`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ docId, userId:id })
    });
  
    alert("PDF processed & ready for chat!");
  }
  


  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  


  // ---------------- SEND MESSAGE ----------------
  const handleSend = async () => {
    if (!input.trim()) return;
  
    if (!selectedNotionPage && !selectedDoc) {
      return alert("Please select a Notion page or a PDF first.");
    }
  
    const userMessage = {
      id: messages.length + 1,
      role: "user" as const,
      content: input,
      timestamp: new Date(),
    };
  
    setMessages((prev) => [...prev, userMessage]);
  
    const question = input;
    setInput("");
  
    try {
      let answer = "";
  
      // -------------------------------------------------------
      // 🔵 1) If PDF is selected → use PDF chat route
      // -------------------------------------------------------
      if (selectedDoc) {
        console.log("Using PDF route for document:", selectedDoc);
  
        const res = await fetch(`${API_URL}/chat/pdf-query`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            docId: selectedDoc,    // only one PDF
            question,
          }),
        });
  
        const data = await res.json();
        answer = data.answer || "No response.";
      }
  
      // -------------------------------------------------------
      // 🟣 2) Else if Notion page is selected → use Notion chat
      // -------------------------------------------------------
      else if (selectedNotionPage) {
        console.log("Using Notion route for page:", selectedNotionPage);
  
        const res = await fetch(`${API_URL}/chat/query`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: id,
            pageId: selectedNotionPage,
            question,
          }),
        });
  
        const data = await res.json();
        answer = data.answer || "No response.";
      }
  
      // -------------------------------------------------------
      // 🟢 3) Push answer to chat
      // -------------------------------------------------------
      const aiMessage = {
        id: messages.length + 2,
        role: "assistant" as const,
        content: answer,
        timestamp: new Date(),
      };
  
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("Chat request failed:", err);
    }
  };
  

  /* --------------------------------------------
   * Handle Enter Key
   * --------------------------------------------
   */
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ---- Format timestamp ----
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const diff = Date.now() - date.getTime();
    const hours = diff / (1000 * 60 * 60);

    if (hours < 1) return "just now";
    if (hours < 24) return `${Math.floor(hours)} hours ago`;
    return `${Math.floor(hours / 24)} days ago`;
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

          {/* ----------------- DOCUMENT SELECTOR ------------------- */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <BookOpen className="w-4 h-4 text-gray-400 dark:text-gray-500 shrink-0" />
            <div className="flex gap-2">
              {allDocs.slice(0, 3).map((doc) => (
                <Badge
                  key={doc.id}
                  variant={selectedDoc?.includes(doc.id) ? 'default' : 'outline'}
                  className={`cursor-pointer whitespace-nowrap backdrop-blur-md transition-all${selectedDoc?.includes(doc.id)
                      ? 'bg-linear-to-r from-blue-500 to-indigo-500 text-white shadow-md'
                      : 'bg-white/40 dark:bg-gray-800/40 border-white/60 dark:border-gray-700/50 hover:bg-white/60 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300'
                    }`}
                  onClick={() => handleClickPdf(doc.id)}
                >
                  <span className="block max-w-[250px] truncate">
                    {doc.title}
                  </span>
                </Badge>
              ))}
            </div>

            {/* PLUS BUTTON */}
            <button
              onClick={() => setShowDocPanel(true)}
              className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 shrink-0"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Selected Docs Row */}
          {selectedDoc && (
  <div className="flex gap-2 flex-wrap">
    <Badge className="bg-blue-100 text-blue-700">
      {allDocs.find((d) => d.id === selectedDoc)?.title}
    </Badge>
  </div>
)}

          {/* --- Notion Pages Selector --- */}
      {notionConnected && notionPages.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <span className="text-sm text-gray-500 mr-2">Notion Pages:</span>
      
          <div className="flex gap-2">
            {notionPages.map((page) => (
              <Badge
                key={page.page_id}
                variant={selectedNotionPage === page.page_id ? "default" : "outline"}
                onClick={() => handleClickPage(page.page_id)}

                className={`cursor-pointer whitespace-nowrap transition-all ${
                  selectedNotionPage === page.page_id
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                {page.page_name}
              </Badge>
            ))}
          </div>
        </div>
      )}

        </div>
      </div>

      {/* ------------------------------------------------ MESSAGES ------------------------------------------------ */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shrink-0 shadow-md">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              )}

              <div
                className={`flex-1 max-w-2xl ${message.role === 'user' ? 'flex justify-end' : ''
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
                <Button size="sm" onClick={handleConnectToNotion} variant="ghost" className="h-8">
                    <Plus className="w-3 h-3" />
                  <span className="text-xs">Connect to Notion </span>
                </Button>
              </div>
            </div>
          )}

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

      {/* ------------------------------------------------ SIDE PANEL ------------------------------------------------ */}
      {showDocPanel && (
  <div className="fixed inset-0 bg-black/40 flex justify-end z-50 dark:bg-black/60">
    <div className="bg-white dark:bg-gray-900 w-96 p-4 h-full shadow-xl overflow-y-auto border-l border-gray-200/40 dark:border-white/10 transition-colors duration-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Select Study Materials
        </h2>
        <button
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          onClick={() => setShowDocPanel(false)}
        >
          ✖
        </button>
      </div>

      {/* Docs List */}
    
            <div className="space-y-3">
              {allDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center gap-3 p-2 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleClickPdf(doc.id)}
                >
                  <input
                    type="checkbox"
                    checked={selectedDoc?.includes(doc.id)}
                    readOnly
                    className="mt-1"
                  />

                  <div className="flex-1 min-w-0">
                    <p
                      className="font-medium text-sm truncate overflow-hidden text-ellipsis w-full block"
                    >
                      {doc.title}
                    </p>
                    <p className="text-xs text-gray-500">{doc.pages ?? 0} pages · {formatTimeAgo(doc.uploaded_at)}</p>
                    {/* <p className="text-[10px] text-gray-400">
                      {formatTimeAgo(doc.uploaded_at)}
                    </p> */}
                  </div>
                </div>
              ))}
            </div>

      {/* Done Button */}
      <button
        className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 
                   dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-200"
        onClick={() => setShowDocPanel(false)}
      >
        Done
      </button>
    </div>
  </div>
)}

    </div>
  );
}
