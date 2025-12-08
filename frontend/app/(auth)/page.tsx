"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AuthPage() {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegistration = async () => {
    setError("");

    // --- Start Validation ---
    if (!email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    // --- End Validation ---

    try {
      const response = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Registration failed.");
      }

      // On successful registration (201 Created)
      router.push("/cv-creation");

    } catch (err: any) {
      setError(err.message);
    }
  };

  const { login } = useAuth();

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      const response = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.detail || "Login failed.");
      }

      // The login function from context handles storing the session and redirecting
      login(result.data);

    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{isLoginView ? "Login" : "Sign Up"}</CardTitle>
          <CardDescription>
            {isLoginView
              ? "Enter your credentials to access your account."
              : "Create an account to get started."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="student@example.com"
              required
              data-testid="email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              data-testid="password-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {!isLoginView && (
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                required
                data-testid="confirm-password-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col">
          {isLoginView ? (
            <Button className="w-full" data-testid="login-submit-button" onClick={handleLogin}>Login</Button>
          ) : (
            <Button className="w-full" data-testid="registration-submit-button" onClick={handleRegistration}>
              Create Account
            </Button>
          )}
          <p className="mt-4 text-xs text-center text-muted-foreground">
            {isLoginView ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => {
                setIsLoginView(!isLoginView);
                setError(""); // Clear errors on view switch
              }}
              className="ml-1 underline"
              data-testid={isLoginView ? "signup-link" : "login-link"}
            >
              {isLoginView ? "Sign Up" : "Login"}
            </button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
