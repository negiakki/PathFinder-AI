/**
 * ProgressBar — thin animated progress indicator for the Assessment.
 * Full implementation: Phase 3.
 *
 * Props:
 *   current: number   — current question index (1-based)
 *   total:   number   — total number of questions
 */
export default function ProgressBar({ current, total }) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-text-secondary mb-1.5">
        <span>Question {current} of {total}</span>
        <span>{pct}%</span>
      </div>
      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-ibm-blue rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
