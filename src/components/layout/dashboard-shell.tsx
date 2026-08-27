import Link from "next/link"
import type React from "react"
import { ArrowUpRight, Plus } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type DashboardShellProps = {
  children: React.ReactNode
  activePath?: "posts" | "preview"
}

export function DashboardShell({ children, activePath = "posts" }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-[#f5f5f2] text-[#171714]">
      <header className="border-b border-black/10 bg-[#f5f5f2]/95">
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <Link href="/posts" className="text-sm font-semibold tracking-[0.16em]" aria-label="Go to all posts">EDITORIAL DESK</Link>

          <nav className="flex items-center gap-1 text-sm" aria-label="Main navigation">
            <Link
              href="/posts"
              className={cn(
                "rounded-full px-4 py-2 transition-colors hover:bg-black/5",
                activePath === "posts" && "bg-black text-white hover:bg-black",
              )}
            >
              All posts
            </Link>
            <Link
              href="/preview"
              className={cn(
                "hidden rounded-full px-4 py-2 transition-colors hover:bg-black/5 sm:block",
                activePath === "preview" && "bg-black text-white hover:bg-black",
              )}
            >
              Preview
            </Link>
            <Link
              href="/posts/new"
              className={cn(buttonVariants({ size: "sm" }), "ml-2 gap-1.5 rounded-full bg-[#ec5b2a] px-4 text-white hover:bg-[#d94d20]")}
            >
              <Plus className="size-3.5" />
              <span className="hidden sm:inline">New article</span>
              <span className="sm:hidden">New</span>
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">{children}</main>

      <footer className="mx-auto flex w-full max-w-7xl items-center justify-between border-t border-black/10 px-5 py-6 text-xs text-black/45 sm:px-8 lg:px-10">
        <span>Created by Rafly Aziz Abdillah</span>
        <Link href="/preview" className="flex items-center gap-1 hover:text-black">View live preview <ArrowUpRight className="size-3" /></Link>
      </footer>
    </div>
  )
}

export function PageEyebrow({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#ec5b2a]">{children}</p>
}
