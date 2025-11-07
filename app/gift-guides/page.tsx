"use client"

import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Gift, Heart, Star } from "lucide-react"

export default function GiftGuidesPage() {
  const guides = [
    {
      id: 1,
      title: "Gifts Under $50",
      description: "Meaningful gifts for every budget",
      image: "/affordable-gifts-under-50.jpg",
      badge: "Budget-Friendly",
      count: 24,
    },
    {
      id: 2,
      title: "Anniversary Gifts",
      description: "Celebrate your special moments",
      image: "/anniversary-gifts-romantic.jpg",
      badge: "For Him & Her",
      count: 32,
    },
    {
      id: 3,
      title: "New Baby Gifts",
      description: "Adorable gifts for new arrivals",
      image: "/baby-gifts-newborn.jpg",
      badge: "New Parents",
      count: 18,
    },
    {
      id: 4,
      title: "Engagement Gifts",
      description: "Celebrate engagements in style",
      image: "/engagement-gifts-celebration.jpg",
      badge: "Special Occasions",
      count: 28,
    },
    {
      id: 5,
      title: "Graduation Gifts",
      description: "Mark this milestone with something special",
      image: "/graduation-gifts-achievement.jpg",
      badge: "Achievements",
      count: 22,
    },
    {
      id: 6,
      title: "Corporate Gifts",
      description: "Professional gifts for your team",
      image: "/corporate-gifts-business.jpg",
      badge: "For Business",
      count: 35,
    },
  ]

  const occasions = [
    { icon: Heart, label: "Anniversary", count: 42 },
    { icon: Gift, label: "Birthday", count: 56 },
    { icon: Star, label: "Congratulations", count: 38 },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Gift Guides</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover curated collections of meaningful gifts for every occasion, recipient, and budget.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Featured Guides */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">Popular Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide) => (
              <div
                key={guide.id}
                className="group rounded-lg overflow-hidden bg-card border border-border hover:shadow-lg transition"
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={guide.image || "/placeholder.svg"}
                    alt={guide.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <span className="absolute top-3 right-3 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {guide.badge}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">{guide.title}</h3>
                  <p className="text-muted-foreground mb-4">{guide.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{guide.count} items</span>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" size="sm">
                      Explore
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Browse by Occasion */}
        <div className="border-t border-border pt-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">Browse by Occasion</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {occasions.map((occasion, idx) => {
              const Icon = occasion.icon
              return (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-8 text-center space-y-4 hover:shadow-lg transition"
                >
                  <Icon className="w-12 h-12 text-emerald-600 mx-auto" />
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{occasion.label}</h3>
                    <p className="text-muted-foreground">{occasion.count} gifts</p>
                  </div>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white w-full">Browse</Button>
                </div>
              )
            })}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-16 pt-16 border-t border-border">
          <h2 className="text-3xl font-bold text-foreground mb-8">Gifting Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Know Your Budget",
                description:
                  "Browse our collections filtered by price range to find the perfect gift within your budget.",
              },
              {
                title: "Consider the Recipient",
                description:
                  "Think about the recipient's personality, interests, and preferences when selecting a gift.",
              },
              {
                title: "Personalize It",
                description: "Many of our artists offer customization options to make your gift truly one-of-a-kind.",
              },
            ].map((tip, idx) => (
              <div key={idx} className="bg-card rounded-lg border border-border p-6">
                <h3 className="text-lg font-bold text-foreground mb-3">{tip.title}</h3>
                <p className="text-muted-foreground">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
