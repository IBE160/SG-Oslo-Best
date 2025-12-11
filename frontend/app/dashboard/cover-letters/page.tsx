"use client";

import { useState } from 'react';
export const metadata = {
  title: "Saved Cover Letters",
};

import { useQuery } from '@tanstack/react-query';
export const metadata = {
  title: "Saved Cover Letters",
};

import { supabase } from '@/lib/supabase-client';
export const metadata = {
  title: "Saved Cover Letters",
};
 // keep this – correct

type CoverLetter = {
  id: string;
  content: string;
  created_at: string;
  job_application_id: string;
};

// ❌ REMOVE THIS:
// const supabase = createClient();

async function fetchCoverLetters(): Promise<CoverLetter[]> {
  const { data, error } = await supabase
    .from('cover_letters')
    .select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export default function CoverLettersPage() {
  const [selectedLetter, setSelectedLetter] = useState<CoverLetter | null>(null);

  const { data: coverLetters, isLoading, error } = useQuery<CoverLetter[]>({
    queryKey: ['coverLetters'],
    queryFn: fetchCoverLetters,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div>Error fetching cover letters: {error.message}</div>;
  }

  return (
    <div>
      <h1>My Cover Letters</h1>

      <div data-testid="cover-letter-list">
        {coverLetters?.map((letter) => (
          <div
            key={letter.id}
            data-testid="cover-letter-item"
            onClick={() => setSelectedLetter(letter)}
            style={{
              cursor: 'pointer',
              border: '1px solid #ccc',
              margin: '8px',
              padding: '8px'
            }}
          >
            <p><strong>Job Application ID:</strong> {letter.job_application_id}</p>
            <p><strong>Saved:</strong> {new Date(letter.created_at).toLocaleDateString()}</p>
            <p>{letter.content.substring(0, 100)}...</p>
          </div>
        ))}
      </div>

      {selectedLetter && (
        <div style={{ marginTop: '16px', border: '1px solid #333', padding: '16px' }}>
          <h2>Selected Cover Letter</h2>
          <div data-testid="cover-letter-content">
            <p>{selectedLetter.content}</p>
          </div>
        </div>
      )}
    </div>
  );
}

