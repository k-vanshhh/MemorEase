import { Button } from "@/components/ui/button"
export default function SearchExplore() {
  return (
    <section className="py-12 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">Find Your Perfect Gift</h2>
            <p className="text-foreground/70 mb-6">
              Browse through thousands of unique, personalized gifts from talented artists worldwide.
            </p>
            <Button size="lg" className="w-fit">
              Explore All Products
            </Button>
          </div>
          <div className="bg-primary/10 rounded-lg h-64 flex items-center justify-center">
            <span className="text-primary">Search Preview</span>
          </div>
        </div>
      </div>
    </section>
  )
}
