import { Sparkles } from 'lucide-react'

/**
 * AnalysisHero — Premium hero card showing the top career recommendation.
 *
 * Props:
 *   recommendedCareer: { title, description, matchPercentage }
 *   summary: string
 */
export default function AnalysisHero({ recommendedCareer, summary }) {
  const { title, description, matchPercentage } = recommendedCareer

  // Arc-style match ring via SVG
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const progress = (matchPercentage / 100) * circumference

  return (
    <div className="relative overflow-hidden rounded-card bg-gradient-to-br from-ibm-blue via-[#0043CE] to-[#6929C4] text-white p-8 md:p-12 shadow-lg">
      {/* Decorative blobs */}
      <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />

      <div className="relative flex flex-col lg:flex-row items-center lg:items-start gap-10">
        {/* Match ring */}
        <div className="shrink-0 flex flex-col items-center gap-3">
          <div className="relative w-36 h-36">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128" aria-hidden="true">
              <circle cx="64" cy="64" r={radius} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="10" />
              <circle
                cx="64" cy="64" r={radius}
                fill="none"
                stroke="white"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${progress} ${circumference}`}
                style={{ transition: 'stroke-dasharray 1s ease' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-extrabold leading-none">{matchPercentage}<span className="text-xl">%</span></span>
              <span className="text-xs font-medium text-white/70 mt-0.5">Match</span>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
            <Sparkles size={12} /> Best Match
          </span>
        </div>

        {/* Text */}
        <div className="flex-1 text-center lg:text-left space-y-4">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-white/60 mb-1">Your Recommended Career</p>
            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight">{title}</h1>
          </div>
          <p className="text-white/80 text-base leading-relaxed max-w-xl">{description}</p>
          <div className="border-t border-white/20 pt-4">
            <p className="text-xs font-bold tracking-widest uppercase text-white/60 mb-2">Why You're a Great Fit</p>
            <p className="text-white/90 text-sm leading-relaxed max-w-xl">{summary}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
