import { Card } from "@/components/ui/card"
import Link from "next/link"
import type { ForumThread } from "@/types"

interface ThreadCardProps {
  thread: ForumThread
}

export function ThreadCard({ thread }: ThreadCardProps) {
  return (
    <Link href={`/forum/${thread.id}`}>
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
  )
}
