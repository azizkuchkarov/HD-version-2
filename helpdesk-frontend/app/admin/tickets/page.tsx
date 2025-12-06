"use client";

import { useState } from "react";

type Priority = "HIGH" | "MEDIUM" | "LOW";
type Status = "NEW" | "IN_PROGRESS" | "CLOSED";

interface Ticket {
  id: number;
  title: string;
  department: "IT" | "ADMINISTRATION" | "TRANSPORT";
  priority: Priority;
  status: Status;
  createdAt: string;
  assignedTo?: string;
  description?: string;
}

const mockTickets: Ticket[] = [
  {
    id: 428,
    title: "SCADA workstation network issue",
    department: "IT",
    priority: "HIGH",
    status: "NEW",
    createdAt: "2025-12-01 08:40",
    assignedTo: "R. Andrey",
    description:
      "Operator reports intermittent loss of connectivity on SCADA workstation in control room 2.",
  },
  {
    id: 429,
    title: "VPN access for remote station",
    department: "IT",
    priority: "MEDIUM",
    status: "IN_PROGRESS",
    createdAt: "2025-12-01 09:15",
    assignedTo: "Network Team",
    description:
      "New VPN profile required for remote gas metering station engineer.",
  },
  {
    id: 430,
    title: "Transport to compressor station CS-3",
    department: "TRANSPORT",
    priority: "LOW",
    status: "NEW",
    createdAt: "2025-12-01 10:20",
    description:
      "Vehicle needed for team visit to CS-3 for scheduled inspection.",
  },
  {
    id: 414,
    title: "Gas metering report export issue resolved",
    department: "IT",
    priority: "MEDIUM",
    status: "CLOSED",
    createdAt: "2025-11-30 16:05",
    assignedTo: "Apps Support",
    description:
      "Export to XLSX from gas metering portal fixed after patch deployment.",
  },
  {
    id: 401,
    title: "Office lighting maintenance completed",
    department: "ADMINISTRATION",
    priority: "LOW",
    status: "CLOSED",
    createdAt: "2025-11-29 11:30",
    assignedTo: "Facilities",
    description: "Lighting replaced in corridor and meeting rooms on 3rd floor.",
  },
];

function getPriorityBadge(priority: Priority) {
  switch (priority) {
    case "HIGH":
      return {
        label: "HIGH",
        className:
          "border border-red-400/80 bg-red-500/10 text-red-300",
        barClass: "bg-red-400",
      };
    case "MEDIUM":
      return {
        label: "MED",
        className:
          "border border-amber-400/80 bg-amber-500/10 text-amber-200",
        barClass: "bg-amber-400",
      };
    case "LOW":
      return {
        label: "LOW",
        className:
          "border border-emerald-400/80 bg-emerald-500/10 text-emerald-200",
        barClass: "bg-emerald-400",
      };
    default:
      return {
        label: priority,
        className:
          "border border-slate-500/80 bg-slate-700/40 text-slate-200",
        barClass: "bg-slate-400",
      };
  }
}

function getStatusChip(status: Status) {
  switch (status) {
    case "NEW":
      return {
        label: "NEW",
        className:
          "border border-cyan-400/80 bg-cyan-500/10 text-cyan-200",
      };
    case "IN_PROGRESS":
      return {
        label: "IN PROGRESS",
        className:
          "border border-orange-400/80 bg-orange-500/10 text-orange-200",
      };
    case "CLOSED":
      return {
        label: "CLOSED",
        className:
          "border border-slate-500/80 bg-slate-700/40 text-slate-300",
      };
    default:
      return {
        label: status,
        className:
          "border border-slate-500/80 bg-slate-700/40 text-slate-300",
      };
  }
}

function getDepartmentLabel(dept: Ticket["department"]) {
  switch (dept) {
    case "IT":
      return { label: "IT", icon: "💻" };
    case "ADMINISTRATION":
      return { label: "ADM", icon: "🏢" };
    case "TRANSPORT":
      return { label: "TRN", icon: "🚐" };
    default:
      return { label: dept, icon: "" };
  }
}

