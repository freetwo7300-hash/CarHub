"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ThumbsUp, MessageCircle, Share2, Flag, ArrowLeft } from "@/lib/icons"
import Navigation from "@/components/navigation"
import Link from "next/link"

interface Comment {
  id: string
  author: string
  avatar: string
  content: string
  timestamp: string
  likes: number
  isAnswer: boolean
}

interface ThreadDetail {
  id: string
  title: string
  author: string
  avatar: string
  content: string
  timestamp: string
  category: string
  views: number
  likes: number
  replies: number
  solved: boolean
  comments: Comment[]
}

const mockThread: ThreadDetail = {
  id: "1",
  title: "Best practices for oil change intervals",
  author: "John Mechanic",
  avatar: "JM",
  content: `I've been wondering about the optimal oil change intervals for my 2020 sedan. The manual says 10,000 miles, but I've heard conflicting advice online. Some say every 5,000 miles is better for engine longevity, while others say modern oils can go 15,000 miles.

What's your experience? Do you follow the manufacturer's recommendation or do something different? I want to make sure I'm taking proper care of my vehicle.`,
  timestamp: "2 hours ago",
  category: "Maintenance",
  views: 1250,
  likes: 89,
  replies: 24,
  solved: true,
  comments: [
    {
      id: "1",
      author: "Alex Technician",
      avatar: "AT",
      content: `Follow the manufacturer's recommendation. Modern synthetic oils are designed to last longer, and your 2020 sedan likely uses synthetic or synthetic blend oil. 10,000 miles is perfectly fine.

The 5,000-mile interval was more relevant for older vehicles with conventional oil. You'll waste money changing it more frequently than needed.`,
      timestamp: "1 hour ago",
      likes: 45,
      isAnswer: true,
    },
    {
      id: "2",
      author: "Sarah Driver",
      avatar: "SD",
      content: `I follow the manual's recommendation and my car has been running great. I also check my oil level monthly to make sure it's not burning oil between changes.`,
      timestamp: "45 minutes ago",
      likes: 28,
      isAnswer: false,
    },
    {
      id: "3",
      author: "Mike Expert",
      avatar: "ME",
      content: `One thing to consider: if you do a lot of short trips or towing, you might want to change it more frequently. But for normal driving, 10,000 miles is the sweet spot for modern vehicles.`,
      timestamp: "30 minutes ago",
      likes: 32,
      isAnswer: false,
    },
  ],
}

export default function ThreadDetailPage({ params }: { params: { id: string } }) {
  const [newComment, setNewComment] = useState("")
  const [liked, setLiked] = useState(false)

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      setNewComment("")
      // Handle comment submission
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="bg-card border-b border-border py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/forum" className="flex items-center gap-2 text-accent hover:text-accent/80 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Forum
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Original Post */}
          <Card className="p-8 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-semibold flex-shrink-0">
                {mockThread.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="font-semibold">{mockThread.author}</h2>
                  {mockThread.solved && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">
                      Original Poster
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{mockThread.timestamp}</p>
              </div>
              <span className="px-3 py-1 bg-muted rounded text-sm font-medium">{mockThread.category}</span>
            </div>

            <h1 className="text-3xl font-bold mb-6">{mockThread.title}</h1>

            <p className="text-foreground whitespace-pre-wrap mb-8 leading-relaxed">{mockThread.content}</p>

            <div className="flex flex-wrap gap-4 pt-6 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLiked(!liked)}
                className={liked ? "bg-accent/10 border-accent text-accent" : ""}
              >
                <ThumbsUp className="w-4 h-4 mr-2" />
                {mockThread.likes + (liked ? 1 : 0)} Likes
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Flag className="w-4 h-4 mr-2" />
                Report
              </Button>
            </div>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-accent">{mockThread.views}</div>
              <div className="text-sm text-muted-foreground">Views</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-accent">{mockThread.replies}</div>
              <div className="text-sm text-muted-foreground">Replies</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-accent">{mockThread.solved ? "Solved" : "Open"}</div>
              <div className="text-sm text-muted-foreground">Status</div>
            </Card>
          </div>

          {/* Comments Section */}
          <div className="space-y-6 mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <MessageCircle className="w-6 h-6" />
              Replies ({mockThread.comments.length})
            </h2>

            {mockThread.comments.map((comment) => (
              <Card key={comment.id} className={`p-6 ${comment.isAnswer ? "border-green-200 bg-green-50/50" : ""}`}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-semibold flex-shrink-0">
                    {comment.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{comment.author}</h3>
                      {comment.isAnswer && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">
                          Accepted Answer
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{comment.timestamp}</p>
                  </div>
                </div>

                <p className="text-foreground mb-4 leading-relaxed">{comment.content}</p>

                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    {comment.likes}
                  </Button>
                  <Button variant="ghost" size="sm">
                    Reply
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Reply Form */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Add Your Reply</h3>
            <div className="space-y-4">
              <Textarea
                placeholder="Share your thoughts, experience, or answer..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-32"
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim()}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  Post Reply
                </Button>
                <Button variant="outline" onClick={() => setNewComment("")}>
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
