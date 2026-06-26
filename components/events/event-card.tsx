import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Calendar, MapPin, Users } from "@/lib/icons"
import type { Event } from "@/types"

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Link href={`/events/${event.id}`}>
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
  )
}
