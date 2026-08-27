"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"

import { ErrorState } from "@/components/error-state"
import { LoadingState } from "@/components/loading-state"
import { ArticleCard } from "@/features/preview/components/article-card"
import { PreviewPagination } from "@/features/preview/components/preview-pagination"
import { usePublishedArticles } from "@/features/preview/hooks/use-published-articles"

function getPage(value: string | null): number {
  const candidate = Number(value)
  return Number.isInteger(candidate) && candidate > 0 ? candidate : 1
}

export function PreviewScreen() {
  const searchParams = useSearchParams()
  const articlesQuery = usePublishedArticles()

  if (articlesQuery.isLoading) return <LoadingState preview />
  if (articlesQuery.isError) return <ErrorState reset={() => { void articlesQuery.refetch() }} />

  const published = articlesQuery.data ?? []
  const pageSize = 5
  const totalPages = Math.max(1, Math.ceil(published.length / pageSize))
  const currentPage = Math.min(getPage(searchParams.get("page")), totalPages)
  const pageItems = published.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  return (
    <div className="min-h-screen bg-[#fbfaf7] text-[#171714]">
      <header className="mx-auto flex h-20 w-full max-w-3xl items-center justify-between px-5 sm:px-0">
        <Link href="/preview" className="text-sm font-semibold tracking-[0.16em]">THE JOURNAL</Link>
        <Link href="/posts" className="text-sm text-black/50 transition-colors hover:text-black">Editorial workspace →</Link>
      </header>
      <main className="mx-auto w-full max-w-2xl px-5 pb-20 pt-14 sm:px-0 sm:pt-20">
        <header className="mb-12 border-b border-black/10 pb-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#ec5b2a]">The journal</p>
          <h1 className="font-heading text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">Ideas worth sharing.</h1>
          <p className="mt-5 max-w-md text-base leading-7 text-black/55">Thoughts, observations, and stories from a curious creative team.</p>
        </header>
        {pageItems.length > 0 ? pageItems.map((article) => <ArticleCard key={article.id} article={article} />) : <p className="py-16 text-center text-sm text-black/45">No published articles yet.</p>}
        <PreviewPagination currentPage={currentPage} totalPages={totalPages} />
      </main>
      <footer className="mx-auto flex w-full max-w-2xl border-t border-black/10 px-5 py-6 text-xs text-black/45 sm:px-0">
        Created by Rafly Aziz Abdillah
      </footer>
    </div>
  )
}
