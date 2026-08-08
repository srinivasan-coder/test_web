import type { ReactNode } from "react";
import Link from "next/link";
import { LogoutButton } from "@/components/admin/logout-button";

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="flex items-center justify-between border-b border-border bg-background px-6 py-4">
        <Link href="/admin" className="text-sm font-semibold text-foreground">
          Studio Admin — Image Manager
        </Link>
        <LogoutButton />
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </>
  );
}
