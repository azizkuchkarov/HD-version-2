"use client";

import { useEffect, useState } from "react";

type Role = "USER" | "ENGINEER" | "ADMIN" | null;

export default function TopRightUserBadge() {
  const [name, setName] = useState<string | null>(null);
  const [role, setRole] = useState<Role>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedRole = (localStorage.getItem("hd_role") as Role) || null;
    const fullName = localStorage.getItem("hd_full_name"); // for normal users (Name Surname)
    const engineerName = localStorage.getItem("hd_engineer_name"); // for engineer login
    const adminName = localStorage.getItem("hd_admin_name"); // optional, for admin login
    const email = localStorage.getItem("hd_email"); // fallback

    setRole(storedRole);

    if (fullName) {
      setName(fullName);
    } else if (engineerName) {
      setName(engineerName);
    } else if (adminName) {
      setName(adminName);
    } else if (email) {
      // fallback: take part before @ as name
      const base = email.split("@")[0].replace(".", " ");
      setName(base);
    } else {
      setName(null);
    }
  }, []);

  if (!name) return null;

  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");

  const roleLabel =
    role === "ADMIN"
      ? "Admin"
      : role === "ENGINEER"
      ? "Engineer"
      : role === "USER"
      ? "User"
      : "";

  return (
    <div className="flex items-center gap-2 rounded-full bg-slate-100 border border-slate-200 px-2 py-1">
      <div className="h-8 w-8 rounded-full bg-sky-500 text-white flex items-center justify-center text-xs font-semibold">
        {initials || "AT"}
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-xs font-medium text-slate-800">{name}</span>
        {roleLabel && (
          <span className="text-[10px] text-slate-500">{roleLabel}</span>
        )}
      </div>
    </div>
  );
}
