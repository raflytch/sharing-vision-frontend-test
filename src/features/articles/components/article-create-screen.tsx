"use client"

import Link from "next/link"

import { ArticleForm } from "@/features/articles/components/article-form"
import { DashboardShell, PageEyebrow } from "@/components/layout/dashboard-shell"

export function ArticleCreateScreen() {
  return (
    <DashboardShell>
      <section>
        <Link href="/posts" className="text-sm text-black/45 transition-colors hover:text-black">← Back to all posts</Link>
        <div className="mb-9 mt-8">
          <PageEyebrow>New story</PageEyebrow>
          <h1 className="font-heading text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Write an article</h1>
          <p className="mt-3 text-sm leading-6 text-black/50">Put your perspective into words, then decide when it is ready to share.</p>
        </div>
        <ArticleForm mode="create" />
      </section>
    </DashboardShell>
  )
}
