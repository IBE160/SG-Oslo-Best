// frontend/components/UnsavedChangesIndicator.tsx
import React from 'react';
import { useUnsavedChanges } from '@/context/UnsavedChangesContext';

const UnsavedChangesIndicator: React.FC = () => {
  const { hasUnsavedChanges } = useUnsavedChanges();

  if (!hasUnsavedChanges) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-yellow-500 text-white py-2 px-4 rounded-lg shadow-lg">
      Unsaved changes...
    </div>
  );
};

export default UnsavedChangesIndicator;