export default function TicketsDashboardIndustrial() {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const activeTickets = mockTickets.filter((t) => t.status !== "CLOSED");
  const closedTickets = mockTickets.filter((t) => t.status === "CLOSED");

  return (
    <div className="min-h-screen bg-[#020618] text-slate-100">
      {/* Background grid */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_#0f172a_0,_#020617_40%,_#000000_100%)]" />
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:28px_28px]" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 lg:px-8">
        {/* Header */}
        <header className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/70 px-3 py-1 text-[11px] font-medium text-cyan-200 ring-1 ring-cyan-500/60">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
              ATG · Help Desk Control Panel
            </div>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
              Operations & Transport Tickets
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Industrial-grade overview of active and closed tickets for IT,
              administration, and transport operations.
            </p>
          </div>

          <div className="flex gap-3">
            <div className="hidden rounded-2xl bg-slate-900/70 px-4 py-3 text-xs text-slate-300 ring-1 ring-slate-700 md:flex md:flex-col">
              <span className="text-[11px] uppercase tracking-wide text-slate-500">
                Active / Closed
              </span>
              <span className="mt-1 text-lg font-semibold text-cyan-200">
                {activeTickets.length}
                <span className="mx-1 text-slate-600">·</span>
                {closedTickets.length}
              </span>
            </div>
            <button
              type="button"
              className="flex items-center gap-2 rounded-2xl bg-cyan-500 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.8)] hover:bg-cyan-400"
            >
              New ticket
            </button>
          </div>
        </header>

        {/* Grid: Active / Closed */}
        <div className="grid gap-5 md:grid-cols-2">
          {/* Active */}
          <section className="relative overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-950/70 p-4 shadow-[0_0_26px_rgba(15,23,42,0.9)]">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-cyan-500/20 via-transparent to-transparent" />
            <div className="relative mb-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-cyan-300 ring-1 ring-cyan-500/60">
                  <span className="text-xs font-semibold">ACT</span>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                    Active tickets
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Waiting, in progress, or pending workflow
                  </div>
                </div>
              </div>
              <span className="rounded-full bg-slate-900/70 px-3 py-1 text-xs text-cyan-200 ring-1 ring-cyan-500/60">
                {activeTickets.length} open
              </span>
            </div>

            <div className="relative max-h-[460px] space-y-3 overflow-y-auto pr-1.5">
              {activeTickets.map((ticket) => {
                const priority = getPriorityBadge(ticket.priority);
                const status = getStatusChip(ticket.status);
                const dept = getDepartmentLabel(ticket.department);

                return (
                  <button
                    key={ticket.id}
                    type="button"
                    onClick={() => setSelectedTicket(ticket)}
                    className="group flex w-full flex-col rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-left text-sm text-slate-100 shadow-[0_0_18px_rgba(15,23,42,0.9)] transition-all hover:-translate-y-0.5 hover:border-cyan-500/70 hover:bg-slate-900 hover:shadow-[0_0_26px_rgba(34,211,238,0.7)]"
                  >
                    {/* top row */}
                    <div className="mb-1 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[11px] text-slate-400">
                        <span className="font-mono text-[11px] text-slate-300">
                          #{ticket.id}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-slate-500" />
                        <span className="inline-flex items-center gap-1">
                          <span className="rounded-sm border border-slate-600 bg-slate-800 px-1 py-px text-[10px] font-semibold text-slate-200">
                            {dept.icon}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {dept.label}
                          </span>
                        </span>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${priority.className}`}
                      >
                        <span className="h-1 w-4 rounded-full bg-gradient-to-r from-slate-400 via-slate-100 to-slate-400" />
                        <span>{priority.label}</span>
                      </span>
                    </div>

                    {/* title */}
                    <div className="mb-1 line-clamp-1 text-[13px] font-semibold tracking-tight text-slate-50">
                      {ticket.title}
                    </div>

                    {/* meta */}
                    <div className="mb-1 flex items-center justify-between text-[11px] text-slate-400">
                      <span>{ticket.createdAt}</span>
                      {ticket.assignedTo && (
                        <span>
                          Assigned:{" "}
                          <span className="font-medium text-slate-200">
                            {ticket.assignedTo}
                          </span>
                        </span>
                      )}
                    </div>

                    {/* bottom line: status and load bar */}
                    <div className="mt-2 flex items-center justify-between">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${status.className}`}
                      >
                        {status.label}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-800">
                          <div
                            className={`h-full w-3/4 ${priority.barClass} shadow-[0_0_10px_currentColor]`}
                          />
                        </div>
                        <span className="text-[10px] text-slate-500">
                          LOAD
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}

              {activeTickets.length === 0 && (
                <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/80 p-4 text-center text-xs text-slate-400">
                  No active tickets. Operations stable.
                </div>
              )}
            </div>
          </section>

          {/* Closed */}
          <section className="relative overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-950/80 p-4 shadow-[0_0_24px_rgba(15,23,42,0.9)]">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-emerald-500/15 via-transparent to-transparent" />
            <div className="relative mb-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-emerald-300 ring-1 ring-emerald-500/60">
                  <span className="text-xs font-semibold">CLS</span>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                    Closed tickets
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Completed tasks and archived incidents
                  </div>
                </div>
              </div>
              <span className="rounded-full bg-slate-900/70 px-3 py-1 text-xs text-emerald-200 ring-1 ring-emerald-500/60">
                {closedTickets.length} closed
              </span>
            </div>

            <div className="relative max-h-[460px] space-y-3 overflow-y-auto pr-1.5">
              {closedTickets.map((ticket) => {
                const priority = getPriorityBadge(ticket.priority);
                const status = getStatusChip(ticket.status);
                const dept = getDepartmentLabel(ticket.department);

                return (
                  <button
                    key={ticket.id}
                    type="button"
                    onClick={() => setSelectedTicket(ticket)}
                    className="group flex w-full flex-col rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-left text-sm text-slate-100 opacity-80 shadow-[0_0_18px_rgba(15,23,42,0.9)] transition-all hover:-translate-y-0.5 hover:border-emerald-400/70 hover:bg-slate-900 hover:opacity-100 hover:shadow-[0_0_24px_rgba(16,185,129,0.7)]"
                  >
                    <div className="mb-1 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[11px] text-slate-400">
                        <span className="font-mono text-[11px] text-slate-300">
                          #{ticket.id}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-slate-500" />
                        <span className="inline-flex items-center gap-1">
                          <span className="rounded-sm border border-slate-600 bg-slate-800 px-1 py-px text-[10px] font-semibold text-slate-200">
                            {dept.icon}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {dept.label}
                          </span>
                        </span>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${priority.className}`}
                      >
                        <span className="h-1 w-4 rounded-full bg-gradient-to-r from-emerald-300 via-emerald-100 to-emerald-300" />
                        <span>{priority.label}</span>
                      </span>
                    </div>

                    <div className="mb-1 line-clamp-1 text-[13px] font-semibold tracking-tight text-slate-50">
                      {ticket.title}
                    </div>

                    <div className="mb-1 flex items-center justify-between text-[11px] text-slate-400">
                      <span>{ticket.createdAt}</span>
                      {ticket.assignedTo && (
                        <span>
                          Closed by{" "}
                          <span className="font-medium text-slate-200">
                            {ticket.assignedTo}
                          </span>
                        </span>
                      )}
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 font-semibold ${status.className}`}
                      >
                        {status.label}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="h-1 w-10 rounded-full bg-slate-800">
                          <div className="h-full w-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.9)]" />
                        </div>
                        <span>OK</span>
                      </div>
                    </div>
                  </button>
                );
              })}

              {closedTickets.length === 0 && (
                <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/80 p-4 text-center text-xs text-slate-400">
                  No closed tickets yet.
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Right drawer details */}
      {selectedTicket && (
        <div className="fixed inset-0 z-30 flex">
          {/* Backdrop */}
          <div
            className="h-full flex-1 bg-slate-950/60"
            onClick={() => setSelectedTicket(null)}
          />
          {/* Drawer */}
          <div className="flex h-full w-full max-w-md flex-col border-l border-slate-700 bg-slate-950/95 shadow-[0_0_30px_rgba(15,23,42,1)]">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-700/80 bg-slate-950/80 px-4 py-3">
              <div>
                <div className="text-[11px] uppercase tracking-wide text-slate-500">
                  Ticket #{selectedTicket.id}
                </div>
                <div className="mt-1 text-sm font-semibold tracking-tight text-slate-50">
                  {selectedTicket.title}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTicket(null)}
                className="rounded-full border border-slate-600 bg-slate-900 px-2 py-1 text-[11px] text-slate-300 hover:border-cyan-400 hover:text-cyan-200"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-4 py-3 text-sm text-slate-100">
              <div className="mb-3 flex flex-wrap items-center gap-2 text-[11px]">
                <span
                  className={`rounded-full px-2 py-0.5 font-semibold ${getPriorityBadge(selectedTicket.priority).className}`}
                >
                  PRIORITY: {getPriorityBadge(selectedTicket.priority).label}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 font-semibold ${getStatusChip(selectedTicket.status).className}`}
                >
                  {getStatusChip(selectedTicket.status).label}
                </span>
                <span className="rounded-full border border-slate-600 bg-slate-900/80 px-2 py-0.5 text-[11px] text-slate-200">
                  {getDepartmentLabel(selectedTicket.department).icon}{" "}
                  {getDepartmentLabel(selectedTicket.department).label}
                </span>
              </div>

              <div className="mb-4 grid gap-2 rounded-xl border border-slate-700 bg-slate-900/80 p-3 text-[11px] text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Created</span>
                  <span className="font-medium text-slate-100">
                    {selectedTicket.createdAt}
                  </span>
                </div>
                {selectedTicket.assignedTo && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Assigned to</span>
                    <span className="font-medium text-slate-100">
                      {selectedTicket.assignedTo}
                    </span>
                  </div>
                )}
              </div>

              <div className="mb-4 text-sm text-slate-100">
                {selectedTicket.description || "No additional description."}
              </div>

              <div className="mb-4 rounded-xl border border-slate-700 bg-slate-900/80 p-3 text-[11px] text-slate-300">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-slate-500">Workflow</span>
                  <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300">
                    Future: manager & transport steps
                  </span>
                </div>
                <div className="mt-1 h-1.5 w-full rounded-full bg-slate-800">
                  <div className="h-full w-2/3 bg-gradient-to-r from-cyan-400 via-amber-400 to-emerald-400 shadow-[0_0_14px_rgba(56,189,248,0.8)]" />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-2 border-t border-slate-700/80 bg-slate-950/90 px-4 py-3">
              <button
                type="button"
                onClick={() => setSelectedTicket(null)}
                className="rounded-xl border border-slate-600 bg-slate-900 px-3 py-1.5 text-[11px] font-medium text-slate-300 hover:border-slate-400"
              >
                Close
              </button>
              <button
                type="button"
                className="rounded-xl bg-orange-500 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-950 shadow-[0_0_18px_rgba(249,115,22,0.8)] hover:bg-orange-400"
              >
                Action
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
