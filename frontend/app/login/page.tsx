"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const SUPABASE_URL = "https://ifihphvlwrqijhcwkzvt.supabase.co";

// NB: Sørg for at du har denne i frontend/.env.local:
// NEXT_PUBLIC_SUPABASE_ANON_KEY=... (anon key fra Supabase)
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin() {
    if (!SUPABASE_ANON_KEY) {
      alert("Mangler NEXT_PUBLIC_SUPABASE_ANON_KEY i .env.local (frontend)");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(
        `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: SUPABASE_ANON_KEY,
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (!res.ok) {
        console.error("Login failed:", await res.text());
        alert("Login failed – sjekk e-post / passord i Supabase Auth");
        return;
      }

      const data = await res.json();

      // ✅ Dette matcher SessionData i AuthContext.tsx
      login({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
      });

      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
      alert("Noe gikk galt ved innlogging");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center mt-20 gap-4">
      <h1 className="text-2xl font-bold">Login</h1>

      <input
        type="email"
        placeholder="Email"
        className="border p-2 rounded w-64"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 rounded w-64"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        disabled={isLoading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
      >
        {isLoading ? "Logger inn..." : "Login"}
      </button>
    </div>
  );
}
