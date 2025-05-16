"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { getTutorials } from "@/lib/api"
import type { Tutorial } from "@/types/tutorial"
import TutorialList from "@/components/tutorial-list"
import { Skeleton } from "@/components/ui/skeleton"

export default function Home() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [tutorials, setTutorials] = useState<Tutorial[]>([])
  const [loading, setLoading] = useState(true)
  const titleQuery = searchParams.get("title") || ""

  useEffect(() => {
    const fetchTutorials = async () => {
      setLoading(true)
      try {
        const data = await getTutorials(titleQuery || undefined)
        setTutorials(data)
      } catch (error) {
        console.error("Error fetching tutorials:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTutorials()
  }, [titleQuery])

  const handleSearch = (query: string) => {
    const params = new URLSearchParams()
    if (query) {
      params.set("title", query)
    }
    router.push(`/?${params.toString()}`)
  }

  if (loading) {
    return <TutorialListSkeleton />
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">All Tutorials</h1>
        <p className="text-muted-foreground">Browse all tutorials or search by title.</p>
      </div>

      <TutorialList
        tutorials={tutorials}
        showSearch={true}
        onSearch={handleSearch}
        searchQuery={titleQuery}
        emptyMessage={
          titleQuery ? `No tutorials found matching "${titleQuery}"` : "No tutorials found. Create your first one!"
        }
      />
    </div>
  )
}

function TutorialListSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">All Tutorials</h1>
        <p className="text-muted-foreground">Browse all tutorials or search by title.</p>
      </div>

      <div className="flex justify-between gap-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-[200px] w-full rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  )
}
