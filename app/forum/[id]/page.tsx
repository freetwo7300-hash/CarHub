import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MessageCircle, ThumbsUp, Share2, Flag } from "@/lib/icons"
import Navigation from "@/components/navigation"
import Link from "next/link"
import { getThreadById, getThreadComments } from "@/lib/db"

export default async function ThreadDetailPage({ params }: { params: { id: string } }) {
  let thread = null
  let comments = []
  let error = null

  try {
    thread = await getThreadById(params.id)
    if (thread) {
      comments = await getThreadComments(params.id)
    }
  } catch (err) {
    console.error("Failed to fetch thread:", err)
    error = "Failed to load thread"
  }

  if (!thread) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4">
            <Card className="p-12 text-center">
              <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground mb-4">Thread not found</p>
              <Link href="/forum">
                <Button>Back to Forum</Button>
              </Link>
            </Card>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Thread Header */}
      <section className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/forum" className="text-accent hover:underline mb-4 inline-block text-sm">
            ← Back to Forum
          </Link>

          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-3">{thread.title}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>by {thread.author.name}</span>
                <span className="px-2 py-1 bg-muted rounded capitalize">{thread.category}</span>
                <span>{new Date(thread.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            {thread.isPinned && (
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded font-semibold text-sm">
                Pinned
              </span>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-accent">{thread.views}</div>
              <div className="text-sm text-muted-foreground">Views</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-accent">{thread.replies}</div>
              <div className="text-sm text-muted-foreground">Replies</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-accent">
                {thread.tags.length > 0 ? thread.tags[0] : "General"}
              </div>
              <div className="text-sm text-muted-foreground">Category</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-semibold flex-shrink-0">
                {thread.author.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="font-semibold">{thread.author.name}</h2>
                </div>
                <p className="text-sm text-muted-foreground">{new Date(thread.createdAt).toLocaleString()}</p>
              </div>
            </div>

            <p className="text-foreground whitespace-pre-wrap mb-8 leading-relaxed">{thread.content}</p>

            <div className="flex flex-wrap gap-4 pt-6 border-t border-border">
              <Button variant="outline" size="sm">
                <ThumbsUp className="w-4 h-4 mr-2" />
                Like
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

          {/* Comments Section */}
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
              <MessageCircle className="w-6 h-6" />
              Replies ({comments.length})
            </h2>

            {comments.length > 0 ? (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <Card key={comment.id} className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-semibold flex-shrink-0">
                        {comment.author.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{comment.author.name}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">{new Date(comment.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">{comment.content}</p>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <ThumbsUp className="w-4 h-4 mr-2" />
                        {comment.likes}
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">No replies yet. Be the first to respond!</p>
              </Card>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
