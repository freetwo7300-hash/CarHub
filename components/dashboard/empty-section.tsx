import { Button } from "@/components/ui/button"
import Link from "next/link"

interface EmptySectionProps {
  icon: React.ReactNode
  title: string
  description: string
  actions: Array<{
    label: string
    href: string
  }>
}

export function EmptySection({ icon, title, description, actions }: EmptySectionProps) {
  return (
    <div className="text-center py-8">
      <div className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50">{icon}</div>
      <p className="text-muted-foreground mb-4">{description}</p>
      <div className="flex gap-2 justify-center flex-wrap">
        {actions.map((action) => (
          <Link key={action.href} href={action.href}>
            <Button variant="outline" size="sm">
              {action.label}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  )
}
