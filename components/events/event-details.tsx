import { Card } from "@/components/ui/card"
import { Calendar, MapPin, Users } from "@/lib/icons"
import type { Event } from "@/types"

interface EventDetailsProps {
  event: Event
}

export function EventDetails({ event }: EventDetailsProps) {
  const spotsFilled = event.registeredCount
  const capacity = event.maxAttendees || 0
  const percentageFilled = capacity > 0 ? Math.round((spotsFilled / capacity) * 100) : 0

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
  )
}
