import { Star, ArrowRight } from "lucide-react"
import { Button } from "./ui/button.jsx"

export default function ArtistSpotlight() {
  const artists = [
    {
      id: 1,
      name: "Sarah Designer",
      specialty: "Custom Accessories",
      rating: 4.9,
      reviews: 248,
      image: "/creative-artist-portrait.jpg",
      quote: "I turn everyday items into cherished memories.",
    },
    {
      id: 2,
      name: "Alex Ceramics",
      specialty: "Pottery & Clay",
      rating: 4.8,
      reviews: 156,
      image: "/ceramic-artist-working.jpg",
      quote: "Clay is my language, and every pot tells a story.",
    },
    {
      id: 3,
      name: "Luna Jewelry",
      specialty: "Metalsmith",
      rating: 4.95,
      reviews: 342,
      image: "/jewelry-designer-craftsman.jpg",
      quote: "Forging precious metals into timeless heirlooms.",
    },
  ]

  return (
    <section id="artists" className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-end mb-16">
          <div className="space-y-6">
            <span className="text-primary font-medium tracking-wide uppercase text-xs">Meet the Makers</span>
            <h2 className="text-4xl md:text-5xl font-serif text-foreground">
              The Hands Behind <br /> The Art
            </h2>
          </div>
          <div className="md:pb-2">
            <p className="text-muted-foreground text-lg max-w-md">
              Discover the talented individuals who pour their heart and soul into every custom creation.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {artists.map((artist) => (
            <div
              key={artist.id}
              className="group bg-background rounded-2xl p-6 border border-border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-background ring-2 ring-muted">
                    <img
                      src={artist.image || "/placeholder.svg"}
                      alt={artist.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-background rounded-full p-1.5 shadow-sm border border-border text-xs font-bold flex items-center gap-1">
                    <Star size={12} className="fill-chart-4 text-chart-4" />
                    {artist.rating}
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="group-hover:translate-x-1 transition-transform text-muted-foreground">
                  <ArrowRight size={20} />
                </Button>
              </div>

              <div className="space-y-4 flex-1">
                <div>
                  <h3 className="text-xl font-serif font-semibold text-foreground">{artist.name}</h3>
                  <p className="text-sm font-medium text-primary/80">{artist.specialty}</p>
                </div>

                <blockquote className="text-muted-foreground italic text-sm border-l-2 border-primary/20 pl-3 leading-relaxed">
                  "{artist.quote}"
                </blockquote>
              </div>

              <div className="mt-6 pt-6 border-t border-border flex items-center justify-between text-xs text-muted-foreground font-medium uppercase tracking-wider">
                <span>{artist.reviews} Reviews</span>
                <span className="group-hover:text-primary transition-colors">View Portfolio</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
