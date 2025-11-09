"use client"
import { Card } from "../../../components/ui/card.jsx"
import { Button } from "../../../components/ui/button.jsx"
import Image from "next/image"

export default function GiftGuidesPage() {
  const giftGuides = [
    {
      id: 1,
      title: "Anniversary Gifts",
      description: "Celebrate your special milestone with romantic, thoughtful gifts",
      image: "/anniversary-gifts-romantic.jpg",
      budget: "$50 - $200",
      items: 24,
    },
    {
      id: 2,
      title: "Baby Gifts",
      description: "Welcome new arrivals with sweet, memorable gift options",
      image: "/baby-gifts-newborn.jpg",
      budget: "$20 - "$80",
      items: 18,
    },
    {
      id: 3,
      title: "Graduation Gifts",
      description: "Celebrate achievements with meaningful, memorable presents",
      image: "/graduation-gifts-achievement.jpg",
      budget: "$30 - "$150",
      items: 22,
    },
    {
      id: 4,
      title: "Corporate Gifts",
      description: "Impress colleagues and clients with professional, artistic gifts",
      image: "/corporate-gifts-business.jpg",
      budget: "$40 - "$200",
      items: 31,
    },
  ]

  const budgetGuides = [
    {
      title: "Under $50",
      description: "Meaningful gifts that won't break the bank",
      image: "/affordable-gifts-under-50.jpg",
      count: 156,
    },
    {
      title: "Under $100",
      description: "Premium personalized gifts for every occasion",
      image: "/placeholder.svg",
      count: 342,
    },
    {
      title: "Luxury (Over $100)",
      description: "Exclusive, high-end artistic creations",
      image: "/placeholder.svg",
      count: 89,
    },
  ]

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Gift Guides & Collections</h1>
        <p className="text-xl text-gray-600 mb-12">
          Explore curated collections to find the perfect gift for any occasion
        </p>

        {/* Occasion-Based Guides */}
        <h2 className="text-2xl font-bold mb-6">Shop by Occasion</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {giftGuides.map((guide) => (
            <Card key={guide.id} className="overflow-hidden hover:shadow-lg transition cursor-pointer">
              <div className="relative h-48">
                <Image src={guide.image || "/placeholder.svg"} alt={guide.title} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{guide.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{guide.description}</p>
                <div className="flex justify-between text-xs text-gray-500 mb-3">
                  <span>Budget: {guide.budget}</span>
                  <span>{guide.items} items</span>
                </div>
                <Button className="w-full">View Collection</Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Budget-Based Guides */}
        <h2 className="text-2xl font-bold mb-6">Shop by Budget</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {budgetGuides.map((guide, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition cursor-pointer">
              <div className="relative h-40">
                <Image src={guide.image || "/placeholder.svg"} alt={guide.title} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{guide.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{guide.description}</p>
                <div className="text-xs text-gray-500 mb-3">{guide.count} products available</div>
                <Button className="w-full">Shop Now</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
