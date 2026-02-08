"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <div className="grid-floor flex min-h-screen items-center justify-center px-6">
      <div className="max-w-lg text-center">
        <Logo size={100} className="mx-auto mb-8" />

        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full border-2 border-neon-cyan box-glow-cyan">
          <svg className="h-8 w-8 text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="mb-4 text-3xl font-bold text-white">Order Confirmed!</h1>
        <p className="mb-2 text-gray-400">
          Your Moosephone order has been placed successfully. We&apos;ll configure your phones
          and ship them out as soon as possible.
        </p>
        <p className="mb-8 text-sm text-gray-500">
          You&apos;ll receive a confirmation email with tracking details.
        </p>

        {sessionId && (
          <p className="mb-8 rounded-lg border border-dark-border bg-dark-card p-3 font-mono text-xs text-gray-500">
            Order ref: {sessionId.slice(0, 20)}...
          </p>
        )}

        <Link href="/" className="btn-neon rounded-lg">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="grid-floor flex min-h-screen items-center justify-center">
          <div className="text-neon-cyan">Loading...</div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
