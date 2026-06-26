import { Card } from "@/components/ui/card"
import type { Event } from "@/types"

interface OrganizerCardProps {
  event: Event
}

export function OrganizerCard({ event }: OrganizerCardProps) {
  return (
    <Card className="p-6">
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
  )
}
