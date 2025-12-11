"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// 🔑 Dette er akkurat det vi lagrer fra /auth/v1/token
export interface SessionData {
  access_token: string;
  refresh_token: string;
}

interface AuthContextType {
  session: SessionData | null;
  isLoading: boolean;
  login: (session: SessionData) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<SessionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ⬇️ Henter session fra localStorage når appen starter
  useEffect(() => {
    try {
      const stored = localStorage.getItem("session");
      if (stored) {
        const parsed = JSON.parse(stored) as SessionData;
        if (parsed.access_token) {
          setSession(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to read session from localStorage", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (s: SessionData) => {
    setSession(s);
    localStorage.setItem("session", JSON.stringify(s));
  };

  const logout = () => {
    setSession(null);
    localStorage.removeItem("session");
  };

  return (
    <AuthContext.Provider value={{ session, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return ctx;
}
