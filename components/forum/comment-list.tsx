import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, ThumbsUp } from "@/lib/icons"
import type { ForumComment } from "@/types"

interface CommentListProps {
  comments: ForumComment[]
  emptyMessage?: string
}

export function CommentList({ comments, emptyMessage = "No replies yet. Be the first to respond!" }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <Card className="p-8 text-center">
        <div className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50">
          <MessageCircle />
        </div>
        <p className="text-muted-foreground">{emptyMessage}</p>
      </Card>
    )
  }

  return (
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
              <div className="w-4 h-4 mr-2">
                <ThumbsUp />
              </div>
              {comment.likes}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}
