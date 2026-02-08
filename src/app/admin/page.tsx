"use client";

import { useState, useCallback } from "react";
import Logo from "@/components/Logo";

interface PhoneEntry {
  id: string;
  mac_address: string;
  model: string;
  assigned_to: string | null;
  assigned_extension: string | null;
  status: "available" | "assigned" | "active";
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const [phones, setPhones] = useState<PhoneEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [newMac, setNewMac] = useState("");
  const [newModel, setNewModel] = useState("Standard");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<PhoneEntry>>({});

  const authHeaders = useCallback(
    () => ({ Authorization: `Bearer ${password}`, "Content-Type": "application/json" }),
    [password]
  );

  async function fetchPhones(pwd: string) {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/phones", {
        headers: { Authorization: `Bearer ${pwd}` },
      });
      if (!res.ok) throw new Error("Failed to load phones");
      const data = await res.json();
      setPhones(data);
    } catch {
      setPhones([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin() {
    setAuthError("");
    try {
      const res = await fetch("/api/admin/phones", {
        headers: { Authorization: `Bearer ${password}` },
      });
      if (res.status === 401) {
        setAuthError("Invalid password");
        return;
      }
      if (!res.ok) throw new Error();
      const data = await res.json();
      setPhones(data);
      setAuthenticated(true);
    } catch {
      setAuthError("Failed to connect");
    }
  }

  async function addPhone() {
    const mac = newMac.trim().toUpperCase();
    if (!mac) return;

    const macRegex = /^([0-9A-F]{2}[:\-]){5}([0-9A-F]{2})$/;
    if (!macRegex.test(mac)) {
      alert("Please enter a valid MAC address (e.g., AA:BB:CC:DD:EE:FF)");
      return;
    }

    try {
      const res = await fetch("/api/admin/phones", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ mac_address: mac, model: newModel }),
      });

      if (res.status === 409) {
        alert("This MAC address already exists");
        return;
      }
      if (!res.ok) throw new Error();

      setNewMac("");
      await fetchPhones(password);
    } catch {
      alert("Failed to add phone");
    }
  }

  async function removePhone(id: string) {
    try {
      const res = await fetch(`/api/admin/phones?id=${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error();
      await fetchPhones(password);
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
      const res = await fetch("/api/admin/phones", {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify({ id, ...editValues }),
      });
      if (!res.ok) throw new Error();
      setEditingId(null);
      setEditValues({});
      await fetchPhones(password);
    } catch {
      alert("Failed to save changes");
    }
  }

  if (!authenticated) {
    return (
      <div className="grid-floor flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="rounded-xl border border-dark-border bg-dark-card p-8 text-center">
            <Logo size={60} className="mx-auto mb-6" />
            <h1 className="mb-6 text-xl font-bold text-white">Admin Access</h1>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="mb-4 w-full rounded-lg border border-dark-border bg-dark-bg px-4 py-3 text-white placeholder-gray-600 focus:border-neon-cyan focus:outline-none"
            />
            {authError && (
              <p className="mb-4 text-sm text-red-400">{authError}</p>
            )}
            <button onClick={handleLogin} className="btn-neon w-full rounded-lg">
              Login
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
          <button
            onClick={() => { setAuthenticated(false); setPassword(""); }}
            className="text-sm text-gray-500 hover:text-neon-pink"
          >
            Logout
          </button>
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
