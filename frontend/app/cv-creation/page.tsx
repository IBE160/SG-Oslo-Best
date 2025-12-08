"use client";

import ProfileCVForm from "@/components/ProfileCVForm";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CvCreationPage() {
  const { session, isLoading } = useAuth();
  const router = useRouter();

  // Redirect to dashboard if already logged in and not on cv-creation page
  useEffect(() => {
    if (!isLoading && !session) {
      router.push("/"); // Redirect to login if not authenticated
    }
    // TODO: Add logic to check if profile/CV already exists and redirect to dashboard
    // This would require an API call to check user's profile status
  }, [session, isLoading, router]);

  if (isLoading || !session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-lg">
        <ProfileCVForm />
      </div>
    </div>
  );
}
