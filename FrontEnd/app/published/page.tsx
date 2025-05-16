"use client"

import { useState, useEffect } from "react"
import { getPublishedTutorials } from "@/lib/api"
import type { Tutorial } from "@/types/tutorial"
import TutorialList from "@/components/tutorial-list"
import { Skeleton } from "@/components/ui/skeleton"

export default function PublishedTutorials() {
  const [tutorials, setTutorials] = useState<Tutorial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPublishedTutorials = async () => {
      setLoading(true)
      try {
        const data = await getPublishedTutorials()
        setTutorials(data)
      } catch (error) {
        console.error("Error fetching published tutorials:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPublishedTutorials()
  }, [])

  if (loading) {
    return <TutorialListSkeleton />
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Published Tutorials</h1>
        <p className="text-muted-foreground">Browse all published tutorials.</p>
      </div>

      <TutorialList
        tutorials={tutorials}
        showSearch={false}
        showDeleteAll={false}
        emptyMessage="No published tutorials found. Publish some tutorials to see them here."
      />
    </div>
  )
}

function TutorialListSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Published Tutorials</h1>
        <p className="text-muted-foreground">Browse all published tutorials.</p>
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
