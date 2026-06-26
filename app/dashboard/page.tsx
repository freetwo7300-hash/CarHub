"import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Bookmark, MessageCircle, Calendar, TrendingUp } from "@/lib/icons"
import Navigation from "@/components/navigation"
import Link from "next/link"

export default async function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Welcome to Your Dashboard</h1>
          <p className="text-primary-foreground/90">Quick access to your favorite content and activities</p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Saved Items</p>
                  <p className="text-3xl font-bold mt-2">0</p>
                </div>
                <Bookmark className="w-8 h-8 text-accent" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Forum Posts</p>
                  <p className="text-3xl font-bold mt-2">0</p>
                </div>
                <MessageCircle className="w-8 h-8 text-accent" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Events Joined</p>
                  <p className="text-3xl font-bold mt-2">0</p>
                </div>
                <Calendar className="w-8 h-8 text-accent" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Reputation</p>
                  <p className="text-3xl font-bold mt-2">0</p>
                </div>
                <TrendingUp className="w-8 h-8 text-accent" />
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="py-8 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
          <p className="text-muted-foreground">Your recent activities will appear here</p>
        </div>
      </section>

      {/* Saved Items */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6">Saved Items</h2>
          <Card className="p-8 text-center">
            <Bookmark className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground mb-4">No saved items yet</p>
            <div className="flex gap-2 justify-center">
              <Link href="/forum">
                <Button variant="outline">Explore Forum</Button>
              </Link>
              <Link href="/events">
                <Button variant="outline">Browse Events</Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, BookOpen, Calendar, Heart, TrendingUp, Clock, Plus } from "@/lib/icons"
import Navigation from "@/components/navigation"
import Link from "next/link"

interface DashboardItem {
  id: string
  title: string
  type: "forum" | "guide" | "event"
  date: string
  status: string
}

interface SavedItem {
  id: string
  title: string
  type: "forum" | "guide" | "event"
  savedDate: string
}

const mockDashboard = {
  stats: {
    forumPosts: 156,
    guidesCreated: 12,
    eventsAttended: 24,
    reputation: 2450,
  },
  recentActivity: [
    {
      id: "1",
      title: "Replied to 'Best practices for oil change intervals'",
      type: "forum" as const,
      date: "2 hours ago",
      status: "Active",
    },
    {
      id: "2",
      title: "Completed 'Oil Change Workshop'",
      type: "event" as const,
      date: "1 day ago",
      status: "Completed",
    },
    {
      id: "3",
      title: "Created guide: 'Brake Pad Replacement'",
      type: "guide" as const,
      date: "3 days ago",
      status: "Published",
    },
    {
      id: "4",
      title: "Attended 'Monthly Car Enthusiasts Meetup'",
      type: "event" as const,
      date: "1 week ago",
      status: "Completed",
    },
  ],
  savedItems: [
    {
      id: "1",
      title: "Engine Diagnostics Guide",
      type: "guide" as const,
      savedDate: "2 days ago",
    },
    {
      id: "2",
      title: "Transmission Fluid Change Discussion",
      type: "forum" as const,
      savedDate: "5 days ago",
    },
    {
      id: "3",
      title: "Electric Vehicle Basics Workshop",
      type: "event" as const,
      savedDate: "1 week ago",
    },
  ],
  upcomingEvents: [
    {
      id: "1",
      title: "Tire Rotation & Balancing Workshop",
      type: "event" as const,
      date: "Nov 20, 2025",
      status: "Registered",
    },
    {
      id: "2",
      title: "Weekend Car Show",
      type: "event" as const,
      date: "Nov 23, 2025",
      status: "Interested",
    },
  ],
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const getIcon = (type: string) => {
    switch (type) {
      case "forum":
        return <MessageCircle className="w-5 h-5" />
      case "guide":
        return <BookOpen className="w-5 h-5" />
      case "event":
        return <Calendar className="w-5 h-5" />
      default:
        return null
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "forum":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      case "guide":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "event":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">My Dashboard</h1>
          <p className="text-primary-foreground/90 mt-2">Track your activity and manage your community presence</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Forum Posts</p>
                  <p className="text-3xl font-bold text-accent">{mockDashboard.stats.forumPosts}</p>
                </div>
                <MessageCircle className="w-8 h-8 text-accent opacity-50" />
              </div>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Guides Created</p>
                  <p className="text-3xl font-bold text-accent">{mockDashboard.stats.guidesCreated}</p>
                </div>
                <BookOpen className="w-8 h-8 text-accent opacity-50" />
              </div>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Events Attended</p>
                  <p className="text-3xl font-bold text-accent">{mockDashboard.stats.eventsAttended}</p>
                </div>
                <Calendar className="w-8 h-8 text-accent opacity-50" />
              </div>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Reputation</p>
                  <p className="text-3xl font-bold text-accent">{mockDashboard.stats.reputation}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-accent opacity-50" />
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Link href="/forum/new">
              <Card className="p-6 hover:shadow-lg transition-all cursor-pointer hover:border-accent">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <Plus className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold">New Discussion</h3>
                    <p className="text-sm text-muted-foreground">Start a forum post</p>
                  </div>
                </div>
              </Card>
            </Link>
            <Link href="/guides">
              <Card className="p-6 hover:shadow-lg transition-all cursor-pointer hover:border-accent">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <BookOpen className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Create Guide</h3>
                    <p className="text-sm text-muted-foreground">Share your knowledge</p>
                  </div>
                </div>
              </Card>
            </Link>
            <Link href="/events">
              <Card className="p-6 hover:shadow-lg transition-all cursor-pointer hover:border-accent">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <Calendar className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Browse Events</h3>
                    <p className="text-sm text-muted-foreground">Find meetups & workshops</p>
                  </div>
                </div>
              </Card>
            </Link>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="saved">Saved Items</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Clock className="w-6 h-6" />
                  Recent Activity
                </h2>
                <div className="space-y-4">
                  {mockDashboard.recentActivity.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`p-2 rounded ${getTypeColor(item.type)}`}>{getIcon(item.type)}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.date}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 text-xs font-semibold rounded flex-shrink-0">
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Saved Items Tab */}
            <TabsContent value="saved" className="space-y-4">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Heart className="w-6 h-6" />
                  Saved Items
                </h2>
                <div className="space-y-4">
                  {mockDashboard.savedItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`p-2 rounded ${getTypeColor(item.type)}`}>{getIcon(item.type)}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">Saved {item.savedDate}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="flex-shrink-0 bg-transparent">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Upcoming Events Tab */}
            <TabsContent value="upcoming" className="space-y-4">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Calendar className="w-6 h-6" />
                  Upcoming Events
                </h2>
                <div className="space-y-4">
                  {mockDashboard.upcomingEvents.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`p-2 rounded ${getTypeColor(item.type)}`}>{getIcon(item.type)}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.date}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-semibold rounded flex-shrink-0">
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
