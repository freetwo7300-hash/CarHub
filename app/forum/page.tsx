import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, Plus } from "@/lib/icons"
import Navigation from "@/components/navigation"
import Link from "next/link"
import { getForumThreads } from "@/lib/db"
import { ErrorDisplay } from "@/components/error-display"
import { ListSkeleton } from "@/components/skeletons"
import { handleError } from "@/lib/errors"
import { Suspense } from "react"

interface ForumThread {
  id: string
  title: string
  author: {
    id: string
    name: string
    avatar?: string
  }
  category: string
  replies: number
  views: number
  tags: string[]
  createdAt: Date
  isPinned: boolean
}

const categories = ["All", "maintenance", "performance", "troubleshooting", "general"]

async function ForumThreadsList() {
  try {
    const threads = await getForumThreads(20, 0)

    if (!threads || threads.length === 0) {
      return (
        <ErrorDisplay
          title="No Discussions Yet"
          message="Be the first to start a discussion in the forum!"
          action={{ label: "Create Thread", href: "/forum/new" }}
          showBackButton={false}
        />
      )
    }

    return (
      <div className="space-y-4">
        {threads.map((thread) => (
          <Link key={thread.id} href={`/forum/${thread.id}`}>
            <Card className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-accent group">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold group-hover:text-accent transition-colors truncate">
                      {thread.title}
                    </h3>
                    {thread.isPinned && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded">
                        Pinned
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                    <span>by {thread.author.name}</span>
                    <span className="px-2 py-1 bg-muted rounded capitalize">{thread.category}</span>
                    <span>{thread.tags.join(", ")}</span>
                  </div>
                </div>

                <div className="flex items-center gap-6 md:gap-8 flex-shrink-0">
                  <div className="text-center">
                    <div className="font-semibold">{thread.replies}</div>
                    <div className="text-xs text-muted-foreground">Replies</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">{thread.views}</div>
                    <div className="text-xs text-muted-foreground">Views</div>
                  </div>
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
        action={{ label: "Try Again", href: "/forum" }}
      />
    )
  }
}

export default function ForumPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">Community Forum</h1>
              <p className="text-primary-foreground/90">
                Connect with thousands of car enthusiasts and get expert advice
              </p>
            </div>
            <Link href="/forum/new">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground w-full md:w-auto">
                <Plus className="w-5 h-5 mr-2" />
                New Thread
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="bg-card border-b border-border py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            <Input
              placeholder="Search discussions..."
              defaultValue=""
              className="w-full"
            />
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
      </section>

      {/* Threads List */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<ListSkeleton count={5} />}>
            <ForumThreadsList />
          </Suspense>
        </div>
      </section>
    </div>
  )
}
