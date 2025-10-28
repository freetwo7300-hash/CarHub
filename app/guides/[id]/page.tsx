"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Clock, Zap, ThumbsUp, Share2, ArrowLeft, CheckCircle } from "@/lib/icons"
import Navigation from "@/components/navigation"
import Link from "next/link"

interface Step {
  number: number
  title: string
  description: string
  details: string[]
}

interface GuideDetail {
  id: string
  title: string
  description: string
  category: string
  difficulty: string
  duration: string
  author: string
  rating: number
  views: number
  tools: string[]
  materials: string[]
  steps: Step[]
  tips: string[]
  warnings: string[]
}

const mockGuide: GuideDetail = {
  id: "1",
  title: "Complete Oil Change Guide",
  description: "Step-by-step instructions for changing your vehicle's oil and filter",
  category: "Maintenance",
  difficulty: "Beginner",
  duration: "30 mins",
  author: "John Mechanic",
  rating: 4.8,
  views: 5420,
  tools: ["Socket wrench set", "Oil filter wrench", "Oil drain pan", "Jack and jack stands", "Ramps (optional)"],
  materials: ["New oil (correct type and amount)", "New oil filter", "Oil drain plug gasket (if needed)"],
  steps: [
    {
      number: 1,
      title: "Prepare Your Vehicle",
      description: "Get your vehicle ready for the oil change",
      details: [
        "Park on a level surface",
        "Warm up the engine for 2-3 minutes (warm oil flows better)",
        "Turn off the engine and wait 5 minutes",
        "Engage the parking brake",
      ],
    },
    {
      number: 2,
      title: "Lift the Vehicle",
      description: "Safely raise your vehicle to access the drain plug",
      details: [
        "Use ramps or a jack with jack stands",
        "Never work under a vehicle supported only by a jack",
        "Ensure the vehicle is stable before proceeding",
      ],
    },
    {
      number: 3,
      title: "Locate and Remove Drain Plug",
      description: "Find and remove the oil drain plug",
      details: [
        "Locate the drain plug at the bottom of the oil pan",
        "Place the drain pan underneath",
        "Use a socket wrench to loosen the plug",
        "Carefully unscrew by hand and let oil drain",
      ],
    },
    {
      number: 4,
      title: "Replace Oil Filter",
      description: "Remove the old filter and install a new one",
      details: [
        "Locate the oil filter (usually on the side of the engine)",
        "Use an oil filter wrench to loosen it",
        "Unscrew by hand and let remaining oil drain",
        "Apply a thin layer of new oil to the rubber gasket of the new filter",
        "Screw on the new filter until the gasket contacts, then tighten 3/4 turn more",
      ],
    },
    {
      number: 5,
      title: "Install New Drain Plug",
      description: "Replace the drain plug with a new gasket if needed",
      details: [
        "Wipe the drain plug clean",
        "Install a new gasket if your vehicle requires it",
        "Reinstall the drain plug and tighten to manufacturer specifications",
        "Don't over-tighten as this can strip the threads",
      ],
    },
    {
      number: 6,
      title: "Add New Oil",
      description: "Fill the engine with the correct amount of new oil",
      details: [
        "Lower the vehicle back to the ground",
        "Remove the oil filler cap on top of the engine",
        "Pour in the recommended amount of new oil",
        "Replace the oil filler cap",
      ],
    },
    {
      number: 7,
      title: "Check Oil Level",
      description: "Verify the oil level is correct",
      details: [
        "Start the engine and let it run for 30 seconds",
        "Turn off the engine and wait 2-3 minutes",
        "Remove the dipstick and wipe it clean",
        "Reinsert the dipstick fully, then remove again to check level",
        "Add more oil if needed to reach the full mark",
      ],
    },
  ],
  tips: [
    "Always dispose of old oil properly at a recycling center or auto parts store",
    "Keep track of your oil changes with a maintenance log",
    "Check your owner's manual for the correct oil type and capacity",
    "Consider changing your oil filter every other oil change if using synthetic oil",
  ],
  warnings: [
    "Hot oil can cause severe burns - wait for the engine to cool before starting",
    "Never work under a vehicle supported only by a jack",
    "Ensure the vehicle is on a level surface to get an accurate oil level reading",
    "Over-tightening the drain plug can strip the threads and cause leaks",
  ],
}

export default function GuideDetailPage({ params }: { params: { id: string } }) {
  const [liked, setLiked] = useState(false)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="bg-card border-b border-border py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/guides" className="flex items-center gap-2 text-accent hover:text-accent/80 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Guides
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title and Meta */}
          <div className="mb-8">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h1 className="text-4xl font-bold mb-3">{mockGuide.title}</h1>
                <p className="text-lg text-muted-foreground mb-4">{mockGuide.description}</p>
              </div>
              <div
                className={`px-4 py-2 rounded font-semibold flex-shrink-0 ${getDifficultyColor(mockGuide.difficulty)}`}
              >
                {mockGuide.difficulty}
              </div>
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {mockGuide.duration}
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                by {mockGuide.author}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent font-semibold">{mockGuide.rating}</span>
                <span>★ ({mockGuide.views.toLocaleString()} views)</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setLiked(!liked)}
                className={liked ? "bg-accent/10 border-accent text-accent" : ""}
              >
                <ThumbsUp className="w-4 h-4 mr-2" />
                {liked ? "Liked" : "Like"}
              </Button>
              <Button variant="outline">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Tools and Materials */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Tools Needed</h3>
              <ul className="space-y-2">
                {mockGuide.tools.map((tool, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>{tool}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Materials Needed</h3>
              <ul className="space-y-2">
                {mockGuide.materials.map((material, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>{material}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Steps */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Step-by-Step Instructions</h2>
            <div className="space-y-6">
              {mockGuide.steps.map((step) => (
                <Card key={step.number} className="p-6 border-l-4 border-l-accent">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold flex-shrink-0">
                      {step.number}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground mb-4">{step.description}</p>
                      <ul className="space-y-2">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm">
                            <span className="text-accent font-bold mt-1">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Tips and Warnings */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6 bg-blue-50/50 border-blue-200">
              <h3 className="font-semibold text-lg mb-4 text-blue-900">Pro Tips</h3>
              <ul className="space-y-3">
                {mockGuide.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm">
                    <Zap className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-blue-900">{tip}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6 bg-red-50/50 border-red-200">
              <h3 className="font-semibold text-lg mb-4 text-red-900">Warnings</h3>
              <ul className="space-y-3">
                {mockGuide.warnings.map((warning, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm">
                    <span className="text-red-600 font-bold mt-0.5">⚠</span>
                    <span className="text-red-900">{warning}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Related Guides */}
          <Card className="p-6 bg-muted/50">
            <h3 className="font-semibold text-lg mb-4">Next Steps</h3>
            <p className="text-muted-foreground mb-4">
              After completing this oil change, consider checking out our other maintenance guides to keep your vehicle
              in top condition.
            </p>
            <Link href="/guides">
              <Button variant="outline">Browse More Guides</Button>
            </Link>
          </Card>
        </div>
      </section>
    </div>
  )
}
