import React, { useState, useCallback, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabase'; // Import Supabase-klienten

// Setter base URL for FastAPI backend. Må matche porten din (8000).
const API_BASE_URL = 'http://127.0.0.1:8000/api/v1/analyze-cv'; 

// Hjelpefunksjon for å konvertere lagret profil-/CV-data til en enkel tekststreng
const formatCvDataToText = (profileData) => {
  if (!profileData) return "Ingen profil/CV data funnet.";
  
  return `
    --- Profil ---
    Navn: ${profileData.name || 'Ikke satt'}
    Fødselsdato: ${profileData.date_of_birth || 'Ikke satt'}
    Kjønn: ${profileData.gender || 'Ikke satt'}
    Tlf: ${profileData.phone_number || 'Ikke satt'}
    Adresse: ${profileData.address || 'Ikke satt'}

    --- CV Detaljer ---
    Utdanning:
    ${profileData.education || 'Ingen data'}

    Arbeidserfaring:
    ${profileData.work_experience || 'Ingen data'}

    Kvalifikasjoner:
    ${profileData.qualifications || 'Ingen data'}

    Ferdigheter:
    ${profileData.skills || 'Ingen data'}

    Språk:
    ${profileData.language || 'Ingen data'}
  `.trim();
};

const initialFormState = {
  job_description: '',
  instructions: '', // Felt for stil og tone/instruksjoner til AI
};

const initialResultState = {
  match_score: null,
  missing_keywords: [],
  optimization_summary: null,
  generated_cover_letter: null, // Plass for generert brev
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
  // Henter brukerinformasjon og utloggingsfunksjon
  const { user, signOut } = useAuth();
  // Henter router for navigasjon
  const router = useRouter();

  const [formData, setFormData] = useState(initialFormState);
  const [result, setResult] = useState(initialResultState);
  const [savedCvText, setSavedCvText] = useState("");
  const [profileLoading, setProfileLoading] = useState(true);
  const [saving, setSaving] = useState(false); // State for lagring av følgebrev

  // 1. HENTING AV LAGRET CV-DATA VED INNLASTING
  useEffect(() => {
    if (!user) return; // Avbryter hvis bruker ikke er logget inn

    const fetchSavedProfile = async () => {
      setProfileLoading(true);
      // Henter brukerens profilinformasjon fra 'user_info'
      const { data } = await supabase
        .from('user_info')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (data) {
        setSavedCvText(formatCvDataToText(data));
      } else {
        setSavedCvText("Ingen lagret CV-data funnet. Vennligst gå til 'Rediger Profil/CV' først.");
      }
      setProfileLoading(false);
    };

    fetchSavedProfile();
  }, [user]); // Kjører når 'user' endres
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. HÅNDTERING AV ANALYSE OG GENERERING (Kaller FastAPI)
  const handleAnalyze = useCallback(async (e) => {
    e.preventDefault();
    if (profileLoading || savedCvText.includes("Ingen lagret CV-data")) {
      alert("Vennligst lagre din profil/CV før du analyserer.");
      return;
    }

    // Beholder eventuelt eksisterende følgebrev under lasting for rask regenerering
    setResult(prev => ({ ...initialResultState, loading: true, generated_cover_letter: prev.generated_cover_letter }));

    const dataToSend = {
      resume_text: savedCvText, // Sender LAGRET CV-DATA til backend
      job_description: formData.job_description,
      user_id: user.id,
      instructions: formData.instructions // Sender instruksjoner
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
        const errorData = await response.json();
        throw new Error(`API error: ${response.status} - ${errorData.detail || 'Ukjent feil'}`);
      }

      const analysisResult = await response.json();
      
      // SIMULERING av Cover Letter generert av AI i backend
      const mockCoverLetter = `
        Kjære [Mottaker Navn],
        
        Jeg skriver for å uttrykke min sterke interesse for stillingen som beskrevet. Med en match score på ${analysisResult.match_score}% er jeg overbevist om at min bakgrunn innen ${analysisResult.optimization_summary.split(' ')[0]} er ideell.
        
        Jeg har merket meg at dere vektlegger ${analysisResult.missing_keywords.slice(0, 3).join(', ')} som jeg har inkludert i min CV.
        
        Instruksjonen du ga ("${formData.instructions}") er reflektert i tonen og fokuset.
        
        Vennlig hilsen,
        ${user.email}
      `.trim();
      
      setResult({ 
        ...analysisResult, 
        generated_cover_letter: mockCoverLetter, // Lagrer det simulerte brevet
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
  }, [formData, user, savedCvText, profileLoading]);

  // 3. HÅNDTERING AV LAGRING AV FØLGEBREV TIL SUPABASE
  const handleSaveCoverLetter = async () => {
    if (!result.generated_cover_letter) {
      alert("Generer et følgebrev før du lagrer.");
      return;
    }
    setSaving(true);
    
    const coverLetterData = {
      user_id: user.id,
      job_description: formData.job_description,
      instructions: formData.instructions,
      cv_text: savedCvText, // Lagrer den fullstendige CV-teksten for historikk
      cover_letter_text: result.generated_cover_letter,
      // Lagrer analyseresultater som JSONB
      analysis_json: {
        score: result.match_score,
        keywords: result.missing_keywords,
        summary: result.optimization_summary,
      },
    };

    // Setter inn ny rad i 'cover_letters' tabellen
    const { error } = await supabase
      .from('cover_letters')
      .insert([coverLetterData]);

    if (error) {
      alert(`Feil ved lagring av følgebrev: ${error.message}`);
    } else {
      alert("Følgebrev lagret vellykket!");
    }
    setSaving(false);
  };
  

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-secondary-dark text-white text-xl">
        Laster din lagrede CV...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      
      {/* TOPP-NAVEGATION MED ALLE KNAPPER */}
      <div className="flex justify-between items-center max-w-7xl mx-auto mb-8">
        <h1 className="text-4xl font-extrabold text-highlight">
          CVAI Turbo
        </h1>
        <div className="space-x-4">
          <button
            onClick={() => router.push('/profile')} // Navigerer til Profil-siden
            className="py-2 px-4 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition"
          >
            Rediger Profil/CV
          </button>
          <button
            onClick={() => router.push('/history')} // Navigerer til Historikk-siden
            className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
          >
            Søknadshistorikk
          </button>
          <button
            onClick={signOut} // Logger ut brukeren via AuthContext
            className="py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition"
          >
            Logg Ut
          </button>
        </div>
      </div>

      <form onSubmit={handleAnalyze} className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Venstre Kolonne: Input & CV-visning */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">1. Stillingsdetaljer</h2>
          
          {/* Viser den lagrede CV-en som brukes i analysen */}
          <div className="bg-primary-dark p-4 rounded-lg border border-gray-600">
            <h3 className="text-lg font-medium text-gray-300 mb-2">Din Lagrede CV (Brukes Automatisk):</h3>
            <p className="text-sm text-gray-400 whitespace-pre-wrap max-h-40 overflow-y-auto">
              {savedCvText}
            </p>
            {savedCvText.includes("Ingen lagret CV-data") && (
              <p className="text-sm text-danger mt-2">Vennligst fyll ut CV-en din i profilsiden.</p>
            )}
          </div>

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

          {/* Instruksjoner Input */}
          <label className="block">
            <span className="text-lg text-gray-300 font-medium">Instruksjoner (Stil & Tone, Valgfritt):</span>
            <textarea
              name="instructions"
              rows="4"
              value={formData.instructions}
              onChange={handleChange}
              className="mt-2 block w-full bg-primary-dark border border-gray-600 rounded-lg p-3 text-white focus:ring-highlight focus:border-highlight"
              placeholder="F.eks. 'Profesjonell, men uformell tone. Fokuser på teamledelse-erfaringen.'..."
            ></textarea>
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={result.loading || savedCvText.includes("Ingen lagret CV-data")}
            className="w-full py-3 px-4 text-white font-bold rounded-lg bg-highlight hover:bg-indigo-600 transition duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {result.loading ? '⚙️ Analyserer & Genererer...' : '🚀 Generer Følgebrev'}
          </button>
        </div>

        {/* Høyre Kolonne: Resultater & Følgebrev */}
        <div className="bg-primary-dark p-6 rounded-xl shadow-lg h-fit">
          <h2 className="text-2xl font-semibold text-white mb-4">2. Resultater & Følgebrev</h2>
          
          {result.error && (
            <div className="p-4 mb-4 bg-danger text-white rounded-lg">
              ❌ Feil: {result.error}
            </div>
          )}

          {/* Match Score */}
          {result.match_score !== null && (
            <div className="flex items-center space-x-6 mb-6 pb-4 border-b border-gray-700">
              <ScoreCircle score={result.match_score} />
              <div>
                <h3 className="text-xl font-bold text-white">Match Score: {result.match_score}%</h3>
                <p className="text-gray-400 text-sm">Optimalisering: {result.optimization_summary}</p>
              </div>
            </div>
          )}

          {/* Følgebrev Output */}
          <h3 className="text-xl font-bold text-gray-200 mb-2">Generert Følgebrev:</h3>
          <textarea
              readOnly
              rows="15"
              value={result.generated_cover_letter || "Generer et følgebrev for å se resultatet her..."}
              className="mt-2 block w-full bg-secondary-dark border border-gray-600 rounded-lg p-3 text-gray-300 focus:outline-none whitespace-pre-wrap"
          ></textarea>
          
          {/* Aksjonsknapper (Lagre / Regenerer) */}
          <div className="flex space-x-4 mt-4">
            <button
              type="button"
              onClick={handleSaveCoverLetter} // Kaller funksjonen for å lagre til Supabase
              disabled={!result.generated_cover_letter || saving}
              className="w-1/2 py-3 px-4 text-white font-bold rounded-lg bg-success hover:bg-green-700 transition duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              {saving ? 'Lagrer...' : '💾 Lagre Følgebrev'}
            </button>
            <button
              type="submit" // Kaller handleAnalyze på nytt for å regenerere brevet
              disabled={!result.generated_cover_letter || result.loading}
              className="w-1/2 py-3 px-4 text-white font-bold rounded-lg bg-highlight hover:bg-indigo-600 transition duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              🔄 Regenerer
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Dashboard;