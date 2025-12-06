"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Role = "USER" | "ENGINEER" | "ADMIN" | null;

export default function UserHeader() {
  const router = useRouter();
  const pathname = usePathname();

  const [name, setName] = useState<string | null>(null);
  const [role, setRole] = useState<Role>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const fullName = localStorage.getItem("hd_full_name");
    const email = localStorage.getItem("hd_email");
    const engineerName = localStorage.getItem("hd_engineer_name");
    const adminName = localStorage.getItem("hd_admin_name");
    const storedRole = (localStorage.getItem("hd_role") as Role) || null;

    setRole(storedRole);

    if (fullName) {
      setName(fullName);
    } else if (engineerName) {
      setName(engineerName);
    } else if (adminName) {
      setName(adminName);
    } else if (email) {
      setName(email.split("@")[0].replace(".", " "));
    } else {
      setName(null);
    }
  }, []);

  const initials = name
    ? name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((p) => p[0]?.toUpperCase())
        .join("")
    : "AT";

  const roleLabel =
    role === "ADMIN"
      ? "Admin"
      : role === "ENGINEER"
      ? "Engineer"
      : role === "USER"
      ? "User"
      : "Guest";

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("hd_email");
      localStorage.removeItem("hd_full_name");
      localStorage.removeItem("hd_role");
      localStorage.removeItem("hd_engineer_name");
      localStorage.removeItem("hd_admin_name");
    }
    router.push("/"); // back to login
  };

  const navItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/my-tickets", label: "My tickets" },
    { href: "/tickets/IT", label: "Create request" }, // opens IT form; user can change category inside
  ];

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Left: logo + title */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-sky-600 text-white flex items-center justify-center text-xs font-semibold">
            ATG
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-slate-900">
              ATG Help Desk
            </span>
            <span className="text-[11px] text-slate-500">
              Internal support portal
            </span>
          </div>
        </div>

        {/* Center: nav buttons */}
        <nav className="hidden sm:flex items-center gap-1">
          {navItems.map((item) => {
            const active =
              pathname === item.href ||
              (item.href === "/tickets/IT" && pathname?.startsWith("/tickets"));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  active
                    ? "bg-sky-600 text-white border-sky-600"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: user + logout */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 rounded-full bg-slate-100 border border-slate-200 px-2 py-1">
            <div className="h-8 w-8 rounded-full bg-sky-500 text-white flex items-center justify-center text-xs font-semibold">
              {initials}
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-xs font-medium text-slate-800">
                {name || "Unknown user"}
              </span>
              <span className="text-[10px] text-slate-500">{roleLabel}</span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="px-3 py-1.5 rounded-full border border-slate-200 bg-white text-xs text-slate-700 hover:bg-slate-50"
          >
            Log out
          </button>
        </div>
      </div>
    </header>
  );
}
