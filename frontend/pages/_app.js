import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import '../styles/globals.css';
import { AuthContextProvider, useAuth } from '../context/AuthContext';

// Komponent som håndterer routingbeskyttelsen
const AuthGuard = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Sjekker om ruting er nødvendig
    if (loading) return; 

    // Ubeskyttede ruter (auth-siden)
    const isAuthRoute = router.pathname === '/auth';

    if (!user && !isAuthRoute) {
      // Hvis ikke logget inn og prøver å nå en beskyttet rute (som /)
      router.push('/auth');
    } else if (user && isAuthRoute) {
      // Hvis logget inn og prøver å nå auth-siden
      router.push('/');
    }
  }, [user, loading, router]);

  // Viser lasteskjerm hvis autentiseringsstatusen ikke er klar
  if (loading || (router.pathname !== '/auth' && !user && !loading)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-secondary-dark text-white">
        Laster inn...
      </div>
    );
  }

  return children;
};

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <AuthGuard>
        <Component {...pageProps} />
      </AuthGuard>
    </AuthContextProvider>
  );
}

export default MyApp;