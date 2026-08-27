import Link from "next/link"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { ArticleStatus } from "@/features/articles/model/article.schema"

const tabs: { value: ArticleStatus; label: string }[] = [
  { value: "publish", label: "Published" },
  { value: "draft", label: "Drafts" },
  { value: "thrash", label: "Trashed" },
]

type StatusTabsProps = {
  active: ArticleStatus
  counts: Record<ArticleStatus, number>
}

export function StatusTabs({ active, counts }: StatusTabsProps) {
  return (
    <Tabs value={active} className="w-full">
      <TabsList variant="line" className="h-auto w-full justify-start gap-6 rounded-none border-b border-black/10 p-0">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            nativeButton={false}
            render={<Link href={`/posts?status=${tab.value}`} />}
            className="-mb-px h-auto flex-none rounded-none border-b-2 border-transparent px-0.5 pb-3 pt-0 text-sm text-black/45 shadow-none hover:text-black data-active:border-[#ec5b2a] data-active:font-semibold data-active:text-black"
          >
            {tab.label}
            <span className={`rounded-full px-1.5 py-0.5 text-[11px] ${active === tab.value ? "bg-[#ec5b2a]/10 text-[#c7471d]" : "bg-black/5 text-black/45"}`}>
              {counts[tab.value]}
            </span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
