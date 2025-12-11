// frontend/components/ui/StatefulTextbox.tsx
import React from 'react';
import { cn } from '@/lib/utils';

type SaveState = 'default' | 'unsaved' | 'saving' | 'saved';

interface StatefulTextboxProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  saveState: SaveState;
}

const StatefulTextbox = React.forwardRef<HTMLTextAreaElement, StatefulTextboxProps>(
  ({ className, saveState, ...props }, ref) => {
    const stateClasses = {
      default: 'border-gray-300 focus:border-blue-500',
      unsaved: 'border-yellow-500 focus:border-yellow-600',
      saving: 'border-blue-500 focus:border-blue-600 animate-pulse',
      saved: 'border-green-500 focus:border-green-600',
    };

    return (
      <textarea
        className={cn(
          'border p-3 rounded-md transition-colors duration-300',
          stateClasses[saveState],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

StatefulTextbox.displayName = 'StatefulTextbox';

export { StatefulTextbox };
