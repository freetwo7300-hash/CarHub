"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BookOpen, Clock, Search } from "@/lib/icons"
import Navigation from "@/components/navigation"
import Link from "next/link"

interface Guide {
  id: string
  title: string
  description: string
  category: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  duration: string
  views: number
  rating: number
  author: string
  image: string
}

const mockGuides: Guide[] = [
  {
    id: "1",
    title: "Complete Oil Change Guide",
    description: "Step-by-step instructions for changing your vehicle's oil and filter",
    category: "Maintenance",
    difficulty: "Beginner",
    duration: "30 mins",
    views: 5420,
    rating: 4.8,
    author: "John Mechanic",
    image: "/oil-change.png",
  },
  {
    id: "2",
    title: "Brake Pad Replacement",
    description: "Learn how to safely replace your brake pads and maintain stopping power",
    category: "Maintenance",
    difficulty: "Intermediate",
    duration: "45 mins",
    views: 3890,
    rating: 4.7,
    author: "Alex Technician",
    image: "/brake-pads-close-up.png",
  },
  {
    id: "3",
    title: "Battery Maintenance & Replacement",
    description: "Keep your battery healthy and learn when it's time for a replacement",
    category: "Maintenance",
    difficulty: "Beginner",
    duration: "20 mins",
    views: 2156,
    rating: 4.9,
    author: "Emma Care",
    image: "/car-battery.png",
  },
  {
    id: "4",
    title: "Tire Rotation & Balancing",
    description: "Extend tire life and improve handling with proper rotation and balancing",
    category: "Maintenance",
    difficulty: "Intermediate",
    duration: "40 mins",
    views: 4230,
    rating: 4.6,
    author: "Mike Expert",
    image: "/tire-rotation.jpg",
  },
  {
    id: "5",
    title: "Air Filter Replacement",
    description: "Improve engine performance by replacing your air filter regularly",
    category: "Maintenance",
    difficulty: "Beginner",
    duration: "15 mins",
    views: 1890,
    rating: 4.8,
    author: "Sarah Driver",
    image: "/air-filter.png",
  },
  {
    id: "6",
    title: "Transmission Fluid Change",
    description: "Complete guide to changing transmission fluid and maintaining smooth shifts",
    category: "Maintenance",
    difficulty: "Advanced",
    duration: "60 mins",
    views: 2340,
    rating: 4.5,
    author: "David Mechanic",
    image: "/transmission-fluid.jpg",
  },
  {
    id: "7",
    title: "Spark Plug Replacement",
    description: "Keep your engine running smoothly with fresh spark plugs",
    category: "Maintenance",
    difficulty: "Intermediate",
    duration: "35 mins",
    views: 3120,
    rating: 4.7,
    author: "John Mechanic",
    image: "/spark-plugs.png",
  },
  {
    id: "8",
    title: "Coolant System Flush",
    description: "Maintain proper engine temperature with a complete coolant system flush",
    category: "Maintenance",
    difficulty: "Intermediate",
    duration: "50 mins",
    views: 1650,
    rating: 4.6,
    author: "Alex Technician",
    image: "/coolant-system.jpg",
  },
]

const categories = ["All", "Maintenance", "Troubleshooting", "Performance", "Safety"]
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"]

export default function GuidesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All")

  const filteredGuides = mockGuides.filter((guide) => {
    const matchesSearch =
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || guide.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === "All" || guide.difficulty === selectedDifficulty
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8" />
            <h1 className="text-4xl md:text-5xl font-bold">Maintenance Guides</h1>
          </div>
          <p className="text-primary-foreground/90 text-lg max-w-2xl">
            Learn how to maintain and repair your vehicle with our comprehensive step-by-step guides
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="bg-card border-b border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Category</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? "bg-accent text-accent-foreground" : ""}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Difficulty Level</h3>
              <div className="flex flex-wrap gap-2">
                {difficulties.map((difficulty) => (
                  <Button
                    key={difficulty}
                    variant={selectedDifficulty === difficulty ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className={selectedDifficulty === difficulty ? "bg-accent text-accent-foreground" : ""}
                  >
                    {difficulty}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredGuides.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGuides.map((guide) => (
                <Link key={guide.id} href={`/guides/${guide.id}`}>
                  <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-accent group flex flex-col">
                    {/* Image */}
                    <div className="relative h-40 bg-muted overflow-hidden">
                      <img
                        src={guide.image || "/placeholder.svg"}
                        alt={guide.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div
                        className={`absolute top-3 right-3 px-3 py-1 rounded text-xs font-semibold ${getDifficultyColor(guide.difficulty)}`}
                      >
                        {guide.difficulty}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-accent transition-colors line-clamp-2">
                        {guide.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">{guide.description}</p>

                      {/* Meta Info */}
                      <div className="space-y-3 pt-4 border-t border-border">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            {guide.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-accent font-semibold">{guide.rating}</span>
                            <span className="text-muted-foreground">★</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{guide.views.toLocaleString()} views</span>
                          <span>by {guide.author}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">No guides found. Try adjusting your filters.</p>
            </Card>
          )}
        </div>
      </section>
    </div>
  )
}
