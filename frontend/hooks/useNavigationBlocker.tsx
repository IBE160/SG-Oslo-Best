// frontend/hooks/useNavigationBlocker.tsx
import { useEffect, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface NavigationBlockerOptions {
  when: boolean; // Whether the blocker should be active
  onConfirm?: () => void; // Callback when user confirms navigation (e.g., discard changes)
  onCancel?: () => void; // Callback when user cancels navigation (e.g., stay on page)
  onSave?: () => Promise<boolean>; // Callback when user wants to save before navigating
}

export function useNavigationBlocker({ when, onConfirm, onCancel, onSave }: NavigationBlockerOptions) {
  const router = useRouter();
  const [showPrompt, setShowPrompt] = useState(false);
  const [nextPath, setNextPath] = useState<string | null>(null);

  const handleBrowserExit = useCallback((event: BeforeUnloadEvent) => {
    if (when) {
      event.preventDefault();
      event.returnValue = ''; // Standard for browser to show prompt
      return ''; // For some older browsers
    }
  }, [when]);

  // This is a simplified approach for client-side navigation.
  // A more robust solution might involve wrapping next/link or intercepting router.push/replace
  // but for now, we'll demonstrate the modal itself.
  // The ProfileCVForm will need to manually call this hook's prompt when navigation is attempted.

  useEffect(() => {
    window.addEventListener('beforeunload', handleBrowserExit);
    return () => {
      window.removeEventListener('beforeunload', handleBrowserExit);
    };
  }, [handleBrowserExit]);

  const showBlocker = useCallback((path: string) => {
    if (when) {
      setNextPath(path);
      setShowPrompt(true);
      return true; // Block navigation
    }
    return false; // Don't block
  }, [when]);

  const confirmNavigation = useCallback(() => {
    setShowPrompt(false);
    onConfirm?.();
    if (nextPath) {
      router.push(nextPath);
      setNextPath(null);
    }
  }, [nextPath, onConfirm, router]);

  const cancelNavigation = useCallback(() => {
    setShowPrompt(false);
    onCancel?.();
    setNextPath(null);
  }, [onCancel]);

  const saveAndNavigate = useCallback(async () => {
    if (onSave) {
      const success = await onSave();
      if (success) {
        confirmNavigation();
      }
    }
  }, [onSave, confirmNavigation]);


  const BlockerDialog = () => (
    <AlertDialog open={showPrompt} onOpenChange={setShowPrompt}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>You have unsaved changes</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to leave this page? Your changes will be lost unless you save them.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={cancelNavigation}>Cancel</AlertDialogCancel>
          {onSave && <AlertDialogAction onClick={saveAndNavigate}>Save & Leave</AlertDialogAction>}
          <AlertDialogAction onClick={confirmNavigation}>Discard Changes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return { showBlocker, BlockerDialog };
}
