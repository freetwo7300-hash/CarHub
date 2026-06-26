'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AlertCircle } from '@/lib/icons'
import Link from 'next/link'

interface ErrorDisplayProps {
  title?: string
  message?: string
  icon?: React.ReactNode
  action?: {
    label: string
    href: string
  }
  showBackButton?: boolean
}

export function ErrorDisplay({
  title = 'Error',
  message = 'Something went wrong. Please try again.',
  icon,
  action,
  showBackButton = true,
}: ErrorDisplayProps) {
  return (
    <Card className="p-12 text-center">
      <div className="mb-6">
        {icon ? (
          <div className="w-12 h-12 text-red-500 mx-auto">{icon}</div>
        ) : (
          <div className="w-12 h-12 text-red-500 mx-auto">
            <AlertCircle />
          </div>
        )}
      </div>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-muted-foreground mb-8">{message}</p>

      <div className="flex gap-3 justify-center flex-wrap">
        {action && (
          <Link href={action.href}>
            <Button>{action.label}</Button>
          </Link>
        )}
        {showBackButton && (
          <Button variant="outline" onClick={() => window.history.back()}>
            Go Back
          </Button>
        )}
      </div>
    </Card>
  )
}

interface NotFoundDisplayProps {
  resource?: string
  action?: {
    label: string
    href: string
  }
}

export function NotFoundDisplay({ resource = 'Item', action }: NotFoundDisplayProps) {
  return (
    <ErrorDisplay
      title="404 - Not Found"
      message={`The ${resource.toLowerCase()} you're looking for doesn't exist or has been removed.`}
      action={action || { label: 'Go Back', href: '/' }}
    />
  )
}

interface LoadingErrorProps {
  resource?: string
  action?: {
    label: string
    href: string
  }
  retryFn?: () => void
}

export function LoadingError({ resource = 'content', action, retryFn }: LoadingErrorProps) {
  return (
    <Card className="p-12 text-center">
      <div className="w-12 h-12 text-amber-500 mx-auto mb-6">
        <AlertCircle />
      </div>
      <h2 className="text-2xl font-bold mb-2">Failed to Load</h2>
      <p className="text-muted-foreground mb-8">
        We couldn't load the {resource}. Please try again.
      </p>

      <div className="flex gap-3 justify-center flex-wrap">
        {retryFn && <Button onClick={retryFn}>Try Again</Button>}
        {action && (
          <Link href={action.href}>
            <Button variant="outline">{action.label}</Button>
          </Link>
        )}
      </div>
    </Card>
  )
}
