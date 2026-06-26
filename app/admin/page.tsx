"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, MessageCircle, BookOpen, AlertCircle, CheckCircle, Trash2, Ban, Search, BarChart3 } from "lucide-react"
import { Navigation } from "@/components/layout"
import { Input } from "@/components/ui/input"
import { StatsCard } from "@/components/dashboard"

interface User {
  id: string
  name: string
  email: string
  joinDate: string
  status: "active" | "suspended" | "inactive"
  reputation: number
  posts: number
}

interface Content {
  id: string
  title: string
  author: string
  type: "forum" | "guide" | "event"
  date: string
  status: "approved" | "pending" | "flagged"
  reports: number
}

interface SystemStats {
  totalUsers: number
  activeUsers: number
  totalPosts: number
  totalGuides: number
  totalEvents: number
  flaggedContent: number
  suspendedUsers: number
}

const mockStats: SystemStats = {
  totalUsers: 2450,
  activeUsers: 1823,
  totalPosts: 12540,
  totalGuides: 342,
  totalEvents: 156,
  flaggedContent: 23,
  suspendedUsers: 12,
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "John Mechanic",
    email: "john@example.com",
    joinDate: "Jan 2023",
    status: "active",
    reputation: 2450,
    posts: 156,
  },
  {
    id: "2",
    name: "Sarah Auto",
    email: "sarah@example.com",
    joinDate: "Mar 2023",
    status: "active",
    reputation: 1890,
    posts: 98,
  },
  {
    id: "3",
    name: "Mike Repair",
    email: "mike@example.com",
    joinDate: "Jun 2023",
    status: "suspended",
    reputation: 450,
    posts: 12,
  },
  {
    id: "4",
    name: "Lisa Engine",
    email: "lisa@example.com",
    joinDate: "Aug 2023",
    status: "active",
    reputation: 1200,
    posts: 67,
  },
]

const mockContent: Content[] = [
  {
    id: "1",
    title: "Best practices for oil change intervals",
    author: "John Mechanic",
    type: "forum",
    date: "2 hours ago",
    status: "approved",
    reports: 0,
  },
  {
    id: "2",
    title: "Brake Pad Replacement Guide",
    author: "Sarah Auto",
    type: "guide",
    date: "1 day ago",
    status: "approved",
    reports: 0,
  },
  {
    id: "3",
    title: "Inappropriate content post",
    author: "Unknown User",
    type: "forum",
    date: "3 hours ago",
    status: "flagged",
    reports: 5,
  },
  {
    id: "4",
    title: "Monthly Car Enthusiasts Meetup",
    author: "Event Team",
    type: "event",
    date: "5 days ago",
    status: "pending",
    reports: 0,
  },
]

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [users, setUsers] = useState(mockUsers)
  const [content, setContent] = useState(mockContent)

  const handleSuspendUser = (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: user.status === "suspended" ? "active" : "suspended" } : user,
      ),
    )
  }

  const handleDeleteContent = (contentId: string) => {
    setContent(content.filter((item) => item.id !== contentId))
  }

  const handleApproveContent = (contentId: string) => {
    setContent(content.map((item) => (item.id === contentId ? { ...item, status: "approved" as const } : item)))
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredContent = content.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <p className="text-primary-foreground/90 mt-2">Manage community, users, and content</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* System Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <StatsCard
              label="Total Users"
              value={mockStats.totalUsers}
              icon={<Users className="w-6 h-6" />}
            />
            <StatsCard
              label="Total Posts"
              value={mockStats.totalPosts}
              icon={<MessageCircle className="w-6 h-6" />}
            />
            <StatsCard
              label="Content Items"
              value={mockStats.totalGuides + mockStats.totalEvents}
              icon={<BookOpen className="w-6 h-6" />}
            />
            <Card className="p-6 hover:shadow-lg transition-shadow border-red-200 dark:border-red-900">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Flagged Content</p>
                  <p className="text-3xl font-bold text-red-600">{mockStats.flaggedContent}</p>
                  <p className="text-xs text-muted-foreground mt-1">Needs review</p>
                </div>
                <AlertCircle className="w-8 h-8 text-red-600 opacity-50" />
              </div>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">User Management</TabsTrigger>
              <TabsTrigger value="content">Content Moderation</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-accent" />
                    Community Growth
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Active Users</span>
                        <span className="text-sm text-accent">
                          {Math.round((mockStats.activeUsers / mockStats.totalUsers) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-accent h-2 rounded-full"
                          style={{ width: `${(mockStats.activeUsers / mockStats.totalUsers) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Content Approved</span>
                        <span className="text-sm text-accent">95%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-accent h-2 rounded-full" style={{ width: "95%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">System Health</span>
                        <span className="text-sm text-accent">98%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-accent h-2 rounded-full" style={{ width: "98%" }}></div>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    System Alerts
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-900">
                      <p className="text-sm font-medium text-red-800 dark:text-red-400">
                        {mockStats.flaggedContent} flagged content items
                      </p>
                      <p className="text-xs text-red-700 dark:text-red-500 mt-1">Requires immediate review</p>
                    </div>
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-900">
                      <p className="text-sm font-medium text-yellow-800 dark:text-yellow-400">
                        {mockStats.suspendedUsers} suspended users
                      </p>
                      <p className="text-xs text-yellow-700 dark:text-yellow-500 mt-1">Under review</p>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-900">
                      <p className="text-sm font-medium text-green-800 dark:text-green-400">All systems operational</p>
                      <p className="text-xs text-green-700 dark:text-green-500 mt-1">No critical issues</p>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* User Management Tab */}
            <TabsContent value="users" className="space-y-4">
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Search className="w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search users by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-semibold">User</th>
                        <th className="text-left py-3 px-4 font-semibold">Email</th>
                        <th className="text-left py-3 px-4 font-semibold">Joined</th>
                        <th className="text-left py-3 px-4 font-semibold">Status</th>
                        <th className="text-left py-3 px-4 font-semibold">Reputation</th>
                        <th className="text-left py-3 px-4 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                          <td className="py-3 px-4 font-medium">{user.name}</td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">{user.email}</td>
                          <td className="py-3 px-4 text-sm">{user.joinDate}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                user.status === "active"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                  : user.status === "suspended"
                                    ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                    : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
                              }`}
                            >
                              {user.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm font-medium text-accent">{user.reputation}</td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-transparent"
                                onClick={() => handleSuspendUser(user.id)}
                              >
                                {user.status === "suspended" ? (
                                  <>
                                    <CheckCircle className="w-4 h-4 mr-1" />
                                    Unsuspend
                                  </>
                                ) : (
                                  <>
                                    <Ban className="w-4 h-4 mr-1" />
                                    Suspend
                                  </>
                                )}
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>

            {/* Content Moderation Tab */}
            <TabsContent value="content" className="space-y-4">
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Search className="w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search content by title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                </div>

                <div className="space-y-4">
                  {filteredContent.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{item.title}</h3>
                            <span
                              className={`px-2 py-1 rounded text-xs font-semibold ${
                                item.type === "forum"
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                  : item.type === "guide"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                    : "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
                              }`}
                            >
                              {item.type}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            By {item.author} • {item.date}
                          </p>
                          {item.reports > 0 && (
                            <p className="text-sm text-red-600 dark:text-red-400 mt-1">{item.reports} reports</p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              item.status === "approved"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                : item.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                            }`}
                          >
                            {item.status}
                          </span>
                          <div className="flex gap-2">
                            {item.status !== "approved" && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-transparent"
                                onClick={() => handleApproveContent(item.id)}
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-transparent text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-900/20"
                              onClick={() => handleDeleteContent(item.id)}
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
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
