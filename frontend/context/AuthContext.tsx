"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface Session {
  access_token: string;
  refresh_token: string;
}

interface AuthContextType {
  session: Session | null;
  login: (sessionData: Session) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Try to load session from local storage on initial load
    try {
      const storedSession = localStorage.getItem('session');
      if (storedSession) {
        setSession(JSON.parse(storedSession));
      }
    } catch (error) {
      console.error("Failed to parse session from localStorage", error);
      localStorage.removeItem('session');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // This effect will run when the session state changes
  useEffect(() => {
    // Redirect to dashboard only if a session is newly set
    if (session?.access_token) {
      router.push('/dashboard');
    }
  }, [session]);

  const login = (sessionData: Session) => {
    setSession(sessionData);
    try {
      localStorage.setItem('session', JSON.stringify(sessionData));
    } catch (error) {
      console.error("Failed to save session to localStorage", error);
    }
  };

  const logout = () => {
    setSession(null);
    try {
      localStorage.removeItem('session');
      router.push('/login'); // Or your auth page
    } catch (error) {
      console.error("Failed to remove session from localStorage", error);
    }
  };

  return (
    <AuthContext.Provider value={{ session, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
