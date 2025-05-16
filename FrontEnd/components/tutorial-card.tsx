"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { Tutorial } from "@/types/tutorial"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { deleteTutorial, togglePublishedStatus } from "@/lib/api"
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
import { Edit, Eye, Trash2, Loader2 } from "lucide-react"

interface TutorialCardProps {
  tutorial: Tutorial
}

export default function TutorialCard({ tutorial }: TutorialCardProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [isToggling, setIsToggling] = useState(false)
  const [isPublished, setIsPublished] = useState(tutorial.published)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteTutorial(tutorial.id)
      toast({
        title: "Tutorial deleted",
        description: "The tutorial has been deleted successfully.",
      })
      router.refresh()
    } catch (error) {
      console.error("Error deleting tutorial:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleTogglePublished = async () => {
    setIsToggling(true)
    try {
      const updatedTutorial = await togglePublishedStatus(tutorial)
      setIsPublished(updatedTutorial.published)
      toast({
        title: updatedTutorial.published ? "Tutorial published" : "Tutorial unpublished",
        description: updatedTutorial.published
          ? "The tutorial is now visible in the published section."
          : "The tutorial has been removed from the published section.",
      })
      router.refresh()
    } catch (error) {
      console.error("Error toggling published status:", error)
    } finally {
      setIsToggling(false)
    }
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="line-clamp-2">{tutorial.title}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <span>Published:</span>
          <Switch checked={isPublished} onCheckedChange={handleTogglePublished} disabled={isToggling} />
          {isToggling && <Loader2 className="h-4 w-4 animate-spin" />}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-4">{tutorial.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/tutorial/${tutorial.id}`}>
              <Eye className="h-4 w-4 mr-1" />
              View
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/edit/${tutorial.id}`}>
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Link>
          </Button>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm" disabled={isDeleting}>
              {isDeleting ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Trash2 className="h-4 w-4 mr-1" />}
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
      </CardFooter>
    </Card>
  )
}
