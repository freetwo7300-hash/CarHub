import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AlertTriangle } from '@/lib/icons'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8">
        <div className="text-center">
          <div className="text-6xl font-bold text-accent mb-4">404</div>
          <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been removed.
          </p>

          <div className="flex flex-col gap-2">
            <Link href="/">
              <Button className="w-full">Go Home</Button>
            </Link>
            <Link href="/forum">
              <Button variant="outline" className="w-full">
                Visit Forum
              </Button>
            </Link>
            <Link href="/events">
              <Button variant="outline" className="w-full">
                Browse Events
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  )
}
