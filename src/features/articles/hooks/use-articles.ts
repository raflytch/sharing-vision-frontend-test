"use client"

import { useQuery } from "@tanstack/react-query"

import { getArticleById, getArticles } from "@/features/articles/api/article.api"

export const articleKeys = {
  all: ["articles"] as const,
  list: () => [...articleKeys.all, "list"] as const,
  detail: (id: string) => [...articleKeys.all, "detail", id] as const,
}

export function useArticles() {
  return useQuery({
    queryKey: articleKeys.list(),
    queryFn: () => getArticles(100, 0),
  })
}

export function useArticle(id: string) {
  return useQuery({
    queryKey: articleKeys.detail(id),
    queryFn: () => getArticleById(id),
    enabled: Boolean(id),
  })
}
