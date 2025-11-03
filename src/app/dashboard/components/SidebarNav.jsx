// src/app/components/dashboard/SidebarNav.jsx
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

// Simple inline SVG icons to avoid extra deps.
// Swap these with lucide-react later if you prefer.
const IconDashboard = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M3 3h8v8H3V3zm10 0h8v5h-8V3zM3 13h8v8H3v-8zm10 7v-7h8v7h-8z"/>
  </svg>
);
const IconData = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12 3C7 3 3 4.79 3 7v10c0 2.21 4 4 9 4s9-1.79 9-4V7c0-2.21-4-4-9-4zm0 2c4.14 0 7 .97 7 2s-2.86 2-7 2-7-.97-7-2 2.86-2 7-2zm0 6c4.14 0 7 .97 7 2s-2.86 2-7 2-7-.97-7-2 2.86-2 7-2zm0 6c4.14 0 7 .97 7 2s-2.86 2-7 2-7-.97-7-2 2.86-2 7-2z"/>
  </svg>
);
const IconNetwork = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12 2a3 3 0 110 6 3 3 0 010-6zm7 7a3 3 0 110 6 3 3 0 010-6zM5 9a3 3 0 110 6 3 3 0 010-6zm7 7a3 3 0 110 6 3 3 0 010-6zM7.7 10.3l3-1.5.6 1.2-3 1.5-.6-1.2zm8.6 0l.6 1.2-3 1.5-.6-1.2 3-1.5zM12 14l.6 1.2-3.6 1.8-.6-1.2L12 14zm3.6 3l-3-1.5.6-1.2 3 1.5-.6 1.2z"/>
  </svg>
);
const IconUnderwriting = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M4 4h16v2H4V4zm0 4h10v2H4V8zm0 4h16v2H4v-2zm0 4h10v2H4v-2z"/>
  </svg>
);

const NAV = [
  { href: "/dashboard", label: "Dashboard", Icon: IconDashboard },
  { href: "/insights", label: "Insights", Icon: IconData },
  { href: "/employee-network", label: "Employee Network", Icon: IconNetwork },
  { href: "/underwriting", label: "Underwriting", Icon: IconUnderwriting },
];

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside
      className="
        bg-[#0b1e3a] text-white
        w-72 shrink-0
        border-r border-white/10
        hidden md:flex md:flex-col
      "
    >
      {/* Brand bar */}
      <div className="h-16 px-5 flex items-center gap-3 border-b border-white/10 bg-gradient-to-r from-[#0b1e3a] to-[#0f2a5c]">
        <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-white/10">
          <span className="text-xl font-bold">S</span>
        </div>
        <div className="leading-tight">
          <div className="font-semibold tracking-wide">Synsure</div>
          <div className="text-xs text-white/70">Case Management</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="p-3 space-y-1">
        {NAV.map(({ href, label, Icon }) => {
          const active = pathname === href || pathname?.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`
                group flex items-center gap-3 px-3 py-2 rounded-xl
                transition
                ${active ? "bg-white/10" : "hover:bg-white/5"}
              `}
            >
              <Icon className={`w-5 h-5 ${active ? "text-white" : "text-white/80 group-hover:text-white"}`} />
              <span className={`text-sm ${active ? "font-semibold" : "text-white/80 group-hover:text-white"}`}>
                {label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Footer note */}
      <div className="mt-auto p-3 text-[11px] text-white/60">
        Manager view aggregates employee activity.
      </div>
    </aside>
  );
}
