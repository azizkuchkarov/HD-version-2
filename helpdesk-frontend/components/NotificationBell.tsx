"use client";

import { useEffect, useState } from "react";

type TicketStatus = "OPEN" | "IN_PROGRESS" | "CLOSED";
type TicketPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
type TicketCategory = "IT" | "ADMINISTRATION" | "TRANSPORT";

interface Ticket {
  id: number;
  title: string;
  priority: TicketPriority;
  status: TicketStatus;
  category: TicketCategory;
  created_at: string;
}

export default function NotificationBell() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load important tickets
  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("http://127.0.0.1:8000/tickets/");
      if (!res.ok) throw new Error("Failed to load tickets");

      const data: Ticket[] = await res.json();

      // "Alarm" = open or in progress + HIGH / CRITICAL
      const hot = data
        .filter(
          (t) =>
            (t.status === "OPEN" || t.status === "IN_PROGRESS") &&
            (t.priority === "HIGH" || t.priority === "CRITICAL")
        )
        // latest first
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
        );

      setTickets(hot);
      setLastUpdated(new Date());
    } catch (e: any) {
      setError(e?.message || "Error loading alerts");
    } finally {
      setLoading(false);
    }
  };

  // Initial load + polling every 20 seconds
  useEffect(() => {
    load();
    const id = setInterval(load, 20000); // 20s
    return () => clearInterval(id);
  }, []);

  const count = tickets.length;
  const latestFive = tickets.slice(0, 5);

  return (
    <div className="relative">
      {/* Bell button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="relative inline-flex items-center justify-center h-9 w-9 rounded-full border border-slate-300 bg-white hover:bg-slate-50"
        title="Important tickets"
      >
        {/* Simple bell icon */}
        <span className="inline-block text-slate-700 text-lg leading-none">
          🔔
        </span>

        {/* Red badge */}
        {count > 0 && (
          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] min-w-[16px] h-[16px] px-1">
            {count > 9 ? "9+" : count}
          </span>
        )}
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute right-0 mt-2 w-80 rounded-xl border border-slate-200 bg-white shadow-lg z-50 text-xs">
          <div className="px-3 py-2 border-b border-slate-200 flex items-center justify-between">
            <span className="font-semibold text-slate-800">
              Important tickets
            </span>
            {lastUpdated && (
              <span className="text-[10px] text-slate-400">
                Updated {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </div>

          {loading && (
            <div className="px-3 py-2 text-slate-500 text-[11px]">
              Checking for new tickets...
            </div>
          )}

          {error && !loading && (
            <div className="px-3 py-2 text-red-600 text-[11px]">
              {error}
            </div>
          )}

          {!loading && !error && latestFive.length === 0 && (
            <div className="px-3 py-3 text-[11px] text-slate-500">
              No open HIGH or CRITICAL tickets.
            </div>
          )}

          {!loading && !error && latestFive.length > 0 && (
            <ul className="max-h-64 overflow-y-auto divide-y divide-slate-100">
              {latestFive.map((t) => (
                <li key={t.id} className="px-3 py-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] text-slate-400">
                      #{t.id} · {t.category}
                    </span>
                    <span
                      className={
                        "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] border " +
                        (t.priority === "CRITICAL"
                          ? "bg-red-50 text-red-700 border-red-300"
                          : "bg-amber-50 text-amber-700 border-amber-300")
                      }
                    >
                      {t.priority}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-800 line-clamp-2">
                    {t.title}
                  </div>
                  <div className="mt-1 text-[10px] text-slate-500">
                    Status: {t.status === "OPEN" ? "Open" : "In progress"} ·{" "}
                    {new Date(t.created_at).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="px-3 py-2 border-t border-slate-200 text-[10px] text-slate-400 flex justify-between">
            <span>Total important: {count}</span>
            <button
              type="button"
              className="text-sky-600 hover:text-sky-700"
              onClick={load}
            >
              Refresh now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
