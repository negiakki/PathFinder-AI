/**
 * CareerMatchCard — Displays a single career match with percentage bar.
 *
 * Props:
 *   career: { title, matchPercentage, description }
 *   rank:   number (1-based)
 */
export default function CareerMatchCard({ career, rank }) {
  const isTop = rank === 1

  return (
    <div className={[
      'card card-hover p-6 flex flex-col gap-4',
      isTop ? 'border-ibm-blue ring-2 ring-ibm-blue/20' : '',
    ].join(' ')}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <span className="text-xs font-bold text-ibm-blue/60 uppercase tracking-widest">#{rank}</span>
          <h3 className="text-base font-bold text-text-primary dark:text-gray-100 mt-0.5">{career.title}</h3>
        </div>
        <span className={[
          'shrink-0 text-sm font-extrabold px-3 py-1 rounded-full',
          isTop
            ? 'bg-ibm-blue text-white'
            : 'bg-blue-50 dark:bg-blue-950 text-ibm-blue border border-blue-200 dark:border-blue-800',
        ].join(' ')}>
          {career.matchPercentage}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-surface dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-ibm-blue transition-all duration-700 ease-out"
          style={{ width: `${career.matchPercentage}%` }}
          role="progressbar"
          aria-valuenow={career.matchPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      <p className="text-sm text-text-secondary dark:text-gray-400 leading-relaxed">{career.description}</p>
    </div>
  )
}
