import { Button } from "./ui/button.jsx"
import { Search } from "lucide-react"

export default function SearchExplore() {
  return (
    <section className="py-24 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-primary text-primary-foreground p-12 md:p-20">
          {/* Abstract Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" />
            </svg>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col justify-center space-y-6">
              <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-sm font-medium backdrop-blur-sm w-fit">
                Curated Collection
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
                Find the perfect piece <br /> <span className="italic opacity-80">that speaks to you.</span>
              </h2>
              <p className="text-primary-foreground/80 text-lg max-w-md">
                Browse through thousands of unique, personalized gifts from talented artists worldwide.
              </p>
              <div className="flex gap-4 pt-4">
                <Button size="lg" variant="secondary" className="font-medium px-8 transition-transform hover:scale-105">
                  Start Exploring
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                  View Gift Guides
                </Button>
              </div>
            </div>

            {/* Decorative "Search Preview" Mockup */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-2xl skew-y-1 transform transition-transform hover:skew-y-0 duration-500">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-full h-12 bg-white/10 rounded-full flex items-center px-4 gap-3">
                  <Search className="text-white/50" />
                  <div className="h-2 w-32 bg-white/20 rounded-full"></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="aspect-square bg-white/5 rounded-lg border border-white/5 animate-pulse" style={{ animationDelay: `${i * 100}ms` }}></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
