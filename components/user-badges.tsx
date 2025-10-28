"use client"

import { Card } from "@/components/ui/card"

interface Badge {
  id: string
  name: string
  icon: string
  description: string
  color: string
}

interface UserBadgesProps {
  badges?: Badge[]
}

export default function UserBadges({ badges }: UserBadgesProps) {
  const defaultBadges: Badge[] = [
    {
      id: "1",
      name: "Expert",
      icon: "⭐",
      description: "50+ helpful answers",
      color: "bg-yellow-100 dark:bg-yellow-900",
    },
    {
      id: "2",
      name: "Contributor",
      icon: "✍️",
      description: "10+ guides published",
      color: "bg-blue-100 dark:bg-blue-900",
    },
    {
      id: "3",
      name: "Community Helper",
      icon: "🤝",
      description: "100+ helpful votes",
      color: "bg-green-100 dark:bg-green-900",
    },
    {
      id: "4",
      name: "Verified Mechanic",
      icon: "🔧",
      description: "Professional certification",
      color: "bg-purple-100 dark:bg-purple-900",
    },
  ]

  const displayBadges = badges || defaultBadges

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-sm">Achievements</h3>
      <div className="grid grid-cols-2 gap-3">
        {displayBadges.map((badge) => (
          <Card key={badge.id} className={`p-3 text-center ${badge.color} border-0`}>
            <div className="text-2xl mb-1">{badge.icon}</div>
            <p className="font-medium text-xs">{badge.name}</p>
            <p className="text-xs opacity-75 mt-1">{badge.description}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
