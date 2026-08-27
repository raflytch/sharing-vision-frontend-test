import type { Article } from "@/features/articles/model/article.schema"

type ArticleCardProps = {
  article: Article
}

function formatDate(value: string | null | undefined): string | null {
  if (!value) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric" }).format(date)
}

export function ArticleCard({ article }: ArticleCardProps) {
  const date = formatDate(article.createdAt)

  return (
    <article className="border-b border-black/10 py-10 first:pt-0">
      <div className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#ec5b2a]">
        <span>{article.category}</span>
        {date && <><span className="size-1 rounded-full bg-black/20" /><time dateTime={article.createdAt ?? undefined} className="text-black/40">{date}</time></>}
      </div>
      <h2 className="font-heading text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl">{article.title}</h2>
      <div className="mt-6 whitespace-pre-wrap text-[1.05rem] leading-8 text-black/70">{article.content}</div>
    </article>
  )
}
