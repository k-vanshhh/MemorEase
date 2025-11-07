import Header from "@/components/header"
import Hero from "@/components/hero"
import SearchExplore from "@/components/search-explore"
import HowItWorks from "@/components/how-it-works"
import ProductGrid from "@/components/product-grid"
import ArtistSpotlight from "@/components/artist-spotlight"
import CallToAction from "@/components/call-to-action"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <SearchExplore />
      <HowItWorks />
      <ProductGrid />
      <ArtistSpotlight />
      <CallToAction />
      <Footer />
    </main>
  )
}
