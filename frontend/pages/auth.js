import React, { useState } from 'react';
import Head from 'next/head';
import { supabase } from '../utils/supabase';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      if (isLogin) {
        // Logikk for pålogging
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        // Ved suksess håndteres omdirigering av AuthGuard i _app.js
      } else {
        // Logikk for registrering
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage('Sjekk e-posten din for bekreftelseslenken!');
      }
    } catch (err) {
      setError(err.message || 'En ukjent feil oppsto.');
    } finally {
      setLoading(false);
    }
  };

  const AuthForm = ({ title, ctaText }) => (
    <form onSubmit={handleSubmit} className="p-8 bg-primary-dark rounded-xl shadow-2xl w-full max-w-md space-y-6">
      <h2 className="text-3xl font-bold text-white text-center">{title}</h2>
      
      {/* Viser Feil / Suksess Meldinger */}
      {message && <div className="p-3 bg-success text-white rounded-lg text-sm">{message}</div>}
      {error && <div className="p-3 bg-danger text-white rounded-lg text-sm">{error}</div>}

      <div>
        <label className="block text-gray-300 mb-1">E-post</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 bg-secondary-dark border border-gray-600 rounded-lg text-white focus:ring-highlight focus:border-highlight"
          required
        />
      </div>

      <div>
        <label className="block text-gray-300 mb-1">Passord</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 bg-secondary-dark border border-gray-600 rounded-lg text-white focus:ring-highlight focus:border-highlight"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-4 text-white font-bold rounded-lg bg-highlight hover:bg-indigo-600 transition duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
      >
        {loading ? 'Laster...' : ctaText}
      </button>

      <p className="text-center text-gray-400">
        {isLogin ? "Har du ikke en konto?" : "Har du allerede en konto?"}{' '}
        <button 
          type="button" 
          onClick={() => setIsLogin(!isLogin)} 
          className="text-highlight hover:underline font-medium"
        >
          {isLogin ? "Registrer deg her" : "Logg inn"}
        </button>
      </p>
    </form>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary-dark">
      <Head>
        <title>{isLogin ? 'Logg Inn' : 'Registrer Deg'} | CVAI Turbo</title>
      </Head>
      <div className="w-full flex justify-center">
        {isLogin ? (
          <AuthForm title="Logg Inn" ctaText="Logg Inn" />
        ) : (
          <AuthForm title="Registrer Deg" ctaText="Registrer og motta e-post" />
        )}
      </div>
    </div>
  );
};

export default Auth;