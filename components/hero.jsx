import { Button } from "@/components/ui/button"
export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-primary/10 to-background py-20 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
          Meaningful Gifts, <span className="text-primary">Crafted by Artists</span>
        </h1>
        <p className="text-xl text-foreground/80 mb-8">
          Discover personalized gifts created by independent artists and designers. Give something truly special.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button size="lg">Shop Now</Button>
          <Button size="lg" variant="outline">
            Explore Artists
          </Button>
        </div>
      </div>
    </section>
  )
}
