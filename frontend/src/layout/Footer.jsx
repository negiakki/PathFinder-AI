import { Compass } from 'lucide-react'

/**
 * Footer — visible only on the Landing Page.
 * Simple, no clutter per UI_SPEC.md.
 */
export default function Footer() {
  return (
    <footer className="w-full border-t border-border dark:border-gray-800 bg-white dark:bg-gray-900 mt-auto transition-colors duration-300">
      <div className="max-w-page mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-text-secondary dark:text-gray-400">
        {/* Brand */}
        <div className="flex items-center gap-2 font-semibold text-text-primary dark:text-gray-100">
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
          className="hover:text-text-primary dark:hover:text-gray-100 transition-colors"
        >
          GitHub
        </a>
      </div>
    </footer>
  )
}
