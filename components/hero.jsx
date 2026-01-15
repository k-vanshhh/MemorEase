import { Button } from "./ui/button.jsx"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 bg-texture-paper">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-[40%] -left-[10%] w-[500px] h-[500px] bg-chart-1/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Text Content */}
          <div className="text-left space-y-8">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
              New Collection: Fall 2026
            </div>

            <h1 className="text-5xl md:text-7xl font-serif font-medium leading-[1.1] text-foreground tracking-tight">
              Gifts that tell a <span className="italic text-primary">story.</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
              Connect with independent artists to commission pieces that hold meaning. From canvas to craft, made just for you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/search">
                <Button size="lg" className="rounded-full px-8 h-12 text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                  Start your commission
                </Button>
              </Link>
              <Link href="/artists">
                <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-base bg-background/50 backdrop-blur-sm border-primary/20 hover:bg-background/80">
                  Explore Artists <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="pt-8 flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`w-8 h-8 rounded-full border-2 border-background bg-zinc-200`} />
                ))}
              </div>
              <p>Trusted by 10,000+ art lovers</p>
            </div>
          </div>

          {/* Visual Showcase (Masonry / Collage Aesthetic) */}
          <div className="relative hidden md:block h-[600px]">
            {/* Main Featured Image */}
            <div className="absolute top-0 right-8 w-64 h-80 bg-stone-200 rounded-2xl rotate-3 shadow-2xl border-4 border-white overflow-hidden transition-transform hover:rotate-0 duration-500 hover:z-20">
              {/* Placeholder for artistic image */}
              <div className="w-full h-full bg-gradient-to-tr from-stone-300 to-stone-100 flex items-center justify-center text-stone-400 font-serif italic">Art Piece 1</div>
            </div>

            {/* Secondary Image */}
            <div className="absolute top-40 left-12 w-56 h-72 bg-orange-100 rounded-2xl -rotate-6 shadow-xl border-4 border-white overflow-hidden transition-transform hover:rotate-0 duration-500 hover:z-20">
              <div className="w-full h-full bg-gradient-to-bl from-orange-200 to-orange-50 flex items-center justify-center text-orange-300 font-serif italic">Ceramics</div>
            </div>

            {/* Accent Card */}
            <div className="absolute bottom-12 right-24 w-48 h-56 bg-blue-100 rounded-2xl rotate-6 shadow-lg border-4 border-white overflow-hidden transition-transform hover:rotate-0 duration-500 hover:z-20">
              <div className="w-full h-full bg-gradient-to-br from-blue-200 to-indigo-50 flex items-center justify-center text-indigo-300 font-serif italic">Jewelry</div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-primary/10 rounded-full animate-[spin_60s_linear_infinite]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] border border-dashed border-primary/20 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
          </div>

        </div>
      </div>
    </section>
  )
}
