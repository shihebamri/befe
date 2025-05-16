import type { Tutorial } from "@/types/tutorial"
import { toast } from "@/components/ui/use-toast"

const API_URL = "/api/tutorials"

// Error handler helper
const handleError = (error: any) => {
  console.error("API Error:", error)
  toast({
    title: "Error",
    description: error.message || "Something went wrong",
    variant: "destructive",
  })
  throw error
}

// Get all tutorials with optional title filter
export async function getTutorials(title?: string): Promise<Tutorial[]> {
  try {
    const url = title ? `${API_URL}/?title=${encodeURIComponent(title)}` : API_URL
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Failed to fetch tutorials: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    return handleError(error)
  }
}

// Get published tutorials
export async function getPublishedTutorials(): Promise<Tutorial[]> {
  try {
    const response = await fetch(`${API_URL}/published/`)

    if (!response.ok) {
      throw new Error(`Failed to fetch published tutorials: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    return handleError(error)
  }
}

// Get a single tutorial by ID
export async function getTutorial(id: number): Promise<Tutorial> {
  try {
    const response = await fetch(`${API_URL}/${id}/`)

    if (!response.ok) {
      throw new Error(`Failed to fetch tutorial: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    return handleError(error)
  }
}

// Create a new tutorial
export async function createTutorial(tutorial: Omit<Tutorial, "id">): Promise<Tutorial> {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tutorial),
    })

    if (!response.ok) {
      throw new Error(`Failed to create tutorial: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    return handleError(error)
  }
}

// Update an existing tutorial
export async function updateTutorial(id: number, tutorial: Omit<Tutorial, "id">): Promise<Tutorial> {
  try {
    const response = await fetch(`${API_URL}/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tutorial),
    })

    if (!response.ok) {
      throw new Error(`Failed to update tutorial: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    return handleError(error)
  }
}

// Delete a tutorial
export async function deleteTutorial(id: number): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/${id}/`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error(`Failed to delete tutorial: ${response.status}`)
    }
  } catch (error) {
    handleError(error)
  }
}

// Delete all tutorials
export async function deleteAllTutorials(): Promise<void> {
  try {
    const response = await fetch(API_URL, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error(`Failed to delete all tutorials: ${response.status}`)
    }
  } catch (error) {
    handleError(error)
  }
}

// Toggle published status
export async function togglePublishedStatus(tutorial: Tutorial): Promise<Tutorial> {
  return updateTutorial(tutorial.id, {
    ...tutorial,
    published: !tutorial.published,
  })
}
