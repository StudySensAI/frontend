"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useRef } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  session: any;
  loading: boolean;
  signUpNewUser: (email: string, password: string, full_name: string) => Promise<any>;
  signInUser: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  setSession: (session: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const expiryTimeoutRef = useRef<number | null>(null);
  const navigate = useNavigate();

  // ⏰ session expiry time (1 hour = 3600000 ms)
  const SESSION_EXPIRY_MS = 60 * 60 * 1000;

  // 🧭 Schedule auto logout
  const scheduleAutoLogout = (expiryTimestampMs: number) => {
    if (expiryTimeoutRef.current) {
      clearTimeout(expiryTimeoutRef.current);
      expiryTimeoutRef.current = null;
    }

    const msUntilExpiry = expiryTimestampMs - Date.now();

    if (msUntilExpiry > 0) {
      expiryTimeoutRef.current = window.setTimeout(async () => {
        await supabase.auth.signOut();
        setSession(null);
        localStorage.removeItem("app_session_expires_at");
        alert("Session expired. Please log in again.");
        navigate("/"); // optional redirect
      }, msUntilExpiry);
    } else {
      // already expired
      supabase.auth.signOut();
      setSession(null);
      localStorage.removeItem("app_session_expires_at");
    }
  };

  // 🧠 Set a new expiry timestamp on sign-in
  const setClientExpiry = (durationMs: number) => {
    const expiryTimestamp = Date.now() + durationMs;
    localStorage.setItem("app_session_expires_at", expiryTimestamp.toString());
    scheduleAutoLogout(expiryTimestamp);
  };

  // 👇 Initial session check + expiry validation
  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session ?? null);

      const storedExpiry = localStorage.getItem("app_session_expires_at");
      if (storedExpiry) {
        const expiryTs = Number(storedExpiry);
        if (expiryTs <= Date.now()) {
          await supabase.auth.signOut();
          setSession(null);
          localStorage.removeItem("app_session_expires_at");
        } else {
          scheduleAutoLogout(expiryTs);
        }
      }

      setLoading(false);
    };

    init();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (!newSession) {
        localStorage.removeItem("app_session_expires_at");
        if (expiryTimeoutRef.current) {
          clearTimeout(expiryTimeoutRef.current);
          expiryTimeoutRef.current = null;
        }
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // 🟢 Sign Up
  const signUpNewUser = async (email: string, password: string, full_name: string) => {
    const { data, error } = await supabase.auth.signUp({
      email: email.toLowerCase(),
      password,
      options: {
        data: { full_name },
      },
    });

    if (error) {
      console.error("Error signing up: ", error);
      return { success: false, error };
    }

    if (data?.user) {
      await supabase.from("profiles").insert([
        { id: data.user.id, name: full_name, email: email.toLowerCase() },
      ]);
    }

    return { success: true, data };
  };

  // 🟢 Sign In
  const signInUser = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password,
      });

      if (error) {
        console.error("Sign-in error:", error.message);
        return { success: false, error: error.message };
      }

      setSession(data?.session ?? null);
      setClientExpiry(SESSION_EXPIRY_MS); // ⏰ start expiry timer

      return { success: true, data };
    } catch (err: any) {
      console.error("Unexpected error during sign-in:", err.message);
      return { success: false, error: err.message };
    }
  };

  // 🔴 Sign Out
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Error signing out:", error);

    setSession(null);
    localStorage.removeItem("app_session_expires_at");
    if (expiryTimeoutRef.current) {
      clearTimeout(expiryTimeoutRef.current);
      expiryTimeoutRef.current = null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        loading,
        signUpNewUser,
        signInUser,
        signOut,
        setSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook for consuming auth
export const UserAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("UserAuth must be used within AuthContextProvider");
  return context;
};
