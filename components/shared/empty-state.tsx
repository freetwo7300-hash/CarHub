import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface EmptyStateProps {
  icon: React.ReactNode
  title: string
  message: string
  action?: {
    label: string
    href: string
  }
}

export function EmptyState({ icon, title, message, action }: EmptyStateProps) {
  return (
    <Card className="p-12 text-center">
      <div className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6">{message}</p>
      {action && (
        <Link href={action.href}>
          <Button variant="outline">{action.label}</Button>
        </Link>
      )}
    </Card>
  )
}
