import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NotionSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const connected = params.get("connected");

    if (connected === "1") {
      // Save connection flag for ChatInterface to detect later
      localStorage.setItem("notionConnected", "true");
    }

    // Go back to the chat page after 200ms
    setTimeout(() => {
      navigate("/");
    }, 200);

  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h2>Connecting to Notion…</h2>
    </div>
  );
}
