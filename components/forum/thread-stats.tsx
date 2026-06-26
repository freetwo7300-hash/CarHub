import { Card } from "@/components/ui/card"
import type { ForumThread } from "@/types"

interface ThreadStatsProps {
  thread: ForumThread
}

export function ThreadStats({ thread }: ThreadStatsProps) {
  return (
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
  )
}
