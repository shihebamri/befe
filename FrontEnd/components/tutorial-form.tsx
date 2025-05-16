"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import type { Tutorial } from "@/types/tutorial"
import { createTutorial, updateTutorial } from "@/lib/api"
import { Loader2 } from "lucide-react"

// Form validation schema
const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(70, "Title must be less than 70 characters"),
  description: z.string().min(1, "Description is required").max(200, "Description must be less than 200 characters"),
  published: z.boolean().default(false),
})

interface TutorialFormProps {
  tutorial?: Tutorial
  isEdit?: boolean
}

export default function TutorialForm({ tutorial, isEdit = false }: TutorialFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize form with default values or existing tutorial data
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: tutorial?.title || "",
      description: tutorial?.description || "",
      published: tutorial?.published || false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      if (isEdit && tutorial) {
        await updateTutorial(tutorial.id, values)
        toast({
          title: "Tutorial updated",
          description: "Your tutorial has been updated successfully.",
        })
      } else {
        await createTutorial(values)
        toast({
          title: "Tutorial created",
          description: "Your tutorial has been created successfully.",
        })
      }
      router.push("/")
      router.refresh()
    } catch (error) {
      console.error("Form submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter tutorial title" {...field} />
              </FormControl>
              <FormDescription>The title of your tutorial (max 70 characters).</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter tutorial description" className="min-h-[120px]" {...field} />
              </FormControl>
              <FormDescription>Describe your tutorial (max 200 characters).</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="published"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Published</FormLabel>
                <FormDescription>Make this tutorial visible in the published section.</FormDescription>
              </div>
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEdit ? "Update" : "Create"} Tutorial
          </Button>
        </div>
      </form>
    </Form>
  )
}
