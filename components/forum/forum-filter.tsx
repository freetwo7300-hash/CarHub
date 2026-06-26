'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

const categories = ["All", "maintenance", "performance", "troubleshooting", "general"]

export function ForumFilter() {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  return (
    <section className="bg-card border-b border-border py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <Input
            placeholder="Search discussions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full"
          />
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                className="capitalize"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
