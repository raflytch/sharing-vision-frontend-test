"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm, useWatch } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { getApiError } from "@/features/articles/api/article.api"
import { useArticleMutations } from "@/features/articles/hooks/use-article-mutations"
import { articleFieldsSchema, type Article, type ArticleFields, type ArticleInput, type ArticleStatus } from "@/features/articles/model/article.schema"

type ArticleFormProps = {
  mode: "create" | "edit"
  article?: Article
}

export function ArticleForm({ mode, article }: ArticleFormProps) {
  const router = useRouter()
  const { createMutation, updateMutation } = useArticleMutations()
  const [intent, setIntent] = useState<ArticleStatus>(article?.status === "draft" ? "draft" : "publish")
  const [submitError, setSubmitError] = useState<string | null>(null)
  const form = useForm<ArticleFields>({
    resolver: zodResolver(articleFieldsSchema),
    mode: "onBlur",
    defaultValues: {
      title: article?.title ?? "",
      content: article?.content ?? "",
      category: article?.category ?? "",
    },
  })
  const title = useWatch({ control: form.control, name: "title" }) ?? ""
  const content = useWatch({ control: form.control, name: "content" }) ?? ""
  const isPending = createMutation.isPending || updateMutation.isPending

  function handleError(error: unknown): void {
    setSubmitError(getApiError(error).message)
  }

  function handleSubmit(values: ArticleFields): void {
    setSubmitError(null)
    const input: ArticleInput = { ...values, status: intent }
    const onSuccess = (): void => router.push(`/posts?status=${intent}`)

    if (mode === "edit" && article) {
      updateMutation.mutate({ id: article.id, input }, { onSuccess, onError: handleError })
      return
    }

    createMutation.mutate(input, { onSuccess, onError: handleError })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8">
          <div className="grid gap-7">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between gap-4">
                    <FormLabel>Title</FormLabel>
                    <span className="text-xs text-black/40">{title.length} / 20 min</span>
                  </div>
                  <FormControl><Input placeholder="Give your article a clear, memorable title" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between gap-4">
                    <FormLabel>Content</FormLabel>
                    <span className="text-xs text-black/40">{content.length} / 200 min</span>
                  </div>
                  <FormControl><Textarea className="min-h-80 resize-y leading-7" placeholder="Start writing your article..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl><Input placeholder="e.g. Design, Culture, Technology" {...field} /></FormControl>
                  <FormDescription>Use a short label to help readers find related stories.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-black/10 bg-[#ebe9e3] p-5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-black/45">Publishing</p>
          <p className="mb-6 text-sm leading-6 text-black/60">{mode === "edit" ? "Save your changes as a draft or publish them to the public preview." : "Save a private draft or publish this article to the public preview."}</p>
          {submitError && <p className="mb-4 rounded-lg bg-[#ec5b2a]/10 px-3 py-2 text-sm leading-5 text-[#a93816]" role="alert">{submitError}</p>}
          <div className="grid gap-2">
            <Button type="submit" disabled={isPending} onClick={() => setIntent("publish")} className="w-full rounded-full bg-[#ec5b2a] text-white hover:bg-[#d94d20]">
              {isPending && intent === "publish" ? "Publishing..." : "Publish article"}
            </Button>
            <Button type="submit" disabled={isPending} onClick={() => setIntent("draft")} variant="outline" className="w-full rounded-full border-black/15 bg-transparent">
              {isPending && intent === "draft" ? "Saving..." : "Save as draft"}
            </Button>
          </div>
          <p className="mt-4 text-center text-xs leading-5 text-black/40">Title, content, and category are required.</p>
        </aside>
      </form>
    </Form>
  )
}
