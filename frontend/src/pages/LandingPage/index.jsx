import Navbar from '../../layout/Navbar.jsx'
import Footer from '../../layout/Footer.jsx'

/**
 * LandingPage — placeholder shell.
 * Full implementation: Phase 2.
 */
export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center">
        <p className="text-text-secondary text-sm">Landing Page — Phase 2</p>
      </main>
      <Footer />
    </div>
  )
}
