'use client'

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, BookOpen, Calendar, Heart, TrendingUp, Clock, Plus } from "@/lib/icons"
import { Navigation } from "@/components/layout"
import { StatsCard, QuickActionCard, ActivityItem, EmptySection } from "@/components/dashboard"
import Link from "next/link"
import type { DashboardActivity, SavedItem, DashboardStats } from "@/types"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Empty dashboard state - data would come from API
  const stats: DashboardStats = {
    forumPosts: 0,
    guidesCreated: 0,
    eventsAttended: 0,
    reputation: 0,
  }

  const recentActivity: DashboardActivity[] = []
  const savedItems: SavedItem[] = []
  const upcomingEvents: any[] = []

  const getIcon = (type: string) => {
    switch (type) {
      case "forum":
        return <div className="w-5 h-5"><MessageCircle /></div>
      case "guide":
        return <div className="w-5 h-5"><BookOpen /></div>
      case "event":
        return <div className="w-5 h-5"><Calendar /></div>
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
            <StatsCard
              label="Forum Posts"
              value={stats.forumPosts}
              icon={<div className="w-8 h-8"><MessageCircle /></div>}
            />
            <StatsCard
              label="Guides Created"
              value={stats.guidesCreated}
              icon={<div className="w-8 h-8"><BookOpen /></div>}
            />
            <StatsCard
              label="Events Attended"
              value={stats.eventsAttended}
              icon={<div className="w-8 h-8"><Calendar /></div>}
            />
            <StatsCard
              label="Reputation"
              value={stats.reputation}
              icon={<div className="w-8 h-8"><TrendingUp /></div>}
            />
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <QuickActionCard
              title="New Discussion"
              description="Start a forum post"
              href="/forum/new"
              icon={<div className="w-5 h-5"><Plus /></div>}
            />
            <QuickActionCard
              title="Create Guide"
              description="Share your knowledge"
              href="/guides"
              icon={<div className="w-5 h-5"><BookOpen /></div>}
            />
            <QuickActionCard
              title="Browse Events"
              description="Find meetups & workshops"
              href="/events"
              icon={<div className="w-5 h-5"><Calendar /></div>}
            />
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
                  <div className="w-6 h-6">
                    <Clock />
                  </div>
                  Recent Activity
                </h2>
                {recentActivity.length > 0 ? (
                  <div className="space-y-4">
                    {recentActivity.map((item) => (
                      <ActivityItem
                        key={item.id}
                        icon={getIcon(item.type)}
                        typeColor={getTypeColor(item.type)}
                        title={item.title}
                        date={item.date}
                        status={item.status}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptySection
                    icon={<Clock />}
                    title="No Recent Activity"
                    description="No recent activity yet"
                    actions={[{ label: "Get Started", href: "/forum" }]}
                  />
                )}
              </Card>
            </TabsContent>

            {/* Saved Items Tab */}
            <TabsContent value="saved" className="space-y-4">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <div className="w-6 h-6">
                    <Heart />
                  </div>
                  Saved Items
                </h2>
                {savedItems.length > 0 ? (
                  <div className="space-y-4">
                    {savedItems.map((item) => (
                      <ActivityItem
                        key={item.id}
                        icon={getIcon(item.resourceType)}
                        typeColor={getTypeColor(item.resourceType)}
                        title={item.resourceId}
                        date="Saved recently"
                        status="Saved"
                        showViewButton={true}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptySection
                    icon={<Heart />}
                    title="No Saved Items"
                    description="No saved items yet"
                    actions={[
                      { label: "Explore Forum", href: "/forum" },
                      { label: "Browse Guides", href: "/guides" },
                    ]}
                  />
                )}
              </Card>
            </TabsContent>

            {/* Upcoming Events Tab */}
            <TabsContent value="upcoming" className="space-y-4">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <div className="w-6 h-6">
                    <Calendar />
                  </div>
                  Upcoming Events
                </h2>
                {upcomingEvents.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingEvents.map((item) => (
                      <ActivityItem
                        key={item.id}
                        icon={getIcon(item.type)}
                        typeColor={getTypeColor(item.type)}
                        title={item.title}
                        date={item.date}
                        status={item.status}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptySection
                    icon={<Calendar />}
                    title="No Upcoming Events"
                    description="No upcoming events"
                    actions={[{ label: "Explore Events", href: "/events" }]}
                  />
                )}
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
