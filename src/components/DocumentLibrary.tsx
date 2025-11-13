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
        className={`p-8 border-2 border-dashed transition-all ${dragActive
          ? 'border-blue-500 bg-blue-50 scale-[1.02]'
          : 'border-gray-300 hover:border-blue-400'
          }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="text-center space-y-4">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto transition-all ${dragActive ? 'bg-blue-600 scale-110' : 'bg-blue-100'
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
          <p className="text-xs text-gray-500">
            Supports: PDF, DOC, DOCX, TXT (Max 25MB)
          </p>
        </div>
      </Card>

      {/* Documents Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg">Your Documents ({filteredDocuments.length})</h2>


        </div>
        {loading ? (
          <p className="text-gray-500">Loading…</p>
        ) : filteredDocuments.length === 0 ? (
          <p className="text-gray-500">No documents found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocuments.map((doc) => (
              <Card key={doc.id} className="p-4 hover:shadow-lg transition-shadow">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center shrink-0">
                      <FileText className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{doc.title}</p>
                      <p className="text-xs text-gray-600">  {doc.pages ?? "?"} pages</p>
                    </div>
                  </div>

                  {/* <div className="flex items-center gap-2">
                  <Badge variant="secondary" className={doc.color}>
                    {doc.category}
                  </Badge>
                  <span className="text-xs text-gray-500">{doc.uploadedAt}</span>
                </div> */}

                  <div className="flex items-center gap-2 pt-2 border-t border-gray-100">

                    {/* VIEW */}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="flex-1 gap-2 text-blue-600"
                      onClick={() => window.open(doc.file_url, "_blank")}
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </Button>

                    {/* DOWNLOAD */}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="gap-2"
                      onClick={() => handleDownload(doc.file_url, doc.title)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>


                    {/* DELETE */}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
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
  );
}