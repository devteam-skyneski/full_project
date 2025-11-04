"use client";

import React, { useEffect, useMemo, useState } from "react";

type ParentProfile = {
  parentName: string;
  phone: string;
  role: "Mother" | "Father" | "Guardian";
  email: string;
  studentName: string;
};

type ApiState = {
  loading: boolean;
  error: string | null;
  success: string | null;
};

const emptyProfile: ParentProfile = {
  parentName: "",
  phone: "",
  role: "Mother",
  email: "",
  studentName: "",
};

export default function ParentProfilePage() {
  const [profile, setProfile] = useState<ParentProfile>(emptyProfile);
  const [initial, setInitial] = useState<ParentProfile | null>(null);
  const [password, setPassword] = useState<string>("");
  const [state, setState] = useState<ApiState>({ loading: true, error: null, success: null });

  const isDirty = useMemo(() => {
    if (!initial) return false;
    const comparableNow = { ...profile };
    const comparableInit = { ...initial };
    return JSON.stringify(comparableNow) !== JSON.stringify(comparableInit) || password.length > 0;
  }, [profile, initial, password]);

  const isValid = useMemo(() => {
    const emailValid = /.+@.+\..+/.test(profile.email);
    const phoneValid = /^\d{7,15}$/.test(profile.phone.replace(/\D/g, ""));
    return !!profile.parentName && !!profile.studentName && emailValid && phoneValid;
  }, [profile]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setState(s => ({ ...s, loading: true, error: null, success: null }));
        const res = await fetch("/api/parent/profile", { credentials: "include" });
        if (res.status === 401) {
          window.location.assign("/auth");
          return;
        }
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        if (!mounted) return;
        setProfile(data.profile as ParentProfile);
        setInitial(data.profile as ParentProfile);
      } catch (e: any) {
        if (!mounted) return;
        setState(s => ({ ...s, error: e?.message || "Failed to load profile" }));
      } finally {
        if (mounted) setState(s => ({ ...s, loading: false }));
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const handleChange = (key: keyof ParentProfile, value: string) => {
    setProfile(p => ({ ...p, [key]: value }));
  };

  const handleSave = async () => {
    if (!isValid || !isDirty) return;
    try {
      setState({ loading: true, error: null, success: null });
      const res = await fetch("/api/parent/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ profile, password: password || undefined }),
      });
      if (res.status === 401) {
        window.location.assign("/auth");
        return;
      }
      const body = await res.json();
      if (!res.ok) throw new Error(body?.error || "Failed to update");
      setInitial(profile);
      setPassword("");
      setState({ loading: false, error: null, success: "Profile updated successfully" });
    } catch (e: any) {
      setState({ loading: false, error: e?.message || "Update failed", success: null });
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Parent Profile</h1>

        {state.loading && (
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <svg className="animate-spin h-4 w-4 text-gray-600" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
            Loading profile…
          </div>
        )}

        {state.error && (
          <div className="mb-3 rounded-md bg-red-50 border border-red-200 px-3 py-2 text-red-700 text-sm">{state.error}</div>
        )}
        {state.success && (
          <div className="mb-3 rounded-md bg-green-50 border border-green-200 px-3 py-2 text-green-700 text-sm">{state.success}</div>
        )}

        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          {/* Parent Info */}
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Parent Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Parent Name</label>
              <input value={profile.parentName} onChange={e => handleChange("parentName", e.target.value)} className="w-full rounded-md border-gray-300 text-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500" type="text" placeholder="Enter name" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Parent Phone Number</label>
              <input value={profile.phone} onChange={e => handleChange("phone", e.target.value)} className="w-full rounded-md border-gray-300 text-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500" type="tel" inputMode="numeric" placeholder="e.g. 9876543210" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Parent Role</label>
              <select value={profile.role} onChange={e => handleChange("role", e.target.value)} className="w-full rounded-md border-gray-300 text-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500">
                <option>Mother</option>
                <option>Father</option>
                <option>Guardian</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Gmail</label>
              <input value={profile.email} onChange={e => handleChange("email", e.target.value)} className="w-full rounded-md border-gray-300 text-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500" type="email" placeholder="name@gmail.com" />
              <p className="text-[11px] text-gray-500 mt-1">Changing email may require re‑verification.</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Password (optional)</label>
              <input value={password} onChange={e => setPassword(e.target.value)} className="w-full rounded-md border-gray-300 text-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500" type="password" placeholder="Enter new password" />
            </div>
          </div>

          {/* Student Info */}
          <h2 className="text-lg font-semibold text-gray-900 mt-5 mb-3">Student Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Student Name</label>
              <input value={profile.studentName} onChange={e => handleChange("studentName", e.target.value)} className="w-full rounded-md border-gray-300 text-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500" type="text" placeholder="Enter student name" />
            </div>
          </div>

          {/* Actions */}
          <div className="mt-5 flex items-center gap-3">
            <button
              onClick={handleSave}
              disabled={!isDirty || !isValid || state.loading}
              className={`px-4 py-2 rounded-lg text-white text-sm font-medium ${!isDirty || !isValid || state.loading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
            >
              Save Changes
            </button>
            <button
              onClick={() => { if (initial) setProfile(initial); setPassword(""); setState(s => ({ ...s, success: null, error: null })); }}
              disabled={state.loading || !isDirty}
              className={`px-4 py-2 rounded-lg text-sm font-medium border ${state.loading || !isDirty ? 'text-gray-400 border-gray-200 cursor-not-allowed' : 'text-gray-700 border-gray-300 hover:bg-gray-50'}`}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}


