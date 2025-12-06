"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type TicketCategory = "IT" | "ADMINISTRATION" | "TRANSPORT";

const ENGINEERS: Record<TicketCategory, string[]> = {
  IT: ["IT Engineer 1", "IT Engineer 2", "IT Engineer 3"],
  ADMINISTRATION: [
    "Admin Officer 1",
    "Admin Officer 2",
    "Admin Officer 3",
  ],
  TRANSPORT: [
    "Driver Coordinator 1",
    "Driver Coordinator 2",
    "Driver Coordinator 3",
  ],
};

export default function EngineerLoginPage() {
  const router = useRouter();

  const [category, setCategory] = useState<TicketCategory>("IT");
  const [engineer, setEngineer] = useState<string>(ENGINEERS.IT[0]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!engineer) {
      setError("Please select an engineer.");
      return;
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("hd_engineer_name", engineer);
      localStorage.setItem("hd_engineer_category", category);
    }

    router.push("/engineer/tickets");
  };

  const engineerOptions = ENGINEERS[category];

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-xl shadow-sm p-6">
        <h1 className="text-xl font-semibold text-slate-900 mb-1">
          Engineer Login
        </h1>
        <p className="text-sm text-slate-500 mb-6">
          Select your department and name to view assigned tickets.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-700 mb-1">
              Department
            </label>
            <select
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              value={category}
              onChange={(e) => {
                const value = e.target.value as TicketCategory;
                setCategory(value);
                setEngineer(ENGINEERS[value][0]);
              }}
            >
              <option value="IT">IT</option>
              <option value="ADMINISTRATION">Administration</option>
              <option value="TRANSPORT">Transport</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-700 mb-1">
              Engineer
            </label>
            <select
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              value={engineer}
              onChange={(e) => setEngineer(e.target.value)}
            >
              {engineerOptions.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <p className="text-xs text-red-600">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Sign in as Engineer
          </button>
        </form>

        <p className="text-xs text-slate-400 mt-6 text-center">
          IT · Administration · Transport · Engineer access
        </p>
      </div>
    </div>
  );
}
