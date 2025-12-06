"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type Mode = "USER" | "ADMIN";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("USER");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [adminName, setAdminName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (typeof window === "undefined") return;

      if (mode === "USER") {
        if (!fullName || !email) {
          throw new Error("Please enter full name and email.");
        }

        localStorage.setItem("hd_full_name", fullName);
        localStorage.setItem("hd_email", email);
        localStorage.setItem("hd_role", "USER");
        // Clear engineer/admin info if any
        localStorage.removeItem("hd_engineer_name");
        localStorage.removeItem("hd_admin_name");

        router.push("/dashboard");
      } else {
        // ADMIN
        if (!adminName) {
          throw new Error("Please enter admin name.");
        }

        localStorage.setItem("hd_full_name", adminName);
        localStorage.setItem("hd_role", "ADMIN");
        // Email optional for admin
        if (email) {
          localStorage.setItem("hd_email", email);
        }
        // Clear engineer info if any
        localStorage.removeItem("hd_engineer_name");
        localStorage.setItem("hd_admin_name", adminName);

        router.push("/admin/tickets");
      }
    } catch (err: any) {
      setError(err?.message || "Login error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
        {/* Logo / title */}
        <div className="flex items-center gap-2 mb-4">
          <div className="h-9 w-9 rounded-xl bg-sky-600 text-white flex items-center justify-center text-sm font-semibold">
            ATG
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-900">
              ATG Help Desk
            </span>
            <span className="text-xs text-slate-500">
              Internal support system
            </span>
          </div>
        </div>

        {/* Mode switch */}
        <div className="inline-flex mb-4 rounded-full bg-slate-100 p-1 border border-slate-200 text-xs">
          <button
            type="button"
            onClick={() => setMode("USER")}
            className={`px-3 py-1.5 rounded-full font-medium ${
              mode === "USER"
                ? "bg-white shadow-sm text-slate-900"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Employee login
          </button>
          <button
            type="button"
            onClick={() => setMode("ADMIN")}
            className={`px-3 py-1.5 rounded-full font-medium ${
              mode === "ADMIN"
                ? "bg-white shadow-sm text-slate-900"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Admin login
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === "USER" ? (
            <>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Full name
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="Aziz Kuchkarov"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Corporate email
                </label>
                <input
                  type="email"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="aziz.kuchkarov@atg.uz"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Admin name
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="Help Desk Admin"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Email (optional)
                </label>
                <input
                  type="email"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="admin@atg.uz"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </>
          )}

          {error && (
            <p className="text-xs text-red-600 mt-1">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-lg bg-sky-600 py-2.5 text-sm font-medium text-white hover:bg-sky-700 disabled:bg-sky-400 transition-colors"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-4 text-[11px] text-slate-400">
          Engineers can continue to use the dedicated{" "}
          <span className="font-medium text-slate-600">
            /engineer/login
          </span>{" "}
          page.
        </p>
      </div>
    </div>
  );
}
