import React, { forwardRef } from 'react';

interface StatefulTextboxProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  status?: 'dirty' | 'saving' | 'saved' | 'clean';
  as?: 'input' | 'textarea'; // Lar oss bruke den som textarea også
}

export const StatefulTextbox = forwardRef<HTMLInputElement | HTMLTextAreaElement, StatefulTextboxProps>(
  ({ label, status, className = '', as = 'input', ...rest }, ref) => {
    
    // Bestem kantfarge basert på status
    let borderColor = 'border-gray-300';
    if (status === 'dirty') borderColor = 'border-yellow-500';
    if (status === 'saving') borderColor = 'border-blue-500';
    if (status === 'saved') borderColor = 'border-green-500';

    const baseClasses = "block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm";
    const combinedClasses = `${baseClasses} ${borderColor}`;

    return (
      <div className="w-full">
        {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
        
        {as === 'textarea' ? (
          <textarea
            ref={ref as any}
            className={combinedClasses}
            {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={ref as any}
            className={combinedClasses}
            {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
        
        {/* Valgfri: Vis status-tekst eller ikon */}
        {status === 'saving' && <span className="text-xs text-blue-500">Saving...</span>}
        {status === 'saved' && <span className="text-xs text-green-500">Saved</span>}
        {status === 'dirty' && <span className="text-xs text-yellow-500">Unsaved changes</span>}
      </div>
    );
  }
);

StatefulTextbox.displayName = 'StatefulTextbox';