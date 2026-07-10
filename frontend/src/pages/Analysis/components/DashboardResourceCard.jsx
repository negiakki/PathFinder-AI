import { ExternalLink } from 'lucide-react'

/**
 * DashboardResourceCard — Premium learning resource card.
 *
 * Props:
 *   resource: { title: string, category: string, description: string }
 */
export default function DashboardResourceCard({ resource }) {
  return (
    <div className="card card-hover p-6 flex flex-col gap-4 h-full">
      <div>
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-ibm-purple bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 px-2.5 py-1 rounded-full">
          {resource.category}
        </span>
        <h3 className="text-sm font-bold text-text-primary dark:text-gray-100 mt-2 leading-snug">{resource.title}</h3>
      </div>
      <p className="text-sm text-text-secondary dark:text-gray-400 leading-relaxed flex-1">{resource.description}</p>
      <button
        type="button"
        className="btn-secondary text-sm px-4 py-2 w-full"
        aria-label={`Learn more about ${resource.title}`}
      >
        <ExternalLink size={14} /> Learn More
      </button>
    </div>
  )
}
