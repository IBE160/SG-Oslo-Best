"use client";

import { useState, useEffect } from 'react';

const messages = [
  "Please give us an A",
  "Analyzing job description...",
  "Reviewing your CV...",
  "Crafting the perfect opening...",
  "Polishing the final sentences...",
];

export function GenerationStatusIndicator() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 2000); // Change message every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      data-testid="generation-status-indicator"
      className="fixed inset-0 bg-gray-900 bg-opacity-75 flex flex-col items-center justify-center z-50"
      aria-live="polite"
    >
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
      <p className="text-white text-xl font-semibold">{messages[currentMessageIndex]}</p>
    </div>
  );
}
