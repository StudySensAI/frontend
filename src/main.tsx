
  import { createRoot } from "react-dom/client";
  import App from "./App";
  import "./index.css";
  import { BrowserRouter } from "react-router-dom";
  import { AuthContextProvider } from "./context/authContext";
  import { UserProvider } from "./context/userContext";
  createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
    
    <UserProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </UserProvider>
  </BrowserRouter>
  
);
  