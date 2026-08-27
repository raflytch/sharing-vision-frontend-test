import { Skeleton } from "@/components/ui/skeleton"

export function LoadingState({ preview = false }: { preview?: boolean }) {
  return (
    <div className={preview ? "mx-auto w-full max-w-2xl py-10" : "mx-auto w-full max-w-7xl px-5 py-14 sm:px-8"}>
      <Skeleton className="h-3 w-24" />
      <Skeleton className="mt-4 h-12 w-64" />
      <Skeleton className="mt-10 h-12 w-full" />
      <Skeleton className="mt-5 h-72 w-full rounded-2xl" />
    </div>
  )
}
