"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "@/lib/icons"
import { Navigation } from "@/components/layout"
import Link from "next/link"

const categories = ["Maintenance", "Troubleshooting", "Performance", "General", "Other"]

export default function NewThreadPage() {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("General")
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Handle thread creation
    setTimeout(() => {
      setIsSubmitting(false)
      // Redirect to forum
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="bg-card border-b border-border py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/forum" className="flex items-center gap-2 text-accent hover:text-accent/80 mb-4 w-fit">
            <div className="w-4 h-4">
              <ArrowLeft />
            </div>
            Back to Forum
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8">
            <h1 className="text-3xl font-bold mb-2">Start a New Discussion</h1>
            <p className="text-muted-foreground mb-8">
              Share your question, experience, or knowledge with the community
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold mb-2">Discussion Title</label>
                <Input
                  placeholder="What's your question or topic?"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="text-base"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Be specific and descriptive to get better responses
                </p>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold mb-2">Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <Button
                      key={cat}
                      type="button"
                      variant={category === cat ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCategory(cat)}
                      className={category === cat ? "bg-accent text-accent-foreground" : ""}
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-semibold mb-2">Description</label>
                <Textarea
                  placeholder="Provide details about your question or topic. The more information you provide, the better responses you'll get."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  className="min-h-64 text-base"
                />
              </div>

              {/* Guidelines */}
              <Card className="p-4 bg-muted/50">
                <h3 className="font-semibold mb-2">Community Guidelines</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Be respectful and constructive</li>
                  <li>• Search for existing answers before posting</li>
                  <li>• Provide relevant details and context</li>
                  <li>• No spam or promotional content</li>
                </ul>
              </Card>

              {/* Submit */}
              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={!title.trim() || !content.trim() || isSubmitting}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  {isSubmitting ? "Creating..." : "Create Discussion"}
                </Button>
                <Link href="/forum">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </Card>
        </div>
      </section>
    </div>
  )
}
