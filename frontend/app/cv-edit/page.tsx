"use client";

import EditCVForm from "@/components/EditCVForm";
export const metadata = {
  title: "Edit CV",
};

import { useAuth } from "@/context/AuthContext";
export const metadata = {
  title: "Edit CV",
};

import { useRouter } from "next/navigation";
export const metadata = {
  title: "Edit CV",
};

import { useEffect } from "react";
export const metadata = {
  title: "Edit CV",
};


export default function CvEditPage() {
  const { session, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !session) {
      router.push("/");
    }
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
        <EditCVForm />
      </div>
    </div>
  );
}

