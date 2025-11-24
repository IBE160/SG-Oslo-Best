import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../utils/supabase';
import { useRouter } from 'next/router';

const initialProfileState = {
  // Profile fields
  name: '',
  date_of_birth: '', // mm/dd/yy
  gender: '',        // female/male/other
  phone_number: '',
  address: '',
  // CV fields
  education: '',
  work_experience: '',
  qualifications: '',
  skills: '',
  language: '',
};

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
    
    // Antar at user.id er UUID fra Supabase Auth
    const { data, error } = await supabase
      .from('user_info')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 er "ingen rader funnet"
      console.error('Feil ved lasting av profil:', error);
      setError('Klarte ikke laste profilen. Vennligst prøv igjen.');
      setLoading(false);
      return;
    }

    if (data) {
      // Data funnet, fyller ut skjemaet
      setFormData(prev => ({
        ...prev,
        ...data,
      }));
      setIsNewUser(false);
    } else {
      // Ingen data funnet, antas å være ny bruker som fyller ut for første gang
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

    if (!user) {
        setError("Du må være logget inn for å lagre.");
        setSaving(false);
        return;
    }

    try {
        const profileData = {
            ...formData,
            user_id: user.id,
        };

        let result;
        if (isNewUser) {
            // INSERT for ny bruker
            result = await supabase
                .from('user_info')
                .insert([profileData]);
        } else {
            // UPDATE for eksisterende bruker
            result = await supabase
                .from('user_info')
                .update(profileData)
                .eq('user_id', user.id);
        }

        if (result.error) throw result.error;

        setMessage('Profilen og CV-data ble lagret vellykket!');
        setIsNewUser(false); // Ikke lenger en ny bruker
        
    } catch (err) {
        console.error('Feil ved lagring:', err);
        setError('Lagring feilet: ' + (err.message || 'Ukjent feil'));
    } finally {
        setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-secondary-dark text-white text-xl">
        Laster profil...
      </div>
    );
  }

  const InputField = ({ label, name, type = 'text', placeholder, rows = 1 }) => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-300 font-medium mb-1">
        {label}
      </label>
      {rows > 1 ? (
        <textarea
          id={name}
          name={name}
          rows={rows}
          value={formData[name]}
          onChange={handleChange}
          className="w-full p-3 bg-secondary-dark border border-gray-600 rounded-lg text-white focus:ring-highlight focus:border-highlight"
          placeholder={placeholder}
        ></textarea>
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className="w-full p-3 bg-secondary-dark border border-gray-600 rounded-lg text-white focus:ring-highlight focus:border-highlight"
          placeholder={placeholder}
        />
      )}
    </div>
  );

  return (
    <div className="min-h-screen p-8 bg-secondary-dark">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-highlight mb-4 text-center">
          Oppdater Profil & CV
        </h1>
        <p className="text-center text-gray-400 mb-8">
          Fyll inn all informasjon. Dette er dataene AI-en bruker for å analysere og generere.
        </p>

        {message && <div className="p-4 mb-4 bg-success text-white rounded-lg text-sm">{message}</div>}
        {error && <div className="p-4 mb-4 bg-danger text-white rounded-lg text-sm">{error}</div>}

        <form onSubmit={handleSave} className="bg-primary-dark p-8 rounded-xl shadow-2xl space-y-6">
          
          {/* --- Del 1: Profilinformasjon --- */}
          <h2 className="text-2xl font-semibold text-white border-b border-gray-600 pb-2">Personlig Informasjon</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Fullt Navn" name="name" placeholder="Ola Nordmann" />
            <InputField label="Fødselsdato (mm/dd/yy)" name="date_of_birth" placeholder="01/20/95" />
            <InputField label="Kjønn" name="gender" placeholder="male/female/other" />
            <InputField label="Telefonnummer" name="phone_number" placeholder="+47 123 45 678" />
          </div>
          <InputField label="Adresse" name="address" placeholder="Gateveien 1, 0100 Oslo" />

          {/* --- Del 2: CV Informasjon (Free Text) --- */}
          <h2 className="text-2xl font-semibold text-white pt-6 border-t border-gray-600 pb-2">CV Tekst</h2>
          
          <InputField label="Utdanning" name="education" rows={4} placeholder="Liste over utdanning (Skole, grad, årstall)..." />
          <InputField label="Arbeidserfaring" name="work_experience" rows={6} placeholder="Detaljer om relevant arbeidserfaring..." />
          <InputField label="Kvalifikasjoner (Hard Skills)" name="qualifications" rows={3} placeholder="Sertifikater, spesialiseringer, verktøy..." />
          <InputField label="Ferdigheter (Soft Skills)" name="skills" rows={3} placeholder="Samarbeid, ledelse, problemløsning..." />
          <InputField label="Språk" name="language" rows={2} placeholder="Norsk, Engelsk, Spansk..." />

          {/* --- Knapper --- */}
          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="py-3 px-6 text-white font-bold rounded-lg bg-gray-600 hover:bg-gray-700 transition duration-200"
            >
              ← Gå til Analyse
            </button>
            <button
              type="submit"
              disabled={saving}
              className="py-3 px-6 text-white font-bold rounded-lg bg-highlight hover:bg-indigo-600 transition duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              {saving ? 'Lagrer...' : isNewUser ? 'Lagre Profil' : 'Oppdater Profil'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileManagement;