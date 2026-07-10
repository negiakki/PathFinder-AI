/**
 * RoadmapCard — displays a single roadmap milestone.
 * Full implementation: Phase 6.
 *
 * Props:
 *   milestone: { title: string, goal: string, description: string }
 *   isLast:    boolean
 */
export default function RoadmapCard({ milestone, isLast = false }) {
  if (!milestone) return null
  return (
    <div className="flex gap-4">
      {/* Timeline spine */}
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-ibm-blue mt-1 shrink-0" />
        {!isLast && <div className="w-0.5 flex-1 bg-border mt-1" />}
      </div>
      {/* Content */}
      <div className="card p-4 mb-4 flex-1">
        <p className="text-xs font-semibold text-ibm-blue uppercase tracking-wide mb-1">
          {milestone.title}
        </p>
        <p className="text-sm font-medium text-text-primary">{milestone.goal}</p>
        <p className="text-sm text-text-secondary mt-1">{milestone.description}</p>
      </div>
    </div>
  )
}
