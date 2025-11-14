import { useState, useEffect, ChangeEvent, DragEvent } from 'react';
import { Upload, File, FileText, Trash2, Eye, Download, Search, Filter } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  documentService,
  DocumentRecord,
} from "./services/documentService";
import { set } from 'react-hook-form';
import { useTheme } from '../context/themeContext';

export function DocumentLibrary() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [documents, setDocuments] = useState<DocumentRecord[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchDocs();
  }, []);

  async function fetchDocs() {
    try {
      setLoading(true);
      const docs = await documentService.getDocuments();
      setDocuments(docs);
      
      
    } catch (err) {
      console.error("Error fetching documents:", err);
    } finally {
      setLoading(false);
    }
  }


  const handleFileInput = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      await documentService.uploadDocument(file);
      await fetchDocs();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setUploading(false);
    }

  };
  const handleDelete = async (id: string, file_url: string) => {
    if (!window.confirm("Are you sure you want to delete this document?"))
      return;

    try {
      await documentService.deleteDocument(id, file_url);
      await fetchDocs();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const filteredDocuments = documents.filter((doc) => {
  if (!searchQuery.trim()) return true; // show all if search empty

  const query = searchQuery.toLowerCase();
  const title = doc.title?.toLowerCase() ?? "";

  return title.includes(query);
});


  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  // 🔹 When user drops the file
  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    // Validate file type
    const allowed = ["pdf", "doc", "docx", "txt"];
    const ext = file.name.split(".").pop()?.toLowerCase();

    if (!ext || !allowed.includes(ext)) {
      alert("Only PDF, DOC, DOCX, TXT files are allowed.");
      return;
    }

    try {
      setUploading(true);
      await documentService.uploadDocument(file);
      await fetchDocs();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = async (fileUrl: string, fileName: string) => {
    const signedUrl = await documentService.downloadDocument(fileUrl);

    const link = document.createElement("a");
    link.href = signedUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };




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
        className={`p-10 rounded-3xl border-2 border-dashed transition-all backdrop-blur-3xl ${dragActive
          ? 'border-blue-500 bg-blue-100/50 dark:bg-blue-950/30 shadow-[0_12px_60px_rgba(59,130,246,0.25)] dark:shadow-[0_12px_60px_rgba(59,130,246,0.15)] scale-[1.02]'
          : 'border-white/60 dark:border-gray-700/50 bg-white/40 dark:bg-gray-800/20 hover:bg-white/60 dark:hover:bg-gray-800/40 shadow-[0_8px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_50px_rgba(0,0,0,0.3)]'
          }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="text-center space-y-4">
          <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center transition-all ${
                dragActive ? 'bg-linear-to-br from-blue-500 to-indigo-500 shadow-[0_8px_40px_rgba(59,130,246,0.3)] scale-110' : 'bg-blue-100/70 dark:bg-blue-950/40'
              }`}>
            <Upload className={`w-8 h-8 ${dragActive ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white">Upload Study Materials</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Drag and drop your PDFs, notes, or documents here
            </p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-600 text-white font-medium shadow-[0_4px_30px_rgba(59,130,246,0.3)] hover:shadow-[0_6px_40px_rgba(59,130,246,0.4)] transition-all">
              <label htmlFor="file-upload" className="cursor-pointer">
                {uploading ? "Uploading..." : "Choose File"}

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
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Supports: PDF, DOC, DOCX, TXT (Max 25MB)
          </p>
        </div>
      </Card>

      {/* Documents Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">Your Documents ({filteredDocuments.length})</h2>


        </div>
        {loading ? (
          <p className="text-gray-500">Loading…</p>
        ) : filteredDocuments.length === 0 ? (
          <p className="text-gray-500">No documents found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.map((doc) => (
              <Card key={doc.id} className="p-5 rounded-3xl border border-white/60 dark:border-gray-700/50 bg-white/40 dark:bg-gray-800/20 backdrop-blur-3xl 
                           shadow-[0_12px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_16px_60px_rgba(0,0,0,0.12)]
                           dark:hover:shadow-[0_16px_60px_rgba(0,0,0,0.4)]
                           hover:bg-white/60 dark:hover:bg-gray-800/40 transition-all">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-linear-to-br from-blue-100 to-blue-200/70 dark:from-blue-950/40 dark:to-blue-900/40 rounded-xl flex items-center justify-center shadow-inner">
                      <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{doc.title}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">  {doc.pages ?? "?"} pages</p>
                    </div>
                  </div>

                  {/* <div className="flex items-center gap-2">
                  <Badge variant="secondary" className={doc.color}>
                    {doc.category}
                  </Badge>
                  <span className="text-xs text-gray-500">{doc.uploadedAt}</span>
                </div> */}

                  <div className="flex items-center gap-2 pt-2 border-t border-white/60 dark:border-gray-700/50">

                    {/* VIEW */}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="flex-1 gap-2 hover:bg-white/50 dark:hover:bg-gray-700/50 backdrop-blur-md text-gray-700 dark:text-gray-300"
                      onClick={() => window.open(doc.file_url, "_blank")}
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </Button>

                    {/* DOWNLOAD */}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="hover:bg-white/50 dark:hover:bg-gray-700/50 backdrop-blur-md text-gray-700 dark:text-gray-300"
                      onClick={() => handleDownload(doc.file_url, doc.title)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>


                    {/* DELETE */}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-100/50 dark:hover:bg-red-900/20 backdrop-blur-md"
                      onClick={() => handleDelete(doc.id, doc.file_url)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>

                  </div>
                </div>
              </Card>
            ))}
          </div>)}
      </div>
    </div>
    </div>
  );
}
