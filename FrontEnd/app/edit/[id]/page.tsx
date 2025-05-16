"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { getTutorial } from "@/lib/api"
import type { Tutorial } from "@/types/tutorial"
import TutorialForm from "@/components/tutorial-form"
import { Skeleton } from "@/components/ui/skeleton"

export default function EditTutorial() {
  const params = useParams()
  const id = Number(params.id)

  const [tutorial, setTutorial] = useState<Tutorial | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTutorial = async () => {
      setLoading(true)
      try {
        const data = await getTutorial(id)
        setTutorial(data)
        setError(null)
      } catch (error) {
        console.error("Error fetching tutorial:", error)
        setError("Failed to load tutorial. It may have been deleted or does not exist.")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchTutorial()
    }
  }, [id])

  if (loading) {
    return <EditTutorialSkeleton />
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Error</h1>
        <p className="text-muted-foreground mb-4">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Edit Tutorial</h1>
        <p className="text-muted-foreground">Update the details of your tutorial.</p>
      </div>

      {tutorial && <TutorialForm tutorial={tutorial} isEdit={true} />}
    </div>
  )
}

function EditTutorialSkeleton() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Edit Tutorial</h1>
        <p className="text-muted-foreground">Update the details of your tutorial.</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-16 w-full" />
        <div className="flex justify-end gap-4">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  )
}
