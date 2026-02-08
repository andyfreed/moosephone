"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/Logo";
import { useAuth } from "@/lib/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const { signIn, signUp } = useAuth();

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    if (isSignUp) {
      const err = await signUp(email, password, fullName);
      if (err) {
        setError(err);
      } else {
        setMessage("Check your email to confirm your account, then sign in.");
        setIsSignUp(false);
      }
    } else {
      const err = await signIn(email, password);
      if (err) {
        setError(err);
      } else {
        router.push("/");
      }
    }

    setLoading(false);
  }

  return (
    <div className="grid-floor flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="rounded-xl border border-dark-border bg-dark-card p-8 text-center">
          <Logo size={60} className="mx-auto mb-6" />
          <h1 className="mb-6 text-xl font-bold text-white">
            {isSignUp ? "Create Account" : "Sign In"}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <input
                type="text"
                placeholder="Full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-lg border border-dark-border bg-dark-bg px-4 py-3 text-white placeholder-gray-600 focus:border-neon-cyan focus:outline-none"
              />
            )}
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-dark-border bg-dark-bg px-4 py-3 text-white placeholder-gray-600 focus:border-neon-cyan focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full rounded-lg border border-dark-border bg-dark-bg px-4 py-3 text-white placeholder-gray-600 focus:border-neon-cyan focus:outline-none"
            />

            {error && (
              <p className="text-sm text-red-400">{error}</p>
            )}
            {message && (
              <p className="text-sm text-neon-cyan">{message}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-neon w-full rounded-lg disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Please wait..."
                : isSignUp
                ? "Create Account"
                : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-500">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => { setIsSignUp(!isSignUp); setError(""); setMessage(""); }}
              className="text-neon-cyan hover:underline"
            >
              {isSignUp ? "Sign in" : "Sign up"}
            </button>
          </p>

          <Link href="/" className="mt-4 inline-block text-sm text-gray-500 hover:text-neon-pink">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
