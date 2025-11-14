import { supabase } from "../../supabaseClient";

// -----------------------------
// Types
// -----------------------------
export interface DocumentRecord {
  id: string;
  title: string;
  file_url: string;
  pages: number | null;
  uploaded_at: string;
  user_id: string;
}

const API_BASE = "http://localhost:3001/api/v1/uploads";

export const documentService = {
    
  // ------------------------------------
  // 🧠 Fetch All Documents for User
  // ------------------------------------
  async getDocuments(): Promise<DocumentRecord[]> {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData?.user) {
      throw new Error("User not authenticated");
    }

    const userId = userData.user.id;

    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .eq("user_id", userId)
      .order("uploaded_at", { ascending: false });

    if (error) throw new Error(error.message);
    
    
    

    return data as DocumentRecord[];
  },

  // ------------------------------------
  // 📤 Upload Document
  // ------------------------------------
  async uploadDocument(file: File): Promise<string> {
    const { data: userData } = await supabase.auth.getUser();

    const userId = userData?.user?.id;
    if (!userId) throw new Error("User not logged in");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_id", userId);
    formData.append("title", file.name);

    const res = await fetch(`${API_BASE}/upload-pdf`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "File upload failed");
    }

    // Return the file URL from backend
    return data.url;
  },

  // ------------------------------------
  // 🗑️ Delete Document
  // ------------------------------------
  async deleteDocument(id: string, file_url: string): Promise<void> {
    const { data: userData } = await supabase.auth.getUser();

    const userId = userData?.user?.id;
    if (!userId) throw new Error("User not logged in");

    const res = await fetch(`${API_BASE}/delete-document`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, file_url, user_id: userId }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to delete document");
    }
  },
  async downloadDocument(fileUrl: string): Promise<string> {
    const res = await fetch(`${API_BASE}/download-url`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileUrl }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to generate signed download URL");
    }

    return data.url;
  }
};
