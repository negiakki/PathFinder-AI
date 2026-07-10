import { MapPin } from 'lucide-react'

/**
 * RoadmapTimeline — Vertical timeline for the career roadmap.
 *
 * Props:
 *   roadmap: { stage: string, description: string }[]
 */
export default function RoadmapTimeline({ roadmap }) {
  return (
    <div className="flex flex-col">
      {roadmap.map((item, index) => {
        const isLast = index === roadmap.length - 1
        const isFirst = index === 0
        return (
          <div key={index} className="flex gap-5">
            {/* Spine */}
            <div className="flex flex-col items-center">
              <div className={[
                'w-9 h-9 rounded-full flex items-center justify-center shrink-0 border-2 transition-all duration-smooth z-10',
                isFirst
                  ? 'bg-ibm-blue border-ibm-blue text-white'
                  : 'bg-white dark:bg-gray-800 border-ibm-blue/40 text-ibm-blue',
              ].join(' ')}>
                {isFirst
                  ? <MapPin size={16} />
                  : <span className="text-xs font-bold text-ibm-blue">{index + 1}</span>
                }
              </div>
              {!isLast && (
                <div className="w-0.5 flex-1 my-1 bg-gradient-to-b from-ibm-blue/40 to-border dark:to-gray-700" />
              )}
            </div>

            {/* Content */}
            <div className={['flex-1', isLast ? 'pb-0' : 'pb-6'].join(' ')}>
              <div className="card p-5 hover:border-ibm-blue/40 transition-colors duration-smooth">
                <p className="text-xs font-bold uppercase tracking-widest text-ibm-blue mb-1">
                  {item.stage}
                </p>
                <p className="text-sm text-text-secondary dark:text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
