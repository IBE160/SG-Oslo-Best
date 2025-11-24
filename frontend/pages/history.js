import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../utils/supabase';
import { useRouter } from 'next/router';
import Head from 'next/head';

// Formaterer datoen for visning
const formatDate = (dateString) => {
  if (!dateString) return 'Ukjent dato';
  return new Date(dateString).toLocaleDateString('no-NO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const ApplicationHistory = () => {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null); // State for modalen

  // Sikrer at brukeren er logget inn og henter data
  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push('/auth');
      return;
    }
    fetchApplications();
  }, [user, authLoading, router]);

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    // Henter alle følgebrev for den innloggede brukeren, sortert etter nyeste
    const { data, error } = await supabase
      .from('cover_letters')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Feil ved lasting av historikk:', error);
      setError('Klarte ikke laste søknadshistorikk. Sjekk Supabase RLS og tabellnavn.');
      setLoading(false);
      return;
    }

    setApplications(data || []);
    setLoading(false);
  }, [user]);

  // Hjelpefunksjon for å laste ned innhold (simulering av PDF/Tekst-knapp)
  const handleDownload = (content, filename) => {
    const element = document.createElement("a");
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element); 
    element.click();
    document.body.removeChild(element);
  }

  // Komponent for detaljert visning (Modal)
  const ReviewModal = ({ application, onClose }) => {
    if (!application) return null;

    // Utleder data fra analysis_json
    const analysis = application.analysis_json || {};
    const matchScore = analysis.score || 'N/A';
    const missingKeywords = analysis.keywords || [];
    const optimizationSummary = analysis.summary || 'Ingen oppsummering tilgjengelig.';

    const fileName = `soknad-${application.job_description.substring(0, 20).replace(/\s/g, '-')}-${formatDate(application.created_at).replace(/[,.:]/g, '')}.txt`;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
        <div className="bg-primary-dark rounded-xl shadow-2xl w-full max-w-4xl max-h-full overflow-y-auto p-8">
          <div className="flex justify-between items-center border-b border-gray-600 pb-3 mb-4">
            <h2 className="text-3xl font-bold text-highlight">Detaljer: {application.job_description.substring(0, 50)}...</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">
              &times;
            </button>
          </div>
          
          <div className="space-y-6">
            
            {/* Match Score og Oppsummering */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-secondary-dark rounded-lg">
                <p className="text-sm text-gray-400">Match Score</p>
                <p className="text-2xl font-extrabold text-white">{matchScore}%</p>
              </div>
              <div className="p-3 bg-secondary-dark rounded-lg col-span-2">
                <p className="text-sm text-gray-400">Oppsummering</p>
                <p className="text-sm text-white whitespace-pre-wrap">{optimizationSummary.substring(0, 100)}...</p>
              </div>
            </div>

            {/* Følgebrev Tekst */}
            <div>
              <h3 className="text-xl font-semibold text-gray-200 mb-2">Følgebrev</h3>
              <textarea
                readOnly
                rows="15"
                value={application.cover_letter_text}
                className="w-full p-3 bg-secondary-dark border border-gray-600 rounded-lg text-gray-300 whitespace-pre-wrap"
              ></textarea>
            </div>
            
            {/* Jobbeskrivelse og Nøkkelord */}
            <div>
              <h3 className="text-xl font-semibold text-gray-200 mb-2">Jobbeskrivelse</h3>
              <p className="text-sm text-gray-400 whitespace-pre-wrap max-h-40 overflow-y-auto border p-3 border-gray-700 rounded-lg">{application.job_description}</p>
            </div>

            {/* Nøkkelord */}
            <div>
              <h3 className="text-xl font-semibold text-gray-200 mb-2">Manglende Nøkkelord</h3>
              <p className="text-sm text-yellow-300">
                {missingKeywords.length > 0 ? missingKeywords.join(', ') : 'Ingen kritiske nøkkelord manglet ved analyse.'}
              </p>
            </div>
          </div>
          
          {/* Nedlastingsknapp */}
          <div className="mt-8 pt-4 border-t border-gray-600 flex justify-end">
            <button
              onClick={() => handleDownload(application.cover_letter_text, fileName)}
              className="py-2 px-6 bg-highlight hover:bg-indigo-600 text-white font-bold rounded-lg transition"
            >
              ⬇️ Last ned som Tekst
            </button>
          </div>
        </div>
      </div>
    );
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-secondary-dark text-white text-xl">
        Laster historikk...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-secondary-dark">
      <Head>
        <title>Søknadshistorikk | CVAI Turbo</title>
      </Head>
      <div className="max-w-7xl mx-auto">
        
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-extrabold text-highlight">
                Søknadshistorikk
            </h1>
            <button
                onClick={() => router.push('/')}
                className="py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition"
            >
                ← Gå til Dashboard
            </button>
        </div>

        {error && (
            <div className="p-4 mb-4 bg-danger text-white rounded-lg">
                ❌ Feil: {error}
            </div>
        )}

        {applications.length === 0 ? (
          <div className="bg-primary-dark p-12 rounded-xl text-center">
            <p className="text-gray-400 text-xl">Du har ingen lagrede søknader ennå. Gå til Dashboard for å generere din første!</p>
          </div>
        ) : (
          <div className="bg-primary-dark rounded-xl shadow-2xl overflow-hidden">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Stilling / Beskrivelse
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-32">
                    Match Score
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-40">
                    Dato
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider w-24">
                    Aksjon
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-700 transition duration-150 cursor-pointer" onClick={() => setSelectedApplication(app)}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white truncate max-w-lg">
                        {app.job_description.substring(0, 80)}...
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${app.analysis_json?.score >= 80 ? 'bg-success text-gray-900' : app.analysis_json?.score >= 60 ? 'bg-warning text-gray-900' : 'bg-danger text-white'}`}>
                        {app.analysis_json?.score}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {formatDate(app.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setSelectedApplication(app); }}
                        className="text-highlight hover:text-indigo-400"
                      >
                        Vis Detaljer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal for detaljert visning */}
        <ReviewModal 
          application={selectedApplication} 
          onClose={() => setSelectedApplication(null)} 
        />
      </div>
    </div>
  );
};

export default ApplicationHistory;