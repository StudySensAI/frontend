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
        className={`p-8 border-2 border-dashed transition-all ${ 
          dragActive 
            ? 'border-blue-500 bg-blue-50 scale-[1.02]' 
            : 'border-gray-300 hover:border-blue-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="text-center space-y-4">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto transition-all ${
            dragActive ? 'bg-blue-600 scale-110' : 'bg-blue-100'
          }`}>
            <Upload className={`w-8 h-8 ${dragActive ? 'text-white' : 'text-blue-600'}`} />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg">Upload Study Materials</h3>
            <p className="text-sm text-gray-600">
              Drag and drop your PDFs, notes, or documents here
            </p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
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