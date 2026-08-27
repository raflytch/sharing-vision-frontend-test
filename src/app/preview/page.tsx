import { Suspense } from "react"

import { LoadingState } from "@/components/loading-state"
import { PreviewScreen } from "@/features/preview/components/preview-screen"

export default function PreviewPage() {
  return (
    <Suspense fallback={<LoadingState preview />}>
      <PreviewScreen />
    </Suspense>
  )
}
