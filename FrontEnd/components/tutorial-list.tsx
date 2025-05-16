"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Tutorial } from "@/types/tutorial"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import TutorialCard from "@/components/tutorial-card"
import { toast } from "@/components/ui/use-toast"
import { deleteAllTutorials } from "@/lib/api"
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
import { Search, Trash2, Loader2 } from "lucide-react"

interface TutorialListProps {
  tutorials: Tutorial[]
  showSearch?: boolean
  onSearch?: (query: string) => void
  searchQuery?: string
  showDeleteAll?: boolean
  emptyMessage?: string
}

export default function TutorialList({
  tutorials,
  showSearch = true,
  onSearch,
  searchQuery = "",
  showDeleteAll = true,
  emptyMessage = "No tutorials found.",
}: TutorialListProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [searchValue, setSearchValue] = useState(searchQuery)

  const handleDeleteAll = async () => {
    setIsDeleting(true)
    try {
      await deleteAllTutorials()
      toast({
        title: "All tutorials deleted",
        description: "All tutorials have been deleted successfully.",
      })
      router.refresh()
    } catch (error) {
      console.error("Error deleting all tutorials:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(searchValue)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        {showSearch && (
          <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="search"
              placeholder="Search tutorials..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full"
            />
            <Button type="submit" size="sm">
              <Search className="h-4 w-4 mr-1" />
              Search
            </Button>
          </form>
        )}

        {showDeleteAll && tutorials.length > 0 && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" disabled={isDeleting}>
                {isDeleting ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Trash2 className="h-4 w-4 mr-1" />}
                Delete All
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete all tutorials.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteAll}>Delete All</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      {tutorials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.map((tutorial) => (
            <TutorialCard key={tutorial.id} tutorial={tutorial} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-muted-foreground mb-4">{emptyMessage}</p>
          <Button asChild>
            <a href="/create">Create your first tutorial</a>
          </Button>
        </div>
      )}
    </div>
  )
}
