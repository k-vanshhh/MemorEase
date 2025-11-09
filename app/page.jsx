import Header from "../components/header.jsx";
import Hero from "../components/hero.jsx";
import SearchExplore from "../components/search-explore.jsx";
import HowItWorks from "../components/how-it-works.jsx";
import ProductGrid from "../components/product-grid.jsx";
import ArtistSpotlight from "../components/artist-spotlight.jsx";
import CallToAction from "../components/call-to-action.jsx";
import Footer from "../components/footer.jsx";

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
  );
}