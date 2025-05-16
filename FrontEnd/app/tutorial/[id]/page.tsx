"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { getTutorial, togglePublishedStatus } from "@/lib/api"
import type { Tutorial } from "@/types/tutorial"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Edit, ArrowLeft, Trash2, Loader2 } from "lucide-react"
import { deleteTutorial } from "@/lib/api"

export default function TutorialDetail() {
  const params = useParams()
  const router = useRouter()
  const id = Number(params.id)

  const [tutorial, setTutorial] = useState<Tutorial | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isToggling, setIsToggling] = useState(false)

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

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteTutorial(id)
      toast({
        title: "Tutorial deleted",
        description: "The tutorial has been deleted successfully.",
      })
      router.push("/")
    } catch (error) {
      console.error("Error deleting tutorial:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleTogglePublished = async () => {
    if (!tutorial) return

    setIsToggling(true)
    try {
      const updatedTutorial = await togglePublishedStatus(tutorial)
      setTutorial(updatedTutorial)
      toast({
        title: updatedTutorial.published ? "Tutorial published" : "Tutorial unpublished",
        description: updatedTutorial.published
          ? "The tutorial is now visible in the published section."
          : "The tutorial has been removed from the published section.",
      })
    } catch (error) {
      console.error("Error toggling published status:", error)
    } finally {
      setIsToggling(false)
    }
  }

  if (loading) {
    return <TutorialDetailSkeleton />
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Error</h1>
        <p className="text-muted-foreground mb-4">{error}</p>
        <Button onClick={() => router.push("/")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tutorials
        </Button>
      </div>
    )
  }

  if (!tutorial) {
    return null
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <Button variant="outline" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl">{tutorial.title}</CardTitle>
              <CardDescription className="flex items-center gap-2 mt-2">
                <span>Published:</span>
                <Switch checked={tutorial.published} onCheckedChange={handleTogglePublished} disabled={isToggling} />
                {isToggling && <Loader2 className="h-4 w-4 animate-spin" />}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <a href={`/edit/${tutorial.id}`}>
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </a>
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm" disabled={isDeleting}>
                    {isDeleting ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-1" />
                    ) : (
                      <Trash2 className="h-4 w-4 mr-1" />
                    )}
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the tutorial.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert max-w-none">
            <h3>Description</h3>
            <p>{tutorial.description}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <div className="text-sm text-muted-foreground">
            <span>ID: {tutorial.id}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            <span>Status: {tutorial.published ? "Published" : "Draft"}</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

function TutorialDetailSkeleton() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <Skeleton className="h-10 w-24" />

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-24 w-full" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-32" />
        </CardFooter>
      </Card>
    </div>
  )
}
