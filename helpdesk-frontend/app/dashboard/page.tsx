"use client";

import Link from "next/link";
import UserHeader from "@/components/UserHeader";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <UserHeader />

      <main className="max-w-6xl mx-auto px-4 py-6">
        <section className="mb-6">
          <h1 className="text-xl font-semibold text-slate-900">
            Welcome to ATG Help Desk
          </h1>
          <p className="text-sm text-slate-500">
            Choose a category to create a new request or open your ticket list.
          </p>
        </section>

        {/* Quick actions */}
        <section className="grid gap-4 md:grid-cols-3 mb-6">
          <Link href="/tickets/IT">
            <div className="cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-xs font-semibold text-sky-600 mb-1">
                IT SUPPORT
              </p>
              <p className="text-sm font-medium text-slate-900">
                Computer, printer & software issues
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Create a ticket for PC, network, program or printer problems.
              </p>
            </div>
          </Link>

          <Link href="/tickets/TRANSPORT">
            <div className="cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-xs font-semibold text-emerald-600 mb-1">
                TRANSPORT
              </p>
              <p className="text-sm font-medium text-slate-900">
                Driver & car requests
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Request a driver from office to bank or another location.
              </p>
            </div>
          </Link>

          <Link href="/tickets/ADMINISTRATION">
            <div className="cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-xs font-semibold text-amber-600 mb-1">
                ADMINISTRATION
              </p>
              <p className="text-sm font-medium text-slate-900">
                Office supplies & services
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Water, pens, paper and other administrative needs.
              </p>
            </div>
          </Link>
        </section>

        {/* My tickets shortcut */}
        <section className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-900">
              My tickets overview
            </p>
            <p className="text-xs text-slate-500">
              View all your open, in progress and closed tickets.
            </p>
          </div>
          <Link
            href="/my-tickets"
            className="px-3 py-1.5 rounded-full border border-slate-300 bg-white text-xs text-slate-700 hover:bg-slate-50"
          >
            Go to My tickets
          </Link>
        </section>
      </main>
    </div>
  );
}
