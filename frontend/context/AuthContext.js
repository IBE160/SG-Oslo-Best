import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

// 1. Opprett Context
const AuthContext = createContext();

// 2. Auth Provider Komponent
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Funksjon for å hente den første økten
    const fetchSession = async () => {
      const { data: { session: initialSession } } = await supabase.auth.getSession();
      setSession(initialSession);
      setUser(initialSession?.user || null);
      setLoading(false);
    };

    fetchSession();

    // Lytter til endringer i autentiseringstilstanden
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user || null);
        setLoading(false);
      }
    );

    return () => {
      // Rydd opp lytteren når komponenten avmonteres
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Funksjon for utlogging
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Custom Hook
export const useAuth = () => useContext(AuthContext);