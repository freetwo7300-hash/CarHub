"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, ThumbsUp, Eye, Plus } from "@/lib/icons"
import Navigation from "@/components/navigation"
import Link from "next/link"

interface ForumThread {
  id: string
  title: string
  author: string
  category: string
  replies: number
  views: number
  likes: number
  lastReply: string
  excerpt: string
  solved: boolean
}

const mockThreads: ForumThread[] = [
  {
    id: "1",
    title: "Best practices for oil change intervals",
    author: "John Mechanic",
    category: "Maintenance",
    replies: 24,
    views: 1250,
    likes: 89,
    lastReply: "2 hours ago",
    excerpt: "I've been wondering about the optimal oil change intervals for my 2020 sedan...",
    solved: true,
  },
  {
    id: "2",
    title: "Tire rotation - DIY or professional?",
    author: "Sarah Driver",
    category: "Maintenance",
    replies: 18,
    views: 892,
    likes: 56,
    lastReply: "4 hours ago",
    excerpt: "Is it worth doing tire rotation myself or should I go to a professional?",
    solved: false,
  },
  {
    id: "3",
    title: "Engine warning light - what does it mean?",
    author: "Mike Expert",
    category: "Troubleshooting",
    replies: 32,
    views: 2100,
    likes: 145,
    lastReply: "1 hour ago",
    excerpt: "My check engine light came on. Should I be worried?",
    solved: true,
  },
  {
    id: "4",
    title: "Brake pad replacement guide",
    author: "Alex Technician",
    category: "Maintenance",
    replies: 15,
    views: 756,
    likes: 42,
    lastReply: "6 hours ago",
    excerpt: "Step-by-step guide for replacing brake pads on most vehicles...",
    solved: false,
  },
  {
    id: "5",
    title: "Battery maintenance tips",
    author: "Emma Care",
    category: "Maintenance",
    replies: 12,
    views: 634,
    likes: 38,
    lastReply: "8 hours ago",
    excerpt: "How to properly maintain your car battery for longevity...",
    solved: true,
  },
  {
    id: "6",
    title: "Transmission fluid - when to change?",
    author: "David Mechanic",
    category: "Maintenance",
    replies: 28,
    views: 1890,
    likes: 102,
    lastReply: "3 hours ago",
    excerpt: "What's the recommended interval for transmission fluid changes?",
    solved: false,
  },
]

const categories = ["All", "Maintenance", "Troubleshooting", "Performance", "General"]

export default function ForumPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredThreads = mockThreads.filter((thread) => {
    const matchesSearch =
      thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || thread.category === selectedCategory
    return matchesSearch && matchesCategory
  })

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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-accent text-accent-foreground" : ""}
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
            {filteredThreads.length > 0 ? (
              filteredThreads.map((thread) => (
                <Link key={thread.id} href={`/forum/${thread.id}`}>
                  <Card className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-accent group">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold group-hover:text-accent transition-colors truncate">
                            {thread.title}
                          </h3>
                          {thread.solved && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">
                              Solved
                            </span>
                          )}
                        </div>
                        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{thread.excerpt}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>by {thread.author}</span>
                          <span className="px-2 py-1 bg-muted rounded">{thread.category}</span>
                          <span>{thread.lastReply}</span>
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
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                            <ThumbsUp className="w-4 h-4" />
                          </div>
                          <div className="font-semibold">{thread.likes}</div>
                          <div className="text-xs text-muted-foreground">Likes</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))
            ) : (
              <Card className="p-12 text-center">
                <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">No threads found. Try adjusting your search or filters.</p>
              </Card>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
