import { Star } from "lucide-react"
import { Button } from "./ui/button.jsx"

export default function ArtistSpotlight() {
  const artists = [
    {
      id: 1,
      name: "Sarah Designer",
      specialty: "Custom Keychains & Accessories",
      rating: 4.9,
      reviews: 248,
      image: "/creative-artist-portrait.jpg",
    },
    {
      id: 2,
      name: "Alex Ceramics",
      specialty: "Hand-Painted Mugs & Pottery",
      rating: 4.8,
      reviews: 156,
      image: "/ceramic-artist-working.jpg",
    },
    {
      id: 3,
      name: "Luna Jewelry",
      specialty: "Personalized Metal Jewelry",
      rating: 4.95,
      reviews: 342,
      image: "/jewelry-designer-craftsman.jpg",
    },
  ]

  return (
    <section id="artists" className="py-20 bg-emerald-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-2">Featured Artists</h2>
          <p className="text-muted-foreground">Meet the talented creators behind our gifts</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {artists.map((artist) => (
            <div
              key={artist.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition p-6 text-center space-y-4"
            >
              <img
                src={artist.image || "/placeholder.svg"}
                alt={artist.name}
                className="w-24 h-24 rounded-full mx-auto object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold text-foreground">{artist.name}</h3>
                <p className="text-sm text-muted-foreground">{artist.specialty}</p>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-emerald-600 text-emerald-600" />
                  ))}
                </div>
                <span className="text-muted-foreground">({artist.reviews})</span>
              </div>
              <Button
                variant="outline"
                className="w-full border-emerald-600 text-emerald-600 hover:bg-emerald-50 bg-transparent"
              >
                View Shop
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
