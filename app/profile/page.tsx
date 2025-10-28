"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Edit2, Save, X, Award, MessageCircle, BookOpen, Calendar, TrendingUp, Share2 } from "@/lib/icons"
import Navigation from "@/components/navigation"

interface UserProfile {
  id: string
  username: string
  email: string
  fullName: string
  bio: string
  avatar: string
  joinDate: string
  expertise: string[]
  location: string
  website: string
  forumPosts: number
  guidesCreated: number
  eventsAttended: number
  reputation: number
  badges: string[]
  followers: number
  following: number
}

const mockUser: UserProfile = {
  id: "1",
  username: "john_mechanic",
  email: "john@example.com",
  fullName: "John Mechanic",
  bio: "Certified mechanic with 15 years of experience. Passionate about helping others maintain their vehicles.",
  avatar: "JM",
  joinDate: "January 2023",
  expertise: ["Oil Changes", "Brake Systems", "Engine Diagnostics", "Tire Maintenance"],
  location: "Downtown Auto Shop",
  website: "https://johnmechanic.com",
  forumPosts: 156,
  guidesCreated: 12,
  eventsAttended: 24,
  reputation: 2450,
  badges: ["Expert", "Helpful", "Verified Mechanic", "Community Leader"],
  followers: 342,
  following: 128,
}

const mockActivity = [
  { id: "1", action: "Created guide", title: "Brake Pad Replacement", date: "2 days ago" },
  { id: "2", action: "Replied to forum", title: "Best oil change practices", date: "1 week ago" },
  { id: "3", action: "Attended event", title: "Monthly Car Enthusiasts Meetup", date: "2 weeks ago" },
  { id: "4", action: "Helped user", title: "Answered transmission question", date: "3 weeks ago" },
]

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState(mockUser)
  const [editData, setEditData] = useState(mockUser)
  const [activeTab, setActiveTab] = useState("overview")

  const handleEdit = () => {
    setIsEditing(true)
    setEditData(profile)
  }

  const handleSave = () => {
    setProfile(editData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleChange = (field: string, value: string) => {
    setEditData({ ...editData, [field]: value })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">My Profile</h1>
          <p className="text-primary-foreground/90 mt-2">Manage your account and community presence</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Header Card */}
          <Card className="p-8 mb-8">
            <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-6">
              <div className="flex items-start gap-6 flex-1">
                <div className="w-24 h-24 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-3xl flex-shrink-0">
                  {profile.avatar}
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold">{profile.fullName}</h2>
                  <p className="text-muted-foreground">@{profile.username}</p>
                  <p className="text-sm text-muted-foreground mt-1">Joined {profile.joinDate}</p>
                  {!isEditing && <p className="text-sm text-muted-foreground mt-2">{profile.bio}</p>}
                </div>
              </div>
              {!isEditing && (
                <div className="flex gap-2 flex-shrink-0">
                  <Button onClick={handleEdit} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button variant="outline">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              )}
            </div>

            {/* Badges */}
            {profile.badges.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Award className="w-5 h-5 text-accent" />
                  Badges
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profile.badges.map((badge, idx) => (
                    <span key={idx} className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Social Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">{profile.followers}</div>
                <div className="text-xs text-muted-foreground">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">{profile.following}</div>
                <div className="text-xs text-muted-foreground">Following</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">{profile.reputation}</div>
                <div className="text-xs text-muted-foreground">Reputation</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">{profile.forumPosts + profile.guidesCreated}</div>
                <div className="text-xs text-muted-foreground">Contributions</div>
              </div>
            </div>
          </Card>

          {/* Edit Form */}
          {isEditing && (
            <Card className="p-8 mb-8 border-accent">
              <h3 className="text-xl font-bold mb-6">Edit Profile</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Full Name</label>
                  <Input value={editData.fullName} onChange={(e) => handleChange("fullName", e.target.value)} />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Email</label>
                  <Input type="email" value={editData.email} onChange={(e) => handleChange("email", e.target.value)} />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Bio</label>
                  <Textarea
                    value={editData.bio}
                    onChange={(e) => handleChange("bio", e.target.value)}
                    className="min-h-24"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Location</label>
                  <Input value={editData.location} onChange={(e) => handleChange("location", e.target.value)} />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Website</label>
                  <Input value={editData.website} onChange={(e) => handleChange("website", e.target.value)} />
                </div>

                <div className="flex gap-3">
                  <Button onClick={handleSave} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button onClick={handleCancel} variant="outline">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Tabs Section */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="expertise">Expertise</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4">
              <div className="grid md:grid-cols-4 gap-4">
                <Card className="p-6 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <MessageCircle className="w-5 h-5 text-accent" />
                  </div>
                  <div className="text-3xl font-bold text-accent">{profile.forumPosts}</div>
                  <div className="text-sm text-muted-foreground">Forum Posts</div>
                </Card>
                <Card className="p-6 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <BookOpen className="w-5 h-5 text-accent" />
                  </div>
                  <div className="text-3xl font-bold text-accent">{profile.guidesCreated}</div>
                  <div className="text-sm text-muted-foreground">Guides Created</div>
                </Card>
                <Card className="p-6 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-accent" />
                  </div>
                  <div className="text-3xl font-bold text-accent">{profile.eventsAttended}</div>
                  <div className="text-sm text-muted-foreground">Events Attended</div>
                </Card>
                <Card className="p-6 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-accent" />
                  </div>
                  <div className="text-3xl font-bold text-accent">{profile.reputation}</div>
                  <div className="text-sm text-muted-foreground">Reputation</div>
                </Card>
              </div>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity" className="space-y-4">
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {mockActivity.map((item) => (
                    <div key={item.id} className="flex items-start gap-4 pb-4 border-b border-border last:border-0">
                      <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <p className="font-medium">{item.action}</p>
                        <p className="text-sm text-muted-foreground">{item.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Expertise Tab */}
            <TabsContent value="expertise" className="space-y-4">
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Areas of Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.expertise.map((skill, idx) => (
                    <span key={idx} className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium">
                      {skill}
                    </span>
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
