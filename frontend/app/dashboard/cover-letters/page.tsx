"use client";

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import styles from './CoverLettersPage.module.css';

export const metadata = {
  title: "Saved Cover Letters",
};

type CoverLetter = {
  id: string;
  title: string;
  saved_at: string;
  content: string;
};

async function fetchCoverLetters(): Promise<CoverLetter[]> {
  const response = await fetch('/api/v1/cover-letters');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
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

      <div data-testid="cover-letter-list" className={styles.coverLetterList}>
        {coverLetters?.map((letter) => (
          <div
            key={letter.id}
            data-testid="cover-letter-item"
            onClick={() => setSelectedLetter(letter)}
            className={styles.coverLetterItem}
          >
            <p><strong>{letter.title}</strong></p>
            <p><strong>Saved:</strong> {new Date(letter.saved_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            <p>{letter.content.substring(0, 100)}...</p>
          </div>
        ))}
      </div>

      {selectedLetter && (
        <div className={styles.selectedLetter}>
          <h2>{selectedLetter.title}</h2>
          <div data-testid="cover-letter-content" className={styles.coverLetterContent}>
            <p>{selectedLetter.content}</p>
          </div>
        </div>
      )}
    </div>
  );
}