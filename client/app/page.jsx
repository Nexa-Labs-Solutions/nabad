import NavBar from '@/components/NavBar'
import HeroSection from '@/components/HeroSection'
import PartnerStrip from '@/components/PartnerStrip'
import FeaturesGrid from '@/components/FeaturesGrid'
import ImpactSection from '@/components/ImpactSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <NavBar />
      <HeroSection />
      <PartnerStrip />
      <FeaturesGrid />
      <ImpactSection />
      <Footer />
    </main>
  )
}
