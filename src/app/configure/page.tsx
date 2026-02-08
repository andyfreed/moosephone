"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { PHONE_MODELS, type PhoneExtension, type PhoneModelId } from "@/lib/types";

function ConfigureForm() {
  const searchParams = useSearchParams();
  const preselectedModel = searchParams.get("model") as PhoneModelId | null;

  const [selectedModel, setSelectedModel] = useState<PhoneModelId>(
    preselectedModel && PHONE_MODELS.some((m) => m.id === preselectedModel)
      ? preselectedModel
      : "standard"
  );
  const [quantity, setQuantity] = useState(1);
  const [extensions, setExtensions] = useState<PhoneExtension[]>([
    { name: "", extension: "100", email: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const phone = PHONE_MODELS.find((m) => m.id === selectedModel)!;
  const total = phone.priceMonthly * quantity;

  function updateQuantity(newQty: number) {
    if (newQty < 1) return;
    if (newQty > 50) return;
    setQuantity(newQty);

    const newExtensions = [...extensions];
    if (newQty > extensions.length) {
      for (let i = extensions.length; i < newQty; i++) {
        newExtensions.push({
          name: "",
          extension: String(100 + i),
          email: "",
        });
      }
    } else {
      newExtensions.length = newQty;
    }
    setExtensions(newExtensions);
  }

  function updateExtension(index: number, field: keyof PhoneExtension, value: string) {
    const updated = [...extensions];
    updated[index] = { ...updated[index], [field]: value };
    setExtensions(updated);
  }

  async function handleCheckout() {
    setError("");

    // Validate
    for (let i = 0; i < extensions.length; i++) {
      if (!extensions[i].name.trim()) {
        setError(`Please enter a name for phone ${i + 1}`);
        return;
      }
      if (!extensions[i].extension.trim()) {
        setError(`Please enter an extension for phone ${i + 1}`);
        return;
      }
    }

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: selectedModel,
          quantity,
          extensions,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Checkout failed");
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid-floor min-h-screen px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-3xl font-bold text-white sm:text-4xl">
          Configure Your <span className="text-neon-pink">Phones</span>
        </h1>
        <p className="mb-10 text-gray-400">
          Select your phone model, set the quantity, and configure each extension.
        </p>

        {/* Step 1: Phone Model */}
        <div className="mb-8 rounded-xl border border-dark-border bg-dark-card p-6">
          <h2 className="mb-4 text-lg font-semibold text-neon-cyan">
            1. Choose Phone Model
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {PHONE_MODELS.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedModel(m.id as PhoneModelId)}
                className={`rounded-lg border p-4 text-left transition-all ${
                  selectedModel === m.id
                    ? "border-neon-pink box-glow-pink bg-neon-pink/5"
                    : "border-dark-border hover:border-gray-600"
                }`}
              >
                <div className="text-sm font-bold text-white">{m.name}</div>
                <div className="mt-1 text-xs text-gray-400">{m.description}</div>
                <div className="mt-2 text-lg font-bold text-neon-cyan">
                  ${m.priceMonthly}<span className="text-xs text-gray-500">/mo</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Quantity */}
        <div className="mb-8 rounded-xl border border-dark-border bg-dark-card p-6">
          <h2 className="mb-4 text-lg font-semibold text-neon-cyan">
            2. How Many Phones?
          </h2>
          <div className="flex items-center gap-4">
            <button
              onClick={() => updateQuantity(quantity - 1)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-dark-border text-xl text-white transition-colors hover:border-neon-pink"
            >
              -
            </button>
            <input
              type="number"
              min={1}
              max={50}
              value={quantity}
              onChange={(e) => updateQuantity(parseInt(e.target.value) || 1)}
              className="h-10 w-20 rounded-lg border border-dark-border bg-dark-bg text-center text-white focus:border-neon-cyan focus:outline-none"
            />
            <button
              onClick={() => updateQuantity(quantity + 1)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-dark-border text-xl text-white transition-colors hover:border-neon-pink"
            >
              +
            </button>
            <span className="text-sm text-gray-400">
              {quantity} phone{quantity !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Step 3: Extensions */}
        <div className="mb-8 rounded-xl border border-dark-border bg-dark-card p-6">
          <h2 className="mb-4 text-lg font-semibold text-neon-cyan">
            3. Configure Extensions
          </h2>
          <div className="space-y-4">
            {extensions.map((ext, i) => (
              <div
                key={i}
                className="rounded-lg border border-dark-border bg-dark-bg p-4"
              >
                <div className="mb-2 text-sm font-medium text-neon-pink">
                  Phone {i + 1}
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div>
                    <label className="mb-1 block text-xs text-gray-500">
                      User Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Smith"
                      value={ext.name}
                      onChange={(e) => updateExtension(i, "name", e.target.value)}
                      className="w-full rounded-lg border border-dark-border bg-dark-card px-3 py-2 text-sm text-white placeholder-gray-600 focus:border-neon-cyan focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-gray-500">
                      Extension
                    </label>
                    <input
                      type="text"
                      placeholder="100"
                      value={ext.extension}
                      onChange={(e) => updateExtension(i, "extension", e.target.value)}
                      className="w-full rounded-lg border border-dark-border bg-dark-card px-3 py-2 text-sm text-white placeholder-gray-600 focus:border-neon-cyan focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-gray-500">
                      Email (optional)
                    </label>
                    <input
                      type="email"
                      placeholder="john@company.com"
                      value={ext.email}
                      onChange={(e) => updateExtension(i, "email", e.target.value)}
                      className="w-full rounded-lg border border-dark-border bg-dark-card px-3 py-2 text-sm text-white placeholder-gray-600 focus:border-neon-cyan focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="mb-8 rounded-xl border border-neon-cyan/30 bg-dark-card p-6 box-glow-cyan">
          <h2 className="mb-4 text-lg font-semibold text-neon-cyan">
            Order Summary
          </h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-300">
              <span>{phone.name}</span>
              <span>${phone.priceMonthly}/mo each</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Quantity</span>
              <span>&times; {quantity}</span>
            </div>
            <div className="border-t border-dark-border pt-2">
              <div className="flex justify-between text-lg font-bold">
                <span className="text-white">Monthly Total</span>
                <span className="text-neon-cyan">${total.toFixed(2)}/mo</span>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="btn-neon w-full rounded-lg text-lg disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Redirecting to checkout..." : `Proceed to Checkout - $${total.toFixed(2)}/mo`}
        </button>
      </div>
    </div>
  );
}

export default function ConfigurePage() {
  return (
    <Suspense
      fallback={
        <div className="grid-floor flex min-h-screen items-center justify-center">
          <div className="text-neon-cyan">Loading...</div>
        </div>
      }
    >
      <ConfigureForm />
    </Suspense>
  );
}
