import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, ThumbsUp, Eye, Plus } from "@/lib/icons"
import Navigation from "@/components/navigation"
import Link from "next/link"
import { getForumThreads } from "@/lib/db"

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

export default async function ForumPage() {
  let threads: ForumThread[] = []
  let error = null

  try {
    threads = await getForumThreads(20, 0)
  } catch (err) {
    console.error("Failed to fetch threads:", err)
    error = "Failed to load forum threads"
  }

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

      {/* Error Message */}
      {error && (
        <section className="bg-red-50 border-b border-red-200 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-red-700">{error}</p>
          </div>
        </section>
      )}

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
          <div className="space-y-4">
            {threads.length > 0 ? (
              threads.map((thread) => (
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
                          <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                            <MessageCircle className="w-4 h-4" />
                          </div>
                          <div className="font-semibold">{thread.replies}</div>
                          <div className="text-xs text-muted-foreground">Replies</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                            <Eye className="w-4 h-4" />
                          </div>
                          <div className="font-semibold">{thread.views}</div>
                          <div className="text-xs text-muted-foreground">Views</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))
            ) : (
              <Card className="p-12 text-center">
                <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">No threads found. Start a new discussion!</p>
              </Card>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
