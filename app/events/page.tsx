import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Calendar, MapPin, Users } from "@/lib/icons"
import Navigation from "@/components/navigation"
import Link from "next/link"
import { getEvents } from "@/lib/db"

interface Event {
  id: string
  title: string
  description: string
  date: Date
  location: string
  category: string
  registeredCount: number
  maxAttendees?: number
  image: string
  organizer: {
    id: string
    name: string
    avatar?: string
  }
}

const categories = ["All", "meetup", "show", "training", "workshop"]

export default async function EventsPage() {
  let events: Event[] = []
  let error = null

  try {
    events = await getEvents(20, 0)
  } catch (err) {
    console.error("Failed to fetch events:", err)
    error = "Failed to load events"
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
            Join workshops, meetups, and shows with fellow car enthusiasts
          </p>
        </div>
      </section>

      {/* Error Message */}
      {error && (
        <section className="bg-red-50 border-b border-red-200 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-red-700">{error}</p>
          </div>
        </section>
      )}

      {/* Search and Filters */}
      <section className="bg-card border-b border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* Search */}
            <div className="relative">
              <Input
                placeholder="Search events by title, location..."
                className="w-full"
              />
            </div>

            {/* Category Filter */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Category</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant="outline"
                    size="sm"
                    className="capitalize"
                  >
                    {category}
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
          {events.length > 0 ? (
            <div className="space-y-6">
              {events.map((event) => (
                <Link key={event.id} href={`/events/${event.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-accent group">
                    <div className="flex flex-col md:flex-row">
                      {/* Image */}
                      <div className="md:w-64 h-48 md:h-auto bg-muted overflow-hidden flex-shrink-0">
                        <img
                          src={event.image || "/placeholder.jpg"}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-6 flex flex-col justify-between">
                        <div>
                          <div className="mb-3">
                            <h3 className="text-xl font-semibold group-hover:text-accent transition-colors mb-2">
                              {event.title}
                            </h3>
                            <p className="text-muted-foreground text-sm line-clamp-2">{event.description}</p>
                          </div>
                        </div>

                        {/* Meta Info */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-border">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-accent" />
                            <div>
                              <div className="font-semibold">
                                {new Date(event.date).toLocaleDateString()}
                              </div>
                              <div className="text-xs text-muted-foreground">Date</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-accent" />
                            <div className="line-clamp-2">{event.location}</div>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Users className="w-4 h-4 text-accent" />
                            <div>
                              <div className="font-semibold">{event.registeredCount}</div>
                              <div className="text-xs text-muted-foreground">
                                {event.maxAttendees ? `of ${event.maxAttendees}` : "Registered"}
                              </div>
                            </div>
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
              <p className="text-muted-foreground">No events found. Check back soon!</p>
            </Card>
          )}
        </div>
      </section>
    </div>
  )
}
