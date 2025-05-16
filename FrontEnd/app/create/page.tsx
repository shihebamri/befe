import TutorialForm from "@/components/tutorial-form"

export default function CreateTutorial() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Create New Tutorial</h1>
        <p className="text-muted-foreground">Fill in the details to create a new tutorial.</p>
      </div>

      <TutorialForm />
    </div>
  )
}
