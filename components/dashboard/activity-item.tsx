import { Button } from "@/components/ui/button"

interface ActivityItemProps {
  icon: React.ReactNode
  typeColor: string
  title: string
  date: string
  status: string
  onView?: () => void
  showViewButton?: boolean
}

export function ActivityItem({
  icon,
  typeColor,
  title,
  date,
  status,
  onView,
  showViewButton,
}: ActivityItemProps) {
  return (
    <div className="flex items-start justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
      <div className="flex items-start gap-4 flex-1">
        <div className={`p-2 rounded ${typeColor}`}>{icon}</div>
        <div className="flex-1">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{date}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 text-xs font-semibold rounded">
          {status}
        </span>
        {showViewButton && onView && (
          <Button variant="outline" size="sm" className="bg-transparent" onClick={onView}>
            View
          </Button>
        )}
      </div>
    </div>
  )
}
