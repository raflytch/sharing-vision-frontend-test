import { Suspense } from "react"

import { LoadingState } from "@/components/loading-state"
import { PostsScreen } from "@/features/articles/components/posts-screen"

export default function PostsPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <PostsScreen />
    </Suspense>
  )
}
