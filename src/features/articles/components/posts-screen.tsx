"use client"

import { useSearchParams } from "next/navigation"

import { ErrorState } from "@/components/error-state"
import { LoadingState } from "@/components/loading-state"
import { DashboardShell, PageEyebrow } from "@/components/layout/dashboard-shell"
import { ArticleTable } from "@/features/articles/components/article-table"
import { StatusTabs } from "@/features/articles/components/status-tabs"
import { useArticles } from "@/features/articles/hooks/use-articles"
import { articleStatuses, type ArticleStatus } from "@/features/articles/model/article.schema"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"

function getStatus(value: string | null): ArticleStatus {
  return articleStatuses.includes(value as ArticleStatus) ? (value as ArticleStatus) : "publish"
}

export function PostsScreen() {
  const searchParams = useSearchParams()
  const status = getStatus(searchParams.get("status"))
  const articlesQuery = useArticles()

  if (articlesQuery.isLoading) return <LoadingState />
  if (articlesQuery.isError) return <ErrorState reset={() => { void articlesQuery.refetch() }} />

  const articles = articlesQuery.data ?? []
  const filtered = articles.filter((article) => article.status === status)
  const counts = articles.reduce<Record<ArticleStatus, number>>(
    (result, article) => {
      result[article.status] += 1
      return result
    },
    { publish: 0, draft: 0, thrash: 0 },
  )

  return (
    <DashboardShell>
      <section>
        <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <PageEyebrow>Content library</PageEyebrow>
            <h1 className="font-heading text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">All posts</h1>
            <p className="mt-3 max-w-lg text-sm leading-6 text-black/50">A clear view of everything your team is shaping, saving, and sharing.</p>
          </div>
          <Link href="/posts/new" className={`${buttonVariants()} w-fit rounded-full bg-black px-5 text-white hover:bg-black/80`}>Create article</Link>
        </div>
        <StatusTabs active={status} counts={counts} />
        <div className="mt-5"><ArticleTable data={filtered} status={status} /></div>
      </section>
    </DashboardShell>
  )
}
