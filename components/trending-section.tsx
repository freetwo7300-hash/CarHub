"use client"

import { Card } from "@/components/ui/card"
import Link from "next/link"

const TrendingUp = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
)

const Fire = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
  </svg>
)

interface TrendingItem {
  id: string
  title: string
  views: number
  engagement: number
  type: "hot" | "rising"
}

export default function TrendingSection() {
  const trendingItems: TrendingItem[] = [
    { id: "1", title: "EV Battery Maintenance Tips", views: 2500, engagement: 450, type: "hot" },
    { id: "2", title: "DIY Brake Pad Replacement", views: 1800, engagement: 320, type: "rising" },
    { id: "3", title: "Winter Tire Guide 2025", views: 3200, engagement: 580, type: "hot" },
    { id: "4", title: "Engine Oil Comparison", views: 1200, engagement: 210, type: "rising" },
    { id: "5", title: "Transmission Fluid Change", views: 950, engagement: 180, type: "rising" },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Fire className="w-5 h-5 text-accent" />
        <h3 className="font-bold text-lg">Trending Now</h3>
      </div>

      <div className="space-y-3">
        {trendingItems.map((item) => (
          <Link key={item.id} href="/forum">
            <Card className="p-4 hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-accent group">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        item.type === "hot"
                          ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
                          : "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-200"
                      }`}
                    >
                      {item.type === "hot" ? "🔥 Hot" : "📈 Rising"}
                    </span>
                  </div>
                  <p className="font-medium text-sm group-hover:text-accent transition-colors truncate">{item.title}</p>
                  <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                    <span>{item.views.toLocaleString()} views</span>
                    <span>{item.engagement} engagement</span>
                  </div>
                </div>
                <TrendingUp className="w-5 h-5 text-accent flex-shrink-0 group-hover:animate-pulse" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
