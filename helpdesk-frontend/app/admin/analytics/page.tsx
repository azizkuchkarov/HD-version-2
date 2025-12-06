"use client";

import Link from "next/link";
import TopRightUserBadge from "@/components/TopRightUserBadge";

export default function AdminAnalyticsPage() {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Top bar */}
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">

          {/* Left: logo + title */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-sky-600 text-white flex items-center justify-center text-xs font-semibold">
              ATG
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-slate-900">
                ATG Help Desk – Analytics
              </span>
              <span className="text-[11px] text-slate-500">
                Ticket performance insights and workload metrics
              </span>
            </div>
          </div>

          {/* Center nav: including Dashboard button */}
          <nav className="hidden sm:flex items-center gap-2 text-xs">
            <Link
              href="/admin/tickets"
              className="px-3 py-1.5 rounded-full bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/analytics"
              className="px-3 py-1.5 rounded-full bg-sky-600 text-white border border-sky-600 font-medium"
            >
              Analytics
            </Link>
            <Link
              href="/engineer/login"
              className="px-3 py-1.5 rounded-full bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
            >
              Engineer login
            </Link>
          </nav>

          {/* Right: Admin badge */}
          <TopRightUserBadge />
        </div>
      </header>

      {/* Main analytics content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-xl font-semibold text-slate-900 mb-2">
          Help Desk Analytics
        </h1>
        <p className="text-xs text-slate-500 mb-6">
          Detailed breakdown of ticket volume, SLA, and Engineer workload
        </p>

        {/* PLACE YOUR ANALYTICS CHARTS BELOW */}
        <div className="border border-slate-200 bg-white rounded-xl p-6 shadow-sm text-center">
          <p className="text-sm text-slate-500">
            Analytics charts will appear here.
          </p>
        </div>
      </main>
    </div>
  );
}
