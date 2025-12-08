"use client";

import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

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
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
