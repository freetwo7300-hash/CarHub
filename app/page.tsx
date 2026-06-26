"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navigation } from "@/components/layout"
import ChatButton from "@/components/chat-button"
import ScrollToTop from "@/components/scroll-to-top"
import Link from "next/link"
import TrendingSection from "@/components/trending-section"
import UserBadges from "@/components/user-badges"

const Users = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4.354a4 4 0 110 5.292M15 12H9m6 0a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const BookOpen = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17.25m20-11.002c5.5 0 10 4.745 10 11.002M4.5 19.5h15"
    />
  </svg>
)

const Calendar = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
)

const Wrench = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110 4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
    />
  </svg>
)

const Zap = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)

const MessageCircle = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
)

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ChatButton />
      <ScrollToTop />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground py-20 md:py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">CarHub</h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto">
              Connect with car enthusiasts, share maintenance wisdom, and master your vehicle
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/forum">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Join Community
                </Button>
              </Link>
              <Link href="/guides">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
                >
                  Browse Guides
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Everything You Need</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A complete platform for car maintenance, community engagement, and knowledge sharing
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Users,
                title: "Community Forum",
                description: "Connect with thousands of car enthusiasts, ask questions, and share experiences",
                href: "/forum",
              },
              {
                icon: BookOpen,
                title: "Maintenance Guides",
                description: "Access comprehensive guides for all maintenance tasks and repairs",
                href: "/guides",
              },
              {
                icon: Calendar,
                title: "Events & Meetups",
                description: "Discover and join car meets, workshops, and training events",
                href: "/events",
              },
              {
                icon: Wrench,
                title: "Expert Tips",
                description: "Learn from certified mechanics and experienced car owners",
                href: "/forum",
              },
              {
                icon: Zap,
                title: "Real-time Chat",
                description: "Get instant help from community members and experts",
                href: "#",
              },
              {
                icon: MessageCircle,
                title: "Notifications",
                description: "Stay updated on replies, events, and community highlights",
                href: "#",
              },
            ].map((feature, idx) => (
              <Link key={idx} href={feature.href}>
                <Card className="h-full p-6 hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-accent group">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                      <div className="w-6 h-6 text-accent">
                        <feature.icon />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending and Recommendations Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-background to-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Featured Content</h2>
                  <div className="grid gap-4">
                    {[
                      {
                        title: "Complete EV Maintenance Guide",
                        category: "Guide",
                        views: "5.2K",
                        rating: 4.8,
                      },
                      {
                        title: "Winter Tire Selection Workshop",
                        category: "Event",
                        views: "3.1K",
                        rating: 4.9,
                      },
                      {
                        title: "DIY Brake Inspection Tips",
                        category: "Guide",
                        views: "4.7K",
                        rating: 4.7,
                      },
                    ].map((item, idx) => (
                      <Card
                        key={idx}
                        className="p-4 hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-accent group glass-effect"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs px-2 py-1 rounded-full bg-accent/20 text-accent font-medium">
                                {item.category}
                              </span>
                              <span className="text-xs text-muted-foreground">⭐ {item.rating}</span>
                            </div>
                            <h3 className="font-semibold group-hover:text-accent transition-colors">{item.title}</h3>
                            <p className="text-sm text-muted-foreground mt-2">{item.views} views</p>
                          </div>
                          <div className="text-2xl group-hover:animate-float">→</div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar with trending and badges */}
            <div className="space-y-6">
              <TrendingSection />
              <UserBadges />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50K+", label: "Active Members" },
              { number: "2.5K+", label: "Guides & Articles" },
              { number: "500+", label: "Monthly Events" },
              { number: "100K+", label: "Discussions" },
            ].map((stat, idx) => (
              <div key={idx} className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-accent">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-primary to-primary/90">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">Ready to Join the Community?</h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Start sharing your knowledge, learning from experts, and connecting with fellow car enthusiasts today
          </p>
          <Link href="/forum">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 border-t border-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">CarHub</h3>
              <p className="text-primary-foreground/70">Your community for car maintenance and knowledge sharing</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-primary-foreground/70">
                <li>
                  <Link href="/forum" className="hover:text-primary-foreground transition">
                    Forum
                  </Link>
                </li>
                <li>
                  <Link href="/guides" className="hover:text-primary-foreground transition">
                    Guides
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="hover:text-primary-foreground transition">
                    Events
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-primary-foreground/70">
                <li>
                  <a href="#" className="hover:text-primary-foreground transition">
                    Members
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-foreground transition">
                    Experts
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-foreground transition">
                    Moderators
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-primary-foreground/70">
                <li>
                  <a href="#" className="hover:text-primary-foreground transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-foreground transition">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-foreground transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary/20 pt-8 text-center text-primary-foreground/60">
            <p>&copy; 2025 CarHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
