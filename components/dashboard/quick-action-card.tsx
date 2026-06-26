import { Card } from "@/components/ui/card"
import Link from "next/link"

interface QuickActionCardProps {
  title: string
  description: string
  href: string
  icon: React.ReactNode
}

export function QuickActionCard({ title, description, href, icon }: QuickActionCardProps) {
  return (
    <Link href={href}>
      <Card className="p-6 hover:shadow-lg transition-all cursor-pointer hover:border-accent">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-accent/10 rounded-lg">{icon}</div>
          <div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </Card>
    </Link>
  )
}
