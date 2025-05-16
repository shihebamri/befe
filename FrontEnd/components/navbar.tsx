"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { BookOpen, Plus, Home, CheckSquare } from "lucide-react"

export default function Navbar() {
  const pathname = usePathname()

  const navItems = [
    {
      name: "All Tutorials",
      href: "/",
      icon: Home,
    },
    {
      name: "Published Tutorials",
      href: "/published",
      icon: CheckSquare,
    },
    {
      name: "Add Tutorial",
      href: "/create",
      icon: Plus,
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6" />
            <span className="font-bold hidden sm:inline-block">Tutorial Manager</span>
          </Link>
        </div>
        <nav className="flex items-center space-x-1 md:space-x-2 flex-1">
          {navItems.map((item) => (
            <Button key={item.href} variant={pathname === item.href ? "secondary" : "ghost"} size="sm" asChild>
              <Link href={item.href} className="flex items-center space-x-1">
                <item.icon className="h-4 w-4" />
                <span className="hidden sm:inline-block">{item.name}</span>
              </Link>
            </Button>
          ))}
        </nav>
        <div className="flex items-center">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
