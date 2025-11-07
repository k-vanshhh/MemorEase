import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section id="home" className="bg-gradient-to-br from-emerald-50 to-background py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground text-balance leading-tight">
            Create <span className="text-emerald-600">memorable gifts</span> — effortlessly
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Discover personalized gifts from independent artists and designers. Because every gift deserves a story.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg">Start Gifting</Button>
            <Button
              variant="outline"
              className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-6 text-lg bg-transparent"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
