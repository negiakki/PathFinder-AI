/**
 * ResourceCard — displays a learning resource with an external link.
 * Full implementation: Phase 6.
 *
 * Props:
 *   resource: { title: string, category: string, description: string, url: string }
 */
export default function ResourceCard({ resource }) {
  if (!resource) return null
  return (
    <div className="card card-hover p-5 flex flex-col gap-3">
      <div>
        <p className="text-xs font-semibold text-ibm-purple uppercase tracking-wide">
          {resource.category}
        </p>
        <h3 className="text-sm font-semibold text-text-primary mt-0.5">{resource.title}</h3>
      </div>
      <p className="text-sm text-text-secondary flex-1">{resource.description}</p>
      {resource.url && (
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-ibm-blue hover:underline"
        >
          Open →
        </a>
      )}
    </div>
  )
}
