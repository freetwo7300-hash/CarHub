"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Calendar, MapPin, Users, Search } from "@/lib/icons"
import Navigation from "@/components/navigation"
import Link from "next/link"

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  category: string
  attendees: number
  capacity: number
  image: string
  organizer: string
  type: "Workshop" | "Meetup" | "Training" | "Social"
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Oil Change Workshop",
    description: "Learn the basics of oil changes with hands-on practice",
    date: "Nov 15, 2025",
    time: "10:00 AM",
    location: "Downtown Auto Shop, 123 Main St",
    category: "Maintenance",
    attendees: 24,
    capacity: 30,
    image: "/workshop-oil-change.jpg",
    organizer: "John Mechanic",
    type: "Workshop",
  },
  {
    id: "2",
    title: "Monthly Car Enthusiasts Meetup",
    description: "Casual gathering for car lovers to share stories and tips",
    date: "Nov 16, 2025",
    time: "6:00 PM",
    location: "Central Park Parking Lot",
    category: "Social",
    attendees: 45,
    capacity: 100,
    image: "/meetup-cars.jpg",
    organizer: "Sarah Driver",
    type: "Meetup",
  },
  {
    id: "3",
    title: "Brake System Training",
    description: "Advanced training on brake system maintenance and repair",
    date: "Nov 18, 2025",
    time: "2:00 PM",
    location: "Tech Training Center, 456 Oak Ave",
    category: "Training",
    attendees: 18,
    capacity: 25,
    image: "/training-brakes.jpg",
    organizer: "Alex Technician",
    type: "Training",
  },
  {
    id: "4",
    title: "Tire Rotation & Balancing Workshop",
    description: "Master the art of proper tire maintenance",
    date: "Nov 20, 2025",
    time: "9:00 AM",
    location: "Downtown Auto Shop, 123 Main St",
    category: "Maintenance",
    attendees: 16,
    capacity: 20,
    image: "/workshop-tires.jpg",
    organizer: "Mike Expert",
    type: "Workshop",
  },
  {
    id: "5",
    title: "Electric Vehicle Basics",
    description: "Introduction to EV maintenance and ownership",
    date: "Nov 22, 2025",
    time: "7:00 PM",
    location: "Community Center, 789 Elm St",
    category: "Training",
    attendees: 32,
    capacity: 50,
    image: "/training-ev.jpg",
    organizer: "Emma Care",
    type: "Training",
  },
  {
    id: "6",
    title: "Weekend Car Show",
    description: "Showcase your vehicle and see amazing cars from the community",
    date: "Nov 23, 2025",
    time: "8:00 AM",
    location: "Riverside Park",
    category: "Social",
    attendees: 78,
    capacity: 150,
    image: "/carshow.jpg",
    organizer: "David Mechanic",
    type: "Social",
  },
  {
    id: "7",
    title: "Engine Diagnostics Workshop",
    description: "Learn to read and interpret engine diagnostic codes",
    date: "Nov 25, 2025",
    time: "3:00 PM",
    location: "Tech Training Center, 456 Oak Ave",
    category: "Maintenance",
    attendees: 22,
    capacity: 28,
    image: "/workshop-diagnostics.jpg",
    organizer: "John Mechanic",
    type: "Workshop",
  },
  {
    id: "8",
    title: "Battery & Electrical Systems",
    description: "Deep dive into vehicle electrical systems and battery maintenance",
    date: "Nov 27, 2025",
    time: "1:00 PM",
    location: "Downtown Auto Shop, 123 Main St",
    category: "Training",
    attendees: 19,
    capacity: 30,
    image: "/training-electrical.jpg",
    organizer: "Alex Technician",
    type: "Training",
  },
]

const categories = ["All", "Maintenance", "Training", "Social"]
const types = ["All", "Workshop", "Meetup", "Training", "Social"]

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedType, setSelectedType] = useState("All")

  const filteredEvents = mockEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory
    const matchesType = selectedType === "All" || event.type === selectedType
    return matchesSearch && matchesCategory && matchesType
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Workshop":
        return "bg-blue-100 text-blue-800"
      case "Meetup":
        return "bg-purple-100 text-purple-800"
      case "Training":
        return "bg-green-100 text-green-800"
      case "Social":
        return "bg-pink-100 text-pink-800"
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
            <Calendar className="w-8 h-8" />
            <h1 className="text-4xl md:text-5xl font-bold">Events & Meetups</h1>
          </div>
          <p className="text-primary-foreground/90 text-lg max-w-2xl">
            Join workshops, meetups, and training sessions with fellow car enthusiasts
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
                placeholder="Search events by title, location..."
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

            {/* Type Filter */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Event Type</h3>
              <div className="flex flex-wrap gap-2">
                {types.map((type) => (
                  <Button
                    key={type}
                    variant={selectedType === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedType(type)}
                    className={selectedType === type ? "bg-accent text-accent-foreground" : ""}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredEvents.length > 0 ? (
            <div className="space-y-6">
              {filteredEvents.map((event) => (
                <Link key={event.id} href={`/events/${event.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-accent group">
                    <div className="flex flex-col md:flex-row">
                      {/* Image */}
                      <div className="md:w-64 h-48 md:h-auto bg-muted overflow-hidden flex-shrink-0">
                        <img
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <div>
                              <h3 className="text-xl font-semibold group-hover:text-accent transition-colors mb-2">
                                {event.title}
                              </h3>
                              <p className="text-muted-foreground text-sm line-clamp-2">{event.description}</p>
                            </div>
                            <div
                              className={`px-3 py-1 rounded text-xs font-semibold flex-shrink-0 ${getTypeColor(event.type)}`}
                            >
                              {event.type}
                            </div>
                          </div>
                        </div>

                        {/* Meta Info */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-accent" />
                            <div>
                              <div className="font-semibold">{event.date}</div>
                              <div className="text-xs text-muted-foreground">{event.time}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-accent" />
                            <div className="line-clamp-2">{event.location}</div>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Users className="w-4 h-4 text-accent" />
                            <div>
                              <div className="font-semibold">{event.attendees}</div>
                              <div className="text-xs text-muted-foreground">of {event.capacity}</div>
                            </div>
                          </div>
                          <div className="text-sm">
                            <div className="font-semibold text-accent">
                              {Math.round((event.attendees / event.capacity) * 100)}%
                            </div>
                            <div className="text-xs text-muted-foreground">Capacity</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">No events found. Try adjusting your filters.</p>
            </Card>
          )}
        </div>
      </section>
    </div>
  )
}
