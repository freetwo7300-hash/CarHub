'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AlertTriangle } from '@/lib/icons'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Something Went Wrong</h1>
          <p className="text-muted-foreground mb-6">
            We encountered an error. Please try again or contact support if the problem persists.
          </p>

          {process.env.NODE_ENV === 'development' && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-950 rounded text-left">
              <p className="text-xs font-mono text-red-700 dark:text-red-200 break-words">
                {error.message}
              </p>
            </div>
          )}

          <div className="flex gap-3">
            <Button onClick={reset} className="flex-1">
              Try Again
            </Button>
            <Button variant="outline" onClick={() => window.location.href = '/'} className="flex-1">
              Go Home
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
