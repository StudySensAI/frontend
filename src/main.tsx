
  import { createRoot } from "react-dom/client";
  import App from "./App";
  import "./index.css";
  import { BrowserRouter } from "react-router-dom";
  import { AuthContextProvider } from "./context/authContext";

  createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
  <AuthContextProvider><App /></AuthContextProvider>
  </BrowserRouter>
  
);
  