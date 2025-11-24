import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import HistoryList from '../components/HistoryList';
import { useRouter } from 'next/router';

export default function HistoryPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    
    if (!user) {
      router.push('/auth');
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/v1/applications/history?user_id=${user.id}`);
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error("Failed to fetch history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, authLoading, router]);

  if (loading) return <div className="min-h-screen bg-gray-900 text-white p-8">Laster historikk...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-400">Min Søknadshistorikk</h1>
          <button 
            onClick={() => router.push('/')}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-sm"
          >
            ← Tilbake
          </button>
        </div>
        
        <HistoryList applications={data} />
      </div>
    </div>
  );
}
