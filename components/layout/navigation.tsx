"use client"

import { useState } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { SearchInput } from "@/components/shared"
import { Bell, X as XIcon, Eye, Zap, Users } from "@/lib/icons"

const Menu = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)

const Wrench = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
    />
  </svg>
)

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "register">("login")
  const { theme, setTheme } = useTheme()

  const navItems = [
    { label: "Forum", href: "/forum" },
    { label: "Guides", href: "/guides" },
    { label: "Events", href: "/events" },
    { label: "Dashboard", href: "/dashboard" },
  ]

  return (
    <>
      <nav className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 gap-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl flex-shrink-0">
              <div className="p-2 bg-accent rounded-lg">
                <Wrench className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="hidden sm:inline">CarHub</span>
            </Link>

            <div className="hidden lg:flex flex-1 max-w-md">
              <SearchInput />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-foreground/70 hover:text-foreground transition-colors text-sm"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Desktop Right Section */}
            <div className="hidden md:flex items-center gap-3">
              {/* Notification Icon */}
              <button className="p-2 hover:bg-muted rounded-lg transition-colors relative">
                <div className="w-5 h-5 text-foreground/70 hover:text-foreground">
                  <Bell />
                </div>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
                title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                {theme === "dark" ? (
                  <div className="w-5 h-5 text-foreground/70 hover:text-foreground">
                    <Eye />
                  </div>
                ) : (
                  <div className="w-5 h-5 text-foreground/70 hover:text-foreground">
                    <Zap />
                  </div>
                )}
              </button>

              {/* Auth Toggle Icon */}
              <button
                onClick={() => {
                  setAuthMode("login")
                  setShowAuthModal(true)
                }}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
                title="Sign in to your account"
              >
                <div className="w-5 h-5 text-foreground/70 hover:text-foreground">
                  <Users />
                </div>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <div className="w-6 h-6"><XIcon /></div> : <Menu />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden pb-4 space-y-3 animate-slide-up">
              <div className="px-2">
                <SearchInput />
              </div>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2 text-foreground/70 hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <div className="border-t border-border pt-4 px-2 space-y-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="flex-1 p-2 hover:bg-muted rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    {theme === "dark" ? (
                      <>
                        <div className="w-4 h-4">
                          <Eye />
                        </div>
                        Light
                      </>
                    ) : (
                      <>
                        <div className="w-4 h-4">
                          <Zap />
                        </div>
                        Dark
                      </>
                    )}
                  </button>
                  <button className="flex-1 p-2 hover:bg-muted rounded-lg transition-colors flex items-center justify-center gap-2">
                    <div className="w-4 h-4">
                      <Bell />
                    </div>
                    Notifications
                  </button>
                </div>
                <button
                  onClick={() => {
                    setAuthMode("login")
                    setShowAuthModal(true)
                    setIsOpen(false)
                  }}
                  className="w-full p-3 flex items-center justify-center gap-2 rounded-lg border border-border hover:bg-muted transition-colors"
                >
                  <div className="w-4 h-4">
                    <Users />
                  </div>
                  Sign In
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg max-w-md w-full p-8 animate-fade-in-scale">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {authMode === "login" ? "Sign In" : "Create Account"}
              </h2>
              <button
                onClick={() => setShowAuthModal(false)}
                className="p-1 hover:bg-muted rounded transition-colors"
              >
                <div className="w-5 h-5">
                  <XIcon />
                </div>
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              {authMode === "register" && (
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Mechanic"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              {authMode === "register" && (
                <div>
                  <label className="block text-sm font-medium mb-1">Confirm Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              )}

              <Button className="w-full bg-accent hover:bg-accent/90">
                {authMode === "login" ? "Sign In" : "Create Account"}
              </Button>
            </form>

            <div className="mt-4 pt-4 border-t border-border text-center">
              <p className="text-sm text-muted-foreground">
                {authMode === "login" ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => setAuthMode(authMode === "login" ? "register" : "login")}
                  className="text-accent hover:underline font-medium"
                >
                  {authMode === "login" ? "Sign Up" : "Sign In"}
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

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
        
        .animate-fade-in-scale {
          animation: fadeInScale 0.3s ease-out;
        }

        .animate-slide-up {
          animation: slideUp 0.3s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  )
}
