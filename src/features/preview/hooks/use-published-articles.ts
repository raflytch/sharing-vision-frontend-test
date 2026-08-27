"use client"

import { useArticles } from "@/features/articles/hooks/use-articles"

export function usePublishedArticles() {
  const query = useArticles()

  return {
    ...query,
    data: query.data?.filter((article) => article.status === "publish"),
  }
}
