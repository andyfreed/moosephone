"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import { useAuth } from "@/lib/auth-context";

interface PhoneEntry {
  id: string;
  mac_address: string;
  model: string;
  assigned_to: string | null;
  assigned_extension: string | null;
  status: "available" | "assigned" | "active";
}

export default function AdminPage() {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const router = useRouter();

  const [phones, setPhones] = useState<PhoneEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [newMac, setNewMac] = useState("");
  const [newModel, setNewModel] = useState("Standard");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<PhoneEntry>>({});

  const getAuthHeaders = useCallback(async () => {
    const { getSupabaseClient } = await import("@/lib/supabase");
    const supabase = getSupabaseClient();
    const { data: { session } } = await supabase.auth.getSession();
    return {
      Authorization: `Bearer ${session?.access_token ?? ""}`,
      "Content-Type": "application/json",
    };
  }, []);

  const fetchPhones = useCallback(async () => {
    setLoading(true);
    try {
      const headers = await getAuthHeaders();
      const res = await fetch("/api/admin/phones", { headers });
      if (!res.ok) throw new Error("Failed to load phones");
      const data = await res.json();
      setPhones(data);
    } catch {
      setPhones([]);
    } finally {
      setLoading(false);
    }
  }, [getAuthHeaders]);

  useEffect(() => {
    if (!authLoading && user && isAdmin) {
      fetchPhones();
    }
  }, [authLoading, user, isAdmin, fetchPhones]);

  async function addPhone() {
    const mac = newMac.trim().toUpperCase();
    if (!mac) return;

    const macRegex = /^([0-9A-F]{2}[:\-]){5}([0-9A-F]{2})$/;
    if (!macRegex.test(mac)) {
      alert("Please enter a valid MAC address (e.g., AA:BB:CC:DD:EE:FF)");
      return;
    }

    try {
      const headers = await getAuthHeaders();
      const res = await fetch("/api/admin/phones", {
        method: "POST",
        headers,
        body: JSON.stringify({ mac_address: mac, model: newModel }),
      });

      if (res.status === 409) {
        alert("This MAC address already exists");
        return;
      }
      if (!res.ok) throw new Error();

      setNewMac("");
      await fetchPhones();
    } catch {
      alert("Failed to add phone");
    }
  }

  async function removePhone(id: string) {
    try {
      const headers = await getAuthHeaders();
      const res = await fetch(`/api/admin/phones?id=${id}`, {
        method: "DELETE",
        headers,
      });
      if (!res.ok) throw new Error();
      await fetchPhones();
    } catch {
      alert("Failed to delete phone");
    }
  }

  function startEdit(phone: PhoneEntry) {
    setEditingId(phone.id);
    setEditValues({
      assigned_to: phone.assigned_to,
      assigned_extension: phone.assigned_extension,
      status: phone.status,
    });
  }

  async function saveEdit(id: string) {
    try {
      const headers = await getAuthHeaders();
      const res = await fetch("/api/admin/phones", {
        method: "PUT",
        headers,
        body: JSON.stringify({ id, ...editValues }),
      });
      if (!res.ok) throw new Error();
      setEditingId(null);
      setEditValues({});
      await fetchPhones();
    } catch {
      alert("Failed to save changes");
    }
  }

  // Loading state
  if (authLoading) {
    return (
      <div className="grid-floor flex min-h-screen items-center justify-center">
        <div className="text-neon-cyan">Loading...</div>
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <div className="grid-floor flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="rounded-xl border border-dark-border bg-dark-card p-8 text-center">
            <Logo size={60} className="mx-auto mb-6" />
            <h1 className="mb-4 text-xl font-bold text-white">Admin Access</h1>
            <p className="mb-6 text-sm text-gray-400">
              You need to sign in to access the admin panel.
            </p>
            <button
              onClick={() => router.push("/login")}
              className="btn-neon w-full rounded-lg"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Not an admin
  if (!isAdmin) {
    return (
      <div className="grid-floor flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="rounded-xl border border-dark-border bg-dark-card p-8 text-center">
            <Logo size={60} className="mx-auto mb-6" />
            <h1 className="mb-4 text-xl font-bold text-white">Access Denied</h1>
            <p className="mb-6 text-sm text-gray-400">
              Your account does not have admin privileges.
            </p>
            <button
              onClick={() => router.push("/")}
              className="btn-neon w-full rounded-lg"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid-floor min-h-screen px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Phone <span className="text-neon-pink">Inventory</span>
            </h1>
            <p className="text-gray-400">
              Manage MAC addresses and phone assignments
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">{user.email}</span>
            <button
              onClick={signOut}
              className="text-sm text-gray-500 hover:text-neon-pink"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Add Phone */}
        <div className="mb-8 rounded-xl border border-dark-border bg-dark-card p-6">
          <h2 className="mb-4 text-lg font-semibold text-neon-cyan">
            Add Phone
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              placeholder="MAC Address (AA:BB:CC:DD:EE:FF)"
              value={newMac}
              onChange={(e) => setNewMac(e.target.value)}
              className="flex-1 rounded-lg border border-dark-border bg-dark-bg px-4 py-2 text-white placeholder-gray-600 focus:border-neon-cyan focus:outline-none"
            />
            <select
              value={newModel}
              onChange={(e) => setNewModel(e.target.value)}
              className="rounded-lg border border-dark-border bg-dark-bg px-4 py-2 text-white focus:border-neon-cyan focus:outline-none"
            >
              <option>Standard</option>
              <option>Professional</option>
              <option>Executive</option>
            </select>
            <button onClick={addPhone} className="btn-neon btn-neon-cyan rounded-lg">
              Add Phone
            </button>
          </div>
        </div>

        {/* Phone List */}
        <div className="rounded-xl border border-dark-border bg-dark-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-dark-border text-gray-500">
                  <th className="px-6 py-4">MAC Address</th>
                  <th className="px-6 py-4">Model</th>
                  <th className="px-6 py-4">Assigned To</th>
                  <th className="px-6 py-4">Extension</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-600">
                      Loading...
                    </td>
                  </tr>
                ) : phones.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-600">
                      No phones added yet. Add MAC addresses above to get started.
                    </td>
                  </tr>
                ) : (
                  phones.map((phone) => (
                    <tr key={phone.id} className="border-b border-dark-border last:border-0">
                      <td className="px-6 py-4 font-mono text-neon-pink">
                        {phone.mac_address}
                      </td>
                      <td className="px-6 py-4 text-gray-300">{phone.model}</td>
                      <td className="px-6 py-4">
                        {editingId === phone.id ? (
                          <input
                            type="text"
                            value={editValues.assigned_to || ""}
                            onChange={(e) =>
                              setEditValues({ ...editValues, assigned_to: e.target.value })
                            }
                            className="w-full rounded border border-dark-border bg-dark-bg px-2 py-1 text-white focus:border-neon-cyan focus:outline-none"
                          />
                        ) : (
                          <span className="text-gray-300">
                            {phone.assigned_to || "-"}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {editingId === phone.id ? (
                          <input
                            type="text"
                            value={editValues.assigned_extension || ""}
                            onChange={(e) =>
                              setEditValues({ ...editValues, assigned_extension: e.target.value })
                            }
                            className="w-32 rounded border border-dark-border bg-dark-bg px-2 py-1 text-white focus:border-neon-cyan focus:outline-none"
                          />
                        ) : (
                          <span className="text-gray-300">
                            {phone.assigned_extension || "-"}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {editingId === phone.id ? (
                          <select
                            value={editValues.status || "available"}
                            onChange={(e) =>
                              setEditValues({
                                ...editValues,
                                status: e.target.value as PhoneEntry["status"],
                              })
                            }
                            className="rounded border border-dark-border bg-dark-bg px-2 py-1 text-white focus:border-neon-cyan focus:outline-none"
                          >
                            <option value="available">Available</option>
                            <option value="assigned">Assigned</option>
                            <option value="active">Active</option>
                          </select>
                        ) : (
                          <span
                            className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                              phone.status === "active"
                                ? "bg-green-500/10 text-green-400"
                                : phone.status === "assigned"
                                ? "bg-yellow-500/10 text-yellow-400"
                                : "bg-gray-500/10 text-gray-400"
                            }`}
                          >
                            {phone.status}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {editingId === phone.id ? (
                            <>
                              <button
                                onClick={() => saveEdit(phone.id)}
                                className="text-xs text-neon-cyan hover:underline"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingId(null)}
                                className="text-xs text-gray-500 hover:underline"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => startEdit(phone)}
                                className="text-xs text-neon-cyan hover:underline"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => removePhone(phone.id)}
                                className="text-xs text-red-400 hover:underline"
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {phones.length > 0 && (
          <div className="mt-4 text-right text-sm text-gray-500">
            {phones.length} phone{phones.length !== 1 ? "s" : ""} |{" "}
            {phones.filter((p) => p.status === "available").length} available |{" "}
            {phones.filter((p) => p.status === "assigned").length} assigned |{" "}
            {phones.filter((p) => p.status === "active").length} active
          </div>
        )}
      </div>
    </div>
  );
}
