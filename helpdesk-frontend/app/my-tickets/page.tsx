"use client";

import { useEffect, useState } from "react";
import UserHeader from "@/components/UserHeader";

type TicketStatus = "OPEN" | "IN_PROGRESS" | "CLOSED";
type TicketCategory = "IT" | "ADMINISTRATION" | "TRANSPORT";
type TicketPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

interface Ticket {
  id: number;
  title: string;
  description: string;
  category: TicketCategory;
  status: TicketStatus;
  priority: TicketPriority;
  requester_email: string | null;
  assigned_engineer: string | null;
  created_at: string;
  updated_at: string;
}

const STATUS_LABELS: Record<TicketStatus, string> = {
  OPEN: "Open",
  IN_PROGRESS: "In progress",
  CLOSED: "Closed",
};

const CATEGORY_LABELS: Record<TicketCategory, string> = {
  IT: "IT",
  ADMINISTRATION: "Administration",
  TRANSPORT: "Transport",
};

const PRIORITY_LABELS: Record<TicketPriority, string> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  CRITICAL: "Critical",
};

export default function MyTicketsPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedEmail =
      typeof window !== "undefined" ? localStorage.getItem("hd_email") : null;
    setEmail(storedEmail);

    if (!storedEmail) {
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("http://127.0.0.1:8000/tickets/");
        if (!res.ok) throw new Error("Failed to load tickets");

        const data: Ticket[] = await res.json();

        const mine = data.filter(
          (t) =>
            t.requester_email &&
            t.requester_email.toLowerCase() === storedEmail.toLowerCase()
        );

        setTickets(mine);
      } catch (e: any) {
        setError(e?.message || "Error loading tickets");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      <UserHeader />

      <div className="max-w-5xl mx-auto px-4 py-6">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-900">
            My tickets
          </h1>
          <p className="text-sm text-slate-500">
            View your submitted requests with priority, status and assigned engineer.
          </p>
        </header>

        {!email && (
          <p className="text-sm text-slate-500 mb-4">
            No user email found. Please sign in again from the login page.
          </p>
        )}

        {error && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-sm text-slate-600">Loading tickets...</p>
        ) : tickets.length === 0 ? (
          <p className="text-sm text-slate-500">
            You have no tickets yet.
          </p>
        ) : (
          <div className="overflow-x-auto bg-white border border-slate-200 rounded-xl shadow-sm">
            <table className="min-w-full text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-3 py-2 font-medium text-slate-600">ID</th>
                  <th className="px-3 py-2 font-medium text-slate-600">
                    Title
                  </th>
                  <th className="px-3 py-2 font-medium text-slate-600">
                    Category
                  </th>
                  <th className="px-3 py-2 font-medium text-slate-600">
                    Priority
                  </th>
                  <th className="px-3 py-2 font-medium text-slate-600">
                    Status
                  </th>
                  <th className="px-3 py-2 font-medium text-slate-600">
                    Engineer
                  </th>
                  <th className="px-3 py-2 font-medium text-slate-600">
                    Created
                  </th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((t) => (
                  <tr
                    key={t.id}
                    className="border-b border-slate-100 last:border-0"
                  >
                    <td className="px-3 py-2 text-slate-700">{t.id}</td>

                    <td className="px-3 py-2 text-slate-800">
                      <div className="font-medium">{t.title}</div>
                      <div className="text-[11px] text-slate-500 line-clamp-2">
                        {t.description}
                      </div>
                    </td>

                    <td className="px-3 py-2">
                      <span className="inline-flex items-center rounded-full border border-slate-300 bg-slate-50 px-2 py-0.5 text-[11px] text-slate-700">
                        {CATEGORY_LABELS[t.category]}
                      </span>
                    </td>

                    <td className="px-3 py-2">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] border ${
                          t.priority === "CRITICAL"
                            ? "bg-red-50 text-red-700 border-red-200"
                            : t.priority === "HIGH"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : t.priority === "MEDIUM"
                            ? "bg-sky-50 text-sky-700 border-sky-200"
                            : "bg-slate-50 text-slate-700 border-slate-200"
                        }`}
                      >
                        {PRIORITY_LABELS[t.priority]}
                      </span>
                    </td>

                    <td className="px-3 py-2">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] ${
                          t.status === "OPEN"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : t.status === "IN_PROGRESS"
                            ? "bg-sky-50 text-sky-700 border border-sky-200"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        }`}
                      >
                        {STATUS_LABELS[t.status]}
                      </span>
                    </td>

                    <td className="px-3 py-2 text-slate-500">
                      {t.assigned_engineer || "-"}
                    </td>

                    <td className="px-3 py-2 text-slate-500">
                      {new Date(t.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
