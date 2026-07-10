import { Compass } from 'lucide-react'

/**
 * Footer — visible only on the Landing Page.
 * Simple, no clutter per UI_SPEC.md.
 */
export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-white mt-auto">
      <div className="max-w-page mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-text-secondary">
        {/* Brand */}
        <div className="flex items-center gap-2 font-semibold text-text-primary">
          <Compass className="text-ibm-blue" size={18} />
          PathFinder AI
        </div>

        {/* Attribution */}
        <p className="text-center">
          Powered by{' '}
          <a
            href="https://www.ibm.com/watsonx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ibm-blue hover:underline font-medium"
          >
            IBM watsonx.ai
          </a>
        </p>

        {/* GitHub placeholder */}
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-text-primary transition-colors"
        >
          GitHub
        </a>
      </div>
    </footer>
  )
}
