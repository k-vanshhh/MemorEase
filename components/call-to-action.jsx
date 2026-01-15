import { Button } from "./ui/button.jsx"
import { ArrowRight } from "lucide-react"

export default function CallToAction() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-primary z-0">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
        <div className="absolute -top-[50%] -left-[20%] w-[800px] h-[800px] bg-chart-1/30 rounded-full blur-3xl" />
        <div className="absolute top-[20%] -right-[20%] w-[600px] h-[600px] bg-chart-4/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-foreground tracking-tight">
          Ready to Create Something <span className="italic">Meaningful?</span>
        </h2>
        <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
          Join a community where every gift tells a story. Connect with artists who can bring your vision to life.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Button variant="secondary" size="lg" className="h-14 px-8 text-lg font-medium shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
            Start Shopping
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-14 px-8 text-lg bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground/50"
          >
            Join as an Artist <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <p className="text-sm text-primary-foreground/60 pt-8">
          No hidden fees. 100% satisfaction guarantee.
        </p>
      </div>
    </section>
  )
}
