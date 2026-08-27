import axios from "axios"

import { apiClient } from "@/lib/http/api-client"
import {
  articleResponseSchema,
  articleSchema,
  type Article,
  type ArticleInput,
} from "@/features/articles/model/article.schema"

export class ArticleApiError extends Error {
  readonly status?: number

  constructor(message: string, status?: number) {
    super(message)
    this.name = "ArticleApiError"
    this.status = status
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

function unwrapCollection(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload
  if (!isRecord(payload)) return []
  if (Array.isArray(payload.data)) return payload.data
  if (Array.isArray(payload.articles)) return payload.articles
  if (isRecord(payload.data)) return unwrapCollection(payload.data)
  return []
}

function unwrapArticle(payload: unknown): unknown {
  if (isRecord(payload) && isRecord(payload.data)) return payload.data
  return payload
}

function parseArticle(payload: unknown): Article {
  return articleResponseSchema.parse(unwrapArticle(payload))
}

function parseOptionalArticle(payload: unknown): Article | null {
  if (payload === null || payload === undefined) return null
  const result = articleResponseSchema.safeParse(unwrapArticle(payload))
  return result.success ? result.data : null
}

export function getApiError(error: unknown): ArticleApiError {
  if (error instanceof ArticleApiError) return error

  if (axios.isAxiosError(error)) {
    const responseData: unknown = error.response?.data
    const message = isRecord(responseData) && typeof responseData.message === "string"
      ? responseData.message
      : error.message || "The API request failed."
    return new ArticleApiError(message, error.response?.status)
  }

  return new ArticleApiError(error instanceof Error ? error.message : "Something went wrong.")
}

export async function getArticles(limit = 100, offset = 0): Promise<Article[]> {
  try {
    const response = await apiClient.get<unknown>(`/article/${limit}/${offset}`)
    return articleResponseSchema.array().parse(unwrapCollection(response.data))
  } catch (error) {
    throw getApiError(error)
  }
}

export async function getArticleById(id: string): Promise<Article> {
  try {
    const response = await apiClient.get<unknown>(`/article/${encodeURIComponent(id)}`)
    return parseArticle(response.data)
  } catch (error) {
    throw getApiError(error)
  }
}

export async function postArticle(input: ArticleInput): Promise<Article | null> {
  const data = articleSchema.parse(input)
  try {
    const response = await apiClient.post<unknown>("/article", data)
    return parseOptionalArticle(response.data)
  } catch (error) {
    throw getApiError(error)
  }
}

export async function putArticle(id: string, input: ArticleInput): Promise<Article | null> {
  const data = articleSchema.parse(input)
  try {
    const response = await apiClient.put<unknown>(`/article/${encodeURIComponent(id)}`, data)
    return parseOptionalArticle(response.data)
  } catch (error) {
    throw getApiError(error)
  }
}

export async function deleteArticle(id: string): Promise<void> {
  try {
    await apiClient.delete(`/article/${encodeURIComponent(id)}`)
  } catch (error) {
    throw getApiError(error)
  }
}

export async function moveArticleToTrash(id: string): Promise<void> {
  const article = await getArticleById(id)
  await putArticle(id, {
    title: article.title,
    content: article.content,
    category: article.category,
    status: "thrash",
  })
}
