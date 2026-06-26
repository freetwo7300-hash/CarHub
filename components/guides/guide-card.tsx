import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Clock } from "@/lib/icons"
import type { Guide } from "@/types"

interface GuideCardProps {
  guide: Guide
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "beginner":
      return "bg-green-100 text-green-800"
    case "intermediate":
      return "bg-yellow-100 text-yellow-800"
    case "advanced":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function GuideCard({ guide }: GuideCardProps) {
  return (
    <Link href={`/guides/${guide.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-accent group h-full flex flex-col">
        {/* Image */}
        <div className="h-48 bg-muted overflow-hidden">
          <img
            src={guide.image || "/placeholder.jpg"}
            alt={guide.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          {/* Header */}
          <div className="mb-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="text-lg font-semibold group-hover:text-accent transition-colors line-clamp-2">
                {guide.title}
              </h3>
            </div>
            <p className="text-muted-foreground text-sm line-clamp-2">{guide.description}</p>
          </div>

          {/* Tags and Difficulty */}
          <div className="mb-4 flex flex-wrap gap-2">
            <span className={`px-2 py-1 rounded text-xs font-semibold capitalize ${getDifficultyColor(guide.difficulty)}`}>
              {guide.difficulty}
            </span>
            {guide.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="px-2 py-1 bg-muted rounded text-xs capitalize">
                {tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-auto pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3">
                <Clock />
              </div>
              <span>{guide.estimatedTime} min</span>
            </div>
            <div>
              <span className="font-semibold text-accent">{guide.views}</span>
              <span> views</span>
            </div>
          </div>

          {/* Author */}
          <div className="mt-3 pt-3 border-t border-border text-xs">
            <span className="text-muted-foreground">by</span>
            <span className="font-semibold ml-1">{guide.author.name}</span>
          </div>
        </div>
      </Card>
    </Link>
  )
}
