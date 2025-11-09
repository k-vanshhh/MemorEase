import { Sparkles, Palette, Gift, Heart } from "lucide-react"

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Discover",
      description: "Browse personalized gifts from talented independent artists",
      icon: Sparkles,
    },
    {
      number: 2,
      title: "Create",
      description: "Customize items with your personal touch and preferences",
      icon: Palette,
    },
    {
      number: 3,
      title: "Send",
      description: "Securely checkout and send directly to your loved one",
      icon: Gift,
    },
    {
      number: 4,
      title: "Cherish",
      description: "Watch them love their meaningful, thoughtful gift",
      icon: Heart,
    },
  ]

  return (
    <section className="py-20 bg-emerald-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-2">How It Works</h2>
          <p className="text-muted-foreground">Four simple steps to meaningful gifting</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div key={step.number} className="text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto">
                  <Icon size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground text-sm mt-2">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
