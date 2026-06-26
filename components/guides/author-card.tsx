import { Card } from "@/components/ui/card"
import type { Guide } from "@/types"

interface AuthorCardProps {
  guide: Guide
}

export function AuthorCard({ guide }: AuthorCardProps) {
  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">About the Author</h3>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-semibold flex-shrink-0">
          {guide.author.name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold">{guide.author.name}</p>
          <p className="text-sm text-muted-foreground">Community Guide Author</p>
        </div>
      </div>
    </Card>
  )
}
