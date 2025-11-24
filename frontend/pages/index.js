import React, { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router'; // <--- NØDVENDIG IMPORT

// Setter base URL for FastAPI backend. Må matche porten din.
const API_BASE_URL = 'http://127.0.0.1:8000/api/v1/analyze-cv';

// Initial state for data og UI
const initialFormState = {
  resume_text: '',
  job_description: '',
};

const initialResultState = {
  match_score: null,
  missing_keywords: [],
  optimization_summary: null,
  loading: false,
  error: null,
};

// Hjelpekomponent for å vise Match Score i en sirkel
const ScoreCircle = ({ score }) => {
  let colorClass;
  if (score >= 80) {
    colorClass = 'bg-success';
  } else if (score >= 60) {
    colorClass = 'bg-warning';
  } else {
    colorClass = 'bg-danger';
  }

  return (
    <div className={`w-32 h-32 rounded-full flex items-center justify-center font-bold text-3xl text-white ${colorClass}`}>
      {score}%
    </div>
  );
};

const Dashboard = () => {
  const { signOut } = useAuth();
  const router = useRouter(); // <--- BRUKER useROUTER

  const [formData, setFormData] = useState(initialFormState);
  const [result, setResult] = useState(initialResultState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAnalyze = useCallback(async (e) => {
    e.preventDefault();
    setResult({ ...initialResultState, loading: true, error: null });

    // Bruker en ny UUID for bruker-ID per forespørsel
    const dataToSend = {
      ...formData,
      // Sender en dummy UUID da vi ikke har Supabase Auth på plass ennå
      user_id: uuidv4(), 
    };

    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        // Håndterer feil fra FastAPI
        const errorData = await response.json();
        throw new Error(`API error: ${response.status} - ${errorData.detail || 'Ukjent feil'}`);
      }

      const analysisResult = await response.json();
      setResult({ 
        ...analysisResult, 
        loading: false, 
        error: null 
      });

    } catch (err) {
      console.error("Fetch Error:", err);
      setResult(prev => ({ 
        ...prev, 
        loading: false, 
        error: err.message || 'Klarte ikke koble til FastAPI backend. Er serveren på?' 
      }));
    }
  }, [formData]);

  return (
    <div className="min-h-screen p-8">
      
      {/* TOPP-NAVEGATION MED UT-LOGGING & PROFIL */}
      <div className="flex justify-between items-center max-w-7xl mx-auto mb-8">
        <h1 className="text-4xl font-extrabold text-highlight">
          CVAI Turbo - Stillingsanalyse
        </h1>
        <div className="space-x-4">
          <button
            onClick={() => router.push('/profile')} // <--- BRUKER router.push
            className="py-2 px-4 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition"
          >
            Rediger Profil/CV
          </button>
          <button
            onClick={signOut}
            className="py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition"
          >
            Logg Ut
          </button>
        </div>
      </div>

      <form onSubmit={handleAnalyze} className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Venstre Kolonne: Input */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">1. Lim inn CV og Stillingsbeskrivelse</h2>
          
          {/* CV Input */}
          <label className="block">
            <span className="text-lg text-gray-300 font-medium">Rå CV Tekst:</span>
            <textarea
              name="resume_text"
              rows="12"
              value={formData.resume_text}
              onChange={handleChange}
              className="mt-2 block w-full bg-primary-dark border border-gray-600 rounded-lg p-3 text-white focus:ring-highlight focus:border-highlight"
              placeholder="Lim inn hele CV-en din her i ren tekst..."
              required
            ></textarea>
          </label>

          {/* Stillingsbeskrivelse Input */}
          <label className="block">
            <span className="text-lg text-gray-300 font-medium">Stillingsbeskrivelse:</span>
            <textarea
              name="job_description"
              rows="8"
              value={formData.job_description}
              onChange={handleChange}
              className="mt-2 block w-full bg-primary-dark border border-gray-600 rounded-lg p-3 text-white focus:ring-highlight focus:border-highlight"
              placeholder="Lim inn jobbutlysningen her i ren tekst..."
              required
            ></textarea>
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={result.loading}
            className="w-full py-3 px-4 text-white font-bold rounded-lg bg-highlight hover:bg-indigo-600 transition duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {result.loading ? '⚙️ Analyserer...' : '🚀 Analyser CV mot Stilling'}
          </button>
        </div>

        {/* Høyre Kolonne: Resultater */}
        <div className="bg-primary-dark p-6 rounded-xl shadow-lg h-fit">
          <h2 className="text-2xl font-semibold text-white mb-4">2. Analyseresultat</h2>
          
          {/* Viser Feilmeldinger */}
          {result.error && (
            <div className="p-4 mb-4 bg-danger text-white rounded-lg">
              ❌ Feil: {result.error}
            </div>
          )}

          {/* Venter på Resultater */}
          {result.match_score === null && !result.loading && !result.error && (
            <p className="text-gray-400">Resultatene vil vises her etter analyse.</p>
          )}

          {/* Viser Resultater */}
          {result.match_score !== null && (
            <div className="space-y-6">
              
              <div className="flex items-center space-x-6">
                <ScoreCircle score={result.match_score} />
                <h3 className="text-xl font-bold">Match Score: {result.match_score}%</h3>
              </div>

              {/* Manglende Nøkkelord */}
              <div>
                <h3 className="text-lg font-bold text-gray-200 mb-2">Mangler i CV (Nøkkelord):</h3>
                {result.missing_keywords.length > 0 ? (
                  <ul className="list-disc list-inside space-y-1 text-yellow-300">
                    {result.missing_keywords.map((keyword, index) => (
                      <li key={index} className="text-sm">{keyword}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-success">Ingen kritiske nøkkelord mangler!</p>
                )}
              </div>

              {/* Optimaliseringsoppsummering */}
              <div>
                <h3 className="text-lg font-bold text-gray-200 mb-2">Optimalisering og Forbedringer:</h3>
                <p className="whitespace-pre-wrap text-gray-300">
                  {result.optimization_summary}
                </p>
              </div>

            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Dashboard;