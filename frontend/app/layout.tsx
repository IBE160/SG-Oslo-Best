"use client";

import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { UnsavedChangesProvider } from "@/context/UnsavedChangesContext";
import UnsavedChangesIndicator from "@/components/UnsavedChangesIndicator";
import { QueryClientProvider } from "@tanstack/react-query"; // Import QueryClientProvider
import { queryClient } from "@/lib/query-client"; // Import queryClient
import { Toaster } from "@/components/ui/toaster"; // Import Toaster

// Metadata cannot be exported from a client component.
// This can be handled by moving it to a server component parent layout if needed.
// For now, we will comment it out to make the layout a client component.
// export const metadata: Metadata = {
//   title: "CVAI Turbo",
//   description: "Generate cover letters with AI",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <UnsavedChangesProvider>
          <QueryClientProvider client={queryClient}> {/* Wrap with QueryClientProvider */}
            <AuthProvider>{children}</AuthProvider>
            <UnsavedChangesIndicator />
            <Toaster /> {/* Add Toaster here */}
          </QueryClientProvider>
        </UnsavedChangesProvider>
      </body>
    </html>
  );
}
