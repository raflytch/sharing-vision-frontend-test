"use client"

import Link from "next/link"
import { useParams } from "next/navigation"

import { ErrorState } from "@/components/error-state"
import { LoadingState } from "@/components/loading-state"
import { DashboardShell, PageEyebrow } from "@/components/layout/dashboard-shell"
import { ArticleForm } from "@/features/articles/components/article-form"
import { useArticle } from "@/features/articles/hooks/use-articles"

export function ArticleEditScreen() {
  const params = useParams<{ id: string }>()
  const id = params.id ?? ""
  const articleQuery = useArticle(id)

  if (articleQuery.isLoading) return <LoadingState />
  if (articleQuery.isError || !articleQuery.data) return <ErrorState reset={() => { void articleQuery.refetch() }} />

  return (
    <DashboardShell>
      <section>
        <Link href="/posts" className="text-sm text-black/45 transition-colors hover:text-black">← Back to all posts</Link>
        <div className="mb-9 mt-8">
          <PageEyebrow>Edit story</PageEyebrow>
          <h1 className="max-w-3xl font-heading text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Shape the story</h1>
          <p className="mt-3 text-sm leading-6 text-black/50">Make your changes below. Publishing will update the public preview immediately.</p>
        </div>
        <ArticleForm mode="edit" article={articleQuery.data} />
      </section>
    </DashboardShell>
  )
}
