import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Calendar, MapPin, Users } from "@/lib/icons"
import Navigation from "@/components/navigation"
import Link from "next/link"
import { getEventById } from "@/lib/db"

export default async function EventDetailPage({ params }: { params: { id: string } }) {
  let event = null
  let error = null

  try {
    event = await getEventById(params.id)
  } catch (err) {
    console.error("Failed to fetch event:", err)
    error = "Failed to load event"
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4">
            <Card className="p-12 text-center">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground mb-4">Event not found</p>
              <Link href="/events">
                <Button>Back to Events</Button>
              </Link>
            </Card>
          </div>
        </section>
      </div>
    )
  }

  const spotsFilled = event.registeredCount
  const capacity = event.maxAttendees || 0
  const percentageFilled = capacity > 0 ? Math.round((spotsFilled / capacity) * 100) : 0

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

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
              <Calendar className="w-4 h-4 text-accent" />
              <span className="text-sm text-muted-foreground">Date</span>
            </div>
            <div className="font-semibold">{new Date(event.date).toLocaleDateString()}</div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-accent" />
              <span className="text-sm text-muted-foreground">Location</span>
            </div>
            <div className="font-semibold line-clamp-2">{event.location}</div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-accent" />
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
    </div>
  )
}
