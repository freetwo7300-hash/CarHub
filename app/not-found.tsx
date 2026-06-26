import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 overflow-hidden">
      <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse-bounce {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .animate-fade-in-scale {
          animation: fadeInScale 0.6s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-pulse-bounce {
          animation: pulse-bounce 2s ease-in-out infinite;
        }

        .stagger-1 {
          animation-delay: 0.1s;
        }

        .stagger-2 {
          animation-delay: 0.2s;
        }

        .stagger-3 {
          animation-delay: 0.3s;
        }
      `}</style>
      <Card className="max-w-md w-full p-8 animate-fade-in-scale">
        <div className="text-center">
          <div className="text-6xl font-bold text-accent mb-4 animate-pulse-bounce">404</div>
          <h1 className="text-2xl font-bold mb-2 animate-fade-in-scale stagger-1">
            Page Not Found
          </h1>
          <p className="text-muted-foreground mb-8 animate-fade-in-scale stagger-2">
            The page you're looking for doesn't exist or has been removed.
          </p>

          <div className="flex flex-col gap-2">
            <Link href="/" className="animate-fade-in-scale stagger-1">
              <Button className="w-full">Go Home</Button>
            </Link>
            <Link href="/forum" className="animate-fade-in-scale stagger-2">
              <Button variant="outline" className="w-full">
                Visit Forum
              </Button>
            </Link>
            <Link href="/events" className="animate-fade-in-scale stagger-3">
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
