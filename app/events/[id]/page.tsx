"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Calendar, MapPin, Users, Clock, Share2, ArrowLeft, CheckCircle, AlertCircle } from "@/lib/icons"
import Navigation from "@/components/navigation"
import Link from "next/link"

interface EventDetail {
  id: string
  title: string
  description: string
  fullDescription: string
  date: string
  time: string
  endTime: string
  location: string
  address: string
  category: string
  type: string
  attendees: number
  capacity: number
  image: string
  organizer: string
  organizerImage: string
  agenda: Array<{
    time: string
    activity: string
  }>
  requirements: string[]
  highlights: string[]
  rsvpd: boolean
}

const mockEvent: EventDetail = {
  id: "1",
  title: "Oil Change Workshop",
  description: "Learn the basics of oil changes with hands-on practice",
  fullDescription: `Join us for an interactive workshop where you'll learn everything about oil changes. 
  
  This hands-on session is perfect for beginners who want to master this essential maintenance task. Our certified instructors will guide you through the entire process, from preparation to cleanup. You'll get to practice on actual vehicles and learn professional techniques that will save you money in the long run.

  Whether you're looking to DIY your maintenance or just want to understand what your mechanic is doing, this workshop is for you!`,
  date: "November 15, 2025",
  time: "10:00 AM",
  endTime: "12:30 PM",
  location: "Downtown Auto Shop",
  address: "123 Main Street, Downtown",
  category: "Maintenance",
  type: "Workshop",
  attendees: 24,
  capacity: 30,
  image: "/workshop-oil-change.jpg",
  organizer: "John Mechanic",
  organizerImage: "JM",
  agenda: [
    { time: "10:00 AM", activity: "Welcome & Introduction" },
    { time: "10:15 AM", activity: "Theory: Oil Types & Specifications" },
    { time: "10:45 AM", activity: "Hands-on: Oil Change Demonstration" },
    { time: "11:15 AM", activity: "Practice: Participants Change Oil" },
    { time: "12:00 PM", activity: "Q&A & Tips" },
    { time: "12:30 PM", activity: "Wrap-up & Certificates" },
  ],
  requirements: [
    "Comfortable clothes you don't mind getting dirty",
    "Closed-toe shoes (required for safety)",
    "Bring a notepad if you want to take notes",
    "No prior experience necessary",
  ],
  highlights: [
    "Hands-on practice with real vehicles",
    "Learn from certified mechanics",
    "Certificate of completion",
    "Free refreshments provided",
    "Small group size for personalized attention",
  ],
  rsvpd: false,
}

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const [rsvpd, setRsvpd] = useState(mockEvent.rsvpd)
  const spotsLeft = mockEvent.capacity - mockEvent.attendees

  const handleRSVP = () => {
    setRsvpd(!rsvpd)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="bg-card border-b border-border py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/events" className="flex items-center gap-2 text-accent hover:text-accent/80 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Image */}
          <div className="rounded-lg overflow-hidden mb-8 h-96 bg-muted">
            <img
              src={mockEvent.image || "/placeholder.svg"}
              alt={mockEvent.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Title and Quick Info */}
          <div className="mb-8">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h1 className="text-4xl font-bold mb-2">{mockEvent.title}</h1>
                <p className="text-lg text-muted-foreground">{mockEvent.description}</p>
              </div>
              <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded font-semibold flex-shrink-0">
                {mockEvent.type}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-accent" />
                  <span className="text-sm text-muted-foreground">Date</span>
                </div>
                <div className="font-semibold">{mockEvent.date}</div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-accent" />
                  <span className="text-sm text-muted-foreground">Time</span>
                </div>
                <div className="font-semibold">
                  {mockEvent.time} - {mockEvent.endTime}
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-accent" />
                  <span className="text-sm text-muted-foreground">Location</span>
                </div>
                <div className="font-semibold">{mockEvent.location}</div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-accent" />
                  <span className="text-sm text-muted-foreground">Attendees</span>
                </div>
                <div className="font-semibold">
                  {mockEvent.attendees}/{mockEvent.capacity}
                </div>
              </Card>
            </div>

            {/* RSVP Button */}
            <div className="flex gap-3">
              <Button
                onClick={handleRSVP}
                className={
                  rsvpd
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-accent hover:bg-accent/90 text-accent-foreground"
                }
                size="lg"
              >
                {rsvpd ? (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    RSVP'd
                  </>
                ) : (
                  <>
                    <Users className="w-5 h-5 mr-2" />
                    RSVP Now
                  </>
                )}
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="w-5 h-5 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Availability Alert */}
          {spotsLeft <= 5 && spotsLeft > 0 && (
            <Card className="p-4 bg-yellow-50 border-yellow-200 mb-8">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-yellow-900">Limited Spots Available</h4>
                  <p className="text-sm text-yellow-800">
                    Only {spotsLeft} spots left! RSVP soon to secure your place.
                  </p>
                </div>
              </div>
            </Card>
          )}

          {spotsLeft === 0 && (
            <Card className="p-4 bg-red-50 border-red-200 mb-8">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-red-900">Event Full</h4>
                  <p className="text-sm text-red-800">
                    This event has reached capacity. Join the waitlist to be notified if spots open up.
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Description */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">About This Event</h2>
            <p className="text-foreground whitespace-pre-wrap leading-relaxed">{mockEvent.fullDescription}</p>
          </Card>

          {/* Organizer */}
          <Card className="p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">Organized By</h3>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-xl">
                {mockEvent.organizerImage}
              </div>
              <div>
                <h4 className="font-semibold text-lg">{mockEvent.organizer}</h4>
                <p className="text-muted-foreground">Certified Mechanic & Community Expert</p>
              </div>
            </div>
          </Card>

          {/* Agenda */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Event Agenda</h2>
            <div className="space-y-4">
              {mockEvent.agenda.map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-24 font-semibold text-accent flex-shrink-0">{item.time}</div>
                  <div className="flex-1 pb-4 border-b border-border last:border-b-0">{item.activity}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Highlights and Requirements */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Highlights</h3>
              <ul className="space-y-3">
                {mockEvent.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">What to Bring</h3>
              <ul className="space-y-3">
                {mockEvent.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Location */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">Location</h2>
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">{mockEvent.location}</h3>
                <p className="text-muted-foreground">{mockEvent.address}</p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
