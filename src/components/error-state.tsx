"use client"

import { Button } from "@/components/ui/button"

export function ErrorState({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-6 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ec5b2a]">Something went wrong</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">We couldn&apos;t load this page.</h1>
      <p className="mt-3 text-sm leading-6 text-black/55">Check the API connection and try again.</p>
      <Button onClick={reset} className="mt-7 rounded-full bg-black text-white hover:bg-black/80">Try again</Button>
    </div>
  )
}
