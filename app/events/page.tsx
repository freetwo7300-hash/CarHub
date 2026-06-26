import { Card } from "@/components/ui/card"
import { Calendar, MapPin, Users } from "@/lib/icons"
import { Navigation } from "@/components/layout"
import Link from "next/link"
import { getEvents } from "@/lib/db"
import { ErrorDisplay, ListSkeleton } from "@/components/shared"
import { EventsFilter } from "@/components/events/events-filter"
import { handleError } from "@/lib/errors"
import { Suspense } from "react"
import type { Event } from "@/types"

async function EventsList() {
  try {
    const events = await getEvents(20, 0)

    if (!events || events.length === 0) {
      return (
        <ErrorDisplay
          title="No Events Available"
          message="Check back soon for upcoming car events and meetups!"
          action={{ label: "Browse Guides", href: "/guides" }}
          showBackButton={false}
        />
      )
    }

    return (
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
                      <div className="w-4 h-4 text-accent">
                        <Calendar />
                      </div>
                      <div>
                        <div className="font-semibold">
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-muted-foreground">Date</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-4 h-4 text-accent">
                        <MapPin />
                      </div>
                      <div className="line-clamp-2">{event.location}</div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-4 h-4 text-accent">
                        <Users />
                      </div>
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
    )
  } catch (err) {
    const error = handleError(err)
    return (
      <ErrorDisplay
        title={error.title}
        message={error.message}
        action={{ label: "Try Again", href: "/events" }}
      />
    )
  }
}

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8">
              <Calendar />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Events & Meetups</h1>
          </div>
          <p className="text-primary-foreground/90 text-lg max-w-2xl">
            Join workshops, meetups, and shows with fellow car enthusiasts
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <EventsFilter />

      {/* Events List */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<ListSkeleton count={3} />}>
            {/* @ts-expect-error Async component */}
            <EventsList />
          </Suspense>
        </div>
      </section>
    </div>
  )
}
