import { useState } from 'react';
import { Upload, FileText, Trash2, Eye, Download, Search, Filter } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { useTheme } from '../context/themeContext';

export function DocumentLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const documents = [
    { id: 1, name: 'Data Structures - Chapter 5.pdf', size: '2.4 MB', pages: 24, uploadedAt: '2024-03-15', category: 'Computer Science', color: 'bg-blue-200/50 text-blue-700' },
    { id: 2, name: 'Algorithm Analysis Notes.pdf', size: '1.8 MB', pages: 18, uploadedAt: '2024-03-14', category: 'Computer Science', color: 'bg-blue-200/50 text-blue-700' },
    { id: 3, name: 'Computer Networks Summary.pdf', size: '3.2 MB', pages: 32, uploadedAt: '2024-03-12', category: 'Networking', color: 'bg-purple-200/50 text-purple-700' },
    { id: 4, name: 'Database Management Systems.pdf', size: '4.1 MB', pages: 45, uploadedAt: '2024-03-10', category: 'Databases', color: 'bg-green-200/50 text-green-700' },
    { id: 5, name: 'Operating Systems Concepts.pdf', size: '3.7 MB', pages: 38, uploadedAt: '2024-03-08', category: 'Computer Science', color: 'bg-blue-200/50 text-blue-700' },
    { id: 6, name: 'Software Engineering Notes.pdf', size: '2.9 MB', pages: 28, uploadedAt: '2024-03-05', category: 'Software Engineering', color: 'bg-orange-200/50 text-orange-700' },
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {};

  return (
    <div className="min-h-screen p-6 md:p-10 bg-linear-to-br from-blue-200 via-white to-purple-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 bg-fixed">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="p-6 rounded-3xl bg-white/40 dark:bg-gray-800/30 backdrop-blur-3xl border border-white/60 dark:border-gray-700/30 shadow-[0_8px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">Study Materials</h1>
          <p className="text-gray-600 dark:text-gray-400">Upload and manage your study documents</p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <Input
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/40 dark:bg-gray-800/40 border-white/60 dark:border-gray-700/50 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.2)] hover:bg-white/60 dark:hover:bg-gray-800/60 focus:bg-white/70 dark:focus:bg-gray-800/70 transition-all"
            />
          </div>
          <Button
            variant="outline"
            className="gap-2 bg-white/40 dark:bg-gray-800/40 border-white/60 dark:border-gray-700/50 backdrop-blur-2xl hover:bg-white/60 dark:hover:bg-gray-800/60 shadow-[0_4px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.2)]"
          >
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>

        {/* Upload Area */}
        <Card
          className={`p-10 rounded-3xl border-2 border-dashed transition-all backdrop-blur-3xl 
          ${
            dragActive
              ? 'border-blue-500 bg-blue-100/50 dark:bg-blue-950/30 shadow-[0_12px_60px_rgba(59,130,246,0.25)] dark:shadow-[0_12px_60px_rgba(59,130,246,0.15)] scale-[1.02]'
              : 'border-white/60 dark:border-gray-700/50 bg-white/40 dark:bg-gray-800/20 hover:bg-white/60 dark:hover:bg-gray-800/40 shadow-[0_8px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_50px_rgba(0,0,0,0.3)]'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="text-center space-y-4">
            <div
              className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center transition-all ${
                dragActive ? 'bg-linear-to-br from-blue-500 to-indigo-500 shadow-[0_8px_40px_rgba(59,130,246,0.3)] scale-110' : 'bg-blue-100/70 dark:bg-blue-950/40'
              }`}
            >
              <Upload className={`w-8 h-8 ${dragActive ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
            </div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white">Upload Study Materials</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Drag and drop your PDFs, notes, or documents here</p>
            <div className="flex items-center justify-center gap-3">
              <Button className="bg-linear-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-medium shadow-[0_4px_30px_rgba(59,130,246,0.3)] hover:shadow-[0_6px_40px_rgba(59,130,246,0.4)] transition-all">
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
            <p className="text-xs text-gray-500 dark:text-gray-500">Supports: PDF, DOC, DOCX, TXT (Max 25MB)</p>
          </div>
        </Card>

        {/* Documents */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">
              Your Documents ({documents.length})
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc) => (
              <Card
                key={doc.id}
                className="p-5 rounded-3xl border border-white/60 dark:border-gray-700/50 bg-white/40 dark:bg-gray-800/20 backdrop-blur-3xl 
                           shadow-[0_12px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_16px_60px_rgba(0,0,0,0.12)]
                           dark:hover:shadow-[0_16px_60px_rgba(0,0,0,0.4)]
                           hover:bg-white/60 dark:hover:bg-gray-800/40 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-linear-to-br from-blue-100 to-blue-200/70 dark:from-blue-950/40 dark:to-blue-900/40 rounded-xl flex items-center justify-center shadow-inner">
                      <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{doc.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {doc.size} · {doc.pages} pages
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className={`${doc.color} rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm`}
                    >
                      {doc.category}
                    </Badge>
                    <span className="text-xs text-gray-500 dark:text-gray-500">{doc.uploadedAt}</span>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-white/60 dark:border-gray-700/50">
                    <Button size="sm" variant="ghost" className="flex-1 gap-2 hover:bg-white/50 dark:hover:bg-gray-700/50 backdrop-blur-md text-gray-700 dark:text-gray-300">
                      <Eye className="w-4 h-4" />
                      View
                    </Button>
                    <Button size="sm" variant="ghost" className="hover:bg-white/50 dark:hover:bg-gray-700/50 backdrop-blur-md text-gray-700 dark:text-gray-300">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-100/50 dark:hover:bg-red-900/20 backdrop-blur-md"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
