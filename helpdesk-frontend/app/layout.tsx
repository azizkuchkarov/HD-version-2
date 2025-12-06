import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Help Desk Portal",
  description: "Internal Help Desk system for IT, Administration & Transport",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-950">
        {children}
      </body>
    </html>
  );
}
