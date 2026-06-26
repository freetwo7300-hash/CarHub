import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BookOpen, Clock, ThumbsUp, Share2 } from "@/lib/icons"
import Navigation from "@/components/navigation"
import Link from "next/link"
import { getGuideById } from "@/lib/db"

export default async function GuideDetailPage({ params }: { params: { id: string } }) {
  let guide = null
  let error = null

  try {
    guide = await getGuideById(params.id)
  } catch (err) {
    console.error("Failed to fetch guide:", err)
    error = "Failed to load guide"
  }

  if (!guide) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4">
            <Card className="p-12 text-center">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground mb-4">Guide not found</p>
              <Link href="/guides">
                <Button>Back to Guides</Button>
              </Link>
            </Card>
          </div>
        </section>
      </div>
    )
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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Link */}
        <Link href="/guides" className="text-accent hover:underline mb-6 inline-block text-sm">
          ← Back to Guides
        </Link>

        {/* Hero Image */}
        <div className="rounded-lg overflow-hidden mb-8 h-96 bg-muted">
          <img
            src={guide.image || "/placeholder.jpg"}
            alt={guide.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Header */}
        <div className="mb-8">
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
              <Clock className="w-4 h-4" />
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
        </div>

        {/* Content */}
        <Card className="p-8 mb-8">
          <div className="prose prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-foreground leading-relaxed">{guide.content}</div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 pt-6 border-t border-border mt-8">
            <Button variant="outline" size="sm">
              <ThumbsUp className="w-4 h-4 mr-2" />
              Helpful ({guide.helpful})
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </Card>

        {/* Author Info */}
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
      </section>
    </div>
  )
}
