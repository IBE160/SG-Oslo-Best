import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../utils/supabase';
import { useRouter } from 'next/router';

const initialProfileState = {
  // Profil-felter
  name: '',
  date_of_birth: '',
  gender: '',
  phone_number: '',
  address: '',
  // CV-felter
  education: '',
  work_experience: '',
  qualifications: '',
  skills: '',
  language: '',
};

// --- VIKTIG FIX: Denne komponenten må ligge UTENFOR hovedfunksjonen ---
const InputField = ({ label, name, type = 'text', placeholder, rows = 1, value, onChange }) => (
  <div className="mb-5">
    <label htmlFor={name} className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wider">
      {label}
    </label>
    {rows > 1 ? (
      <textarea
        id={name}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        className="w-full p-4 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 shadow-inner resize-none"
        placeholder={placeholder}
      ></textarea>
    ) : (
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-4 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 shadow-inner"
        placeholder={placeholder}
      />
    )}
  </div>
);

const ProfileManagement = () => {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [formData, setFormData] = useState(initialProfileState);
  const [isNewUser, setIsNewUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Sjekker om brukeren er logget inn og laster data
  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push('/auth');
      return;
    }
    fetchProfile();
  }, [user, authLoading, router]);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError('');
    
    const { data, error } = await supabase
      .from('user_info')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error && error.code !== 'PGRST116') { 
      console.error('Feil ved lasting av profil:', error);
      setError('Klarte ikke laste profilen.');
      setLoading(false);
      return;
    }

    if (data) {
      setFormData(prev => ({ ...prev, ...data }));
      setIsNewUser(false);
    } else {
      setIsNewUser(true);
    }
    setLoading(false);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');

    if (!user) return;

    try {
        const profileData = { ...formData, user_id: user.id };
        let result;
        
        if (isNewUser) {
            result = await supabase.from('user_info').insert([profileData]);
        } else {
            result = await supabase.from('user_info').update(profileData).eq('user_id', user.id);
        }

        if (result.error) throw result.error;

        setMessage('✅ Profilen er lagret!');
        setIsNewUser(false);
        
        // Scroll til toppen for å se meldingen
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
    } catch (err) {
        console.error('Feil ved lagring:', err);
        setError('Lagring feilet: ' + (err.message || 'Ukjent feil'));
    } finally {
        setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-12 bg-gradient-to-br from-gray-900 to-black text-gray-100">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Seksjon */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
            Din Profil & CV
          </h1>
          <p className="text-lg text-gray-400">
            Dette er grunnlaget for din AI-genererte søknad. Jo bedre data, jo bedre resultat.
          </p>
        </div>

        {/* Meldinger */}
        {message && (
          <div className="p-4 mb-6 bg-green-900/30 border border-green-500 text-green-300 rounded-xl flex items-center animate-pulse">
            <span className="mr-2">🎉</span> {message}
          </div>
        )}
        {error && (
          <div className="p-4 mb-6 bg-red-900/30 border border-red-500 text-red-300 rounded-xl">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-8">
          
          {/* --- Kort: Personlig Info --- */}
          <div className="bg-gray-800/40 backdrop-blur-md p-8 rounded-2xl border border-gray-700 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="bg-blue-600 w-2 h-8 rounded-full mr-3"></span>
              Personlig Informasjon
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="Fullt Navn" name="name" value={formData.name} onChange={handleChange} placeholder="Ola Nordmann" />
              <InputField label="Fødselsdato" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} placeholder="DD.MM.ÅÅÅÅ" />
              <InputField label="Kjønn" name="gender" value={formData.gender} onChange={handleChange} placeholder="Mann / Kvinne / Annet" />
              <InputField label="Telefon" name="phone_number" value={formData.phone_number} onChange={handleChange} placeholder="+47 123 45 678" />
            </div>
            <div className="mt-6">
              <InputField label="Adresse" name="address" value={formData.address} onChange={handleChange} placeholder="Gateveien 1, 0100 Oslo" />
            </div>
          </div>

          {/* --- Kort: CV Detaljer --- */}
          <div className="bg-gray-800/40 backdrop-blur-md p-8 rounded-2xl border border-gray-700 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="bg-purple-600 w-2 h-8 rounded-full mr-3"></span>
              CV & Erfaring
            </h2>
            
            <InputField label="Utdanning" name="education" rows={4} value={formData.education} onChange={handleChange} placeholder="• Bachelor i Informatikk, UiO (2020-2023)..." />
            <InputField label="Arbeidserfaring" name="work_experience" rows={6} value={formData.work_experience} onChange={handleChange} placeholder="• Utvikler hos Tech AS (Sommer 2022): Jobbet med React..." />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="Kvalifikasjoner (Hard Skills)" name="qualifications" rows={4} value={formData.qualifications} onChange={handleChange} placeholder="Python, JavaScript, SQL..." />
              <InputField label="Ferdigheter (Soft Skills)" name="skills" rows={4} value={formData.skills} onChange={handleChange} placeholder="Teamarbeid, Problemløsning..." />
            </div>
            
            <div className="mt-6">
              <InputField label="Språk" name="language" rows={2} value={formData.language} onChange={handleChange} placeholder="Norsk (Morsmål), Engelsk (Flytende)..." />
            </div>
          </div>

          {/* --- Handlinger --- */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4 pb-12">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="w-full md:w-auto py-4 px-8 text-gray-300 font-semibold rounded-xl bg-gray-800 hover:bg-gray-700 hover:text-white border border-gray-600 transition-all duration-200 transform hover:-translate-y-1"
            >
              ← Avbryt / Gå til Dashboard
            </button>
            
            <button
              type="submit"
              disabled={saving}
              className="w-full md:w-auto py-4 px-12 text-white font-bold rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg hover:shadow-blue-500/30 transition-all duration-200 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Lagrer endringer...' : '💾 Lagre Profil'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ProfileManagement;