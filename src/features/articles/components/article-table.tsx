"use client"

import Link from "next/link"
import { Pencil, Trash2 } from "lucide-react"
import { useState } from "react"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getApiError } from "@/features/articles/api/article.api"
import { useArticleMutations } from "@/features/articles/hooks/use-article-mutations"
import type { Article, ArticleStatus } from "@/features/articles/model/article.schema"

type ArticleTableProps = {
  data: Article[]
  status: ArticleStatus
}

type ActionType = "trash" | "delete"
type SelectedAction = { article: Article; type: ActionType } | null

export function ArticleTable({ data, status }: ArticleTableProps) {
  const [selectedAction, setSelectedAction] = useState<SelectedAction>(null)
  const { trashMutation, deleteMutation } = useArticleMutations()
  const activeMutation = selectedAction?.type === "delete" ? deleteMutation : trashMutation
  const isPending = trashMutation.isPending || deleteMutation.isPending
  const mutationError = activeMutation.error ? getApiError(activeMutation.error).message : null

  function openAction(article: Article, type: ActionType): void {
    trashMutation.reset()
    deleteMutation.reset()
    setSelectedAction({ article, type })
  }

  function confirmAction(): void {
    if (!selectedAction) return
    const onSuccess = (): void => setSelectedAction(null)

    if (selectedAction.type === "delete") {
      deleteMutation.mutate(selectedAction.article.id, { onSuccess })
    } else {
      trashMutation.mutate(selectedAction.article.id, { onSuccess })
    }
  }

  const isTrashView = status === "thrash"

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-black/[0.025] hover:bg-black/[0.025]">
              <TableHead className="h-12 px-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-black/45">Title</TableHead>
              <TableHead className="h-12 text-[11px] font-semibold uppercase tracking-[0.16em] text-black/45">Category</TableHead>
              <TableHead className="h-12 w-28 pr-5 text-right text-[11px] font-semibold uppercase tracking-[0.16em] text-black/45">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow><TableCell colSpan={3} className="h-36 px-5 text-center text-sm text-black/45">No articles in this view yet.</TableCell></TableRow>
            ) : data.map((article) => (
              <TableRow key={article.id} className="group">
                <TableCell className="max-w-[42rem] whitespace-normal px-5 py-5">
                  <Link href={`/posts/${article.id}/edit`} className="font-medium leading-6 hover:text-[#ec5b2a]">{article.title}</Link>
                </TableCell>
                <TableCell className="text-sm text-black/55">{article.category}</TableCell>
                <TableCell className="pr-5">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" nativeButton={false} render={<Link href={`/posts/${article.id}/edit`} title="Edit article" />} aria-label={`Edit ${article.title}`}><Pencil /></Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={isTrashView ? "text-destructive hover:text-destructive" : undefined}
                      onClick={() => openAction(article, isTrashView ? "delete" : "trash")}
                      aria-label={isTrashView ? `Delete ${article.title} permanently` : `Move ${article.title} to trash`}
                      title={isTrashView ? "Delete permanently" : "Move to trash"}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={selectedAction !== null} onOpenChange={(open) => !open && setSelectedAction(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{isTrashView ? "Delete this article permanently?" : "Move this article to trash?"}</AlertDialogTitle>
            <AlertDialogDescription>
              {isTrashView ? "This cannot be undone. The article will be permanently removed from the database." : "The article will leave its current list and appear in Trashed. You can permanently delete it from there."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          {mutationError && <p className="text-sm text-destructive" role="alert">{mutationError}</p>}
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmAction} disabled={isPending} className={isTrashView ? "bg-destructive text-white hover:bg-destructive/90" : "bg-black text-white hover:bg-black/80"}>
              {isPending ? "Working..." : isTrashView ? "Delete permanently" : "Move to trash"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
