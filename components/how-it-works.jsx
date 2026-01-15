import { Sparkles, Palette, Gift, Heart } from "lucide-react"

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Discover",
      description: "Browse personalized gifts from talented independent artists.",
      icon: Sparkles,
      color: "text-chart-1",
      bg: "bg-chart-1/10"
    },
    {
      number: "02",
      title: "Collaborate",
      description: "Connect directly with artists to customize your vision.",
      icon: Palette,
      color: "text-chart-2",
      bg: "bg-chart-2/10"
    },
    {
      number: "03",
      title: "Create",
      description: "Watch as your unique piece is crafted with care and skill.",
      icon: Gift,
      color: "text-chart-3",
      bg: "bg-chart-3/10"
    },
    {
      number: "04",
      title: "Cherish",
      description: "Receive a one-of-a-kind gift that tells your story.",
      icon: Heart,
      color: "text-chart-4",
      bg: "bg-chart-4/10"
    },
  ]

  return (
    <section className="py-24 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl font-serif font-bold text-foreground">From Imagination to Reality</h2>
          <p className="text-muted-foreground text-lg">Four simple steps to meaningful gifting</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-border to-transparent -z-10" />

          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div key={step.number} className="relative group text-center space-y-6">
                <div className={`w-24 h-24 mx-auto rounded-full ${step.bg} ${step.color} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300 bg-background border-4 border-background`}>
                  <Icon size={32} />
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-bold tracking-widest text-muted-foreground/50 font-serif">{step.number}</div>
                  <h3 className="text-xl font-semibold text-foreground font-serif">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed px-4">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
