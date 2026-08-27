"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"

import {
  deleteArticle,
  moveArticleToTrash,
  postArticle,
  putArticle,
} from "@/features/articles/api/article.api"
import { articleKeys } from "@/features/articles/hooks/use-articles"
import type { ArticleInput } from "@/features/articles/model/article.schema"

export function useArticleMutations() {
  const queryClient = useQueryClient()

  async function refreshArticles(): Promise<void> {
    await queryClient.invalidateQueries({ queryKey: articleKeys.all })
  }

  const createMutation = useMutation({
    mutationFn: postArticle,
    onSuccess: refreshArticles,
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, input }: { id: string; input: ArticleInput }) => putArticle(id, input),
    onSuccess: refreshArticles,
  })

  const trashMutation = useMutation({
    mutationFn: moveArticleToTrash,
    onSuccess: refreshArticles,
  })

  const deleteMutation = useMutation({
    mutationFn: deleteArticle,
    onSuccess: refreshArticles,
  })

  return { createMutation, updateMutation, trashMutation, deleteMutation }
}
