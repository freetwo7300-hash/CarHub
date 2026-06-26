import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BookOpen, Clock } from "@/lib/icons"
import { Navigation } from "@/components/layout"
import Link from "next/link"
import { getGuides } from "@/lib/db"
import { ErrorDisplay, ListSkeleton } from "@/components/shared"
import { handleError } from "@/lib/errors"
import { Suspense } from "react"
import type { Guide } from "@/types"

const categories = ["All", "maintenance", "performance", "troubleshooting", "diy"]

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "beginner":
      return "bg-green-100 text-green-800"
    case "intermediate":
      return "bg-yellow-100 text-yellow-800"
    case "advanced":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

async function GuidesList() {
  try {
    const guides = await getGuides(20, 0)

    if (!guides || guides.length === 0) {
      return (
        <ErrorDisplay
          title="No Guides Available"
          message="Check back soon for new maintenance guides and tutorials!"
          action={{ label: "Browse Events", href: "/events" }}
          showBackButton={false}
        />
      )
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((guide) => (
          <Link key={guide.id} href={`/guides/${guide.id}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-accent group h-full flex flex-col">
              {/* Image */}
              <div className="h-48 bg-muted overflow-hidden">
                <img
                  src={guide.image || "/placeholder.jpg"}
                  alt={guide.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                {/* Header */}
                <div className="mb-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-lg font-semibold group-hover:text-accent transition-colors line-clamp-2">
                      {guide.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm line-clamp-2">{guide.description}</p>
                </div>

                {/* Tags and Difficulty */}
                <div className="mb-4 flex flex-wrap gap-2">
                  <span className={`px-2 py-1 rounded text-xs font-semibold capitalize ${getDifficultyColor(guide.difficulty)}`}>
                    {guide.difficulty}
                  </span>
                  {guide.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-muted rounded text-xs capitalize">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-auto pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3">
                      <Clock />
                    </div>
                    <span>{guide.estimatedTime} min</span>
                  </div>
                  <div>
                    <span className="font-semibold text-accent">{guide.views}</span>
                    <span> views</span>
                  </div>
                </div>

                {/* Author */}
                <div className="mt-3 pt-3 border-t border-border text-xs">
                  <span className="text-muted-foreground">by</span>
                  <span className="font-semibold ml-1">{guide.author.name}</span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    )
  } catch (err) {
    const error = handleError(err)
    return (
      <ErrorDisplay
        title={error.title}
        message={error.message}
        action={{ label: "Try Again", href: "/guides" }}
      />
    )
  }
}

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8">
              <BookOpen />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Maintenance Guides</h1>
          </div>
          <p className="text-primary-foreground/90 text-lg max-w-2xl">
            Learn from expert mechanics and car enthusiasts
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="bg-card border-b border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* Search */}
            <div className="relative">
              <Input
                placeholder="Search guides..."
                className="w-full"
              />
            </div>

            {/* Category Filter */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Category</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant="outline"
                    size="sm"
                    className="capitalize"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<ListSkeleton count={6} />}>
            {/* @ts-expect-error Async component */}
            <GuidesList />
          </Suspense>
        </div>
      </section>
    </div>
  )
}
