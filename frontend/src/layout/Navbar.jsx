import { Link, useNavigate } from 'react-router-dom'
import { Compass } from 'lucide-react'

/**
 * Navbar — visible only on the Landing Page.
 * Minimal navigation per UI_SPEC.md.
 */
export default function Navbar() {
  const navigate = useNavigate()

  return (
    <header className="w-full border-b border-border bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-page mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-text-primary text-lg">
          <Compass className="text-ibm-blue" size={24} />
          PathFinder AI
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
          <a href="#features"    className="hover:text-text-primary transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-text-primary transition-colors">How It Works</a>
        </nav>

        {/* CTA */}
        <button
          onClick={() => navigate('/assessment')}
          className="btn-primary text-sm px-5 py-2.5"
        >
          Start Assessment
        </button>
      </div>
    </header>
  )
}
