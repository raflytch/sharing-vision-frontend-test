import { z } from "zod"

export const articleStatusSchema = z.enum(["publish", "draft", "thrash"])

export const articleFieldsSchema = z.object({
  title: z.string().trim().min(20, "Title must be at least 20 characters"),
  content: z.string().trim().min(200, "Content must be at least 200 characters"),
  category: z.string().trim().min(3, "Category must be at least 3 characters"),
})

export const articleSchema = articleFieldsSchema.extend({
  status: articleStatusSchema,
})

export const articleResponseSchema = articleSchema
  .extend({
    id: z.union([z.string(), z.number()]).transform(String),
    createdAt: z.string().nullable().optional(),
    updatedAt: z.string().nullable().optional(),
  })
  .passthrough()

export type ArticleStatus = z.infer<typeof articleStatusSchema>
export type ArticleFields = z.infer<typeof articleFieldsSchema>
export type ArticleInput = z.infer<typeof articleSchema>
export type Article = z.infer<typeof articleResponseSchema>

export const articleStatuses: readonly ArticleStatus[] = [
  "publish",
  "draft",
  "thrash",
]
