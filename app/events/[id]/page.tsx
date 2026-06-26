import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Calendar, MapPin, Users } from "@/lib/icons"
import { Navigation } from "@/components/layout"
import Link from "next/link"
import { getEventById } from "@/lib/db"
import { ErrorDisplay, NotFoundDisplay, DetailPageSkeleton } from "@/components/shared"
import { handleError } from "@/lib/errors"
import { Suspense } from "react"

async function EventContent({ eventId }: { eventId: string }) {
  let event = null

  try {
    event = await getEventById(eventId)
  } catch (err) {
    console.error("Failed to fetch event:", err)
    const error = handleError(err)
    return (
      <ErrorDisplay
        title={error.title}
        message={error.message}
        action={{ label: "Back to Events", href: "/events" }}
      />
    )
  }

  if (!event) {
    return (
      <NotFoundDisplay
        resource="Event"
        action={{ label: "Back to Events", href: "/events" }}
      />
    )
  }

  const spotsFilled = event.registeredCount
  const capacity = event.maxAttendees || 0
  const percentageFilled = capacity > 0 ? Math.round((spotsFilled / capacity) * 100) : 0

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Link */}
      <Link href="/events" className="text-accent hover:underline mb-6 inline-block text-sm">
        ← Back to Events
      </Link>

      {/* Hero Image */}
      <div className="rounded-lg overflow-hidden mb-8 h-96 bg-muted">
        <img
          src={event.image || "/placeholder.jpg"}
          alt={event.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">{event.title}</h1>
            <p className="text-lg text-muted-foreground">{event.description}</p>
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-4 text-accent">
              <Calendar />
            </div>
            <span className="text-sm text-muted-foreground">Date</span>
          </div>
          <div className="font-semibold">{new Date(event.date).toLocaleDateString()}</div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-4 text-accent">
              <MapPin />
            </div>
            <span className="text-sm text-muted-foreground">Location</span>
          </div>
          <div className="font-semibold line-clamp-2">{event.location}</div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-4 text-accent">
              <Users />
            </div>
            <span className="text-sm text-muted-foreground">Registered</span>
          </div>
          <div className="font-semibold">
            {spotsFilled}/{capacity}
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-muted-foreground">Capacity</span>
          </div>
          <div className="font-semibold text-accent">{percentageFilled}%</div>
        </Card>
      </div>

      {/* Organizer */}
      <Card className="p-6 mb-8">
        <h3 className="font-semibold mb-4">Organized by</h3>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-semibold">
            {event.organizer.name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold">{event.organizer.name}</p>
            <p className="text-sm text-muted-foreground capitalize">{event.category}</p>
          </div>
        </div>
      </Card>

      {/* RSVP Button */}
      <div className="flex gap-4">
        <Button size="lg" className="flex-1 md:flex-none">
          RSVP to Event
        </Button>
        <Button variant="outline" size="lg">
          Share
        </Button>
      </div>
    </section>
  )
}

export default function EventDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Suspense fallback={<DetailPageSkeleton />}>
        <EventContent eventId={params.id} />
      </Suspense>
    </div>
  )
}
