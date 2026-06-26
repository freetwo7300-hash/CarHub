import { Clock } from "@/lib/icons"
import type { Guide } from "@/types"

interface GuideHeaderProps {
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

export function GuideHeader({ guide }: GuideHeaderProps) {
  return (
    <>
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h1 className="text-4xl font-bold mb-3">{guide.title}</h1>
          <p className="text-lg text-muted-foreground mb-4">{guide.description}</p>
        </div>
        <div className={`px-4 py-2 rounded font-semibold flex-shrink-0 capitalize ${getDifficultyColor(guide.difficulty)}`}>
          {guide.difficulty}
        </div>
      </div>

      {/* Meta Info */}
      <div className="flex flex-wrap gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4">
            <Clock />
          </div>
          <span>{guide.estimatedTime} minutes</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-accent font-semibold">{guide.views}</span>
          <span>views</span>
        </div>
        <div>
          <span>by {guide.author.name}</span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        {guide.tags.map((tag) => (
          <span key={tag} className="px-2 py-1 bg-muted rounded text-xs capitalize">
            {tag}
          </span>
        ))}
      </div>
    </>
  )
}
