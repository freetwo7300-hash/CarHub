'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AlertCircle } from '@/lib/icons'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
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

        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }

        .animate-fade-in-scale {
          animation: fadeInScale 0.6s ease-out;
        }

        .animate-slide-in-down {
          animation: slideInDown 0.5s ease-out;
        }

        .animate-slide-in-up {
          animation: slideInUp 0.5s ease-out;
        }

        .animate-shake-slow {
          animation: shake 0.6s ease-out;
        }

        .stagger-1 {
          animation-delay: 0.2s;
        }

        .stagger-2 {
          animation-delay: 0.4s;
        }

        .stagger-3 {
          animation-delay: 0.6s;
        }
      `}</style>
      <Card className="max-w-md w-full p-8 animate-fade-in-scale">
        <div className="text-center">
          <div className="w-16 h-16 text-red-500 mx-auto mb-4 animate-shake-slow">
            <AlertCircle />
          </div>
          <h1 className="text-2xl font-bold mb-2 animate-slide-in-down">Something Went Wrong</h1>
          <p className="text-muted-foreground mb-6 animate-slide-in-up stagger-1">
            We encountered an error. Please try again or contact support if the problem persists.
          </p>

          {process.env.NODE_ENV === 'development' && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-950 rounded text-left animate-slide-in-up stagger-2">
              <p className="text-xs font-mono text-red-700 dark:text-red-200 break-words">
                {error.message}
              </p>
            </div>
          )}

          <div className="flex gap-3 animate-slide-in-up stagger-3">
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
