"use client";

import { useState, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [showPopup, setShowPopup] = useState(false);
  const { session, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Show popup on component mount
    setShowPopup(true);
  }, []);
  
  // This effect handles redirection if the user is not authenticated.
  useEffect(() => {
    if (!isLoading && !session) {
      router.push('/'); // Redirect to login/auth page
    }
  }, [isLoading, session, router]);


  const handleUpdateCv = () => {
    // Logic to navigate to the CV update page
    // For now, we'll just close the popup
    setShowPopup(false);
    // router.push('/cv-management'); // This would be the actual navigation
  };

  if (isLoading || !session) {
    // Render a loading state or nothing while checking auth and redirecting
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome to your dashboard.</p>
      
      <AlertDialog open={showPopup} onOpenChange={setShowPopup}>
        <AlertDialogContent data-testid="update-cv-popup">
          <AlertDialogHeader>
            <AlertDialogTitle>Welcome Back!</AlertDialogTitle>
            <AlertDialogDescription>
              Would you like to update your CV information?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Later</AlertDialogCancel>
            <AlertDialogAction onClick={handleUpdateCv}>Update CV</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
