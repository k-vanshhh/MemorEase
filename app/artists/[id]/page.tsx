"use client"

import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Star, Heart, Mail, Globe } from "lucide-react"

export default function ArtistProfilePage() {
  const artist = {
    id: 1,
    name: "Sarah Anderson",
    bio: "Contemporary artist specializing in personalized gifts and custom artwork. Passionate about creating meaningful pieces that tell your story.",
    image: "/artist-portrait.png",
    coverImage: "/artist-portfolio-background.jpg",
    rating: 4.9,
    followers: 2543,
    products: 48,
    email: "sarah@memorease.com",
    website: "sarahartistry.com",
    bio_full:
      "Sarah has been creating custom artwork for over 8 years. Her work has been featured in numerous galleries and she has collaborated with leading brands on personalized gift collections.",
    products_list: [
      { id: 1, name: "Custom Canvas", price: 89.99, image: "/blank-artist-canvas.png" },
      { id: 2, name: "Personalized Mug", price: 24.99, image: "/ceramic-mug.png" },
      { id: 3, name: "Photo Book", price: 49.99, image: "/open-photo-book.png" },
      { id: 4, name: "Custom Print", price: 34.99, image: "/print-word.png" },
    ],
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Cover Image */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img src={artist.coverImage || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-20 relative z-10">
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-end">
          <img
            src={artist.image || "/placeholder.svg"}
            alt={artist.name}
            className="w-40 h-40 rounded-lg border-4 border-background shadow-lg object-cover"
          />

          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-4xl font-bold text-foreground">{artist.name}</h1>
              <p className="text-muted-foreground text-lg">{artist.bio}</p>
            </div>

            <div className="flex flex-wrap gap-8 text-sm">
              <div>
                <p className="text-muted-foreground">Followers</p>
                <p className="font-bold text-foreground text-lg">{artist.followers.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Products</p>
                <p className="font-bold text-foreground text-lg">{artist.products}</p>
              </div>
              <div className="flex items-center gap-1">
                <Star size={18} className="fill-yellow-400 text-yellow-400" />
                <p className="font-bold text-foreground">{artist.rating}</p>
              </div>
            </div>

            <div className="flex gap-3 flex-wrap">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
                <Heart size={18} />
                Follow Artist
              </Button>
              <Button variant="outline" className="border-border gap-2 bg-transparent">
                <Mail size={18} />
                Contact
              </Button>
              {artist.website && (
                <Button variant="outline" className="border-border gap-2 bg-transparent">
                  <Globe size={18} />
                  Website
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-16 pt-8 border-t border-border">
          <h2 className="text-3xl font-bold text-foreground mb-4">About</h2>
          <p className="text-muted-foreground leading-relaxed max-w-3xl">{artist.bio_full}</p>
        </div>

        {/* Products Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {artist.products_list.map((product) => (
              <div
                key={product.id}
                className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition"
              >
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full aspect-square object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-foreground mb-2">{product.name}</h3>
                  <p className="font-semibold text-emerald-600 mb-4">${product.price}</p>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
