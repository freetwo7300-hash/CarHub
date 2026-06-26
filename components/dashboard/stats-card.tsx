import { Card } from "@/components/ui/card"

interface StatsCardProps {
  label: string
  value: string | number
  icon: React.ReactNode
}

export function StatsCard({ label, value, icon }: StatsCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-3xl font-bold text-accent">{value}</p>
        </div>
        <div className="w-8 h-8 text-accent opacity-50">{icon}</div>
      </div>
    </Card>
  )
}
