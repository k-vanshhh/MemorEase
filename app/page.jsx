import Header from "./Header"
import Hero from "./Hero"
import SearchExplore from "./SearchExplore"
import HowItWorks from "./HowItWorks"
import ProductGrid from "./ProductGrid"
import ArtistSpotlight from "./ArtistSpotlight"
import CallToAction from "./CallToAction"
import Footer from "./Footer"

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
