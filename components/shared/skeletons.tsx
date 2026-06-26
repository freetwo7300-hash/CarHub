import { Card } from '@/components/ui/card'

export function SkeletonCard() {
  return (
    <Card className="p-6 animate-pulse">
      <div className="space-y-4">
        <div className="h-6 bg-muted rounded w-3/4" />
        <div className="h-4 bg-muted rounded w-full" />
        <div className="h-4 bg-muted rounded w-5/6" />
        <div className="flex gap-4 pt-4">
          <div className="h-8 bg-muted rounded w-20" />
          <div className="h-8 bg-muted rounded w-20" />
        </div>
      </div>
    </Card>
  )
}

export function ThreadSkeleton() {
  return (
    <Card className="p-6 animate-pulse">
      <div className="space-y-4">
        <div className="h-7 bg-muted rounded w-4/5" />
        <div className="flex gap-2">
          <div className="h-5 bg-muted rounded w-24" />
          <div className="h-5 bg-muted rounded w-20" />
          <div className="h-5 bg-muted rounded w-28" />
        </div>
        <div className="h-4 bg-muted rounded w-full" />
        <div className="h-4 bg-muted rounded w-5/6" />
        <div className="grid grid-cols-3 gap-4 pt-4">
          <div className="h-12 bg-muted rounded" />
          <div className="h-12 bg-muted rounded" />
          <div className="h-12 bg-muted rounded" />
        </div>
      </div>
    </Card>
  )
}

export function EventSkeleton() {
  return (
    <Card className="overflow-hidden animate-pulse">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-64 h-48 md:h-auto bg-muted" />
        <div className="flex-1 p-6 space-y-4">
          <div className="h-6 bg-muted rounded w-4/5" />
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-5/6" />
          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className="h-10 bg-muted rounded" />
            <div className="h-10 bg-muted rounded" />
            <div className="h-10 bg-muted rounded" />
          </div>
        </div>
      </div>
    </Card>
  )
}

export function GuideSkeleton() {
  return (
    <Card className="overflow-hidden animate-pulse h-full">
      <div className="h-48 bg-muted" />
      <div className="p-6 space-y-4">
        <div className="h-6 bg-muted rounded w-4/5" />
        <div className="h-4 bg-muted rounded w-full" />
        <div className="h-4 bg-muted rounded w-5/6" />
        <div className="flex gap-2 pt-4">
          <div className="h-6 bg-muted rounded w-20" />
          <div className="h-6 bg-muted rounded w-16" />
        </div>
        <div className="pt-2 flex gap-4 border-t border-border">
          <div className="h-4 bg-muted rounded w-24" />
          <div className="h-4 bg-muted rounded w-20" />
        </div>
      </div>
    </Card>
  )
}

export function DetailPageSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-96 bg-muted rounded" />
      <div className="space-y-4">
        <div className="h-10 bg-muted rounded w-4/5" />
        <div className="h-6 bg-muted rounded w-full" />
        <div className="h-6 bg-muted rounded w-5/6" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="h-24 bg-muted rounded" />
        <div className="h-24 bg-muted rounded" />
        <div className="h-24 bg-muted rounded" />
        <div className="h-24 bg-muted rounded" />
      </div>
    </div>
  )
}

export function ListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <ThreadSkeleton key={i} />
      ))}
    </div>
  )
}
