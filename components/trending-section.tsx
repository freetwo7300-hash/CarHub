import { Card } from '@/components/ui/card'

export default function TrendingSection() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Trending</h3>
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">No trending items yet</p>
      </div>
    </Card>
  )
}
